module.export = {};
module.exports = {
    friendlyName: "To pascal case",
    description:
        'Converts a string to PascalCase (e.g., "hello-world" -> "HelloWorld").',

    inputs: {
        str: {
            type: "string",
            required: true,
            description:
                "The string to convert (expects kebab-case or space-separated).",
            example: "hello-world",
        },
    },

    exits: {
        success: {
            description: "The converted PascalCase string.",
        },
    },

    fn: async function (inputs, exits) {
        if (!inputs.str) {
            return exits.success("");
        }

        const parts = inputs.str.includes("-")
            ? inputs.str.split("-")
            : inputs.str.split(" ");

        const pascalCased = parts
            .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
            .join("");

        return exits.success(pascalCased);
    },
};
