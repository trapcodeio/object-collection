import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["./index.ts", "./exports.ts", "./lodash.ts"],
    format: ["esm"],
    dts: false,
    splitting: false,
    bundle: false,
    treeshake: true,
    clean: true
});
