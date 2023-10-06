import React, {useEffect, useState} from 'react';
import goFetch from "../../helpers/goFetch";
import sqlDateTimeToLongDate from "../../helpers/sqlDateTimeToLongDate";
import sqlDateTimeToRelativeDeadline from "../../helpers/sqlDateTimeToRelativeDeadline";
import goDelete from "../../helpers/goDelete";
import {useNavigate} from "react-router-dom";

function WorkshopsPlanned() {
    const [loading, toggleLoading] = useState(false);
    const [deleteSuccess, toggleDeleteSuccess] = useState(false);
    const [error, toggleError] = useState(false);
    const [workshops, setWorkshops] = useState([]);

    const navigate = useNavigate();

    function handleProcessButton(e, id) {
        navigate(`/workshops/${id}`);
    }

    function handleDeleteButton(e, id) {
        const afterSuccess = workshops.filter((w) => w.id !== id);
        void goDelete(`/workshops/${id}`, setWorkshops, null, null, null
            , (result, setData) => {
                setData(afterSuccess)
            });
    }

    useEffect(() => {
        void goFetch("/workshops", setWorkshops, toggleLoading, toggleError);
    }, []);

    return (
        <>
            <h2>Geplande workshops</h2>
            {error && <span>Er is een fout opgetreden.</span>}
            {!error &&
                <>
                    {loading && <span>Aan het laden ...</span>}
                    {!loading &&
                        <>
                            {Object.keys(workshops).length <= 0
                                ? <span>Er staan geen workshops in de planning.</span>
                                : <span>De volgende workshops staan in de planning.</span>
                            }
                            {Object.keys(workshops).length > 0 &&
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
                                    {workshops.map((workshop, workshopKey) => {
                                        return (
                                            <tr key={workshopKey}>
                                                <td>
                                                    <strong>{workshop.title}</strong><br/><small><small>{workshop.description}</small></small>
                                                </td>
                                                <td>{sqlDateTimeToLongDate(workshop.dtStart)}</td>
                                                <td>{sqlDateTimeToRelativeDeadline(workshop.dtReservationsStart, workshop.dtReservationsEnd)}</td>
                                                <td>
                                                    <button type="button"
                                                            onClick={(e) => handleDeleteButton(e, workshop.id)}>verwijder
                                                    </button>
                                                    <button type="button"
                                                            onClick={(e) => handleProcessButton(e, workshop.id)}>verwerk
                                                    </button>
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
            }
        </>
    );
}

export default WorkshopsPlanned;