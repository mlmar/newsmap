import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    server: {
        port: 3000,
        host: '0.0.0.0',
        strictPort: true
    },
    plugins: [
        vue(),
        vueDevTools(),
        tailwindcss()
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
    optimizeDeps: {
        include: ['leaflet', '@vue-leaflet/vue-leaflet'] // Add your leaflet-related packages here
    },
    build: {
        outDir: '../server/dist',
        emptyOutDir: true,
        commonjsOptions: {
            include: [/leaflet/, /node_modules/] // Ensure node_modules/leaflet is included
        }

    },

})
