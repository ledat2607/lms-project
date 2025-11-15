import UserCard from "./_components/UserCard";
import { getAllUsersProfile } from "@/app/data/user/get-user-info";

export default async function UsersPage() {
  const erroll = await getAllUsersProfile();

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary">Manage Users</h1>
      {erroll.length !== 0 &&
        erroll.map((user) => (
          <UserCard
          /* eslint-disable @typescript-eslint/no-explicit-any */

            user={user as any}
            key={user.id}
            total={user.errollmentCount}
          />
        ))}
    </div>
  );
}
