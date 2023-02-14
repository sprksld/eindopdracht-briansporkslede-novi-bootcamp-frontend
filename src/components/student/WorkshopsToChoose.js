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

    return (
        <>
            <h2>Keuze werktijd</h2>
            <h4>uit deze workshops kun je kiezen</h4>

            {error && <span>Er is ging iets mis</span>}
            {!error &&
                <>
                    {loading && <span>Aan het laden ...</span>}

                    {Object.keys(workshops).length > 0 &&
                        <>
                            <table>
                                <thead>
                                <tr>
                                    <th>wat?</th>
                                    <th>wanneer?</th>
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
    );
}

export default WorkshopsToChoose;