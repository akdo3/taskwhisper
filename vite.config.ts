import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // استبدلها بالمكون الخاص بك إذا كنت تستخدم إطار عمل آخر

// الإعدادات
export default defineConfig({
  base: "/repository-name/", // استبدل "repository-name" باسم المشروع الخاص بك
  plugins: [react()], // أضف أو عدل المكونات الإضافية حسب حاجتك
  server: {
    port: 3000, // المنفذ المحلي
    open: true, // افتح المتصفح تلقائيًا عند التشغيل
  },
  build: {
    outDir: "dist", // مكان وضع الملفات الناتجة بعد البناء
    sourcemap: true, // خريطة المصدر لتسهيل تتبع الأخطاء
  },
  resolve: {
    alias: {
      '@': '/src', // اختصار للوصول إلى المجلد "src"
    },
  },
});
