import React, {useEffect, useState} from 'react';
import goFetch from "../../helpers/goFetch";
import sqlDateTimeToLongDate from "../../helpers/sqlDateTimeToLongDate";

function WorkshopsToChoose() {
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [workshops, setWorkshops] = useState([]);

    useEffect(() => {
        void goFetch("/workshops/upcoming", setWorkshops, toggleLoading, toggleError);
    }, []);

    function handleLikeButton(e, w) {
        alert("Deze functie is helaas nog niet af");
    }

    return (
        <>
            <h2>Keuze werktijd</h2>
            {error && <span>Er is een fout opgetreden</span>}
            {!error &&
                <>
                    {loading && <span>Aan het laden ...</span>}
                    {!loading &&
                        <>
                            {Object.keys(workshops).length <= 0
                                ? <span>Er zijn nog geen workshops waaruit je kunt kiezen.</span>
                                : <span>Je mag kiezen uit de volgende workshops.</span>
                            }
                            {Object.keys(workshops).length > 0 &&
                                <>
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>wat?</th>
                                            <th>wanneer?</th>
                                            <th>like?</th>
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
                                                    <td>
                                                        <button onClick={(e) => handleLikeButton(e, w)}>Like</button>
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

export default WorkshopsToChoose;