/** @format */

import AdminLayout from "@/components/AdminLayout";
import { useRouter } from "next/router";
import { useAuth } from "@/context/Auth.Context";
import { useEffect, useState } from "react";
import {
  BriefcaseIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import dayjs from "dayjs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export interface Visitor {
  _id: string;
  fingerprint: string;
  ip?: string;
  country?: string;
  region?: string;
  city?: string;
  browser?: string;
  os?: string;
  device?: string;
  userAgent?: string;
  visitedAt: string;
}

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [todayCount, setTodayCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentVisitors = visitors.slice(startIdx, endIdx);

  const totalPages = Math.ceil(visitors.length / itemsPerPage);
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/admin/login");
      } else if (user.role !== "admin") {
        router.push("/");
      }
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const res = await axios.get(
          "https://api.metaselferral.com/api/visitors",
          {
            withCredentials: true,
          }
        );

        const raw = res.data;

        setVisitors(raw);

        const today = dayjs().startOf("day");
        setTodayCount(
          raw.filter((v: any) => dayjs(v.visitedAt).isAfter(today)).length
        );
      } catch (err) {
        console.error("Failed to fetch visitors", err);
      }
    };

    fetchVisitors();
  }, []);

  if (loading || !user) return null;
  if (user.role !== "admin") return null;

  const deviceStats = visitors.reduce((acc: Record<string, number>, v) => {
    const key = v.device || "unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(deviceStats).map(([device, count]) => ({
    device,
    count,
  }));

  return (
    <AdminLayout>
      <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 bg-gradient-to-tr from-blue-100 to-blue-200 text-blue-700 rounded-full shadow">
            <BriefcaseIcon className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-gray-800">
              Welcome, {user.email}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              관리자 권한으로 로그인되었습니다.
            </p>
          </div>
        </div>

        {/* Visitor Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-indigo-100 to-indigo-50 p-6 rounded-xl shadow border border-indigo-200 hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <UserGroupIcon className="h-6 w-6 text-indigo-700" />
              <h3 className="text-lg font-semibold text-indigo-900">
                총 방문자 수
              </h3>
            </div>
            <p className="text-4xl font-bold text-indigo-800 mt-4">
              {visitors.length}
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-100 to-green-50 p-6 rounded-xl shadow border border-green-200 hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <CalendarDaysIcon className="h-6 w-6 text-green-700" />
              <h3 className="text-lg font-semibold text-green-900">
                오늘 방문자 수
              </h3>
            </div>
            <p className="text-4xl font-bold text-green-800 mt-4">
              {todayCount}
            </p>
          </div>
        </div>

        {/* Visitor Table */}
        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-md">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 text-left">Time</th>
                <th className="px-4 py-3 text-left">IP</th>
                <th className="px-4 py-3 text-left">Device</th>
                <th className="px-4 py-3 text-left">OS</th>
                <th className="px-4 py-3 text-left">Browser</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {currentVisitors.map((v, i) => (
                <tr
                  key={v._id}
                  className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-4 py-3 whitespace-nowrap">
                    {dayjs(v.visitedAt).format("YYYY-MM-DD HH:mm")}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-mono">
                    {v.ip || "-"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap capitalize">
                    {v.device || "-"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{v.os || "-"}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {v.browser || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center px-4 py-3 text-sm text-gray-600">
            <div>
              Page {currentPage} of {totalPages}
            </div>
            <div className="space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50">
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
