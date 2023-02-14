import React, {useState, useEffect} from 'react';
import goFetch from "../../helpers/goFetch";
import goDelete from "../../helpers/goDelete";

function MyStudents() {
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [deleteSuccess, toggleDeleteSuccess] = useState(false);

    const [students, setStudents] = useState([]);
    const [filtered, setFiltered] = useState([]);

    const [q, setQ] = useState("");

    useEffect(() => void goFetch("/students/onlymine", setStudents, null, null, (result) => {
        setStudents(result.data);
        setFiltered(result.data);
    }), [])

    function changeHandler(e) {
        e.preventDefault();
        toggleDeleteSuccess(false);
        setQ(e.target.value);
        if (e.target.value)
            setFiltered(students.filter((s) => {
                return s.name.toLowerCase().includes(e.target.value.toLowerCase());
            }));
        else
            setFiltered(students);
    }

    function handleDeleteButton(e, id) {
        const afterSuccess = filtered.filter((s) => s.id !== id);
        const afterSuccess2 = students.filter((s) => s.id !== id);

        toggleDeleteSuccess(false);
        void goDelete(`/students/${id}`, setFiltered, null, toggleDeleteSuccess, null, (result, setData) => {
            setData(afterSuccess);
            setStudents(afterSuccess2);
        });
    }

    function handleEditButton(e, id) {
        alert("Deze functie is helaas nog niet klaar.");
    }

    function handleAddButton(e) {
        alert("Deze functie is helaas nog niet klaar.");
    }

    return (
        <>
            <h2>Leerlingen</h2>
            {error && <span>Er is een fout opgetreden.</span>}
            {!error &&
                <>
                    {loading && <span>Aan het laden ...</span>}
                    {!loading &&
                        <>
                            {deleteSuccess
                                ? <span>leerling verwijderd!</span>
                                : <>
                                    {Object.keys(students).length <= 0 &&
                                        <span>Je hebt nog geen leerlingen toegevoegd</span>}
                                    {Object.keys(students).length > 0 &&
                                        <>
                                            {(Object.keys(filtered).length === 0 && q.length > 0)
                                                ? <span>zoekopdracht leverde niets op</span>
                                                : <span>Dit zijn jouw mentor leerlingen</span>
                                            }
                                        </>
                                    }
                                </>
                            }
                            {Object.keys(students).length > 0 &&
                                <>
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>naam</th>
                                            <td>&nbsp;</td>
                                            <th>acties</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td colSpan="2"><input type="text" name="q" value={q}
                                                                   onChange={changeHandler} autoFocus
                                                                   autoComplete="off"
                                                                   placeholder=" type hier om te zoeken"/></td>
                                            <td>
                                                <button type="button" onClick={(e) => handleAddButton(e)}>toevoegen
                                                </button>
                                            </td>
                                        </tr>
                                        {filtered.map((student) => {
                                            return <tr key={student.id}>
                                                <td>{student.name}</td>
                                                <td>{student.className}</td>
                                                <td>
                                                    <button type="button"
                                                            onClick={(e) => handleEditButton(e, student.id)}>wijzig
                                                    </button>
                                                    <button type="button"
                                                            onClick={(e) => handleDeleteButton(e, student.id)}>verwijder
                                                    </button>
                                                </td>
                                            </tr>
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

export default MyStudents;