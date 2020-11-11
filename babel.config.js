export default api => {
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

  return {
    presets: [
      ['@babel/preset-env', babelPresetEnvOptions],
      '@babel/preset-typescript',
    ],
    plugins: [],
    ignore,
  }
}
