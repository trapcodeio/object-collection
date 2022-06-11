import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["./index.ts", "./exports.ts", "./lodash.ts"],
    format: ["esm"],
    dts: false,
    splitting: true,
    bundle: true,
    treeshake: false,
    clean: true
});
