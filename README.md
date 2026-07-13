# 🏛️ วัดปากน้ำ - ระบบจัดการบัญชีรายรับรายจ่าย

## 📋 ความเป็นมา
ระบบจัดการบัญชีรายรับรายจ่ายแบบเชื่อมต่อสำหรับวัดปากน้ำ ออกแบบโดยใช้เทคโนโลยีสมัยใหม่เพื่อสนับสนุนการจัดการการเงินอย่างมีประสิทธิภาพ

## ✨ ฟีเจอร์หลัก

### 🔐 ระบบการยืนยันตัวตน
- ✅ สมัครสมาชิก (Register)
- ✅ เข้าสู่ระบบ (Login)
- ✅ จัดการเซสชัน
- ✅ ความปลอดภัยด้วย Supabase Auth

### 💼 บัญชีรายรับรายจ่าย
- ✅ บันทึกรายรับ (Income)
- ✅ บันทึกรายจ่าย (Expense)
- ✅ จัดหมวดหมู่รายการ
- ✅ ติดตามวันที่เรียลไทม์

### 📊 Dashboard & Reports
- ✅ ภาพรวมสถิติ (Overview)
- ✅ กราฟแสดงรายรับ-รายจ่าย (Bar Chart)
- ✅ กราฟแสดงสัดส่วน (Pie Chart)
- ✅ ตารางรายการทั้งหมด
- ✅ รายงานการวิเคราะห์

### 🎨 UI/UX สมัยใหม่
- ✅ ออกแบบ Responsive
- ✅ Sidebar Navigation
- ✅ Modal Form
- ✅ Theme สีส้มอย่างลงตัว

## 🛠️ Tech Stack

```
┌─────────────────────────────────────┐
│      Frontend (Client-Side)         │
├─────────────────────────────────────┤
│ • Next.js 14.1.0 (App Router)       │
│ • React 18.2.0                      │
│ • TypeScript 5.3.3                  │
│ • Tailwind CSS 3.4.1                │
│ • Recharts 2.12.2 (Charts)          │
│ • Lucide React 0.344.0 (Icons)      │
│ • Zustand (State Management)        │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│      Backend (Server-Side)          │
├─────────────────────────────────────┤
│ • Supabase (Database & Auth)        │
│ • PostgreSQL (Database Engine)      │
│ • Row Level Security (RLS)          │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│      Deployment                     │
├─────────────────────────────────────┤
│ • Vercel (Frontend Hosting)         │
│ • Supabase (Database Hosting)       │
└─────────────────────────────────────┘
```

## 🚀 การติดตั้งและเรียกใช้งาน

### 1️⃣ Clone Repository
```bash
git clone https://github.com/krichabhak/watpaknam-accounting.git
cd watpaknam-accounting
```

### 2️⃣ ติดตั้ง Dependencies
```bash
npm install
# หรือ
yarn install
# หรือ
pnpm install
```

### 3️⃣ ตั้งค่า Environment Variables

สร้างไฟล์ `.env.local` ที่ root directory:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 4️⃣ รันแอปพลิเคชัน (Development Mode)
```bash
npm run dev
```

เปิด http://localhost:3000 ในเบราว์เซอร์ของคุณ

### 5️⃣ Build for Production
```bash
npm run build
npm run start
```

## 📱 วิธีใช้งาน

### 1. สมัครสมาชิก
1. คลิก "สมัครสมาชิก" ที่หน้า Login
2. กรอกข้อมูลประเมิน: ชื่อ, อีเมล, รหัสผ่าน
3. คลิก "สมัครสมาชิก" เพื่อสร้างบัญชี
4. ระบบจะส่ง verification email (ใช้เมื่อจำเป็น)

### 2. เข้าสู่ระบบ
1. ใส่อีเมลและรหัสผ่าน
2. คลิก "เข้าสู่ระบบ"
3. ระบบจะนำไปยัง Dashboard

### 3. บันทึกรายการ
1. คลิกปุ่ม "บันทึกรายการ" ที่ Sidebar
2. เลือก "รายรับ" หรือ "รายจ่าย"
3. ระบุชื่อรายการและจำนวนเงิน
4. คลิก "บันทึก"

