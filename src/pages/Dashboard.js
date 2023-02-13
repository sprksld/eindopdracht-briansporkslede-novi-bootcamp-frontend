import React, {useContext} from 'react';
import Mentor from "../components/mentor/Mentor";
import Planner from "../components/planner/Planner";
import Student from "../components/student/Student";
import Teacher from "../components/teacher/Teacher";
import {AuthContext} from "../context/AuthContext";

function Dashboard() {
    const {isAuth, user} = useContext(AuthContext);
    return (
        <div>
            {user.isMentor && <Mentor/>}
            {user.isPlanner && <Planner/>}
            {user.isStudent && <Student/>}
            {user.isTeacher && <Teacher/>}
        </div>
    );
}

export default Dashboard;