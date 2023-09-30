const { nodeExternalsPlugin } = require('esbuild-node-externals');
const esbuild = require('./asto.esbuild');

const repo =
  (name) =>
  (input, output, opts = {}) => ({
    input: `packages/${name}/src/${input}`,
    output: `packages/${name}/dist/${output}`,
    options: {
      ...opts,
      plugins: nodeExternalsPlugin({
        packagePath: `packages/${name}/package.json`,
        devDependencies: true,
      }),
    },
  });

const repos = {
  core: repo('zeto'),
};

module.exports = [
  {
    // core packages
    loader: esbuild,

    entryPoints: [repos.core('index.ts', 'index.js')],
  },
];
