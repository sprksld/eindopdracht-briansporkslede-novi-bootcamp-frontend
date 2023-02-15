// this helper saves me a lot of repetitive statements surrounding axios requests
// also it gives me extras by being able to pass functions

import axios from "axios";
import endpoint2url from "./endpoint2url";

async function goFetch(endpoint, setData, toggleBusy, toggleError, afterFetch, signal) {
    const jwt = localStorage.getItem("token");

    if (typeof toggleError === "function") toggleError(false);

    try {
        if (typeof toggleBusy === "function") toggleBusy(true);
        let headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
        }
        if ( typeof signal === "object")
            headers = { ...headers, signal: signal, };
        // console.log("HEADERS:",headers);

        const result = await axios.get(endpoint2url(endpoint), {
            headers: headers
/*  TODO - remove this when it works fine
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            }
*/
        });
        // console.log(result.data);
        if (typeof afterFetch === "function")
            afterFetch(result, setData);
        else
            setData(result.data);
    } catch (err) {
        console.error(err);
        if (typeof toggleError === "function") toggleError(true);
    }
    if (typeof toggleBusy === "function") toggleBusy(false);

}

export default goFetch;