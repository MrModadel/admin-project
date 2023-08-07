// vite.config.js
import {
   resolve
} from 'path'
import {
   defineConfig
} from 'vite'

export default defineConfig({
   build: {
      rollupOptions: {
         input: {
            main: resolve(__dirname, 'index.html'),
            edit_lesson: resolve(__dirname, 'pages/edit-lesson/index.html')
         },
      },
   },
})