import User from "@/models/User";
import connectDb from "@/middleware/mongoose";

var CryptoJS = require("crypto-js");

var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    const identifier = req.body.phone ? req.body.phone : req.body.email;

    let user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

    if (user) {
      const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
      const decPass = bytes.toString(CryptoJS.enc.Utf8);

      const recievedPassword = req.body.verifiedByGoogle
        ? decPass
        : req.body.password;

      if (
        (identifier == user.phone || identifier == user.email) &&
        recievedPassword == decPass
      ) {
        var token = jwt.sign(
          { identifier: identifier, name: user.name },
          process.env.JWT_SECRET,
          {
            expiresIn: "2d",
          }
        );
        res.status(200).json({ token, success: true });
      } else {
        res.status(404).json({ success: false, error: "Invalid Credentials" });
      }
    } else {
      res.status(404).json({ success: false, error: "Invalid Credentials" });
    }
  }
};

export default connectDb(handler);
