import {defineConfig} from 'vite';

export default defineConfig({
  base: './',
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return; // "use client" in motion's ESM build
        warn(warning);
      },
      output: {manualChunks: {vendor: ['react', 'react-dom', 'motion/react', 'lucide-react']}}
    }
  }
});
