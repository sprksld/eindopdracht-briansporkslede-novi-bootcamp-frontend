import React, {useEffect, useState} from 'react';
import goFetch from "../../helpers/goFetch";
import sqlDateTimeToLongDate from "../../helpers/sqlDateTimeToLongDate";
import sqlDateTimeToRelativeDeadline from "../../helpers/sqlDateTimeToRelativeDeadline";
import {useNavigate} from "react-router-dom";

function WorkshopsForMyStudents() {
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [workshops, setWorkshops] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        void goFetch("/workshops/mystudentscanchoosefrom", setWorkshops, toggleLoading, toggleError);
    }, []);

    function handleDetailsButton(e, id) {
        navigate(`/workshops/${id}`);
    }

    function handlePresenceAndFeedbackButton(e, id) {
        navigate(`/workshops/${id}?action=pnf`);
    }

    return (
        <>
            <h2>Geplande workshops</h2>
            {error && <span>Er ging iets mis.</span>}
            {!error &&
                <>
                    {loading && <span>Aan het laden ...</span>}
                    {!loading &&
                        <>
                            {Object.keys(workshops).length <= 0
                                ? <span>Er staan geen workshops klaar voor je leerlingen.</span>
                                : <span>Uit deze workshops kunnen jouw leerlingen kiezen</span>
                            }
                            {Object.keys(workshops).length > 0 &&
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
                                        {Object.keys(workshops).length > 0 && workshops.map((workshop) => {
                                            return (
                                                <tr key={workshop.id}>
                                                    <td>
                                                        <strong>{workshop.title}</strong><br/><small><small>{workshop.description}</small></small>
                                                    </td>
                                                    <td>{sqlDateTimeToLongDate(workshop.dtStart)}</td>
                                                    <td>{sqlDateTimeToRelativeDeadline(workshop.dtReservationsStart, workshop.dtReservationsEnd)}</td>
                                                    <td>
                                                        <button type="button" onClick={(e) => handleDetailsButton(e, workshop.id)}>details</button>
                                                        <button type="button" onClick={(e) => handlePresenceAndFeedbackButton(e, workshop.id)}>presentie & feedback</button>
                                                    </td>
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
            }
        </>
    );
}

export default WorkshopsForMyStudents;