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
    // console.log(darkColors);


    // TODO :
    // als er meer dan 9 a 10 kleuren nodig zijn (of bij een hoge spread), dan is het lastiger om de kleuren van elkaar te onderscheiden.
    // misschien is het handig om een minimum "delta" in te stellen ...
    // of misschien is het handig om dan automatisch het kleuren spectrum een 2e keer te doorlopen met een andere alpha of lightness ....

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

    // console.log(styles);
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

}

export default generateStyles;