import esbuild from 'esbuild'
import glob from 'glob'
import { resolve } from 'path'
import { writeFileSync } from 'fs';


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
  return `
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
.then(() => {
  writeFileSync(resolve(process.cwd(), 'dist/index.html'), generateHTML(results))
})


