# Particle Auth 第三方登入範例

## 功能特色

- 支援多種第三方登入（Email、Google、Twitter、GitHub）
- 顯示連接狀態資訊

## 設定步驟

### 1. 安裝套件
```bash
npm install @particle-network/authkit @particle-network/wallet viem@2
```

### 2. 設定環境變數
1. 前往 [Particle Dashboard](https://dashboard.particle.network/)
2. 建立專案並取得憑證
3. 複製 `.env.example` 為 `.env.local`
4. 填入你的憑證：
```
NEXT_PUBLIC_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_CLIENT_KEY=your_client_key_here
NEXT_PUBLIC_APP_ID=your_app_id_here
```

### 3. 執行專案
```bash
npm run dev
```

## 檔案結構

- `AuthKit.tsx` - Particle Auth 設定元件
- `LoginComponent.tsx` - 主要的登入介面元件
- `App.tsx` - 應用程式入口點

## 使用方式

1. 點擊「使用第三方登入」按鈕
2. 選擇登入方式（Email、Google、Twitter、GitHub）
3. 完成登入後會顯示使用者資訊
4. 可點擊「登出」按鈕登出

## 支援的登入方式

- Email
- Google
- Twitter  
- GitHub
