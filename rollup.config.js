import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default [
  { // CJS and ESM
    input: 'src/index.js',
    output: [
      {
        file: 'dist/bundle.cjs.js',
        format: 'cjs',
      },
      {
        file: 'dist/bundle.esm.js',
        format: 'esm',
      },
    ],
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**',
      }),
      terser({
        output: {
          comments: 'all',
        },
        mangle: false,
      }),
    ],
  },
  { // UMD
    input: 'src/index.js',
    output: {
      name: 'videxMath',
      file: 'dist/bundle.umd.js',
      format: 'umd',
    },
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**',
      }),
      terser({
        mangle: false,
      }),
    ],
  },
];
