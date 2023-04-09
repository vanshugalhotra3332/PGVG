import connectDb from "@/middleware/mongoose";
import PGs from "@/models/PGs";

const handler = async (req, res) => {
  let pgs = await PGs.find({})

  res.status(200).json({ success: true, totalResults: pgs.length , pgs });
};

export default connectDb(handler);
