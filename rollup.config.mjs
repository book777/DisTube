import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: "src/index.ts",
  plugins: [
    typescript({module: "ESNext"}),
    json(),
    commonjs(),
    //resolve()
  ],
  output: [
    {
      file: `dist/index.js`,
      format: 'cjs',
      sourcemap: true,
      exports: 'auto',
    },
    {
      file: `dist/index.mjs`,
      format: 'es',
      sourcemap: true,
      exports: 'auto',
    },
  ]
};
