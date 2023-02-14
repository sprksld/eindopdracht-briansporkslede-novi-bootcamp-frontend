import React, {useEffect, useState} from 'react';
import goFetch from "../../helpers/goFetch";
import sqlDateTimeToLongDate from "../../helpers/sqlDateTimeToLongDate";
import sqlDateTimeToRelativeDeadline from "../../helpers/sqlDateTimeToRelativeDeadline";

function WorkshopsForMyStudents() {
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [workshops, setWorkshops] = useState([]);

    useEffect(() => {
        void goFetch("/workshops/mystudentscanchoosefrom", setWorkshops, toggleLoading, toggleError);
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
            <h2>Geplande workshops</h2>


            {!error &&
                <>
                    <h4>uit deze workshops kunnen jouw leerlingen kiezen</h4>
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
                        {Object.keys(workshops).length > 0 && workshops.map((w) => {
                            return (
                                <tr key={w.id}>
                                    <td>
                                        <strong>{w.title}</strong><br/><small><small>{w.description}</small></small>
                                    </td>
                                    <td>{sqlDateTimeToLongDate(w.dtStart)}</td>
                                    <td>{sqlDateTimeToRelativeDeadline(w.dtReservationsStart, w.dtReservationsEnd)}</td>
                                    <td>
                                        <button type="button" onClick={(e) => handleDetailsButton(e, w.id)}>details</button>
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

export default WorkshopsForMyStudents;