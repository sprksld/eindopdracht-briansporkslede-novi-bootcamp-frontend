import React, {useEffect, useState} from 'react';
import goFetch from "../../helpers/goFetch";

function LikesByMyStudents() {
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        void goFetch("/reservations/bymystudents", setReservations, toggleLoading, toggleError);
    }, []);

    return (
        <>
            <h2>Likes</h2>
            {error && <span>Er is een fout opgetreden.</span>}
            {!error &&
                <>
                    {loading && <span>Aan het laden ...</span>}
                    {!loading &&
                        <>
                            {Object.keys(reservations).length <= 0
                                ? <span>Jouw leerlingen hebben nog geen likes gegeven.</span>
                                : <span>Jouw leerlingen vinden deze workshops leuk.</span>
                            }
                            {Object.keys(reservations).length > 0 &&
                                <ul>
                                    {reservations.map((reservation) => {
                                            return (
                                                <li key={reservation.id}>
                                                    <strong>{reservation.student.name}</strong> heeft interesse
                                                    voor <strong>{reservation.workshop.title}</strong>
                                                </li>
                                            )
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

export default LikesByMyStudents;