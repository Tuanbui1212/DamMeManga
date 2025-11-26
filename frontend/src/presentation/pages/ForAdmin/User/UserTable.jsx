// src/components/user-management/UserTable.jsx
import React from "react";

export default function UserTable({ users }) {
  if (!users || users.length === 0) {
    return (
      <p className="py-6 text-center text-gray-400">
        Không có người dùng nào phù hợp.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto text-left">
        <thead>
          <tr className="text-gray-300 text-sm border-b border-gray-800">
            <th className="sticky left-0 bg-gray-900/80 py-3 px-3 min-w-12 z-10">#</th>
            <th className="py-3 px-3 min-w-40">Username</th>
            <th className="py-3 px-3 min-w-40">Password</th>
            <th className="py-3 px-3 min-w-56">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id ?? index} // fallback index nếu id undefined
              className="odd:bg-gray-900 even:bg-gray-800/60 hover:bg-gray-700/40 transition"
            >
              <td className="sticky left-0 bg-gray-900/80 py-3 px-3 text-sm text-gray-300 z-10">
                {user.id ?? "-"}
              </td>
              <td className="py-3 px-3 text-sm font-medium">{user.account ?? "-"}</td>
              <td className="py-3 px-3 text-sm text-gray-400">{user.password ?? "-"}</td>
              <td className="py-3 px-3 text-sm text-blue-400 underline">{user.role ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
