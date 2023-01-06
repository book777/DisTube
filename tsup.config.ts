import type { Options } from "tsup";

export const tsup: Options = {
  clean: true,
  dts: true,
  entry: ["src/index.ts"],
  splitting: true, // Do not create each "require" import for separate source file
  format: ["cjs", "esm"],
  minify: false,
  keepNames: true,
  skipNodeModulesBundle: true,
  sourcemap: true,
  target: "es2021",
};
