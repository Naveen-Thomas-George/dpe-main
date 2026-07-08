import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "next/image": path.resolve(__dirname, "./src/lib/next-mocks/Image.tsx"),
      "next/dynamic": path.resolve(__dirname, "./src/lib/next-mocks/dynamic.tsx"),
    },
  },
})
