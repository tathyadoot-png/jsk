"use client";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";

export default function ProfilePage() {
  return (
    <div className="h-screen bg-white flex flex-col">
      <ProfileHeader />
      <ProfileTabs />
    </div>
  );
}