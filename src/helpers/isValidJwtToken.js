// this helper tells whether or not the jwt parameter is still valid according to the time of the host it's on

import jwt_decode from "jwt-decode";

function isValidJwtToken(jwt) {
    const decodedToken = jwt_decode(jwt);
    return decodedToken.exp - Date.now() / 1000 > 0;
}

export default isValidJwtToken;