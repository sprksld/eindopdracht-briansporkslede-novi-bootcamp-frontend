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
            {isMentor  && <h4>Ingelogd als <strong>Mentor  {fullname}</strong> &lt;{email}&gt;</h4>}
            {isPlanner && <h4>Ingelogd als <strong>Planner {fullname}</strong> &lt;{email}&gt;</h4>}
            {isStudent && <h4>Ingelogd als <strong>Student {fullname}</strong> &lt;{email}&gt;</h4>}
            {isTeacher && <h4>Ingelogd als <strong>Teacher {fullname}</strong> &lt;{email}&gt;</h4>}
        </>
    );
}

export default WhoAmI;