### 4. ดูรายงาน
- **ภาพรวม**: ดูสรุปรายรับ-รายจ่ายและกราฟ
- **รายการ**: ดูรายการทั้งหมดในตาราง
- **รายงาน**: ดูการวิเคราะห์เชิงลึก

## 🗄️ Database Schema

### Tables หลัก:

1. **users** - ข้อมูลผู้ใช้
2. **organizations** - ข้อมูลวัด/องค์กร
3. **chart_of_accounts** - แผนบัญชี
4. **transactions** - รายการรับ-จ่าย
5. **journal_entries** - บันทึกบัญชีอย่างละเอียด
6. **donations** - บริจาค
7. **budgets** - งบประมาณ
8. **audit_logs** - บันทึกการเปลี่ยนแปลง

📄 ดูรายละเอียดที่ `docs/database-schema.sql`

## 🔐 ความปลอดภัย

- ✅ Supabase Row Level Security (RLS) เปิดใช้งาน
- ✅ Password hashing ด้วย bcrypt
- ✅ JWT token authentication
- ✅ HTTPS only
- ✅ Data encryption at rest

## 📦 Project Structure

```
watpaknam-accounting/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── Header.tsx
│   ├── hooks/
│   │   └── useAuth.ts
│   └── lib/
│       └── supabase.ts
├── docs/
│   └── database-schema.sql
├── public/
├── .env.example
├── .gitignore
├── next.config.js
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

## 🚀 Deploy ไปที่ Vercel

### ขั้นตอนที่ 1: Push ไป GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### ขั้นตอนที่ 2: Deploy บน Vercel
1. ไปที่ https://vercel.com
2. Sign in ด้วย GitHub account
3. คลิก "New Project"
4. เลือก repository `watpaknam-accounting`
5. ตั้งค่า Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. คลิก "Deploy"

## 🔗 Database บน Supabase

### ขั้นตอนที่ 1: สร้าง Supabase Project
1. ไปที่ https://supabase.com
2. Sign up/Sign in
3. คลิก "New project"
4. ตั้งชื่อ: `watpaknam-accounting`
5. สร้าง project

### ขั้นตอนที่ 2: รัน Database Schema
1. ไปที่ SQL Editor
2. Copy-paste เนื้อหาจาก `docs/database-schema.sql`
3. คลิก "Run"

### ขั้นตอนที่ 3: ได้รับ Credentials
1. ไปที่ Project Settings
2. Copy `Project URL`
3. Copy `Anon Key`
4. ใส่ใน `.env.local`

## 📊 ตัวอย่าง URL

เมื่อ deploy สำเร็จ:
- **Frontend**: `https://watpaknam-accounting.vercel.app`
- **Dashboard**: `https://watpaknam-accounting.vercel.app/dashboard`
- **Login**: `https://watpaknam-accounting.vercel.app/auth/login`

## 🐛 Troubleshooting

### ปัญหา: "Cannot find module '@supabase/supabase-js'"
**วิธีแก้**: `npm install` ใหม่

### ปัญหา: "NEXT_PUBLIC_SUPABASE_URL is undefined"
**วิธีแก้**: ตรวจสอบไฟล์ `.env.local` และรีสตาร์ท dev server

### ปัญหา: "Authentication error"
**วิธีแก้**: ตรวจสอบ Supabase credentials

## 📝 Future Enhancements

- ⏳ Advanced reporting (Balance Sheet, Income Statement)
- ⏳ Multi-user roles (Admin, Accountant, Viewer)
- ⏳ Expense categorization by project
- ⏳ Export to PDF/Excel
- ⏳ Dark mode
- ⏳ Mobile app
- ⏳ Multi-language support

## 📄 License

MIT License - ใช้ได้อย่างอิสระ

## 👨‍💻 Contributors

- **Krichabhak** - Project Owner

## 📞 Support

ถ้ามีปัญหาหรือคำถาม:
1. ตรวจสอบ Issues บน GitHub
2. สร้าง Issue ใหม่พร้อมรายละเอียด
3. ติดต่อ: krichabhak@gmail.com

---

**สร้างด้วย ❤️ สำหรับวัดปากน้ำ**
