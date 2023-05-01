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
    limit,
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

  const pipeLine = [
    {
      $geoNear: {
        near: referencePoint,
        distanceField: "distance",
        spherical: true,
      },
    },
    { $match: queryObject },
    { $sort: { distance: 1 } },
  ];

  if (limit) {
    pipeLine.push({ $limit: Number(limit) });
  }

  if (long && lat) {
    try {
      const pgs = await PGs.aggregate(pipeLine);
      res.status(200).json({ success: true, totalResults: pgs.length, pgs });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: true, totalResults: 0, pgs: [] });
    }
  } else {
    let query = PGs.find(queryObject);
    if (limit) {
      query = query.limit(limit);
    }
    const pgs = await query.exec();
    res.status(200).json({ success: true, totalResults: pgs.length, pgs });
  }
};

export default connectDb(handler);
