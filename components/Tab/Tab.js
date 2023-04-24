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
    <div class="border-b border-gray-200 dark:border-gray-700 my-4">
      <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
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
