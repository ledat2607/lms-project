import { adminGetUser } from "@/app/data/admin/user-function";
import UserCard from "./_components/UserCard";

export default async function UsersPage() {
  const users = await adminGetUser();
  return (
    <div>
      <h1 className="text-3xl font-bold text-primary">Manage Users</h1>
      {users.length !== 0 &&
        users.map((user) => <UserCard user={user} key={user.id} />)}
    </div>
  );
}
