import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "PATCH") {
    const identifier = req.body.phone ? req.body.phone : req.body.email;

    const { password, ...rest } = req.body;
    const userData = {
      password: CryptoJS.AES.encrypt(password, process.env.SECRET).toString(),
      ...rest,
    };

    const user = await User.findOneAndUpdate(
      {
        $or: [{ email: identifier }, { phone: identifier }],
      },
      userData,
      { new: true, runValidators: true }
    );

    if (!user) {
      res.status(404).json({ success: false, error: "Invalid Credentials" });
    }
    res.status(200).json({ success: true });
  }
};

export default connectDb(handler);
