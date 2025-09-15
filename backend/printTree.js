const fs = require("fs");
const path = require("path");

function printTree(dir, prefix = "") {
    const items = fs.readdirSync(dir, { withFileTypes: true });

    items.forEach((item, index) => {
        const isLast = index === items.length - 1;
        console.log(`${prefix}${isLast ? "└── " : "├── "}${item.name}`);

        if (item.isDirectory()) {
            const newPrefix = prefix + (isLast ? "    " : "│   ");
            printTree(path.join(dir, item.name), newPrefix);
        }
    });
}

printTree("E:/WebApp/Task1/backend/api");
