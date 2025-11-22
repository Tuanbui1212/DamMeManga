// src/components/user-management/UserManagement.jsx
import React, { useState, useMemo, useEffect } from "react";
import SearchBox from "./SearchBox";
import UserStats from "./UserStats";
import UserTable from "./UserTable";
import Pagination from "./Pagination";

const mockUsers = [
  { id: 1, username: "admin", password: "******", gmail: "admin@story.com" },
  { id: 2, username: "user123", password: "******", gmail: "user123@gmail.com" },
  { id: 3, username: "manga_fan", password: "******", gmail: "fan@manga.vn" },
  { id: 4, username: "otaku_kun", password: "******", gmail: "otaku@gmail.com" },
  { id: 5, username: "reader99", password: "******", gmail: "reader99@yahoo.com" },
  { id: 6, username: "shounen_love", password: "******", gmail: "shounen@outlook.com" },
  { id: 7, username: "dark_manga", password: "******", gmail: "dark@seinen.jp" },
  { id: 8, username: "romance_queen", password: "******", gmail: "queen@love.com" },
  { id: 9, username: "comedy_king", password: "******", gmail: "king@humor.net" },
  { id: 10, username: "isekai_master", password: "******", gmail: "master@isekai.world" },
  { id: 11, username: "slice_of_life", password: "******", gmail: "sol@daily.jp" },
  { id: 12, username: "horror_night", password: "******", gmail: "night@horror.tv" },
  { id: 13, username: "mystery_solver", password: "******", gmail: "solver@clue.com" },
  { id: 14, username: "sci_fi_geek", password: "******", gmail: "geek@sci.fi" },
];

const ITEMS_PER_PAGE = 9;

export default function UserManagement() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Lọc dữ liệu
  const filteredUsers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return mockUsers;
    return mockUsers.filter(
      (u) =>
        u.username.toLowerCase().includes(q) ||
        u.gmail.toLowerCase().includes(q)
    );
  }, [query]);

  // Phân trang
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredUsers.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredUsers, currentPage]);

  // Reset trang khi tìm kiếm
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Quản lý người dùng</h1>
          <SearchBox query={query} onQueryChange={setQuery} />
        </header>

        <main>
          <section className="bg-gray-900/30 border border-gray-800 rounded-lg p-4">
            <UserStats total={mockUsers.length} filtered={filteredUsers.length} />

            <UserTable users={paginatedUsers} />

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={filteredUsers.length}
                itemsPerPage={ITEMS_PER_PAGE}
              />
            )}
          </section>
        </main>
      </div>
    </div>
  );
}