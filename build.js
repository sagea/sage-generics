import esbuild from 'esbuild'
import glob from 'glob'


const renameExtensionPlugin = {
  name: 'Replace extensions',
  /** @param {esbuild.PluginBuild} build */
  setup(build) {
    build.onResolve({ filter: /\.ts$/ }, args => {
      console.log(args)
      if (args.importer)
        return { path: args.path.replace(/\.ts$/, '.js'), external: true }
    })
  },
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

