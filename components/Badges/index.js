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

const amenitiesBadgeClick = (event) => {
  event.target.classList.toggle("badge-select");
};

const sharingBadgeClick = (event) => {
  event.target.classList.toggle("badge-select");

  let badgeText = event.target.childNodes[1].innerText.toLowerCase();
  if (badgeText != "Any") {
    if (selectedSharings.includes(badgeText)) {
      dispatch(removeSelectedSharing(badgeText));
    } else {
      dispatch(addSelectedSharing(badgeText));
    }
  }
};

export const WifiBadge = () => {
  return (
    <div className={`convenience-badge`} onClick={amenitiesBadgeClick}>
      <UilWifi className="convenience-badge-icon" />
      <span className="convenience-badge-text">Wi-Fi</span>
    </div>
  );
};
export const BalconyBadge = () => {
  return (
    <div className={`convenience-badge`} onClick={amenitiesBadgeClick}>
      <UilHouseUser className="convenience-badge-icon" />
      <span className="convenience-badge-text">Balcony</span>
    </div>
  );
};
export const WithFoodBadge = () => {
  return (
    <div className={`convenience-badge`} onClick={amenitiesBadgeClick}>
      <UilRestaurant className="convenience-badge-icon" />
      <span className="convenience-badge-text">With Food</span>
    </div>
  );
};
export const AcBadge = () => {
  return (
    <div className={`convenience-badge`} onClick={amenitiesBadgeClick}>
      <UilWind className="convenience-badge-icon" />
      <span className="convenience-badge-text">AC</span>
    </div>
  );
};
export const LaundryBadge = () => {
  return (
    <div className={`convenience-badge`} onClick={amenitiesBadgeClick}>
      <UilWater className="convenience-badge-icon" />
      <span className="convenience-badge-text">Laundry</span>
    </div>
  );
};
export const TwentyFourSevenBadge = () => {
  return (
    <div className={`convenience-badge`} onClick={amenitiesBadgeClick}>
      <UilCloudMoon className="convenience-badge-icon" />
      <span className="convenience-badge-text">24/7</span>
    </div>
  );
};
export const AttachedWashroomBadge = () => {
  return (
    <div className={`convenience-badge `}>
      <UilToiletPaper className="convenience-badge-icon" />
      <span className="convenience-badge-text">Attached Washroom</span>
    </div>
  );
};

export const BedBadge = ({sharingBadgeClick, sharing}) => {
  return (
    <div className={`convenience-badge`} onClick={sharingBadgeClick}>
      <UilBed className="convenience-badge-icon" />
      <span className="convenience-badge-text">{sharing}</span>
    </div>
  );
};
