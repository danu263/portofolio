import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

console.log('Server-side API_KEY:', process.env); // This logs to the terminal
console.log('Server-side API_URL:', process.env.API_URL); // This logs to the terminal

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
});
