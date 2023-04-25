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
    <ul className="flex flex-wrap shrink-0 -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400 space-x-2 md:space-x-8">
      <ProfileTab />
      <NotificationsTab />
      <SecurityTab />
      <PrivacyTab />
      <GeneralTab />
    </ul>
  );
};

export default Tab;
