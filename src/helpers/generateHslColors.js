// this nifty helper generates an array of colors, spread evenly over the entire color spectrum

function generateHslColors(saturation, lightness, alpha, amount) {
    let colors = [];
    let steps = 360 / amount;

    for (let i = 0; i < amount; i++) {
        let hue = Math.round(i * steps);
        colors.push(`hsl(${hue} ${saturation}% ${lightness}% / ${alpha})`);
    }

    return colors;
}

export default generateHslColors;