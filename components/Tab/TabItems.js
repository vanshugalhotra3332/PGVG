import React from "react";

// icons import
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import EnhancedEncryptionOutlinedIcon from "@mui/icons-material/EnhancedEncryptionOutlined";
import PrivacyTipOutlinedIcon from "@mui/icons-material/PrivacyTipOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";

const TabItem = ({ text, icon, active }) => {
  return (
    <li className="mr-2">
      <div
        className={`inline-flex  p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 cursor-pointer space-x-2 ${
          active ? "tab-active" : ""
        }`}
      >
        {icon}
        <span>{text}</span>
      </div>
    </li>
  );
};

export const ProfileTab = () => {
  return (
    <TabItem
      text={"Profile"}
      icon={<AccountCircleOutlinedIcon className="tab-icon" />}
      active={true}
    />
  );
};

export const NotificationsTab = () => {
  return (
    <TabItem
      text={"Notifications"}
      icon={<NotificationsActiveOutlinedIcon className="tab-icon" />}
    />
  );
};

export const SecurityTab = () => {
  return (
    <TabItem
      text={"Security"}
      icon={<EnhancedEncryptionOutlinedIcon className="tab-icon" />}
    />
  );
};

export const PrivacyTab = () => {
  return (
    <TabItem
      text={"Privacy"}
      icon={<PrivacyTipOutlinedIcon className="tab-icon" />}
    />
  );
};

export const GeneralTab = () => {
  return (
    <TabItem
      text={"General"}
      icon={<TuneOutlinedIcon className="tab-icon" />}
    />
  );
};
