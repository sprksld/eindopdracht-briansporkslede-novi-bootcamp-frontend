import React, {useContext, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import goStore from "../../helpers/goStore";

function AddStudent() {
    const {user} = useContext(AuthContext);
    console.log("USER:", user);
    const [addSuccess, toggleAddSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        gender: "",
        gradeYear: 0,
        className: "",
    });

    function changeHandler(e) {
        toggleAddSuccess(false);
        const value = (e.target.type === "checkbox" ? e.target.checked : e.target.value);
        setFormData({...formData, [e.target.name]: value});
    }

    function addStudent(e) {
        e.preventDefault();
        void goStore("/students", {
            ...formData,
            mentor_id: user.teacher_id,
            mentor: {"id": user.teacher_id},
        }, null, toggleAddSuccess);
    }

    return (
        <>
            <h2>Leerling toevoegen</h2>
            {(addSuccess === true) ?
                <span>Leerling toegevoegd. Ga verder of ververs de pagina.</span> :
                <span>vul alle velden in om een leerling toe te voegen</span>
            }

            <div className="page-container">
                <form onSubmit={addStudent} className="add-student">
                    <section>
                        <label htmlFor="student-name">
                            Naam voluit:
                            <input required type="text" name="name" id="student-name" value={formData.name}
                                   onChange={changeHandler} autoComplete="off"/>
                        </label>
                        <label htmlFor="gender">Geslacht:&nbsp;
                            <select required name="gender" id="gender" value={formData.gender} onChange={changeHandler}>
                                <option value="">?</option>
                                <option value="X">x</option>
                                <option value="M">man</option>
                                <option value="V">vrouw</option>
                            </select>
                        </label>
                        <datalist id="grade">
                            <option value="1"></option>
                            <option value="2"></option>
                            <option value="3"></option>
                            <option value="4"></option>
                            <option value="5"></option>
                            <option value="6"></option>
                        </datalist>
                        <label htmlFor="gradeYear">
                            Leerjaar: {formData.gradeYear}
                            <input type="range" min="0" max="6" id="gradeYear" list="grade" name="gradeYear"
                                   value={formData.gradeYear}
                                   onChange={changeHandler}/>
                        </label>
                        <label htmlFor="studentClassname">
                            Klasnaam:
                            <input required type="text" name="className" value={formData.className}
                                   onChange={changeHandler}
                                   maxLength="8"/>
                        </label>
                        <button type="submit">Voeg toe</button>
                    </section>
                </form>

            </div>
        </>
    );
}

export default AddStudent;