import globals from "globals";
import tseslint from "typescript-eslint";


export default [
  {
    files: ["**/*.js"], languageOptions: { sourceType: "commonjs" }, rules: {
      "prettier/prettier": [
        {
          endOfLine: "auto",
          severity: "error", // Update severity to "error"
        }
      ]
    }
  },
  { languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended,

];  