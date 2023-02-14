import React, {useEffect, useState} from 'react';
import goFetch from "../../helpers/goFetch";
import sqlDateTimeToLongDate from "../../helpers/sqlDateTimeToLongDate";
import goPatch from "../../helpers/goPatch";

function WorkshopsToChoose() {
    const [error, toggleError] = useState(false);
    const [loadingWorkshops, toggleLoadingWorkshops] = useState(false);
    const [loadingLikes, toggleLoadingLikes] = useState(false);

    const [workshops, setWorkshops] = useState([]);
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        void goFetch("/workshops/upcoming", setWorkshops, toggleLoadingWorkshops, toggleError
            , (result, save) => {
                save(
                    result.data.map((w) => {
                        return ({...w, likes: 0})
                    })
                )
            }
        );
    }, []);

    useEffect( () => {
        void goFetch("/reservations/upcoming", setReservations, toggleLoadingWorkshops, toggleError);
    }, []);

    useEffect(() => setWorkshops(getLikes(workshops, reservations)), [reservations]);

    // zet alle likes uit reservations "in" workshops - m.a.w. haal alle duimpjes op
    function getLikes(workshops, reservations) {
        return workshops.map((workshop) => {
            const hasLikes = reservations.filter((reservation) => {
                return (workshop.id === reservation.workshop.id);
            });

            if (hasLikes.length > 1)
                console.error("student heeft meer dan 1 reservering op dezelfde workshop");

            if (hasLikes.length > 0) {
                return ({...workshop, likes: hasLikes[0].priority, likeStr: "👍".repeat(hasLikes[0].priority,)});
            } else {
                return (workshop);
            }
        });
    }

    function handleLikeButton(e, w) {
        // e.preventDefault();
        void goPatch(`/workshops/like/${w.id}`
            , {likeAmount: (Number.isInteger(w.likes) && w.likes < 3) ? w.likes + 1 : 0}
            , toggleLoadingLikes, null, toggleError, (result) => {
                w.likes = result.data.likeAmount;
                w.likeStr = "👍".repeat(w.likes);
            })
    }

    return (
        <>
            <h2>Keuze werktijd</h2>
            {error && <span>Er is een fout opgetreden</span>}
            {!error &&
                <>
                    {loadingWorkshops && <span>Aan het laden ...</span>}
                    {!loadingWorkshops &&
                        <>
                            {Object.keys(workshops).length <= 0 && <span>Er zijn nog geen workshops waaruit je kunt kiezen.</span>}
                            {Object.keys(workshops).length > 0 &&
                                <>
                                    { loadingLikes ? <span>Like verwerken ...</span> : <span>Geef &eacute;&eacute;n of meerdere <strong>Likes</strong> aan de workshops die je leuk lijken.</span>}
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
                                                    <td className="growing-likes">
                                                        <button
                                                            onClick={(e) => handleLikeButton(e, w)}>{w.likeStr}&nbsp;Like
                                                        </button>
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