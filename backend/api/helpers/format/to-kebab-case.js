module.exports = {
    friendlyName: "To kebab case",
    description:
        'Converts a string to kebab-case (e.g., "Hello World" -> "hello-world").',

    inputs: {
        str: {
            type: "string",
            required: true,
            description: "The string to convert.",
            example: "My Awesome String",
        },
    },

    exits: {
        success: {
            description: "The converted kebab-case string.",
        },
    },

    fn: async function (inputs, exits) {
        if (!inputs.str) {
            return exits.success("");
        }

        const kebabCased = inputs.str
            .match(
                /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
            )
            .map((x) => x.toLowerCase())
            .join("-");

        return exits.success(kebabCased);
    },
};
