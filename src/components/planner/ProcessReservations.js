import "./ProcessReservations.css";
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import isOverlapping from "../../helpers/isOverlapping";
import generateStyles from "../../helpers/generateStyles";
import gender from "../../helpers/showGenderSign";
import goStore from "../../helpers/goStore";
import goFetch from "../../helpers/goFetch";
import {cleanup} from "@testing-library/react";

// this file is rather complex and still under development.
// I know it needs simplification and code cleaning.
// I promise I'll do that first thing as soon as this file is fyllu functional!
// also it still uses fake "Like-data" for workshops. Yeah, I'm a cheater ... while testing!

function ProcessReservations({id}) {
    const [students, setStudents] = useState([]);
    const [workshops, setWorkshops] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const navigate = useNavigate();
    const [filteredStudents, setFilteredStudents] = useState([]);
    let useFakeLikes = false;

    if ( id < 0 ) {
        id *= -1;
        useFakeLikes = true;
    }

    useEffect(() => {
        const controller = new AbortController();
        void goFetch("/workshops", setWorkshops, null, toggleError, (arr, fn) => {
            filterWorkshops(arr.data, fn)
        }, controller.signal);
        return () => {controller.abort();};
    }, []);
    useEffect(() => {
        const controller = new AbortController();
        void goFetch("/students", setStudents, null, toggleError, (arr, fn) => {
            filterStudents(arr.data, fn)
        }, controller.signal);
        return () => {controller.abort();};
    }, [workshops,reservations]);
    useEffect(() => {
        const controller = new AbortController();
        void goFetch("/reservations", setReservations, null, toggleError, null, controller.signal);
        return () => {controller.abort();};
    }, []);

    // generate nice sequence of colors ... to organize the workshops
    generateStyles(workshops.length, 0, 0);

    // only keep overlapping workshops (TODO - maybe it's better to already filter in the backend ... ? )

    function filterWorkshops(workshops, setWorkshops) {
        const clickedWorkshop = workshops.find((w) => {
            return (w.id === parseInt(id));
        });

        const startMomentAInSeconds = Math.floor(new Date(clickedWorkshop.dtStart).getTime() / 1000);
        const endMomentAInSeconds = startMomentAInSeconds + (clickedWorkshop.duration * 60);

        // TODO: overlap misschien alleen berekenen voor zelfde leerjaar ( ... range)
        const overlappingWorkshops = workshops.filter((w) => {
            const startMomentBInSeconds = Math.floor(new Date(w.dtStart).getTime() / 1000);
            const endMomentBInSeconds = startMomentBInSeconds + (w.duration * 60);
            return (isOverlapping(startMomentAInSeconds, endMomentAInSeconds, startMomentBInSeconds, endMomentBInSeconds));
        })

        setWorkshops(overlappingWorkshops);

    }

    // only keep students that are eligible for the filtered workshops

    function filterStudents(students, setStudents) {
        let filtered;

        // add key-value for likes and assigned workshop
        filtered = students.map((s) => {
            return {...s, likes: [], workshop: 0}
        });

        // filter by gradeYear
        // remove students that have wrong gradeYear for selected workshops

        filtered = filtered.filter((s) => {
            return workshops.find((w) => {
                return (!w.minGradeYear || w.minGradeYear <= s.gradeYear)
                    && (!w.maxGradeYear || w.maxGradeYear >= s.gradeYear)
                    && !(!w.minGradeYear && !w.maxGradeYear);
            });
        });

        // add liked reservations
        reservations.map((reservation) => {
            if (!reservation.priority) return;
            const student = filtered.find((s) => s.id === reservation.student.id);
            if (!student) return;
            student.likes.push({workshopId: reservation.workshop.id, likeAmount: reservation.priority});
        });

        if (useFakeLikes) {
            // randomize the likes, so there's more to work with while testing
            filtered = filtered.map( (f) => {
                let fakeLikes = [];
                const numberOfFakeLikes = Math.floor(Math.random()*(workshops.length+1));
                // console.log("numberOfFakeLikes = ", numberOfFakeLikes);
                for ( let i = 0; i < numberOfFakeLikes; i++) {
                    const fakeWorkshopToLike = Math.floor( (Math.random()*workshops.length)+1);
                    const fakeWorkshop = workshops[fakeWorkshopToLike-1];
                    // console.log("fakeWorkshop = ", fakeWorkshop);
                    fakeLikes.push( { workshopId: fakeWorkshop.id, likeAmount: Math.floor((Math.random()*3))+1 });
                }
                return { ...f, likes: fakeLikes }
            });
        }

        // put students with highest likeAmount on top
        filtered.sort((a, b) => {
            const likeAmountA = Math.max(...a.likes.map((l) => l.likeAmount));
            const likeAmountB = Math.max(...b.likes.map((l) => l.likeAmount));
            if (likeAmountA > likeAmountB) return -1;
            if (likeAmountA < likeAmountB) return 1;
            return 0;
        });

        setFilteredStudents(filtered);
    }

    function handleAllowClick(e, student, workshopId) {
        toggleError(false);
        student.workshop = workshopId;
        setStudents(students.map((s) => {
            return s
        })); // TODO - uitzoeken hoe anders een re-render te doen
    }

    function handleDenyClick(e, student) {
        toggleError(false);
        student.workshop = 0;
        // TODO: Ik weet niet hoe anders re-render te doen
        setStudents(students.map((s) => {return s}));
    }

    function showWorkshopLikesAsEmoji(student, workshopId) {
        if (workshopId === undefined)
            workshopId = student.workshop;

        let likeAmount = 0;
        let favoriteLikeAmount = 0;

        if (Object(student.likes).length > 0) {
            student.likes.map((like) => {
                if (like.workshopId === workshopId) {
                    likeAmount = like.likeAmount;
                } else {
                    if (like.likeAmount > 0) {
                        favoriteLikeAmount = like.likeAmount;
                    }
                }
            })
        }

        if (student.workshop > 0 && likeAmount < favoriteLikeAmount && likeAmount === 0)
            return "😡";         // ANGRY

        // TODO: ternary if staat er nog om makkelijk andere emoji te kunnen tonen bij plaatsing; kijken at praktisch is

        switch (likeAmount) {
            case 1:
                return (student.workshop) ? "👍" : "👍";
            case 2:
                return (student.workshop) ? "👍👍" : "👍👍";
            case 3:
                return (student.workshop) ? "👍👍👍" : "👍👍👍";
            default:
                if (likeAmount > 3)
                    return (student.workshop) ? "😇" : "😇";          // IN HEAVEN
                else
                    return (student.workshop > 0) ? "😐" : "-";     // DOES NOT CARE
        }
    }

    function isExecuteButtonNeeded() {
        return filteredStudents.find((s) => s.workshop === 0) === undefined;
    }

    function handleConsolidateButton(e) {
        e.preventDefault();

        if (Object.keys(filteredStudents).length <= 0) {
            alert("Er zijn geen studenten ingedeeld. Er valt dus niets vast te leggen.");
            return;
        }

        const bookings = filteredStudents.map((student) => {
            return ({student_id: student.id, workshop_id: student.workshop});
        })
        console.log(bookings);

        void saveBookings(bookings);

    }

    async function saveBookings(bookings) {
        void goStore("/bookings/batch", bookings, null, null, toggleError, () => {
            navigate("/dashboard")
        });
    }

    return (
        <>
            {loading && <span>aan het laden</span>}
            {!loading &&
                <>
                    <p>
                        Door onder de naam van een leerling op de kleur van een workshop te klikken, kun je leerlingen indelen.
                        <br/>Zodra je iedereen hebt ingedeeld, verschijnt de 'Vastleggen'-knop.
                    </p>


                    <ul>
                        {Object.keys(workshops).length > 1 &&
                            <>
                                <li>De workshop waar je op klikte overlapt qua tijd met andere workshops. Je ziet daarom ook die overlappende workshops.</li>
                            </>
                        }
                        <li>Het is gebruikelijker om reserveringen pas te verwerken na het verstrijken van de deadline.
                        <br/>Daarom blijven de getoonde workshops in dit geval ook na het indelen nog dagen zichtbaar voor de leerlingen.</li>
                        <li>Om een goed beeld te krijgen van deze pagina, zou je meerdere leerlingen moeten toevoegen en zinvolle Likes moeten invoeren. Best een klus.
                        <br/>Om dit sneler te kunnen testen, kun je nep-likes activeren. Dit doe je door in de url van deze pagina het workshop-id negatief te maken.</li>
                    </ul>
                    {isExecuteButtonNeeded() && <button onClick={(e) => handleConsolidateButton(e)}>Vastleggen</button>}
                    {(error) ? <span>Het verwerken van de boekingen is <strong>niet</strong> gelukt.</span> :
                        <span> </span>}

                    <div className="inplanner">
                        {Object.keys(workshops).length > 0 &&
                            <section>
                                {workshops.map((workshop, n1) => {
                                    return (
                                        <article key={n1} className="workshop">
                                            <h2>{workshop.title} [{workshop.minParticipants}-{workshop.maxParticipants}p]</h2>
                                            <div className="buttons-assigned">
                                            {Object.keys(filteredStudents).length > 0 && filteredStudents.filter((s) => s.workshop === workshop.id).map((student, n2) => {
                                                return (
                                                    <button key={n2}
                                                            title={"hier bijvoorbeeld nog een berichtje over " + student.name}
                                                            onClick={(e) => handleDenyClick(e, student)}>
                                                        {student.name} <span
                                                        className="big-emoji">{showWorkshopLikesAsEmoji(student)}</span>
                                                    </button>
                                                )
                                            })}
                                            </div>
                                        </article>
                                    )
                                })}
                            </section>
                        }
                        {Object.keys(filteredStudents).length > 0 &&
                            <section>
                                <ul>
                                    {filteredStudents.filter((s) => s.workshop === 0).map((student, n) => {
                                        return (
                                            <li key={n}>
                                                <span className="nobr">
                                                    <big>{gender(student.gender)}</big><small>{student.name}</small>
                                                </span>
                                                <div className="buttons-unassigned">
                                                    {Object.keys(workshops).length > 0 && workshops.map((w, m) => {
                                                        return (
                                                            <button key={m} onClick={
                                                                (e) => handleAllowClick(e, student, w.id)}
                                                                    className="workshop">
                                                                <big>{showWorkshopLikesAsEmoji(student, w.id)}</big>
                                                            </button>
                                                        )
                                                    })}
                                                </div>
                                            </li>
                                        )
                                    })
                                    }
                                </ul>
                            </section>
                        }

                    </div>
                </>
            }
        </>
    );
}

export default ProcessReservations;