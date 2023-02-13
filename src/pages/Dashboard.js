import React from 'react';
import Mentor from "../components/mentor/Mentor";
import Planner from "../components/planner/Planner";
import Student from "../components/student/Student";
import Teacher from "../components/teacher/Teacher";

function Dashboard(props) {
    return (
        <div>
            <Mentor/>

            <Planner/>

            <Student/>

            <Teacher/>

        </div>
    );
}

export default Dashboard;