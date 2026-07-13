"use client";
import React, { useState } from 'react';
import { ChevronRight, ArrowUp, ArrowDown, TrendingUp, Calendar, Filter, Download, Eye, Edit, Trash2 } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPie, Pie, Cell } from 'recharts';

const MOCKUP_COLORS = ['#f97316', '#06b6d4', '#10b981', '#f43f5e', '#8b5cf6', '#eab308'];

// Mock Data
const mockFinancialData = [
  { month: 'มค.', income: 250000, expense: 180000, balance: 70000 },
  { month: 'กพ.', income: 280000, expense: 195000, balance: 85000 },
  { month: 'มีค.', income: 320000, expense: 210000, balance: 110000 },
  { month: 'เมย.', income: 290000, expense: 188000, balance: 102000 },
  { month: 'พค.', income: 350000, expense: 220000, balance: 130000 },
  { month: 'มิย.', income: 380000, expense: 240000, balance: 140000 },
];

const mockCategoryData = [
  { name: 'บริจาค', value: 450000, percentage: 45 },
  { name: 'ค่าบำรุง', value: 200000, percentage: 20 },
  { name: 'ลูกศิษย์อุตส่าห์', value: 180000, percentage: 18 },
  { name: 'อื่นๆ', value: 170000, percentage: 17 },
];

const mockTransactions = [
  { id: 1, date: '13 ก.ค. 2026', title: 'บริจาคจากสมาชิก', category: 'บริจาค', amount: 50000, type: 'income', status: 'completed' },
  { id: 2, date: '12 ก.ค. 2026', title: 'ค่าซ่อมหลังคา', category: 'ค่าซ่อมแซม', amount: 25000, type: 'expense', status: 'completed' },
  { id: 3, date: '11 ก.ค. 2026', title: 'บริจาคงบประมาณศาสตร์', category: 'บริจาค', amount: 100000, type: 'income', status: 'completed' },
  { id: 4, date: '10 ก.ค. 2026', title: 'ค่าอาหารสงฆ์', category: 'ค่าใช้สอย', amount: 15000, type: 'expense', status: 'completed' },
  { id: 5, date: '09 ก.ค. 2026', title: 'บริจาครายบุคคล', category: 'บริจาค', amount: 30000, type: 'income', status: 'pending' },
];

const mockChartAccounts = [
  { id: '1001', code: '1001', name: 'เงินสดในธนาคาร', type: 'ASSET', balance: 450000 },
  { id: '1002', code: '1002', name: 'เงินสดในมือ', type: 'ASSET', balance: 125000 },
  { id: '2001', code: '2001', name: 'เจ้าหนี้การค้า', type: 'LIABILITY', balance: 50000 },
  { id: '3001', code: '3001', name: 'ทุนสำหรับวัด', type: 'EQUITY', balance: 525000 },
  { id: '4001', code: '4001', name: 'บริจาค', type: 'INCOME', balance: 1200000 },
  { id: '5001', code: '5001', name: 'ค่าใช้สอย', type: 'EXPENSE', balance: 450000 },
];

const mockReports = [
  { id: 1, title: 'Balance Sheet', description: 'รายงานฐานะการเงิน', date: '30 มิย. 2026' },
  { id: 2, title: 'Income Statement', description: 'รายงานกำไรขาดทุน', date: '30 มิย. 2026' },
  { id: 3, title: 'Cash Flow Statement', description: 'รายงานการไหลเข้าออกเงินสด', date: '30 มิย. 2026' },
  { id: 4, title: 'Trial Balance', description: 'รายงานทดลองยอดคำนวณ', date: '13 ก.ค. 2026' },
];

