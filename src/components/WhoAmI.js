import React from 'react';
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

function WhoAmI() {
    const {
        user: {
            username,
            email,
            fullname,
            authorities,
            isPlanner,
            isMentor,
            isStudent,
            isTeacher
        }
    } = useContext(AuthContext);

    return (
        <>
            {isMentor  && <h5>Ingelogd als <strong>Mentor  {fullname}</strong> &lt;{email}&gt;</h5>}
            {isPlanner && <h5>Ingelogd als <strong>Planner {fullname}</strong></h5>}
            {isStudent && <h5>Ingelogd als <strong>Student {fullname}</strong></h5>}
            {isTeacher && <h5>Ingelogd als <strong>Teacher {fullname}</strong> &lt;{email}&gt;</h5>}
        </>
    );
}

export default WhoAmI;