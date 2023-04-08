module.exports = {
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      {
        jsx: {
          compositionAPI: true,
        },
      },
    ],
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: '../packages/theme-chalk/src',
        ext: '.scss',
      },
    ],
    [
      'transform-imports',
      {
        lodash: {
          transform: 'lodash/${member}',
          preventFullImport: true,
        },
      },
    ],
  ],
}
