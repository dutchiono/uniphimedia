module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@uniphimedia/shared-types': '../../packages/shared-types/src/index.ts',
            '@uniphimedia/room-modules': '../../packages/room-modules/src/index.ts',
            '@uniphimedia/systems-engine': '../../packages/systems-engine/src/index.ts',
            '@uniphimedia/materials-library': '../../packages/materials-library/src/index.ts',
          },
        },
      ],
    ],
  }
}