import connectDb from "@/middleware/mongoose";
import PGs from "@/models/PGs";

const handler = async (req, res) => {
  const { minRentPerMonth, maxRentPerMonth, type, sharings, amenities } =
    req.query;

  var queryObject = {};

  if (type) {
    queryObject.type = type;
  }

  if (minRentPerMonth && maxRentPerMonth) {
    queryObject.rentPerMonth = {
      $gte: minRentPerMonth,
      $lte: maxRentPerMonth,
    };
  }

  if (sharings) {
    var sharingsList = sharings.split(",");
    queryObject.sharingsOffered = { $in: sharingsList };
  }

  if (amenities) {
    var amenitiesList = amenities.split(",");
    queryObject.amenities = { $all: amenitiesList };
  }

  let pgs = await PGs.find(queryObject);
  res.status(200).json({ success: true, totalResults: pgs.length, pgs });
};

export default connectDb(handler);
