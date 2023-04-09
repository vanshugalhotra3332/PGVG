import PGs from "@/models/PGs";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let pg = new PGs({
      name: req.body.name,
      slug: req.body.slug,
      image: req.body.image,
      type: req.body.type,
      rentPerMonth: req.body.rentPerMonth,
      sharings: req.body.sharings,
      totalBeds: req.body.totalBeds,
      location: req.body.location,
      rating: req.body.rating,
      rules: req.body.rules,
    });
    await pg.save();

    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
