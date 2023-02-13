import React, {useContext, useEffect, useState} from 'react';
import goFetch from "../../helpers/goFetch";
import sqlDateTimeToLongDate from "../../helpers/sqlDateTimeToLongDate";
import sqlDateTimeToRelativeDeadline from "../../helpers/sqlDateTimeToRelativeDeadline";

function WorkshopsToAnnounce() {
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        void goFetch("/workshops/mystudentscanchoosefrom", setData, toggleLoading, toggleError);
    }, []);

    function handleDetailsButton(e, id) {
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
                        <thead>
                        <tr>
                            <th>workshop</th>
                            <th>datum</th>
                            <th>aanmelden ...</th>
                            <th>acties</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(data).length > 0 && data.map((w) => {
                            return (
                                <tr key={w.id}>
                                    <td>
                                        <strong>{w.title}</strong><br/><small><small>{w.description}</small></small>
                                    </td>
                                    <td>{sqlDateTimeToLongDate(w.dtStart)}</td>
                                    <td>{sqlDateTimeToRelativeDeadline(w.dtReservationsStart, w.dtReservationsEnd)}</td>
                                    <td>
                                        <button onClick={(e) => handleDetailsButton(e, w.id)}>details</button>
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

export default WorkshopsToAnnounce;