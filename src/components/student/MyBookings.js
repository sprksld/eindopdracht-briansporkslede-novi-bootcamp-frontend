import React, {useEffect, useState, useContext} from 'react';
import sqlDateTimeToLongDate from "../../helpers/sqlDateTimeToLongDate";
import goFetch from "../../helpers/goFetch";

function MyBookings() {
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [bookings, setData] = useState([]);

    useEffect(() => {
        void goFetch("/bookings/forme", setData, toggleLoading, toggleError);
    }, []);

    return (
        <>
            <h2>Planning</h2>

            {(error) ? <span>Er is een fout opgetreden</span> : <span>&nbsp;</span>}
            {!error &&
                <>
                    {Object.keys(bookings).length <= 0 && <span>Je bent nog niet bij een workshop ingedeeld.</span>}
                    {Object.keys(bookings).length > 0 &&
                        <>
                            <span>Je bent bij de volgende workshops ingedeeld.</span>
                            <table>
                                <thead>
                                <tr>
                                    <th>wat?</th>
                                    <th>wanneer?</th>
                                    <th>waar?</th>
                                </tr>
                                </thead>
                                <tbody>
                                {Object.keys(bookings).length > 0 && bookings.map((b, n) => {
                                    return (
                                        <tr key={n}>
                                            <td>
                                                <strong>{b.workshop.title}</strong>
                                                <br/><small><small>{b.workshop.description}</small></small>
                                            </td>
                                            <td>{sqlDateTimeToLongDate(b.workshop.dtStart)}</td>
                                            <td>{b.workshop.room}</td>
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

export default MyBookings;