import PGs from "@/models/PGs";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let pg = new PGs(req.body);
    await pg.save();

    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
