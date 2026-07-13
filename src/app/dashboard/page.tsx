"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Users, Landmark, ShieldCheck, Plus, Download, LogOut, Menu, X, TrendingUp, DollarSign, PieChart } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPie, Pie, Cell } from 'recharts';
import { supabase } from '@/lib/supabase';
import { formatCurrency, formatDate } from '@/lib/utils';
import type { User, Transaction } from '@/types';

const COLORS = ['#f97316', '#06b6d4', '#10b981', '#f43f5e', '#8b5cf6'];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState({ income: 0, expense: 0, balance: 0 });
  const [loading, setLoading] = useState(true);

  // Initialize
  useEffect(() => {
    const initUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error || !data.user) {
          router.push('/auth/login');
          return;
        }

        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profile) {
          setUser(profile);
          fetchData(profile.organization_id);
        }
      } catch (error) {
        console.error('Error initializing:', error);
        router.push('/auth/login');
      }
    };

    initUser();
  }, [router]);

  // Fetch data
  const fetchData = async (orgId: string) => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('organization_id', orgId)
        .order('date', { ascending: false });

      if (data) {
        setTransactions(data);
        const inc = data.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0);
        const exp = data.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0);
        setStats({ income: inc, expense: exp, balance: inc - exp });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  // Prepare chart data
  const chartData = [
    { name: 'สรุป', รายรับ: stats.income, รายจ่าย: stats.expense }
  ];

  const categoryData = transactions.reduce((acc: any[], t) => {
    const existing = acc.find(item => item.name === t.category);
    if (existing) {
      existing.value += t.amount;
    } else {
      acc.push({ name: t.category || 'ไม่ระบุ', value: t.amount });
    }
    return acc;
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${
        sidebarOpen ? 'w-64' : 'w-20'
      } bg-white border-r border-gray-200 p-6 flex flex-col transition-all duration-300 fixed h-screen left-0 top-0 z-40`}>
        <div className="flex items-center justify-between mb-8">
          {sidebarOpen && <h2 className="text-2xl font-black text-orange-600">วัดปากน้ำ</h2>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="space-y-2 flex-1">
          {[
            { id: 'overview', icon: LayoutDashboard, label: 'ภาพรวม' },
            { id: 'accounts', icon: Landmark, label: 'บัญชี' },
            { id: 'reports', icon: PieChart, label: 'รายงาน' },
            { id: 'admin', icon: ShieldCheck, label: 'จัดการ' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition ${
                activeTab === item.id
                  ? 'bg-orange-50 text-orange-600 font-bold'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* User Info */}
        <div className="border-t border-gray-200 pt-4 space-y-3">
          {sidebarOpen && (
            <div className="text-sm">
              <p className="text-gray-500 text-xs">ผู้ใช้</p>
              <p className="font-semibold text-gray-900 truncate">{user?.full_name}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 p-3 rounded-lg font-semibold"
          >
            <LogOut size={18} />
            {sidebarOpen && <span>ออกจากระบบ</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-black text-gray-900">ภาพรวมบัญชี</h1>
              <p className="text-gray-500 mt-1">ยินดีต้อนรับ, {user?.full_name}</p>
            </div>
            <Link
              href="/dashboard/transactions/new"
              className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:bg-orange-700 transition"
            >
              <Plus size={20} /> บันทึกรายการ
            </Link>
          </div>

          {/* Stats Cards */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">รายรับทั้งหมด</p>
                      <p className="text-3xl font-black text-green-600 mt-2">{formatCurrency(stats.income)}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-xl">
                      <TrendingUp className="text-green-600" size={24} />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">รายจ่ายทั้งหมด</p>
                      <p className="text-3xl font-black text-red-500 mt-2">{formatCurrency(stats.expense)}</p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-xl">
                      <DollarSign className="text-red-500" size={24} />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">ยอดคงเหลือ</p>
                      <p className={`text-3xl font-black mt-2 ${
                        stats.balance >= 0 ? 'text-blue-600' : 'text-red-600'
                      }`}>{formatCurrency(stats.balance)}</p>
                    </div>
                    <div className={`p-4 rounded-xl ${
                      stats.balance >= 0 ? 'bg-blue-50' : 'bg-red-50'
                    }`}>
                      <PieChart className={stats.balance >= 0 ? 'text-blue-600' : 'text-red-600'} size={24} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">รายรับ vs รายจ่าย</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="รายรับ" fill="#10b981" radius={[10, 10, 0, 0]} />
                      <Bar dataKey="รายจ่าย" fill="#ef4444" radius={[10, 10, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                {categoryData.length > 0 && (
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">การแจกแจงตามหมวดหมู่</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsPie data={categoryData} cx="50%" cy="50%" labelLine={false} label outerRadius={80} fill="#8884d8" dataKey="value">
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </RechartsPie>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>

              {/* Transactions Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">รายการล่าสุด</h3>
                  <Link href="/dashboard/transactions" className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
                    ดูทั้งหมด →
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-bold">
                      <tr>
                        <th className="px-6 py-4 text-left">วันที่</th>
                        <th className="px-6 py-4 text-left">รายการ</th>
                        <th className="px-6 py-4 text-left">หมวดหมู่</th>
                        <th className="px-6 py-4 text-right">จำนวนเงิน</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {transactions.slice(0, 5).map((t) => (
                        <tr key={t.id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4 text-sm text-gray-500">{formatDate(t.date)}</td>
                          <td className="px-6 py-4 font-semibold text-gray-900">{t.title}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{t.category || '-'}</td>
                          <td className={`px-6 py-4 text-right font-bold ${
                            t.type === 'income' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Placeholder for other tabs */}
          {activeTab !== 'overview' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <p className="text-gray-600 text-lg">เนื้อหาสำหรับ {activeTab} กำลังพัฒนา...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
