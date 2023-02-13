import path2url from "./path2url";

function endpoint2url(endpoint) {
    return path2url("/api/v1".concat(endpoint));
}

export default endpoint2url;