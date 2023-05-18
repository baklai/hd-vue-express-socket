import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// export default defineConfig(({ command }) => {
//   return {
//     plugins: [vue(), vueJsx()],
//     resolve: {
//       alias: {
//         '@': fileURLToPath(new URL('./src', import.meta.url))
//       }
//     },
//     envDir: '../',
//     build: {
//       outDir: '../dist',
//       emptyOutDir: '../dist'
//     }
//   };
// });

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  envDir: '../',
  build: {
    outDir: '../dist',
    emptyOutDir: '../dist'
  }
  // esbuild: { loader: { '.js': '.jsx' } }
});
