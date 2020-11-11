module.exports = api => {
  const isTest = api.env('test')
  console.log('isTest', api.env())
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

  return {
    presets: [
      ['@babel/preset-env', babelPresetEnvOptions],
      '@babel/preset-typescript',
    ],
    plugins: [
      ["babel-plugin-add-import-extension", { extension: "mjs" }]
    ],
    ignore,
  }
}
