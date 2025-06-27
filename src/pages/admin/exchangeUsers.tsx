/** @format */

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import api from "@/lib/api";

interface User {
  _id: string;
  name: string;
  phone?: string;
  age: string;
  exchange: string;
  experience: string;
  callTime: string;
  createdAt?: string;
  note?: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const USERS_PER_PAGE = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/admin/exchangeUsers");
        setUsers(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
  const visibleUsers = users.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [viewingNoteId, setViewingNoteId] = useState<string | null>(null);
  const [noteValue, setNoteValue] = useState("");

  const toggleEdit = (id: string) => {
    setEditingNoteId((prev) => (prev === id ? null : id));
    const user = users.find((u) => u._id === id);
    setNoteValue(user?.note || "");
  };

  const toggleView = (id: string) => {
    setViewingNoteId((prev) => (prev === id ? null : id));
  };

  const handleSaveNote = async (id: string) => {
    try {
      await api.patch(`/admin/exchangeUsers/${id}/note`, { note: noteValue });
      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, note: noteValue } : user
        )
      );
      setEditingNoteId(null);
    } catch (error) {
      console.error("Failed to save note", error);
    }
  };

  return (
    <AdminLayout>
      <div className="bg-white p-6 rounded-xl shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Exchange Inquiries
          </h2>
          <p className="text-sm text-gray-500">
            {users.length} total inquiries
          </p>
        </div>

        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500 font-medium">{error}</p>}

        {!loading && !error && (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                  <tr>
                    <th className="px-5 py-3">No</th>
                    <th className="px-5 py-3">이름</th>
                    <th className="px-5 py-3">전화번호</th>
                    <th className="px-5 py-3">나이</th>
                    <th className="px-5 py-3">전화 가능 시간</th>
                    <th className="px-5 py-3">날짜/시간</th>
                    <th className="px-5 py-3">노트</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleUsers.map((user, index) => (
                    <tr
                      key={user._id}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-blue-50 transition`}>
                      <td className="px-5 py-3">
                        {(currentPage - 1) * USERS_PER_PAGE + index + 1}
                      </td>
                      <td className="px-5 py-3 font-medium text-gray-900">
                        {user.name}
                      </td>
                      <td className="px-5 py-3 text-gray-700">
                        {user.phone || "-"}
                      </td>
                      <td className="px-5 py-3">{user.age}</td>
                      <td className="px-5 py-3">{user.callTime}</td>
                      <td className="px-5 py-3">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleString()
                          : "-"}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex gap-2 items-center">
                          <button
                            onClick={() => toggleEdit(user._id)}
                            className="text-blue-500 hover:text-blue-700">
                            📝
                          </button>
                          <button
                            onClick={() => toggleView(user._id)}
                            className="text-green-500 hover:text-green-700">
                            📓
                          </button>
                        </div>
                        {editingNoteId === user._id && (
                          <textarea
                            className="mt-2 w-full p-2 border border-gray-300 rounded"
                            value={noteValue}
                            onChange={(e) => setNoteValue(e.target.value)}
                          />
                        )}
                        {viewingNoteId === user._id && (
                          <p className="mt-2 text-sm text-gray-600">
                            {user.note || "No note yet"}
                          </p>
                        )}
                        {editingNoteId === user._id && (
                          <button
                            onClick={() => handleSaveNote(user._id)}
                            className="mt-1 bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600">
                            저장
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded disabled:opacity-50">
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded disabled:opacity-50">
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
