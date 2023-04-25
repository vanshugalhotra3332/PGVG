import React from "react";
import {
  GeneralTab,
  NotificationsTab,
  PrivacyTab,
  ProfileTab,
  SecurityTab,
} from "./TabItems";

const Tab = () => {
  return (
    <div className="border-gray-200 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400 space-x-8">
        <ProfileTab />
        <NotificationsTab />
        <SecurityTab />
        <PrivacyTab />
        <GeneralTab />
      </ul>
    </div>
  );
};

export default Tab;
