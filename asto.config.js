const { nodeExternalsPlugin } = require('esbuild-node-externals');
const esbuild = require('./asto.esbuild');

const repo =
  (name) =>
  (input, output, opts = {}) =>
    [
      {
        input: `packages/${name}/src/${input}`,
        output: `packages/${name}/dist/${output}.mjs`,
        /**
         * @type {import("esbuild").BuildOptions}
         */
        options: {
          ...opts,

          plugins: nodeExternalsPlugin({
            packagePath: `packages/${name}/package.json`,
            devDependencies: true,
          }),
          format: 'esm',
        },
      },
      {
        input: `packages/${name}/src/${input}`,
        output: `packages/${name}/dist/${output}.js`,
        /**
         * @type {import("esbuild").BuildOptions}
         */
        options: {
          ...opts,

          plugins: nodeExternalsPlugin({
            packagePath: `packages/${name}/package.json`,
            devDependencies: true,
          }),
          format: 'cjs',
        },
      },
    ];

const repos = {
  core: repo('zeto'),
};

module.exports = [
  {
    // core packages
    loader: esbuild,

    entryPoints: [...repos.core('index.ts', 'index')],
  },
];
