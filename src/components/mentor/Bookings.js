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
            {error && <span>Er is een fout opgetreden.</span>}
            {!error &&
                <>
                    {loading && <span>Aan het laden ...</span>}
                    {!loading &&
                        <>
                            {Object.keys(bookings).length <= 0
                                ? <span>Jouw leerlingen zijn nog niet ingedeeld bij een workshop.</span>
                                : <span>Jouw leerlingen zijn bij de volgende workshops ingedeeld.</span>
                            }
                            {Object.keys(bookings).length > 0 &&
                                <ul>
                                    {Object.keys(bookings).length > 0 && bookings.map((booking, bookingKey) => {
                                            return <li key={bookingKey}>
                                                <strong>{booking.student.name}</strong> is ingedeeld
                                                bij <strong>{booking.workshop.title}</strong> op {sqlDateTimeToLongDate(booking.workshop.dtStart)}
                                            </li>
                                        }
                                    )}
                                </ul>
                            }
                        </>
                    }
                </>
            }
        </>
    );
}

export default Bookings;