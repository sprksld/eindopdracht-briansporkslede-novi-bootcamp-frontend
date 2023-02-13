import React, {useEffect, useState} from 'react';
import goFetch from "../../helpers/goFetch";
import sqlDateTimeToLongDate from "../../helpers/sqlDateTimeToLongDate";

function WorkshopsToChoose() {
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        void goFetch("/workshops/upcoming", setData, toggleLoading, toggleError);
    }, []);

    return (
        <>
            {error && <span>Er is ging iets mis</span>}
            {!error &&
                <>
                    {loading && <span>Aan het laden ...</span>}

                    {Object.keys(data).length > 0 &&
                        <>
                            <table>
                                <thead>
                                <tr>
                                    <th>wat?</th>
                                    <th>wanneer?</th>
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