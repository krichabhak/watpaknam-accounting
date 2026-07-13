'use client';

import { useState } from 'react';
import { LogOut, User } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">วม</span>
          </div>
          <div>
            <h1 className="font-black text-lg text-slate-900">วัดปากน้ำ</h1>
            <p className="text-xs text-slate-400">ระบบบัญชีรายรับ-รายจ่าย</p>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <User size={20} className="text-slate-400" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-600"
              >
                <LogOut size={16} />
                ออกจากระบบ
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
