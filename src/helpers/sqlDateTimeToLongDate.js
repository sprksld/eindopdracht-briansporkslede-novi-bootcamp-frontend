// this helper converts a sqlDate to a long readable string in Dutch

function sqlDateTimeToLongDate(isoFormatDateString) {
    const dateParts = isoFormatDateString.split("-");
    const jsDate = new Date(dateParts[0], dateParts[1] - 1
        , dateParts[2].substr(0, 2)
        , dateParts[2].substr(3, 2)
        , dateParts[2].substr(6, 2)
        , dateParts[2].substr(9, 2)
    );

    let myFormat = jsDate.toLocaleDateString("nl-NL", {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
    myFormat += " om ";
    myFormat += jsDate.toLocaleTimeString("nl-NL", {hour: "2-digit", minute: "2-digit"});
    return myFormat;
}

export default sqlDateTimeToLongDate;