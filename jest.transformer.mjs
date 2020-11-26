import esbuild from 'esbuild'
import path from 'path'
import fs from 'fs';

// const nodeVersion = fs.readFileSync(__dirname + '/.nvmrc', 'utf8').trim().replace(/^v/, '');
const extToLoader = Object.freeze({
  '.js': 'js',
  '.jsx': 'jsx',
  '.ts': 'ts',
  '.tsx': 'tsx',
})
/** @type {import('@jest/transform').Transformer} */
const config = {
  
  process(src, filename, ...otherArgs) {
    const { ext } = path.parse(filename)
    console.log(src, filename, ...otherArgs, ext);
    const result = esbuild.transformSync(src, {
      // target: `node${nodeVersion}`,
      tsconfigRaw: JSON.stringify(tsconfig),
      format: 'esm',
      loader: extToLoader[ext],
    })
    console.log('code yo', result.code)
    return src;
  },
};

export default config;