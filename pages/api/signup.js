import User from "@/models/User";
import connectDb from "@/middleware/mongoose";

var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { name, email, phone, password } = req.body;
    let newUser = new User({
      name,
      email,
      phone,
      password: CryptoJS.AES.encrypt(password, process.env.SECRET).toString(),
    });
    await newUser.save();

    res.status(200).json({ success: "success" });
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