export default function MockupPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [expandedSection, setExpandedSection] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏛️</span>
            <div>
              <h1 className="text-2xl font-black text-orange-600">วัดปากน้ำ</h1>
              <p className="text-xs text-gray-500">ระบบบัญชีการเงิน</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-6 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700">
              ♠️ เข้าสู่ระบบ
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Title */}
        <div className="mb-12">
          <h2 className="text-4xl font-black text-gray-900 mb-4">🎨 ตัวอย่าง UI/UX ระบบบัญชี</h2>
          <p className="text-gray-600 text-lg">ขอบคุณที่ให้เราแสดงตัวอย่างระบบบัญชีแบบสมบูรณ์สำหรับวัดปากน้ำ</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
          {[
            { id: 'dashboard', label: '📊 Dashboard' },
            { id: 'transactions', label: '💰 รายการบัญชี' },
            { id: 'reports', label: '📈 รายงาน' },
            { id: 'accounts', label: '📋 บัญชี' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-bold whitespace-nowrap transition ${
                activeTab === tab.id
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-orange-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-bold">รายรับรวม</p>
                    <p className="text-3xl font-black text-green-600 mt-2">฿2.45M</p>
                    <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                      <ArrowUp size={14} /> +12% จากเดือนที่แล้ว
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-xl">💹</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-bold">รายจ่ายรวม</p>
                    <p className="text-3xl font-black text-red-500 mt-2">฿1.03M</p>
                    <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                      <ArrowDown size={14} /> -8% จากเดือนที่แล้ว
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-xl">📉</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-bold">ยอดคงเหลือ</p>
                    <p className="text-3xl font-black text-blue-600 mt-2">฿1.42M</p>
                    <p className="text-xs text-blue-600 mt-2">สถานะบัญชี: ปกติ ✓</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-xl">💳</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-bold">จำนวนรายการ</p>
                    <p className="text-3xl font-black text-purple-600 mt-2">247</p>
                    <p className="text-xs text-purple-600 mt-2">เดือนนี้ มี 32 รายการ</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-xl">📊</div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Line Chart */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">📈 แนวโน้มรายรับ-รายจ่าย</h3>
                  <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
                    <option>6 เดือนที่ผ่านมา</option>
                    <option>1 ปี</option>
                  </select>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockFinancialData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} name="รายรับ" />
                    <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} name="รายจ่าย" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">🎯 รายรับตามหมวดหมู่</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPie data={mockCategoryData} cx="50%" cy="50%" labelLine={false} label={(entry) => `${entry.name} ${entry.percentage}%`} outerRadius={100} fill="#8884d8" dataKey="value">
                    {mockCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={MOCKUP_COLORS[index % MOCKUP_COLORS.length]} />
                    ))}
                  </RechartsPie>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">📝 รายการล่าสุด</h3>
                <a href="#" className="text-orange-600 font-semibold hover:text-orange-700 flex items-center gap-1">
                  ดูทั้งหมด <ChevronRight size={18} />
                </a>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left font-bold text-gray-700">วันที่</th>
                      <th className="px-6 py-3 text-left font-bold text-gray-700">รายการ</th>
                      <th className="px-6 py-3 text-left font-bold text-gray-700">หมวดหมู่</th>
                      <th className="px-6 py-3 text-left font-bold text-gray-700">สถานะ</th>
                      <th className="px-6 py-3 text-right font-bold text-gray-700">จำนวนเงิน</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {mockTransactions.map((t) => (
                      <tr key={t.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-gray-600">{t.date}</td>
                        <td className="px-6 py-4 font-semibold text-gray-900">{t.title}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                            {t.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            t.status === 'completed'
                              ? 'bg-green-50 text-green-700'
                              : 'bg-yellow-50 text-yellow-700'
                          }`}>
                            {t.status === 'completed' ? '✓ สำเร็จ' : '⏳ รอการอนุมัติ'}
                          </span>
                        </td>
                        <td className={`px-6 py-4 text-right font-bold ${
                          t.type === 'income' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {t.type === 'income' ? '+' : '-'}฿{t.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TRANSACTIONS TAB */}
        {activeTab === 'transactions' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="🔍 ค้นหารายการ..."
                  className="px-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:border-orange-500"
                />
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter size={18} />
                </button>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                  <Download size={18} /> ส่งออก
                </button>
                <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold">
                  + เพิ่มรายการใหม่
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left font-bold text-gray-700">วันที่</th>
                      <th className="px-6 py-3 text-left font-bold text-gray-700">รายการ</th>
                      <th className="px-6 py-3 text-left font-bold text-gray-700">ประเภท</th>
                      <th className="px-6 py-3 text-left font-bold text-gray-700">หมวดหมู่</th>
                      <th className="px-6 py-3 text-right font-bold text-gray-700">จำนวนเงิน</th>
                      <th className="px-6 py-3 text-center font-bold text-gray-700">การจัดการ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {mockTransactions.map((t) => (
                      <tr key={t.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-gray-600">{t.date}</td>
                        <td className="px-6 py-4 font-semibold text-gray-900">{t.title}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            t.type === 'income'
                              ? 'bg-green-50 text-green-700'
                              : 'bg-red-50 text-red-700'
                          }`}>
                            {t.type === 'income' ? '↓ รายรับ' : '↑ รายจ่าย'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{t.category}</td>
                        <td className={`px-6 py-4 text-right font-bold ${
                          t.type === 'income' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {t.type === 'income' ? '+' : '-'}฿{t.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-center flex items-center justify-center gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                            <Eye size={16} />
                          </button>
                          <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                            <Edit size={16} />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* REPORTS TAB */}
        {activeTab === 'reports' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockReports.map((report) => (
              <div key={report.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{report.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                  </div>
                  <span className="text-2xl">📄</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500">วันที่: {report.date}</p>
                  <button className="px-4 py-2 bg-orange-50 text-orange-600 rounded-lg font-semibold hover:bg-orange-100 flex items-center gap-2">
                    ดู <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ACCOUNTS TAB */}
        {activeTab === 'accounts' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">📋 แผนบัญชี (Chart of Accounts)</h3>
              <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold">
                + เพิ่มบัญชี
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left font-bold text-gray-700">รหัสบัญชี</th>
                    <th className="px-6 py-3 text-left font-bold text-gray-700">ชื่อบัญชี</th>
                    <th className="px-6 py-3 text-left font-bold text-gray-700">ประเภทบัญชี</th>
                    <th className="px-6 py-3 text-right font-bold text-gray-700">ยอดคงเหลือ</th>
                    <th className="px-6 py-3 text-center font-bold text-gray-700">การจัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockChartAccounts.map((acc) => (
                    <tr key={acc.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-mono font-bold text-gray-900">{acc.code}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900">{acc.name}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          acc.type === 'ASSET'
                            ? 'bg-blue-50 text-blue-700'
                            : acc.type === 'LIABILITY'
                            ? 'bg-red-50 text-red-700'
                            : acc.type === 'EQUITY'
                            ? 'bg-purple-50 text-purple-700'
                            : acc.type === 'INCOME'
                            ? 'bg-green-50 text-green-700'
                            : 'bg-orange-50 text-orange-700'
                        }`}>
                          {acc.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-gray-900">฿{acc.balance.toLocaleString()}</td>
                      <td className="px-6 py-4 text-center flex items-center justify-center gap-2">
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white mt-20 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-4">✨ ระบบบัญชีแบบครบถ้วน</h3>
          <p className="text-gray-300 mb-6">สำหรับการจัดการการเงินของวัดปากน้ำอย่างมืออาชีพ</p>
          <div className="flex items-center justify-center gap-4 flex-wrap text-sm">
            <span>✅ การตรวจสอบความถูกต้องของบัญชี (Balance Sheet)</span>
            <span>✅ รายงานกำไรขาดทุน (Income Statement)</span>
            <span>✅ การติดตามเงินสด (Cash Flow)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
