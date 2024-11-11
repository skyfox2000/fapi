// vite.config.js 或 vite.config.ts
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import dts from "vite-plugin-dts";

export default defineConfig({
   plugins: [
      dts({
         outDir: "lib",
         insertTypesEntry: true,
         rollupTypes: true,
         copyDtsFiles: true,
      }),
   ],
   resolve: {
      alias: {
         "@": fileURLToPath(new URL("./src", import.meta.url)), // 添加路径别名
      },
   },
   build: {
      outDir: "lib",
      lib: {
         entry: "src/index.ts", // 指定入口文件
         fileName: (format) => `fapi.${format}.js`, // 输出文件名模板
      },
      rollupOptions: {
         // 外部化处理那些你并不打算打包进库的依赖
         external: ["crypto-js"],
         // 如果你使用 TypeScript，则需要提供类型声明文件的输出路径
         output: [
            {
               globals: { "crypto-js": "CryptoJS" }, // 这里指定 crypto-js 的全局变量名为 CryptoJS
               extend: false,
               // 提供多个模块格式
               format: "es",
            },
         ],
      },
   },
});
