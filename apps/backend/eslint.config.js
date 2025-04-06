import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import nodePlugin from "eslint-plugin-n";

export default defineConfig([
  {
    ignores: ["**/dev/*", "**/dist/*", "**/tests/*", "tsconfig.json"],
  },
  { files: ["**/src/*.{js,mjs,cjs,ts}"] },
  {
    files: ["**/src/*.{js,mjs,cjs,ts}"],
    languageOptions: { globals: globals.node },
  },
  {
    files: ["**/src/*.{js,mjs,cjs,ts}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  tseslint.configs.recommended,
  nodePlugin.configs["flat/recommended-script"],
  {
    rules: {
      "n/no-missing-import": [
        "error",
        {
          ignoreTypeImport: true,
          tryExtensions: [".d.ts"],
        },
      ],
    },
  },
]);
