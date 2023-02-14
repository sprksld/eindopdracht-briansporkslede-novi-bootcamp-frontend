// this helper saves me a lot of repetitive statements surrounding axios requests
// also it gives me extras by being able to pass functions

import axios from "axios";
import endpoint2url from "./endpoint2url";

async function goDelete( endpoint, setData, toggleBusy, toggleSuccess, toggleError, afterDeletion ) {
    const jwt = localStorage.getItem("token");

    if (typeof toggleError === "function") toggleError(false);
    if (typeof toggleSuccess === "function") toggleSuccess(false);

    try {
        if (typeof toggleBusy === "function") toggleBusy(true);
        // console.log("Going to delete ... " + endpoint);
        const result = await axios.delete(endpoint2url(endpoint), {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            }
        });
        if ( typeof toggleSuccess === "function" ) toggleSuccess(true);
        if ( typeof afterDeletion === "function" ) afterDeletion( result, setData );
    } catch (err) {
        console.error(err);
        if (typeof toggleError === "function") toggleError(true);
    }

    if (typeof toggleBusy === "function") toggleBusy(false);

}

export default goDelete;