// this helper saves me a lot of repetitive statements surrounding axios requests
// also it gives me extras by being able to pass functions

import axios from "axios";
import endpoint2url from "./endpoint2url";

async function goStore(endpoint, dataToStore, toggleBusy, toggleSuccess, toggleError, afterSuccess) {
    if (typeof dataToStore !== "object") {
        console.error("object required to store a little sumthin' sumthin'");
        return;
    }

    const jwt = localStorage.getItem("token");
    if (typeof toggleError === "function") toggleError(false);

    try {
        if (typeof toggleBusy === "function") toggleBusy(true);
        console.log("Going to store sumthin' at " + endpoint);
        const result = await axios.post(endpoint2url(endpoint), dataToStore, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
        });
        if ( result.errors !== undefined )
            console.log(result.errors);
        if (typeof afterSuccess === "function") afterSuccess(result);
        if (typeof toggleSuccess === "function") toggleSuccess(true);
    } catch (err) {
        console.error(err);
        if (typeof toggleError === "function") toggleError(true);
    }

    if (typeof toggleBusy === "function") toggleBusy(false);

}

export default goStore;