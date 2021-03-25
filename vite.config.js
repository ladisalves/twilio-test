import legacy from '@vitejs/plugin-legacy'
import reactRefresh from '@vitejs/plugin-react-refresh'

/**
 * https://vitejs.dev/config/
 * @type { import('vite').UserConfig }
 */
export default {
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    reactRefresh(),
  ],
  server: {
    hmr: {
      port: 443,
    }
  }
}
