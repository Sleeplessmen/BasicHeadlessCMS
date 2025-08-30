module.exports = {
    root: true,
    env: {
        node: true,
        es2022: true, // thay cho ecmaVersion thủ công
    },
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    globals: {
        Promise: "readonly",
        sails: "readonly",
        _: "readonly",
    },
    extends: [
        "eslint:recommended",
        "plugin:prettier/recommended", // tắt rule style mâu thuẫn, bật prettier
    ],
    rules: {
        // --- Logic & Best Practices ---
        "block-scoped-var": "error",
        "callback-return": [
            "error",
            ["done", "proceed", "next", "onwards", "callback", "cb"],
        ],
        camelcase: ["warn", { properties: "always" }],
        "comma-style": ["warn", "last"],
        eqeqeq: ["error", "always"],
        "handle-callback-err": "error",
        "linebreak-style": ["error", "windows"],
        "no-dupe-keys": "error",
        "no-duplicate-case": "error",
        "no-extra-semi": "warn",
        "no-labels": "error",
        "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
        "no-redeclare": "warn",
        "no-return-assign": ["error", "always"],
        "no-sequences": "error",
        "no-trailing-spaces": "warn",
        "no-unexpected-multiline": "warn",
        "no-unreachable": "warn",
        "no-unused-vars": [
            "warn",
            {
                caughtErrors: "all",
                caughtErrorsIgnorePattern: "^unused($|[A-Z].*$)",
                argsIgnorePattern: "^unused($|[A-Z].*$)",
                varsIgnorePattern: "^unused($|[A-Z].*$)",
            },
        ],
        "no-use-before-define": ["error", { functions: false }],
        "one-var": ["warn", "never"],
        "prefer-arrow-callback": ["warn", { allowNamedFunctions: true }],
        semi: ["warn", "always"],
        "semi-spacing": ["warn", { before: false, after: true }],
        "semi-style": ["warn", "last"],

        // --- Style (giao cho Prettier lo) ---
        indent: "off",
        quotes: "off",
    },
};
