# 🔧 Installation & Setup Guide

## Prerequisites (ที่จำเป็น)

- Node.js 16.x หรือสูงกว่า
- npm / yarn / pnpm
- Git
- Supabase Account (สร้างฟรี)
- Vercel Account (สำหรับ Deploy)

## 📥 Installation Steps

### 1. Clone Repository
```bash
git clone https://github.com/krichabhak/watpaknam-accounting.git
cd watpaknam-accounting
```

### 2. Install Dependencies
```bash
npm install
```

หรือ:
```bash
yarn install
```

### 3. Setup Supabase Database

#### Step 3.1: สร้าง Supabase Project
1. ไปที่ https://supabase.com
2. Sign up ด้วย Google/GitHub
3. คลิก "New Project"
4. ตั้งค่า:
   - **Name**: `watpaknam-accounting`
   - **Database Password**: ตั้งรหัสผ่านแข็งแรง
   - **Region**: เลือก `Southeast Asia (Singapore)` เพื่อความเร็ว
5. คลิก "Create New Project" และรอ 2-5 นาที

#### Step 3.2: รัน Database Schema
1. ใน Supabase Console ให้ไปที่ **SQL Editor**
2. คลิก "New Query"
3. Copy-paste เนื้อหาจาก `docs/database-schema.sql`
4. คลิก "Run" ที่มุมขวา
5. รอให้ completed ✅

#### Step 3.3: Enable Row Level Security (RLS)
1. ไปที่ **Authentication** → **Policies**
2. สำหรับแต่ละ table ให้ enable RLS
3. (หรือใช้ scripts ใน docs/rls-setup.sql)

#### Step 3.4: ได้รับ API Keys
1. ไปที่ **Settings** → **API**
2. Copy 2 ค่านี้:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. ตั้งค่า Environment Variables

สร้างไฟล์ `.env.local` ที่ root directory:

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 5. รัน Development Server

```bash
npm run dev
```

เปิด http://localhost:3000 ในเบราว์เซอร์

คุณจะเห็น:
```
▲ Next.js 14.1.0
- Local:        http://localhost:3000
```

## ✅ Testing Locally

### Test 1: Access Frontend
- เปิด http://localhost:3000
- ควรเห็นหน้า Login

### Test 2: Register Account
1. คลิก "สมัครสมาชิก"
2. กรอกข้อมูล:
   ```
   ชื่อ-นามสกุล: Test User
   อีเมล: test@example.com
   รหัสผ่าน: TestPassword123
   ```
3. คลิก "สมัครสมาชิก"
4. ควรมี success message

### Test 3: Login
1. ใส่อีเมลและรหัสผ่านที่สมัคร
2. คลิก "เข้าสู่ระบบ"
3. ควรเห็น Dashboard

### Test 4: Add Transaction
1. คลิก "บันทึกรายการ"
2. ใส่:
   ```
   ประเภท: รายรับ
   ชื่อรายการ: Test Income
   จำนวนเงิน: 1000
   ```
3. คลิก "บันทึก"
4. ควรเห็นข้อมูลอัปเดตบน Dashboard

## 🏗️ Build for Production

### Build Locally
```bash
npm run build
```

ะงม Check :
```bash
✓ Compiled successfully
✓ Linted successfully
✓ Type checking passed
```

### Run Production Build
```bash
npm run start
```

## 🚀 Deploy ไป Vercel

### Step 1: Push ไป GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy บน Vercel

#### Option A: ผ่าน Vercel Dashboard
1. ไปที่ https://vercel.com/dashboard
2. Sign in ด้วย GitHub
3. คลิก "New Project"
4. เลือก repository `watpaknam-accounting`
5. ตั้งค่า Environment:
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOi...
   ```
6. คลิก "Deploy"
7. รอ 2-3 นาที
8. ระบบจะให้ URL เช่น: `https://watpaknam-accounting.vercel.app`

#### Option B: ผ่าน Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 🔍 Verify Deployment

1. เปิด URL ที่ได้จาก Vercel
2. ทดสอบ:
   - ✅ สามารถสมัครได้
   - ✅ สามารถ login ได้
   - ✅ สามารถเพิ่มรายการได้
   - ✅ Dashboard แสดงข้อมูลได้

## 🐛 Troubleshooting

### Error: "Cannot find module '@supabase/supabase-js'"
```bash
# วิธีแก้
rm -rf node_modules package-lock.json
npm install
```

### Error: "NEXT_PUBLIC_SUPABASE_URL is undefined"
```bash
# วิธีแก้
# 1. ตรวจสอบไฟล์ .env.local มีค่าหรือไม่
# 2. Restart dev server: Ctrl+C แล้อ npm run dev
# 3. Hard refresh browser: Ctrl+Shift+R
```

### Error: "Connection refused" (Supabase)
```bash
# วิธีแก้
# 1. ตรวจสอบ Supabase project status
# 2. ลองสร้าง Supabase project ใหม่
# 3. Update credentials ใน .env.local
```

### Error: "Signup disabled" in Supabase
```bash
# วิธีแก้
# 1. ใน Supabase Console → Authentication → Policies
# 2. Enable "Disable sign-ups" OFF
```

## 📊 Database Management

### Backup Data
```bash
# Export from Supabase
1. ไปที่ Supabase Console → Backups
2. คลิก "Restore" แล้วเลือก version ที่ต้องการ
```

### Monitor Usage
```bash
# ดูการใช้งาน
1. Supabase Console → Stats
2. ดู database size, API calls
```

## 📚 Additional Resources

- Next.js Docs: https://nextjs.org/docs
- Supabase Docs: https://supabase.com/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Vercel Deploy: https://vercel.com/docs

## ✨ Next Steps

1. ✅ Installed locally
2. ✅ Deployed to Vercel
3. 📝 Customize branding
4. 🔒 Setup email notifications
5. 📊 Add more reports
6. 🎨 Customize colors

---

**Happy deploying! 🚀**
