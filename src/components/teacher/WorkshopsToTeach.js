import React, {useEffect, useState} from 'react';
import goFetch from "../../helpers/goFetch";
import sqlDateTimeToLongDate from "../../helpers/sqlDateTimeToLongDate";

function WorkshopsToTeach() {
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        void goFetch("/workshops/ihavetoteach", setData, toggleLoading, toggleError)
    }, []);

    function handleListButton(e, id) {
        e.preventDefault();
        alert("Deze functie is helaas nog niet klaar.");
    }

    function handlePresenceButton(e, id) {
        e.preventDefault();
        alert("Deze functie is helaas nog niet klaar.");
    }

    function handleFeedbackButton(e, id) {
        e.preventDefault();
        alert("Deze functie is helaas nog niet klaar.");
    }

    return (
        <>
            {!error &&
                <>
                    <table>
                        <caption>overzicht van workshops die ik zelf geef</caption>
                        <thead>
                        <tr>
                            <th>workshop</th>
                            <th>datum</th>
                            <th>locatie</th>
                            <th># dln</th>
                            <th>acties</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(data).length > 0 && data.map((w, n) => {
                            return (
                                <tr key={n}>
                                    <td>
                                        <strong>{w.title}</strong><br/><small><small>{w.description}</small></small>
                                    </td>
                                    <td>{sqlDateTimeToLongDate(w.dtStart)}</td>
                                    <td>{w.room}</td>
                                    <td>?</td>
                                    <td>
                                        <button onClick={(e) => handleListButton(e, w.id)}>deelnemers</button>
                                        <button onClick={(e) => handlePresenceButton(e, w.id)}>presentie</button>
                                        <button onClick={(e) => handleFeedbackButton(e, w.id)}>feedback</button>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </>
            }
        </>
    );
}

export default WorkshopsToTeach;