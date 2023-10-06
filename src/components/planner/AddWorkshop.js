import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import goFetch from "../../helpers/goFetch";
import goStore from "../../helpers/goStore";

function AddWorkshop() {
    const {isAuth, toggleIsAuth, email, setEmail, user} = useContext(AuthContext);
    const [addSuccess, toggleAddSuccess] = useState(false);

    const [data, setData] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [rooms, setRooms] = useState([]);

    const [formCompleted, setFormCompleted] = useState(false);
    const [formData, setFormData] = useState({
        dtStart: "",
        dtDate: "",
        dtTime: "",
        duration: 0,
        room: "",
        category: "",
        maxGradeYear: 0,
        minGradeYear: 0,
        title: "",
        description: "",
        teacher_id: 0,
        creator_id: user.teacher_id,
        minParticipants: 0,
        maxParticipants: 0,
        dtReservationsStart: "",
        dtReservationsEnd: "",
    });

    const navigate = useNavigate();

    useEffect(() => void goFetch("/workshops/categories", setCategories), []);

    useEffect(() => void goFetch("/workshops/rooms", setRooms), []);

    useEffect(() => void goFetch("/teachers/list", setTeachers), []);

    function changeHandler(e) {
        toggleAddSuccess(false);
        const value = (e.target.type === "checkbox" ? e.target.checked : e.target.value);
        setFormData({...formData, [e.target.name]: value});
        checkFormCompleted();
    }

    function checkFormCompleted() {
        setFormCompleted(false);
        if (formData.description.length < 10)
            return;
        if (formData.title.length < 6)
            return;
        if (!formData.dtDate)
            return;
        if (!formData.dtTime)
            return;
        if (formData.duration < 5)
            return;
        if (formData.category.length < 2)
            return;
        if ((formData.minGradeYear > 0 || formData.maxGradeYear > 0) && formData.minGradeYear > formData.maxGradeYear)
            return;

        setFormCompleted(true);
    }

    function submitHandler(e) {
        e.preventDefault();
        console.log(`Nieuwe workshop wordt verwerkt ...`);

        formData.dtStart = [formData.dtDate, formData.dtTime].join('T');

        if (!formData.teacher_id) {
            formData.teacher_id = null;
        }

        // console.log(formData);

        void goStore("/workshops", {...formData, teacher: {"teacher": formData.teacher_id}}
            , null, toggleAddSuccess, null, () => {navigate("/dashboard")});

    }

    return (
        <>
            <h2>Toevoegen workshop</h2>
            {(addSuccess === true) ?
                <span>Workshop toegevoegd. Je kunt direct verder met de volgende workshop. Refresh de pagina om de nieuwe workshops.</span> :
                <span>vul alle velden in om een workshop toe te voegen</span>
            }

            <form onSubmit={submitHandler} className="add-workshop">
                <section>
                    <label htmlFor="dtDate">Datum van workshop:
                        <input required id="dtdDate" type="date" name="dtDate" value={formData.dtDate}
                               onChange={changeHandler}/>
                    </label>
                    <label htmlFor="dtTime">Tijdstip van workshop:
                        <input id="dtTime" type="time" name="dtTime" min="08:00" step="300" value={formData.dtTime}
                               onChange={changeHandler}/>
                    </label>
                    <label htmlFor="duration">Aantal minuten: {formData.duration}
                        <input id="duration" type="range" name="duration" value={formData.duration} max="120"
                               list="durationMarkers"
                               onChange={changeHandler}/>
                    </label>
                    <datalist id="grade">
                        <option value="1"></option>
                        <option value="2"></option>
                        <option value="3"></option>
                        <option value="4"></option>
                        <option value="5"></option>
                        <option value="6"></option>
                    </datalist>

                    <label htmlFor="minGradeYear">Vanaf leerjaar: {formData.minGradeYear}
                        <input id="minGradeYear" type="range" name="minGradeYear" min="0" max="6" list="grade"
                               value={formData.minGradeYear} onChange={changeHandler}/>
                    </label>
                    <label htmlFor="maxGradeYear">t/m leerjaar: {formData.maxGradeYear}
                        <input id="maxGradeYear" type="range" name="maxGradeYear" min="0" max="6" list="grade"
                               value={formData.maxGradeYear}
                               onChange={changeHandler}/>
                    </label>
                    <datalist id="durationMarkers">
                        <option value="15"></option>
                        <option value="20"></option>
                        <option value="30"></option>
                        <option value="40"></option>
                        <option value="45"></option>
                        <option value="50"></option>
                        <option value="60"></option>
                        <option value="90"></option>
                        <option value="120"></option>
                    </datalist>
                    <label htmlFor="category">Categorie:
                        <input type="text" id="category" name="category" placeholder="typ of kies categorie"
                               value={formData.category} onChange={changeHandler}
                               autoComplete="off" list="list-of-categories"/>
                        <datalist id="list-of-categories">
                            {Object.keys(categories).length > 0 && categories.map((value, categoryKey) => {
                                return (<option key={categoryKey} value={value}>{value}</option>)
                            })}
                        </datalist>
                    </label>
                    <label htmlFor="room">Lokaal:
                        <input type="text" id="room" name="room" placeholder="typ of kies lokaal"
                               value={formData.room} onChange={changeHandler}
                               autoComplete="off" list="list-of-rooms"/>
                        <datalist id="list-of-rooms">
                            {Object.keys(rooms).length > 0 && rooms.map((value, roomKey) => {
                                return (<option key={roomKey} value={value}>{value}</option>)
                            })}
                        </datalist>
                    </label>
                </section>

                <section>
                    <label htmlFor="minParticipants">Min. deelnemers: {formData.minParticipants}
                        <input id="minParticipants" type="range" name="minParticipants" max="100" list="markers"
                               value={formData.minParticipants}
                               onChange={changeHandler}/>
                    </label>
                    <label htmlFor="maxParticipants">Max. deelnemers: {formData.maxParticipants}
                        <input id="maxParticipants" type="range" name="maxParticipants" max="100" list="markers"
                               value={formData.maxParticipants}
                               onChange={changeHandler}/>
                    </label>
                    <datalist id="markers">
                        <option value="5"></option>
                        <option value="10"></option>
                        <option value="15"></option>
                        <option value="20"></option>
                        <option value="25"></option>
                        <option value="30"></option>
                        <option value="35"></option>
                        <option value="40"></option>
                        <option value="50"></option>
                        <option value="60"></option>
                        <option value="75"></option>
                        <option value="100"></option>
                    </datalist>

                    <label htmlFor="dtReservationsStart">Te reserveren vanaf:
                        <input id="dtReservationsStart" type="datetime-local" name="dtReservationsStart"
                               value={formData.dtReservationsStart} onChange={changeHandler}/>
                    </label>
                    <label htmlFor="dtReservationsEnd">Te reserveren tot:
                        <input id="dtReservationsEnd" type="datetime-local" name="dtReservationsEnd"
                               value={formData.dtReservationsEnd} onChange={changeHandler}/>
                    </label>
                </section>

                <section>
                    <label htmlFor="title">Titel van de workshop:
                        <input id="title" type="text" name="title" value={formData.title}
                               onChange={changeHandler}/></label>
                    <label htmlFor="description">Omschrijving:

                        <p>
                        <textarea name="description" id="description" rows="8" minLength="10"
                                  onChange={changeHandler} value={formData.description}/>
                        </p></label>

                    <label htmlFor="teacher_id">Docent:
                        <p>
                            <select id="teacher_id" name="teacher_id" value={formData.teacher_id}
                                    onChange={changeHandler}>
                                <option value="0">--- kies docent ---</option>
                                {teachers.map((teacher) => {
                                    return <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                                })}
                            </select>
                        </p></label>
                    <button type="submit" disabled={!formCompleted} onSubmit={submitHandler}>Workshop inplannen</button>

                </section>

            </form>
        </>
    );
}

export default AddWorkshop;