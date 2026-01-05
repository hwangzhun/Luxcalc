import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { minify } from 'html-minifier-terser';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      root: process.cwd(),
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        // HTML 压缩插件
        {
          name: 'html-minify',
          enforce: 'post',
          async generateBundle(options, bundle) {
            // 查找 HTML 文件
            const htmlFiles = Object.keys(bundle).filter(
              (id) => bundle[id].type === 'asset' && id.endsWith('.html')
            );
            
            // 并行处理所有 HTML 文件
            await Promise.all(
              htmlFiles.map(async (id) => {
                const chunk = bundle[id];
                if (chunk.type === 'asset' && typeof chunk.source === 'string') {
                  // 压缩 HTML
                  chunk.source = await minify(chunk.source, {
                    // 删除注释（包括 HTML 注释和条件注释）
                    removeComments: true,
                    removeCommentsFromCDATA: true,
                    // 忽略某些注释（如 IE 条件注释）
                    ignoreCustomComments: [/^!/],
                    // 删除空白字符
                    collapseWhitespace: true,
                    // 删除多余的空白
                    trimCustomFragments: true,
                    // 删除属性周围的引号（如果可能）
                    removeAttributeQuotes: false, // 保持引号以确保兼容性
                    // 删除空属性
                    removeEmptyAttributes: true,
                    // 删除可选标签
                    removeOptionalTags: false, // 保持标签以确保兼容性
                    // 删除冗余属性
                    removeRedundantAttributes: true,
                    // 删除 script 标签的 type="text/javascript"
                    removeScriptTypeAttributes: true,
                    // 删除 style 标签的 type="text/css"
                    removeStyleLinkTypeAttributes: true,
                    // 压缩空白字符
                    collapseBooleanAttributes: true,
                    // 使用最短的布尔属性
                    useShortDoctype: true,
                    // 压缩内联 CSS
                    minifyCSS: true,
                    // 压缩内联 JavaScript
                    minifyJS: {
                      compress: {
                        drop_console: true,
                        drop_debugger: true,
                      },
                      mangle: true,
                    },
                  });
                }
              })
            );
          },
        },
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        outDir: 'dist',
        emptyOutDir: true,
        // 启用压缩和混淆
        minify: 'terser', // 使用 terser 获得更好的混淆效果，也可以使用 'esbuild'（更快但混淆程度较低）
        // 压缩选项
        terserOptions: {
          compress: {
            // 删除 console 和 debugger
            drop_console: true,
            drop_debugger: true,
            // 删除未使用的代码
            dead_code: true,
            // 优化条件表达式
            conditionals: true,
            // 优化 if 语句
            if_return: true,
            // 合并连续的 var 声明
            join_vars: true,
            // 优化循环
            loops: true,
            // 删除未使用的函数参数
            unused: true,
          },
          format: {
            // 删除所有注释
            comments: false,
            // 美化输出（设置为 false 以获得更小的文件）
            beautify: false,
          },
          mangle: {
            // 混淆变量名和函数名
            toplevel: true,
            // 混淆属性名（谨慎使用，可能破坏代码）
            properties: false,
          },
        },
        // 代码分割配置
        rollupOptions: {
          output: {
            // 手动代码分割
            manualChunks: {
              // 将 React 相关代码单独打包
              'react-vendor': ['react', 'react-dom'],
            },
            // 压缩输出文件名
            chunkFileNames: 'assets/[name]-[hash].js',
            entryFileNames: 'assets/[name]-[hash].js',
            assetFileNames: 'assets/[name]-[hash].[ext]',
          },
        },
        // 生成 source map（生产环境建议关闭以减小文件大小）
        sourcemap: false,
        // 启用 CSS 代码压缩
        cssMinify: true,
        // 报告压缩后的大小
        reportCompressedSize: true,
        // 块大小警告限制（KB）
        chunkSizeWarningLimit: 1000,
      }
    };
});
