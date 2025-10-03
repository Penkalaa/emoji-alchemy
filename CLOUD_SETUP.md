# 🌐 Cloud Storage Setup Guide

Bu oyun şu anda **localStorage** kullanıyor (sadece kendi cihazında level pack'leri görebilirsin). 

**Gerçek cloud storage** için aşağıdaki adımları takip et:

## 🚀 Supabase Setup (Ücretsiz)

### 1. Supabase Account Oluştur
- [supabase.com](https://supabase.com) → Sign up (ücretsiz)
- Yeni proje oluştur

### 2. Database Table Oluştur
Supabase → SQL Editor → New Query → Aşağıdaki SQL'i kopyala yapıştır:

CREATE TABLE level_packs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  filename TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL,
  total_levels INTEGER NOT NULL,
  level_data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address TEXT
);

-- Enable Row Level Security
ALTER TABLE level_packs ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read" ON level_packs
  FOR SELECT USING (true);

-- Allow public insert
CREATE POLICY "Allow public insert" ON level_packs
  FOR INSERT WITH CHECK (true);

**NOT**: ``` işaretlerini kopyalama, sadece SQL komutlarını!

### 3. Netlify Environment Variables
Netlify Dashboard → Site Settings → Environment Variables:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

### 4. Deploy & Test
- Git push → Netlify auto-deploy
- Admin editor'da level pack oluştur
- Başka cihazdan aynı siteye gir → Level pack'ini görebilmelisin!

## 🎯 Sonuç

✅ **Şu anda**: localStorage (sadece sen görürsün)  
🌐 **Supabase ile**: Herkes görür, gerçek cloud storage!

## 🔧 Alternative Options

- **Airtable**: Spreadsheet-like database
- **Firebase**: Google's database service  
- **PlanetScale**: MySQL-compatible
- **Netlify Forms**: Simple form submissions

Supabase en kolay ve ücretsiz seçenek! 🎉
