"use client";

import { useEffect, useState } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import UserCard from "./UserCard";
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function UsersPageClient({ users }: { users: any[] }) {
  const [displayData, setDisplayData] = useState(users);
  const [statusFilter, setStatusFilter] = useState("all");
  const [spendingSort, setSpendingSort] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const applyFilters = () => {
    let result = [...users];

    if (statusFilter === "banned") result = result.filter((u) => u.banned);
    if (statusFilter === "active") result = result.filter((u) => !u.banned);

    if (spendingSort === "desc") result.sort((a, b) => b.amount - a.amount);
    if (spendingSort === "asc") result.sort((a, b) => a.amount - b.amount);

    if (searchValue.trim() !== "") {
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          u.email.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    setDisplayData(result);
  };

  useEffect(() => {
    applyFilters();
  }, [statusFilter, spendingSort, searchValue, users]);

  const highestSpender = [...displayData].sort((a, b) => b.amount - a.amount)[0]?.id;

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary">Quản lý người dùng</h1>

      <div className="flex flex-wrap gap-4 mt-6 items-center">
        <Select defaultValue="all" onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="active">Đang hoạt động</SelectItem>
            <SelectItem value="banned">Đang bị cấm</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={setSpendingSort}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Chi tiêu cao → thấp</SelectItem>
            <SelectItem value="asc">Chi tiêu thấp → cao</SelectItem>
          </SelectContent>
        </Select>

        <Input
          className="w-60"
          placeholder="Tìm theo tên / email..."
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      {/* Grid users */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
        {displayData.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            total={user.errollmentCount}
            isTopSpender={user.id === highestSpender}
          />
        ))}
      </div>
    </div>
  );
}
