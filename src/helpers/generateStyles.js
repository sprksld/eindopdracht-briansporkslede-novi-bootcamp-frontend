// this helper insert a bunch of style into the DOM to give every-nth child a unique color

import generateHslColors from "./generateHslColors";

function generateStyles(size, offset, spread) {
    if (offset === undefined) offset = 0;
    // ... om kleuren verder uit te spreiden (kleinere verschillen qua kleuren)

    offset = (size + ( offset % size)) % size; // negatieve en grote offsets verkleinen

    if (spread === undefined) spread = 0;
    // ... om volgorde te veranderen (niet altijd op rood beginnen dus)

    let styles = "";
    const darkColors = generateHslColors(50, 50, 0.9, size + spread);
    const liteColors = generateHslColors(50, 75, 1, size + spread);

    darkColors.map((color, index) => {
        if (index <= size) {
            const n = ((index + offset) % size) + 1;
            styles += `article:nth-of-type(${n}).workshop { border-left-color: ${color}; }\n `
                + `button:nth-of-type(${n}).workshop { background-color: ${color}; }\n`;
        }
        return true;
    });

    liteColors.map((color, index) => {
        if (index <= size) {
            const n = ((index + offset) % size) + 1;
            styles += `article:nth-of-type(${n}).workshop { background-color: ${color}; }\n`;
        }
        return true;
    });

    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

}

export default generateStyles;
