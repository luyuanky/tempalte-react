import { PluginOption } from 'vite';

/** 排除某些文件的 Sourcemap 生成 */
const excludeSourcemap: PluginOption = {
  name: 'exclude-sourcemap',
  generateBundle(_, bundle) {
    for (const fileName in bundle) {
      // 检查是否为需要排除的文件, 这里写死了文件名带 -legacy-
      if (fileName.includes('-legacy-')) {
        const chunk = bundle[fileName];
        if (chunk.type === 'chunk' && chunk.map) {
          chunk.map = undefined;
        }
      }
    }
  },
};

export default excludeSourcemap;
