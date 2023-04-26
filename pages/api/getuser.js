import User from "@/models/User";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const identifier = req.body.phone ? req.body.phone : req.body.email;

    let user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

    if (user) {
      res.status(200).json({ success: true, user });
    } else {
      res.status(404).json({ success: false });
    }
  }
};

export default connectDb(handler);
