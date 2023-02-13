import React, {useContext} from 'react';
import Mentor from "../components/mentor/Mentor";
import Planner from "../components/planner/Planner";
import Student from "../components/student/Student";
import Teacher from "../components/teacher/Teacher";
import {AuthContext} from "../context/AuthContext";
import WhoAmI from "../components/WhoAmI";

function Dashboard() {
    const {isAuth, user} = useContext(AuthContext);
    return (
        <>
            {!isAuth && <span>Log eerst in om deze pagina te bekijken.</span>}
            {isAuth &&
                <>
                    <WhoAmI/>
                    <div>
                        {user.isMentor && <Mentor/>}
                        {user.isPlanner && <Planner/>}
                        {user.isStudent && <Student/>}
                        {user.isTeacher && <Teacher/>}
                    </div>
                </>
            }
        </>
    );
}

export default Dashboard;