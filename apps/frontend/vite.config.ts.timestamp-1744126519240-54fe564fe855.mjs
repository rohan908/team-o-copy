// vite.config.ts
import { defineConfig } from "file:///Users/hudsonk/team-o-copy/.yarn/__virtual__/vite-virtual-631674d411/0/cache/vite-npm-6.2.3-3b400d2412-ba6ad7e83e.zip/node_modules/vite/dist/node/index.js";
import react from "file:///Users/hudsonk/team-o-copy/.yarn/__virtual__/@vitejs-plugin-react-swc-virtual-3e8bccf326/0/cache/@vitejs-plugin-react-swc-npm-3.8.1-68d4bcd3e1-ef431a4132.zip/node_modules/@vitejs/plugin-react-swc/index.mjs";
import eslint from "file:///Users/hudsonk/team-o-copy/.yarn/__virtual__/vite-plugin-eslint-virtual-1f4e08d8c3/0/cache/vite-plugin-eslint-npm-1.8.1-844ad445f5-123c3dcf82.zip/node_modules/vite-plugin-eslint/dist/index.mjs";
import tailwindcss from "file:///Users/hudsonk/team-o-copy/.yarn/__virtual__/@tailwindcss-vite-virtual-3619a7e21f/0/cache/@tailwindcss-vite-npm-4.0.17-074c9bb3f2-9baaa79b9c.zip/node_modules/@tailwindcss/vite/dist/index.mjs";
import * as process from "process";
var vite_config_default = defineConfig({
  resolve: {
    preserveSymlinks: true
  },
  server: {
    host: "localhost",
    port: parseInt(process.env.FRONTEND_PORT),
    proxy: {
      "/api": process.env.BACKEND_URL
    },
    watch: {
      usePolling: true
    }
  },
  build: {
    outDir: "build"
  },
  cacheDir: ".vite",
  plugins: [
    tailwindcss(),
    react(),
    eslint({
      exclude: ["**/node_modules/**", "**/.*/**", "**/.vite/**"],
      failOnWarning: false,
      failOnError: false
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlUm9vdCI6ICIvVXNlcnMvaHVkc29uay90ZWFtLW8tY29weS9hcHBzL2Zyb250ZW5kLyIsCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2h1ZHNvbmsvdGVhbS1vLWNvcHkvYXBwcy9mcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2h1ZHNvbmsvdGVhbS1vLWNvcHkvYXBwcy9mcm9udGVuZC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvaHVkc29uay90ZWFtLW8tY29weS9hcHBzL2Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJztcbmltcG9ydCBlc2xpbnQgZnJvbSAndml0ZS1wbHVnaW4tZXNsaW50JztcbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tICdAdGFpbHdpbmRjc3Mvdml0ZSc7XG5pbXBvcnQgKiBhcyBwcm9jZXNzIGZyb20gJ3Byb2Nlc3MnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICByZXNvbHZlOiB7XG4gICAgICAgIHByZXNlcnZlU3ltbGlua3M6IHRydWUsXG4gICAgfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgICAgaG9zdDogJ2xvY2FsaG9zdCcsXG4gICAgICAgIHBvcnQ6IHBhcnNlSW50KHByb2Nlc3MuZW52LkZST05URU5EX1BPUlQpLFxuICAgICAgICBwcm94eToge1xuICAgICAgICAgICAgJy9hcGknOiBwcm9jZXNzLmVudi5CQUNLRU5EX1VSTCxcbiAgICAgICAgfSxcbiAgICAgICAgd2F0Y2g6IHtcbiAgICAgICAgICAgIHVzZVBvbGxpbmc6IHRydWUsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgICBvdXREaXI6ICdidWlsZCcsXG4gICAgfSxcbiAgICBjYWNoZURpcjogJy52aXRlJyxcbiAgICBwbHVnaW5zOiBbXG4gICAgICAgIHRhaWx3aW5kY3NzKCksXG4gICAgICAgIHJlYWN0KCksXG4gICAgICAgIGVzbGludCh7XG4gICAgICAgICAgICBleGNsdWRlOiBbJyoqL25vZGVfbW9kdWxlcy8qKicsICcqKi8uKi8qKicsICcqKi8udml0ZS8qKiddLFxuICAgICAgICAgICAgZmFpbE9uV2FybmluZzogZmFsc2UsXG4gICAgICAgICAgICBmYWlsT25FcnJvcjogZmFsc2UsXG4gICAgICAgIH0pLFxuICAgIF0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFMsU0FBUyxvQkFBb0I7QUFDdlUsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sWUFBWTtBQUNuQixPQUFPLGlCQUFpQjtBQUN4QixZQUFZLGFBQWE7QUFHekIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUztBQUFBLElBQ0wsa0JBQWtCO0FBQUEsRUFDdEI7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLE1BQU0sU0FBaUIsWUFBSSxhQUFhO0FBQUEsSUFDeEMsT0FBTztBQUFBLE1BQ0gsUUFBZ0IsWUFBSTtBQUFBLElBQ3hCO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDSCxZQUFZO0FBQUEsSUFDaEI7QUFBQSxFQUNKO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDSCxRQUFRO0FBQUEsRUFDWjtBQUFBLEVBQ0EsVUFBVTtBQUFBLEVBQ1YsU0FBUztBQUFBLElBQ0wsWUFBWTtBQUFBLElBQ1osTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0gsU0FBUyxDQUFDLHNCQUFzQixZQUFZLGFBQWE7QUFBQSxNQUN6RCxlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsSUFDakIsQ0FBQztBQUFBLEVBQ0w7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
