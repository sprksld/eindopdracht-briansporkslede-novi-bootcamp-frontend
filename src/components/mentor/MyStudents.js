import React, {useState, useEffect} from 'react';
import goFetch from "../../helpers/goFetch";
import goDelete from "../../helpers/goDelete";

function MyStudents() {
    const [deleteSuccess, toggleDeleteSuccess] = useState(false);
    const [students, setStudents] = useState([]);
    const [filtered, setFiltered] = useState([]);

    const [q, setQ] = useState("");

    useEffect(() => void goFetch("/students/onlymine", setStudents, null, null, (result) => {
        setFiltered(result.data)
    }), [])

    function changeHandler(e) {
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
        toggleDeleteSuccess(false);
        void goDelete(`/students/${id}`, setFiltered, null, toggleDeleteSuccess, null, (result, setData) => {
            setData(afterSuccess)
        });
    }

    function handleEditButton(e) {
        e.preventDefault();
        alert("Deze functie is helaas nog niet klaar.");
    }

    function handleAddButton(e) {
        e.preventDefault();
        alert("Deze functie is nog niet klaar.\nScroll even naar beneden om iemand toe te voegen.");
    }

    return (
        <>
            <h2>Mentorleerlingen</h2>
            <h4>lijst van je mentorleerlingen</h4>
            {(deleteSuccess) ? <span>student verwijderd!</span> : <span>&nbsp;</span>}
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
                    <td colSpan="2"><input type="text" name="q" value={q} onChange={changeHandler} autoFocus
                                           autoComplete="off" placeholder=" type hier om te zoeken"/></td>
                    <td>
                        <button onClick={(e) => handleAddButton(e)}>toevoegen</button>
                    </td>
                </tr>
                {filtered.map((student) => {
                    return <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.className}</td>
                        <td>
                            <button onClick={(e) => handleEditButton(e, student.id)}>wijzig</button>
                            <button onClick={(e) => handleDeleteButton(e, student.id)}>verwijder</button>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
        </>
    );
}


export default MyStudents;