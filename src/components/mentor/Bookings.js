import React, {useEffect, useState} from 'react';
import goFetch from "../../helpers/goFetch";
import sqlDateTimeToLongDate from "../../helpers/sqlDateTimeToLongDate";

function Bookings() {
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        void goFetch("/bookings/formystudents", setBookings, toggleLoading, toggleError);
    }, []);

    return (
        <>
            <h2>Indeling</h2>
            <h4>bij deze workshops zijn jouw leeringen ingedeeld</h4>

            <ul>
                {Object.keys(bookings).length > 0 && bookings.map((d,n) => {
                        return <li key={n}>
                            <strong>{d.student.name}</strong> is ingedeeld
                            bij <strong>{d.workshop.title}</strong> op {sqlDateTimeToLongDate(d.workshop.dtStart)}
                        </li>
                    }
                )}
            </ul>
        </>
    );
}

export default Bookings;