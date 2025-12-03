import { getAllUsersProfile } from "@/app/data/user/get-user-info";
import UsersPageClient from "./_components/UsersPageClient";

export default async function UsersPage() {
  const users = await getAllUsersProfile(); // Fetch server-side

  return <UsersPageClient users={users} />;
}
