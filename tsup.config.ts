import { defineConfig } from "tsup";

export default defineConfig((_options) => {
    return {
        entry: ["./index.ts", "./exports.ts", "./lodash.ts"],
        format: ["cjs"],
        // minify: !options.watch,
        // outExtension: () => ({ js: `.js` }),
        dts: false,
        splitting: true,
        bundle: false,
        treeshake: false,
        clean: true
    };
});
