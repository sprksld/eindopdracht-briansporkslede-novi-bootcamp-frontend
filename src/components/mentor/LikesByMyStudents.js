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
            <h4>deze workshops vinden jouw leerlingen leuk</h4>

            {Object.keys(reservations).length <= 0 && <span>Er zijn nog geen likes gegeven door je mentorleerlingen</span>}
            {Object.keys(reservations).length > 0 &&
                <ul>
                    { reservations.map((d) => {
                            return (
                                <li key={d.id}>
                                    <strong>{d.student.name}</strong> heeft interesse
                                    voor <strong>{d.workshop.title}</strong>
                                </li>
                            )
                        }
                    )}
                </ul>
            }
        </>
    );
}

export default LikesByMyStudents;