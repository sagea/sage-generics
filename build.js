import esbuild from 'esbuild'
import glob from 'glob'
import {writeFile} from 'fs/promises';
import { resolve } from 'path'


const renameExtensionPlugin = {
  name: 'Replace extensions',
  /** @param {esbuild.PluginBuild} build */
  setup(build) {
    build.onResolve({ filter: /\.ts$/ }, args => {
      if (args.importer)
        return { path: args.path.replace(/\.ts$/, '.js'), external: true }
    })
  },
}

const generateHTML = (paths) => {
  const htmlFile = `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
        ${
          paths
            .map(path => path.replace(/^src/, ''))
            .map(path => `<li><a href="${path}">${path}</a></li>`)
            .join('\n')
        }
      </body>
    </html>
  `
  writeFile(resolve(process.cwd(), 'dist/index.html'), htmlFile)
}

const results = glob.sync('src/**/*.ts', {
  ignore: ['**/__mocks__/**', '**/__tests__/**'],
})

esbuild.build({
  entryPoints: results,
  format: 'esm',
  bundle: true,
  outdir: 'dist',
  loader: {
    '.ts': 'ts'
  },
  plugins: [renameExtensionPlugin]
})
console.log(generateHTML(results))