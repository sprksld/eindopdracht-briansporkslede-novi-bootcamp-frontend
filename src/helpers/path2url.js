// this tiny helper put localhost and portnummer in front of a path; to easily switch the port number

function path2url( path ) {
    return "http://localhost:8080".concat(path);
}

export default path2url;