// this is a little helper that shows the given gender as an emoji sign

function gender(gender) {
    if (gender === undefined)
        return;
    switch (gender.toLowerCase()) {
        case 'm':
            return '♂ ';
        case 'v':
            return '♀ ';
        case 'x':
            return 'x ';
        default:
            return;
    }
}

export default gender;