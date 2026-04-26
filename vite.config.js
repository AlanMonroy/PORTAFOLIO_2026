/*import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        watch: {},
        outDir: 'wwwroot/js',
        emptyOutDir: false,
        rollupOptions: {
            input: 'JS/main.js',
            output: {
                entryFileNames: 'site.js'
            }
        }
    }
});*/
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        watch: {},
        outDir: 'wwwroot/js',
        emptyOutDir: false,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'JS_VITE/main.js'),
                index: resolve(__dirname, 'JS_VITE/index.js'),
                proyectos: resolve(__dirname, 'JS_VITE/proyectos.js')
            },
            output: {
                entryFileNames: '[name].js'
            }
        }
    }
});
