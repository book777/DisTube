import type { Options } from "tsup";

export const tsup: Options = {
  clean: true,
  dts: true,
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  minify: false,
  keepNames: true,
  skipNodeModulesBundle: true,
  sourcemap: true,
  platform: "node",
  tsconfig: "./tsconfig.tsup.json"
};
