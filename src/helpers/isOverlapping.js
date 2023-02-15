// this tiny little helper tells whether two ranges overlap or not

function isOverlapping(myStart, myEnd, yourStart, yourEnd) {
    return ! ( ( yourStart > myEnd ) || ( myStart > yourEnd ) );
}

export default isOverlapping;