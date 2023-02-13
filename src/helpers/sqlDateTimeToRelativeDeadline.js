// show a relative date for the upcoming start or deadline

import sqlDateTimeToShortDate from "./sqlDateTimeToShortDate";

function sqlDateTimeToRelativeDeadline(dtStart, dtEnd) {
    const now = Date.now();
    const start = new Date(dtStart).getTime();
    const end = new Date(dtEnd).getTime();

    if ( now > end )
        return "voorbij";
    if ( now > start && now < end )
        return "tot " + sqlDateTimeToShortDate(dtEnd);
    return "vanaf " + sqlDateTimeToShortDate(dtStart);
}

export default sqlDateTimeToRelativeDeadline;