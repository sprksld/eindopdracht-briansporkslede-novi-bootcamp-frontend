import React, {useEffect, useState} from 'react';
import goFetch from "../../helpers/goFetch";
import sqlDateTimeToLongDate from "../../helpers/sqlDateTimeToLongDate";

function WorkshopsToTeach() {
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [workshops, setWorkshops] = useState([]);

    useEffect(() => {
        void goFetch("/workshops/ihavetoteach", setWorkshops, toggleLoading, toggleError)
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
                    <h2>Te geven workshops</h2>

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
                        {Object.keys(workshops).length > 0 && workshops.map((w, n) => {
                            return (
                                <tr key={n}>
                                    <td>
                                        <strong>{w.title}</strong><br/><small><small>{w.description}</small></small>
                                    </td>
                                    <td>{sqlDateTimeToLongDate(w.dtStart)}</td>
                                    <td>{w.room}</td>
                                    <td>?</td>
                                    <td>
                                        <button type="button" onClick={(e) => handleListButton(e, w.id)}>deelnemers</button>
                                        <button type="button" onClick={(e) => handlePresenceButton(e, w.id)}>presentie</button>
                                        <button type="button" onClick={(e) => handleFeedbackButton(e, w.id)}>feedback</button>
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