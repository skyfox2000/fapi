// vite.config.js 或 vite.config.ts
import { defineConfig } from "vite";
import path from "path";
import dts from "vite-plugin-dts";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
   plugins: [
      dts({
         outDir: "lib",
         insertTypesEntry: true,
         rollupTypes: true,
         copyDtsFiles: true,
         include: ["src/**/*.ts", "src/**/*.d.ts"],
         exclude: ["node_modules", "lib"],
         compilerOptions: {
            emitDeclarationOnly: true,
            declaration: true,
            declarationDir: "lib",
         }
      }),
      visualizer({
         emitFile: false,
         filename: "visualizer.html",
         open: false,
      }),
   ],
   resolve: {
      alias: {
         "@": path.resolve("./src"),
      },
      extensions: [".js", ".ts", ".vue", "json"],
   },
   build: {
      outDir: "lib",
      assetsDir: "assets",
      lib: {
         entry: "src/index.ts", // 指定入口文件
         fileName: (format) => `fapi.${format}.js`, // 输出文件名模板
      },
      rollupOptions: {
         // 外部化处理那些你并不打算打包进库的依赖
         external: ["vue", "axios", "crypto-js", "vue-m-message"],
         // 如果你使用 TypeScript，则需要提供类型声明文件的输出路径
         output: [
            {
               globals: { "crypto-js": "CryptoJS" }, // 这里指定 crypto-js 的全局变量名为 CryptoJS
               extend: false,
               // 提供多个模块格式
               format: "es",
               chunkFileNames: "static/modules/[name]-[hash].js",
            },
         ],
      },
      minify: true, // 开启压缩
   },
});
