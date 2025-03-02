import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    server: {
        port: 3211
    },
    preview: {
        allowedHosts: 'all',
    },
    css: {
        preprocessorOptions: {
            less: {
                math: "always",
                relativeUrls: true,
                javascriptEnabled: true
            },
        },
    }
})
