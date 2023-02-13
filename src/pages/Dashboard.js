import React, {useContext} from 'react';
import WorkshopsToAnnounce from "../components/mentor/WorkshopsToAnnounce";
import WorkshopsPlanned from "../components/planner/WorkshopsPlanned";
import WorkshopsToChoose from "../components/student/WorkshopsToChoose";
import WorkshopsToTeach from "../components/teacher/WorkshopsToTeach";
import {AuthContext} from "../context/AuthContext";
import WhoAmI from "../components/WhoAmI";

function Dashboard() {
    const {
        isAuth,
        user: {username, email, fullname, authorities, isPlanner, isMentor, isStudent, isTeacher}
    } = useContext(AuthContext);
    return (
        <>
            {!isAuth && <span>Log eerst in om deze pagina te bekijken.</span>}
            {isAuth &&
                <>
                    <WhoAmI/>
                    <div>
                        {isPlanner &&
                            <>
                                <h2>Geplande workshops</h2>
                                <WorkshopsPlanned/>
                            </>
                        }
                        {isMentor &&
                            <>
                                <h2>Geplande workshops</h2>
                                <WorkshopsToAnnounce/>
                            </>
                        }
                        {isStudent &&
                            <>
                                <h2>Te kiezen workshops</h2>
                                <WorkshopsToChoose/>
                            </>
                        }
                        {isTeacher &&
                            <>
                                <h2>Te geven workshops</h2>
                                <WorkshopsToTeach/>
                            </>
                        }
                    </div>
                </>
            }
        </>
    );
}

export default Dashboard;