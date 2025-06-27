/** @format */

"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import AdminLayout from "@/components/AdminLayout";
import {
  CheckCircleIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

type QA = {
  _id: string;
  question: string;
  answer: string;
};

export default function AdminQA() {
  const [qas, setQAs] = useState<QA[]>([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [success, setSuccess] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchQAs = async () => {
    const res = await api.get("/admin/qa");
    setQAs(res.data);
  };

  useEffect(() => {
    fetchQAs();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/admin/qa/${editId}`, { question, answer });
      } else {
        await api.post("/admin/qa", { question, answer });
      }
      setSuccess(true);
      setQuestion("");
      setAnswer("");
      setEditId(null);
      fetchQAs();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Submit error:", err);
      alert("Q&A 저장 실패");
    }
  };

  const handleEdit = (qa: any) => {
    setQuestion(qa.question);
    setAnswer(qa.answer);
    setEditId(qa._id);
  };

  const handleDelete = async (id: any) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      try {
        await api.delete(`/admin/qa/${id}`);
        fetchQAs();
      } catch (err) {
        console.error("Delete error:", err);
        alert("삭제 실패");
      }
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto mt-12 px-4 space-y-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
            {editId ? "Q&A 수정" : "새로운 Q&A 등록"}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                질문 (Question)
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                답변 (Answer)
              </label>
              <textarea
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg">
                {editId ? "수정 완료" : "등록하기"}
              </button>
              {editId && (
                <button
                  type="button"
                  className="text-gray-500 underline"
                  onClick={() => {
                    setEditId(null);
                    setQuestion("");
                    setAnswer("");
                  }}>
                  취소
                </button>
              )}
            </div>
            {success && (
              <div className="flex items-center gap-2 text-green-600 text-sm mt-4">
                <CheckCircleIcon className="w-5 h-5" />
                성공적으로 저장되었습니다.
              </div>
            )}
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            등록된 Q&A 목록
          </h2>
          {qas.length === 0 ? (
            <p className="text-gray-500">등록된 Q&A가 없습니다.</p>
          ) : (
            <ul className="space-y-4">
              {qas.map((qa) => (
                <li key={qa._id} className="border p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-800 mb-1">
                        {qa.question}
                      </p>
                      <p className="text-gray-700 text-sm">{qa.answer}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(qa)} title="수정">
                        <PencilIcon className="w-5 h-5 text-blue-600 cursor-pointer" />
                      </button>
                      <button onClick={() => handleDelete(qa._id)} title="삭제">
                        <TrashIcon className="w-5 h-5 text-red-600 cursor-pointer" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
