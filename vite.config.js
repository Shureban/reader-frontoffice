import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    server: {
        port: 3211,
        allowedHosts: ['751b-188-72-203-164.ngrok-free.app'],
    },
    preview: {
        port: 3211,
        allowedHosts: ['beereader.online'],
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
