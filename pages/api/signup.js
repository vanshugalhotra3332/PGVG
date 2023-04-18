import User from "@/models/User";
import connectDb from "@/middleware/mongoose";

var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { name, email, phone, password } = req.body;
    let newUser = new User({
      name,
      email,
      phone,
      password: CryptoJS.AES.encrypt(password, process.env.SECRET).toString(),
    });

    const identifier = phone ? phone : email;

    var token = jwt.sign(
      { identifier: identifier, name: name },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      }
    );
    await newUser.save();

    res.status(200).json({ success: true, token });
  } else {
    res
      .status(400)
      .json({ success: false, error: "This method is not allowed" });
  }
};

export default connectDb(handler);
