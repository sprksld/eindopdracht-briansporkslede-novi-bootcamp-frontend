import React, {useEffect, useState} from 'react';
import goFetch from "../../helpers/goFetch";
import sqlDateTimeToLongDate from "../../helpers/sqlDateTimeToLongDate";
import sqlDateTimeToRelativeDeadline from "../../helpers/sqlDateTimeToRelativeDeadline";

function WorkshopsPlanned() {
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [data, setData] = useState([]);

    function handleProcessButton(e, id) {
        e.preventDefault();
        alert("Deze functie is helaas nog niet klaar.");
    }

    function handleDeleteButton(e, id) {
        e.preventDefault();
        alert("Deze functie is helaas nog niet klaar.");
    }

    useEffect(() => {
        void goFetch("/workshops", setData, toggleLoading, toggleError);
    }, []);

    return (
        <>
            {(loading) ? <span>Aan het laden ...</span> : <span>&nbsp;</span>}
            {!error &&
                <>
                    {Object.keys(data).length <= 0 && <span>Er staan geen workshops in de planning</span>}
                    {Object.keys(data).length > 0 &&
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
                            {data.map((w, n) => {
                                return (
                                    <tr key={n}>
                                        <td>
                                            <strong>{w.title}</strong><br/><small><small>{w.description}</small></small>
                                        </td>
                                        <td>{sqlDateTimeToLongDate(w.dtStart)}</td>
                                        <td>{sqlDateTimeToRelativeDeadline(w.dtReservationsStart, w.dtReservationsEnd)}</td>
                                        <td>
                                            <button onClick={(e) => handleDeleteButton(e, w.id)}>verwijder</button>
                                            <button onClick={(e) => handleProcessButton(e, w.id)}>verwerk</button>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    }
                </>
            }
        </>
    );
}

export default WorkshopsPlanned;