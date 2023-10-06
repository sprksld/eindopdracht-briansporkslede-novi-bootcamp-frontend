import React, {useContext, useEffect, useState} from 'react';
import goFetch from "../helpers/goFetch";
import sqlDateTimeToLongDate from "../helpers/sqlDateTimeToLongDate";
import {AuthContext} from "../context/AuthContext";

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
                result.data.map( (b) => {
                    if ( b.feedback === null ) b.feedback = "";
                    return b;
                });
                setData(result.data.filter((b) => {
                    return parseInt(id) === b.workshop.id
                }));
            });
        }
    }, [workshop]);

    function handleChange(e, id) {
        e.preventDefault();
        setBookings(bookings.map((booking) => {
            if (booking.id === parseInt(id))
                booking.feedback = e.target.value;
            return booking;
        }))
    }

    function togglePresence(e, id) {
        setBookings(bookings.map((booking) => {
            if (booking.id === parseInt(id)) {
                booking.attended = (!booking.attended);
            }
            return booking;
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
                                <td>docent</td>
                                <td>{workshop.teacher.name}</td>
                            </tr>
                            <tr>
                                <td>waar</td>
                                <td>{workshop.room}</td>
                            </tr>
                            <tr>
                                <td>tijdsduur</td>
                                <td>{workshop.duration} minuten</td>
                            </tr>
                            <tr>
                                <td>{workshop.category} workshop</td>
                                <td>{workshop.title}</td>
                            </tr>
                            <tr>
                                <td>definitief aantal deelnemers</td>
                                <td>?</td>
                            </tr>
                            <tr>
                                <td>beschrijving</td>
                                <td>{workshop.description}</td>
                            </tr>
                            <tr>
                                <td>min. aantal deelnemers</td>
                                <td>{workshop.minParticipants}</td>
                            </tr>
                            <tr>
                                <td>max. aantal deelnemers</td>
                                <td>{workshop.maxParticipants}</td>
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
                                {bookings.map((booking, bookingKey) => {
                                    return (
                                        <tr key={bookingKey}>
                                            <td>{booking.student.name}</td>
                                            <td className="presence-wider-btn">
                                                <button disabled={!isTeacher} type="button"
                                                        onClick={(e) => togglePresence(e, booking.id)}
                                                        className={booking.attended ? "present" : "absent"}>
                                                    {booking.attended ? "present" : "absent"}
                                                </button>
                                            </td>
                                            {isTeacher &&
                                                <td><input type="text" value={booking.feedback}
                                                           onChange={(e) => handleChange(e, booking.id)}/></td>
                                            }
                                            {!isTeacher &&
                                                <td>{booking.feedback}</td>
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