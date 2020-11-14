module.exports = api => {
  const isTest = api.env('test')
  const babelPresetEnvOptions = isTest
    ? {
        targets: {
          node: 'current',
        },
      }
    : {
        targets: {
          esmodules: true,
        },
        modules: false,
      }

  const ignore = isTest
    ? []
    : [
        '**/*.d.ts',
        'src/**/__mocks__/',
        'src/**/__tests__/',
        'src/**/__snapshots__',
      ]
  const plugins = isTest
    ? []
    : [['babel-plugin-add-import-extension', { extension: 'mjs' }]]
  return {
    presets: [
      ['@babel/preset-env', babelPresetEnvOptions],
      '@babel/preset-typescript',
    ],
    plugins,
    ignore,
  }
}
