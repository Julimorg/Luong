import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
   server: {
    host: true,
    allowedHosts: true
  },
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  ssr: {
    // Khi dựng HTML tĩnh, Node tự resolve các gói này sẽ lỗi vì chúng phát
    // hành ESM không đầy đủ (import thẳng vào thư mục). Cho Vite bundle luôn
    // thay vì để Node xử lý thì hết lỗi ERR_UNSUPPORTED_DIR_IMPORT.
    noExternal: [
      '@mui/material',
      '@mui/system',
      '@mui/utils',
      '@mui/icons-material',
      '@mui/styled-engine',
      '@emotion/react',
      '@emotion/styled',
      'react-toastify',
      'framer-motion',
      'animejs',
    ],
  },
})
