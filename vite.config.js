import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        watch: {},
        outDir: 'wwwroot/js',
        emptyOutDir: false,
        rollupOptions: {
            input: 'Frontend/main.js',
            output: {
                entryFileNames: 'site.js'
            }
        }
    }
});
