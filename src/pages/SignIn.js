import React, {useContext, useState} from 'react';
import axios from "axios";
import path2url from "../helpers/path2url";
import {AuthContext} from "../context/AuthContext";
import ShowDefaultPicture from "../components/showDefaultPicture/ShowDefaultPicture";

function SignIn() {
    const {login} = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, toggleError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        toggleError(false);
        setErrorMessage("");

        try {
            const response = await axios.post(path2url("/authenticate"), {
                username: username,
                password: password
            });
            console.log(response.data);
            login(response.data.jwt);
        } catch (e) {
            toggleError(true);
            setErrorMessage(e.message);
            console.error(e);
        }
    }

    return (
        <>
            <h1>Inloggen</h1>

            <form onSubmit={handleSubmit} className="signin">
                <section className="submit-error">
                    {error && <strong>{errorMessage}</strong>}
                </section>

                <section>
                    <label htmlFor="username">Gebruikersnaam:
                        <input id="username" type="text" name="username" value={username}
                               onChange={(e) => setUsername(e.target.value.toLowerCase())}/>
                    </label>
                    <label htmlFor="">Wachtwoord:
                        <input id="password" type="password" name="password" value={password}
                               onChange={(e) => setPassword(e.target.value)}/>
                    </label>
                    <button onSubmit={handleSubmit}>Inloggen</button>
                </section>
            </form>

            <ShowDefaultPicture />
        </>
    );
}

export default SignIn;