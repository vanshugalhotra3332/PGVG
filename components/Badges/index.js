import React from "react";
import {
  UilWifi,
  UilRestaurant,
  UilHouseUser,
  UilToiletPaper,
  UilWind,
  UilWater,
  UilCloudMoon,
  UilBed,
} from "@iconscout/react-unicons";

export const WifiBadge = ({ amenitiesBadgeClick }) => {
  return (
    <div
      className={`convenience-badge`}
      id="wi-fi"
      onClick={amenitiesBadgeClick}
    >
      <UilWifi className="convenience-badge-icon" />
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
      <UilHouseUser className="convenience-badge-icon" />
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
      <UilRestaurant className="convenience-badge-icon" />
      <span className="convenience-badge-text">With Food</span>
    </div>
  );
};
export const AcBadge = ({ amenitiesBadgeClick }) => {
  return (
    <div className={`convenience-badge`} id="ac" onClick={amenitiesBadgeClick}>
      <UilWind className="convenience-badge-icon" />
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
      <UilWater className="convenience-badge-icon" />
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
      <UilCloudMoon className="convenience-badge-icon" />
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
      <UilBed className="convenience-badge-icon" />
      <span className="convenience-badge-text">{sharing}</span>
    </div>
  );
};
