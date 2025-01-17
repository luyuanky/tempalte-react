import path from 'path';
import raw from 'vite-plugin-raw';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { viteExternalsPlugin } from 'vite-plugin-externals';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import config from './config/config.json';
import { excludeSourcemap } from './vite-plugin';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const plugin = [
    command === 'serve'
      ? react()
      : viteExternalsPlugin({
          react: 'React',
          'react-dom': 'ReactDOM',
        }),
  ];
  return {
    // base: config.public,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        config: path.resolve(__dirname, 'config'),
      },
    },
    plugins: [
      raw({
        match: /\.svg$/,
        exclude: [],
      }),
      createHtmlPlugin({
        minify: {
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
          collapseWhitespace: true,
        },
        inject: {
          data: { config },
        },
      }),
      legacy({
        // 设置目标浏览器，browserslist 配置语法
        targets: ['Chrome >= 45, ie >= 10, > 1%'],
        modernPolyfills: [
          'es.string.replace',
          'esnext.string.replace-all',
          'es.object.from-entries',
          'es.global-this',
          'es.promise.all-settled',
        ],
        polyfills: [
          'es.string.replace',
          'esnext.string.replace-all',
          'es.object.from-entries',
          'es.global-this',
          'es.promise.all-settled',
        ],
      }),
      excludeSourcemap,
      ...plugin,
    ],
    css: {
      modules: {
        localsConvention: 'camelCase',
      },
    },
    server: {
      open: true,
      port: 12000,
      host: '0.0.0.0',
    },
    // 变量注入
    define: {
      // 'process.env.RELEASE_VERSION': JSON.stringify(releaseVersion),
    },
    build: {
      // 正式环境生成 Source Maps
      sourcemap: mode === 'prod',
    },
    esbuild: {
      drop: mode === 'prod' ? ['console', 'debugger'] : [],
    },
  };
});
