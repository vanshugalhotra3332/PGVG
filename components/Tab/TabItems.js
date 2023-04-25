import React from "react";
import { useSelector, useDispatch } from "react-redux";

// icons import
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import EnhancedEncryptionOutlinedIcon from "@mui/icons-material/EnhancedEncryptionOutlined";
import PrivacyTipOutlinedIcon from "@mui/icons-material/PrivacyTipOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";

// slices
import { setSelectedTab } from "@/slices/settingsSlice";

const TabItem = ({ text, icon, active, id }) => {
  const dispatch = useDispatch();

  const tabClick = (event) => {
    dispatch(setSelectedTab(event.currentTarget.id));
  };

  return (
    <li className="mr-2">
      <div
        className={`inline-flex  p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 cursor-pointer space-x-2 ${
          active ? "tab-active" : ""
        }`}
        onClick={tabClick}
        id={id}
      >
        {icon}
        <span>{text}</span>
      </div>
    </li>
  );
};

export const ProfileTab = () => {
  const selectedTab = useSelector((state) => state.settings.selectedTab);
  return (
    <TabItem
      text={"Profile"}
      icon={<AccountCircleOutlinedIcon className="tab-icon" />}
      id="profile"
      active={selectedTab === "profile"}
    />
  );
};

export const NotificationsTab = () => {
  const selectedTab = useSelector((state) => state.settings.selectedTab);
  return (
    <TabItem
      text={"Notifications"}
      icon={<NotificationsActiveOutlinedIcon className="tab-icon" />}
      id="notifications"
      active={selectedTab === "notifications"}
    />
  );
};

export const SecurityTab = () => {
  const selectedTab = useSelector((state) => state.settings.selectedTab);
  return (
    <TabItem
      text={"Security"}
      icon={<EnhancedEncryptionOutlinedIcon className="tab-icon" />}
      id="security"
      active={selectedTab === "security"}
    />
  );
};

export const PrivacyTab = () => {
  const selectedTab = useSelector((state) => state.settings.selectedTab);
  return (
    <TabItem
      text={"Privacy"}
      icon={<PrivacyTipOutlinedIcon className="tab-icon" />}
      id="privacy"
      active={selectedTab === "privacy"}
    />
  );
};

export const GeneralTab = () => {
  const selectedTab = useSelector((state) => state.settings.selectedTab);
  return (
    <TabItem
      text={"General"}
      icon={<TuneOutlinedIcon className="tab-icon" />}
      id="general"
      active={selectedTab === "general"}
    />
  );
};
