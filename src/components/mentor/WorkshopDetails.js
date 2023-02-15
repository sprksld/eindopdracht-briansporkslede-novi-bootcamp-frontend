import React, {useContext, useEffect, useState} from 'react';
import goFetch from "../../helpers/goFetch";
import sqlDateTimeToLongDate from "../../helpers/sqlDateTimeToLongDate";
import {AuthContext} from "../../context/AuthContext";

function WorkshopDetails({id, action}) {
    const {user: {isPlanner, isMentor, isStudent, isTeacher}} = useContext(AuthContext);

    const [loading, toggleLoading] = useState(false);
    const [workshop, setWorkshop] = useState([]);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        void goFetch(`/workshops/${id}`, setWorkshop, toggleLoading);
    }, []);

    useEffect(() => {
        if (action === "pnf") {
            void goFetch(`/bookings/attended-and-feedback`, setBookings, toggleLoading, null, (result, setData) => {
                setData(result.data.filter((b) => {
                    return parseInt(id) === b.workshop.id
                }))
            });
        }
    }, [workshop]);

    function handleChange(e, id) {
        e.preventDefault();
        setBookings(bookings.map((b) => {
            if (b.id === parseInt(id))
                b.feedback = e.target.value;
            return b;
        }))
    }

    function togglePresence(e, id) {
        setBookings(bookings.map((b) => {
            if (b.id === parseInt(id)) {
                b.attended = (!b.attended);
            }
            return b;
        }));
    }

    return (
        <>
            <h2>Workshop gegevens</h2>
            {loading && <span>aan het laden ...</span>}
            {!loading &&
                <>
                    {Object.keys(workshop).length > 0 &&
                        <table>
                            <tbody>

                            <tr>
                                <td>datum</td>
                                <td>{sqlDateTimeToLongDate(workshop.dtStart)}</td>
                            </tr>
                            <tr>
                                <td>waar</td>
                                <td>{workshop.room}</td>
                            </tr>
                            <tr>
                                <td>workshop</td>
                                <td>{workshop.title}</td>
                            </tr>
                            <tr>
                                <td>docent</td>
                                <td>{workshop.teacher.name}</td>
                            </tr>
                            <tr>
                                <td>beschrijving</td>
                                <td>{workshop.description}</td>
                            </tr>
                            </tbody>
                        </table>
                    }

                    {Object.keys(bookings).length > 0 &&
                        <>
                            <h2>Presentie & Feedback</h2>
                            <table>
                                <thead>
                                <tr>
                                    <th>leerling</th>
                                    <th>presentie</th>
                                    <th>feedback</th>
                                </tr>
                                </thead>
                                <tbody>
                                {bookings.map((b, n) => {
                                    return (
                                        <tr key={n}>
                                            <td>{b.student.name}</td>
                                            <td className="presence-wider-btn">
                                                <button disabled={!isTeacher} type="button"
                                                        onClick={(e) => togglePresence(e, b.id)}
                                                        className={b.attended ? "present" : "absent"}>
                                                    {b.attended ? "present" : "absent"}
                                                </button>
                                            </td>
                                            {isTeacher &&
                                                <td><input type="text" value={b.feedback}
                                                           onChange={(e) => handleChange(e, b.id)}/></td>
                                            }
                                            {!isTeacher &&
                                                <td>{b.feedback}</td>
                                            }
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </>
                    }
                </>
            }
        </>
    );
}

export default WorkshopDetails;