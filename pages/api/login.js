import User from "@/models/User";
import connectDb from "@/middleware/mongoose";

var CryptoJS = require("crypto-js");

var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    let user = await User.findOne({ phone: req.body.phone });

    if (user) {
      const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET);

      const decPass = bytes.toString(CryptoJS.enc.Utf8);

      if (req.body.phone == user.phone && req.body.password == decPass) {
        var token = jwt.sign(
          { phone: user.phone, name: user.name },
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
