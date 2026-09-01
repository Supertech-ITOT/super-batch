import ProfileCard from "./profile-card";
import ProfileChangePasswordCard from "./profile-change-password-card";
import ProfileLogoutCard from "./profile-logout-card";

export default function ProfileView() {
  return (
    <div className="flex flex-col rounded-2xl border shadow bg-card p-2 sm:p-4 flex-1 gap-2">
      <ProfileCard />
      <ProfileChangePasswordCard />
      <ProfileLogoutCard />
    </div>
  );
}
