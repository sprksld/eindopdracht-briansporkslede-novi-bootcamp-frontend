import React, {useEffect, useState, useContext} from 'react';
import sqlDateTimeToLongDate from "../../helpers/sqlDateTimeToLongDate";
import goFetch from "../../helpers/goFetch";

function WorkshopsToAttend() {
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [bookings, setData] = useState([]);

    useEffect(() => {
        void goFetch("/bookings/forme", setData, toggleLoading, toggleError);
    }, []);

    return (
        <>
            <h2>Planning</h2>
            {error && <span>Er is een fout opgetreden.</span>}
            {!error &&
                <>
                    {loading && <span>Aan het laden ...</span>}
                    {!loading &&
                        <>
                            {Object.keys(bookings).length <= 0
                                ? <span>Je bent nog niet bij een workshop ingedeeld.</span>
                                : <span>Je bent bij de volgende workshops ingedeeld</span>
                            }
                            {Object.keys(bookings).length > 0 &&
                                <table>
                                    <thead>
                                    <tr>
                                        <th>wat?</th>
                                        <th>wanneer?</th>
                                        <th>waar?</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {Object.keys(bookings).length > 0 && bookings.map((booking, bookingKey) => {
                                        return (
                                            <tr key={bookingKey}>
                                                <td>
                                                    <strong>{booking.workshop.title}</strong>
                                                    <br/><small><small>{booking.workshop.description}</small></small>
                                                </td>
                                                <td>{sqlDateTimeToLongDate(booking.workshop.dtStart)}</td>
                                                <td>{booking.workshop.room}</td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            }
                        </>
                    }
                </>
            }
        </>
    )
}

export default WorkshopsToAttend;