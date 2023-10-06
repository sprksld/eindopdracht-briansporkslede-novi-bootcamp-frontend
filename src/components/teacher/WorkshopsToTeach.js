import React, {useEffect, useState} from 'react';
import goFetch from "../../helpers/goFetch";
import sqlDateTimeToLongDate from "../../helpers/sqlDateTimeToLongDate";
import {useNavigate} from "react-router-dom";

function WorkshopsToTeach() {
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [workshops, setWorkshops] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        void goFetch("/workshops/ihavetoteach", setWorkshops, toggleLoading, toggleError)
    }, []);

    function handleListButton(e, id) {
        navigate(`/workshops/${id}`);
    }

    function handlePresenceAndFeedbackButton(e, id) {
        navigate(`/workshops/${id}?action=pnf`);
    }

    return (
        <>
            {!error &&
                <>
                    <h2>Geplande workshops</h2>
                    {error && <span>Er is een fout opgetreden.</span>}
                    {!error &&
                        <>
                            {loading && <span>Aan het laden ...</span>}
                            {!loading &&
                                <>
                                    {Object.keys(workshops).length <= 0
                                        ? <span>Er staan geen workshops gepland die jij geeft.</span>
                                        : <span>Voor de volgende workshops sta je ingepland als docent, leider of assistent</span>
                                    }
                                    {Object.keys(workshops).length > 0 &&
                                        <>
                                            <table>
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
                                                {Object.keys(workshops).length > 0 && workshops.map((workshop, workshopKey) => {
                                                    return (
                                                        <tr key={workshopKey}>
                                                            <td>
                                                                <strong>{workshop.title}</strong><br/><small><small>{workshop.description}</small></small>
                                                            </td>
                                                            <td>{sqlDateTimeToLongDate(workshop.dtStart)}</td>
                                                            <td>{workshop.room}</td>
                                                            <td>?</td>
                                                            <td>
                                                                <button type="button" onClick={(e) => handleListButton(e, workshop.id)}>details</button>
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
            }
        </>
    );
}

export default WorkshopsToTeach;