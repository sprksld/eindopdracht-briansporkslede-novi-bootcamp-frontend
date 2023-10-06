import React, {useEffect, useState} from 'react';
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import WhoAmI from "../components/WhoAmI";
import {useParams, useSearchParams} from "react-router-dom";
import ProcessReservations from "../components/planner/ProcessReservations";
import WorkshopsToChooseFrom from "../components/student/WorkshopsToChooseFrom";
import WorkshopDetails from "../components/WorkshopDetails";

function Workshops() {
    const {auth, isAuth, user: {username, email, authorities, isPlanner, isMentor, isStudent, isTeacher}} = useContext(AuthContext);

    const {id} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <>
            <WhoAmI/>

            {isMentor &&
                <>
                    <WorkshopDetails id={id} action={searchParams.get("action")} />
                </>
            }
            {isPlanner &&
                <>
                    <h1>Deelnemers plaatsen</h1>
                    <ProcessReservations id={id}/>
                </>
            }
            {isTeacher &&
                <>
                    <WorkshopDetails id={id} action={searchParams.get("action")} />
                </>
            }
            {isStudent &&
                <>
                    <h2>nothing here, yet</h2>
                </>
            }
        </>
    );
}

export default Workshops;