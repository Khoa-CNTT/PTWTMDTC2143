import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,  // Đảm bảo cổng này đúng
    host: 'localhost',  // Địa chỉ IP hoặc tên miền của máy chủ
    open: true,  // Tự động mở trình duyệt khi chạy
  },
})
