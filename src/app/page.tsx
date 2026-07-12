"use client";
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Landmark, ShieldCheck, Plus, Download, Trash2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from '@/lib/supabase';

export default function AccountingSystem() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [stats, setStats] = useState({ income: 0, expense: 0, balance: 0 });

  // ฟังก์ชันดึงข้อมูลจาก Supabase
  const fetchData = async () => {
    const { data, error } = await supabase.from('transactions').select('*').order('date', { ascending: false });
    if (data) {
      const inc = data.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0);
      const exp = data.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0);
      setTransactions(data);
      setStats({ income: inc, expense: exp, balance: inc - exp });
    }
  };

  useEffect(() => { fetchData(); }, []);

  // ฟังก์ชันบันทึกข้อมูล
  const handleSave = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      title: formData.get('title'),
      amount: Number(formData.get('amount')),
      type: formData.get('type'),
      date: new Date().toISOString()
    };
    const { error } = await supabase.from('transactions').insert([payload]);
    if (!error) {
      setIsModalOpen(false);
      fetchData();
    } else { alert("Error: " + error.message); }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col">
        <h2 className="text-xl font-bold text-orange-600 mb-8">วัดปากน้ำ</h2>
        <nav className="space-y-2 flex-1">
          <button onClick={() => setActiveTab('overview')} className={`w-full flex p-3 rounded-xl ${activeTab==='overview'?'bg-orange-50 text-orange-600 font-bold':'text-slate-400'}`}><LayoutDashboard className="mr-2"/> ภาพรวม</button>
          <button onClick={() => setActiveTab('banking')} className={`w-full flex p-3 rounded-xl ${activeTab==='banking'?'bg-orange-50 text-orange-600 font-bold':'text-slate-400'}`}><Landmark className="mr-2"/> ธนาคาร</button>
          <button onClick={() => setActiveTab('admin')} className={`w-full flex p-3 rounded-xl ${activeTab==='admin'?'bg-orange-50 text-orange-600 font-bold':'text-slate-400'}`}><ShieldCheck className="mr-2"/> แอดมิน</button>
        </nav>
        <button onClick={() => setIsModalOpen(true)} className="bg-orange-600 text-white p-4 rounded-2xl font-bold shadow-lg flex justify-center items-center gap-2"><Plus/> บันทึกรายการ</button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        {activeTab === 'overview' && (
          <div className="animate-in fade-in duration-500">
            <h1 className="text-3xl font-black mb-8">ภาพรวมบัญชี</h1>
            <div className="grid grid-cols-3 gap-6 mb-10">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <p className="text-slate-400 text-xs font-bold uppercase">รายรับทั้งหมด</p>
                <p className="text-2xl font-black text-green-600">฿{stats.income.toLocaleString()}</p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <p className="text-slate-400 text-xs font-bold uppercase">รายจ่ายทั้งหมด</p>
                <p className="text-2xl font-black text-red-500">฿{stats.expense.toLocaleString()}</p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <p className="text-slate-400 text-xs font-bold uppercase">ยอดคงเหลือ</p>
                <p className="text-2xl font-black text-blue-600">฿{stats.balance.toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm mb-10 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[{name: 'สรุป', in: stats.income, out: stats.expense}]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" /> <YAxis /> <Tooltip />
                  <Bar dataKey="in" fill="#10b981" radius={[10, 10, 0, 0]} />
                  <Bar dataKey="out" fill="#ef4444" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-slate-100">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-400 text-xs uppercase font-bold">
                  <tr><th className="p-4">วันที่</th><th className="p-4">รายการ</th><th className="p-4 text-right">จำนวนเงิน</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {transactions.map((t, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="p-4 text-xs text-slate-400">{new Date(t.date).toLocaleDateString('th-TH')}</td>
                      <td className="p-4 font-bold">{t.title}</td>
                      <td className={`p-4 text-right font-black ${t.type==='income'?'text-green-600':'text-red-500'}`}>
                        {t.type==='income'?'+':'-'}฿{Number(t.amount).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form onSubmit={handleSave} className="bg-white p-8 rounded-[2.5rem] w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-black mb-6">บันทึกรายการ</h2>
            <div className="space-y-4">
              <select name="type" className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold">
                <option value="income">รายรับ (+)</option>
                <option value="expense">รายจ่าย (-)</option>
              </select>
              <input name="title" placeholder="ชื่อรายการ / ผู้บริจาค" className="w-full p-4 bg-slate-50 rounded-2xl outline-none" required />
              <input name="amount" type="number" placeholder="จำนวนเงิน" className="w-full p-4 bg-slate-50 rounded-2xl outline-none text-xl font-bold" required />
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 font-bold text-slate-400">ยกเลิก</button>
                <button type="submit" className="flex-1 bg-orange-600 text-white p-4 rounded-2xl font-bold shadow-lg">บันทึก</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
