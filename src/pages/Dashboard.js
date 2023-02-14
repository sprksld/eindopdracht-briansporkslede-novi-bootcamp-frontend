import React, {useContext} from 'react';
import WorkshopsForMyStudents from "../components/mentor/WorkshopsForMyStudents";
import WorkshopsPlanned from "../components/planner/WorkshopsPlanned";
import WorkshopsToChoose from "../components/student/WorkshopsToChoose";
import WorkshopsToTeach from "../components/teacher/WorkshopsToTeach";
import {AuthContext} from "../context/AuthContext";
import WhoAmI from "../components/WhoAmI";
import Bookings from "../components/mentor/Bookings";
import AddWorkshop from "../components/planner/AddWorkshop";
import LikesByMyStudents from "../components/mentor/LikesByMyStudents";
import MyBookings from "../components/student/MyBookings";
import MyStudents from "../components/mentor/MyStudents";
import AddStudent from "../components/mentor/AddStudent";

function Dashboard() {
    const {isAuth, user: {username, isPlanner, isMentor, isStudent, isTeacher}} = useContext(AuthContext);

    return (
        <>
            {!isAuth && <span>Log eerst in om deze pagina te bekijken.</span>}
            {isAuth &&
                <>
                    <WhoAmI/>
                    <div>
                        {isPlanner &&
                            <>
                                <WorkshopsPlanned/>

                                <AddWorkshop/>
                            </>
                        }
                        {isMentor &&
                            <>
                                <WorkshopsForMyStudents/>

                                <Bookings/>

                                <LikesByMyStudents/>

                                <MyStudents/>

                                <AddStudent/>
                            </>
                        }
                        {isStudent &&
                            <>
                                <h1>Student Dashboard voor {username}</h1>

                                <MyBookings/>

                                <WorkshopsToChoose/>
                            </>
                        }
                        {isTeacher &&
                            <>
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