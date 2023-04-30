import connectDb from "@/middleware/mongoose";
import PGs from "@/models/PGs";

const handler = async (req, res) => {
  const {
    long,
    lat,
    minRentPerMonth,
    maxRentPerMonth,
    propertyType,
    sharings,
    amenities,
  } = req.query;

  var queryObject = {};

  if (propertyType) {
    queryObject.propertyType = propertyType;
  }

  if (minRentPerMonth && maxRentPerMonth) {
    queryObject.rentPerMonth = {
      $gte: Number(minRentPerMonth),
      $lte: Number(maxRentPerMonth),
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

  const referencePoint = {
    type: "Point",
    coordinates: [Number(lat), Number(long)], // Longitude and latitude of the reference point
  };

  if (long && lat) {
    try {
      const pgs = await PGs.aggregate([
        {
          $geoNear: {
            near: referencePoint,
            distanceField: "distance",
            spherical: true,
          },
        },
        { $match: queryObject },
        { $sort: { distance: 1 } },
      ]);
      res.status(200).json({ success: true, totalResults: pgs.length, pgs });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: true, totalResults: 0, pgs: [] });
    }
  } else {
    let pgs = await PGs.find(queryObject);
    res.status(200).json({ success: true, totalResults: pgs.length, pgs });
  }
};

export default connectDb(handler);
