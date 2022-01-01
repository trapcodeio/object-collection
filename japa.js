// Load ts-node
require("ts-node").register();
const { configure } = require("japa");

configure({
    files: ["tests/index.spec.ts", "tests/exports.spec.ts", "tests/own.spec.ts"]
});
