import React from "react";

// Icons import

import { UilToiletPaper } from "@iconscout/react-unicons";
import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";
import BrunchDiningOutlinedIcon from "@mui/icons-material/BrunchDiningOutlined";
import BalconyOutlinedIcon from "@mui/icons-material/BalconyOutlined";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import DryCleaningOutlinedIcon from "@mui/icons-material/DryCleaningOutlined";
import NightlifeOutlinedIcon from "@mui/icons-material/NightlifeOutlined";
import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";

export const WifiBadge = ({ amenitiesBadgeClick }) => {
  return (
    <div
      className={`convenience-badge`}
      id="wi-fi"
      onClick={amenitiesBadgeClick}
    >
      <WifiOutlinedIcon className="convenience-badge-icon" />
      <span className="convenience-badge-text">Wi-Fi</span>
    </div>
  );
};
export const BalconyBadge = ({ amenitiesBadgeClick }) => {
  return (
    <div
      className={`convenience-badge`}
      id="balcony"
      onClick={amenitiesBadgeClick}
    >
      <BalconyOutlinedIcon className="convenience-badge-icon" />
      <span className="convenience-badge-text">Balcony</span>
    </div>
  );
};
export const WithFoodBadge = ({ amenitiesBadgeClick }) => {
  return (
    <div
      className={`convenience-badge`}
      id="with-food"
      onClick={amenitiesBadgeClick}
    >
      <BrunchDiningOutlinedIcon className="convenience-badge-icon" />
      <span className="convenience-badge-text">With Food</span>
    </div>
  );
};
export const AcBadge = ({ amenitiesBadgeClick }) => {
  return (
    <div className={`convenience-badge`} id="ac" onClick={amenitiesBadgeClick}>
      <AirOutlinedIcon className="convenience-badge-icon" />
      <span className="convenience-badge-text">AC</span>
    </div>
  );
};
export const LaundryBadge = ({ amenitiesBadgeClick }) => {
  return (
    <div
      className={`convenience-badge`}
      id="laundry"
      onClick={amenitiesBadgeClick}
    >
      <DryCleaningOutlinedIcon className="convenience-badge-icon" />
      <span className="convenience-badge-text">Laundry</span>
    </div>
  );
};
export const TwentyFourSevenBadge = ({ amenitiesBadgeClick }) => {
  return (
    <div
      className={`convenience-badge`}
      id="24/7"
      onClick={amenitiesBadgeClick}
    >
      <NightlifeOutlinedIcon className="convenience-badge-icon" />
      <span className="convenience-badge-text">24/7</span>
    </div>
  );
};
export const AttachedWashroomBadge = ({ amenitiesBadgeClick }) => {
  return (
    <div
      className={`convenience-badge `}
      id="attached washrooms"
      onClick={amenitiesBadgeClick}
    >
      <UilToiletPaper className="convenience-badge-icon" />
      <span className="convenience-badge-text">Attached Washroom</span>
    </div>
  );
};

export const BedBadge = ({ sharingBadgeClick, sharing }) => {
  return (
    <div className={`convenience-badge`} onClick={sharingBadgeClick}>
      <HotelOutlinedIcon className="convenience-badge-icon" />
      <span className="convenience-badge-text">{sharing}</span>
    </div>
  );
};
