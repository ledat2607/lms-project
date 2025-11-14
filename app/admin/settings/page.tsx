// app/(dashboard)/users/page.tsx
import ProfileSettingsPage from "./_components/update-infor";
import { adminGetInfo } from "@/app/data/admin/get-admin-info";

export default async function SettingAdminPage() {
  const info = await adminGetInfo(); // Prisma chạy ở server
  return (
    <div>
      <ProfileSettingsPage user={info[0]} />
    </div>
  );
}
