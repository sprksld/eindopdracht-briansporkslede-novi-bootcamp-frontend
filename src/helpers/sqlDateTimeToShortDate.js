// this helper converts a sqlDate to a short readable string in Dutch

function sqlDateTimeToShortDate(isoFormatDateString) {
    if ( typeof isoFormatDateString !== "string") return;
    const dateParts = isoFormatDateString.split("-");
    const jsDate = new Date(dateParts[0], dateParts[1] - 1
        , dateParts[2].substr(0, 2)
        , dateParts[2].substr(3, 2)
        , dateParts[2].substr(6, 2)
        , dateParts[2].substr(9, 2)
    );

    let myFormat = jsDate.toLocaleDateString( "nl-NL", { weekday: "short", day: "2-digit", month: "2-digit", year: "numeric"});
    // myFormat += " om ";
    // myFormat += jsDate.toLocaleTimeString( "nl-NL", { hour: "2-digit", minute: "2-digit"});
    return myFormat;
}

export default sqlDateTimeToShortDate;
