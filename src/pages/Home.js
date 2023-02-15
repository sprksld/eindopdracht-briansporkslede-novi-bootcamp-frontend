import React from 'react';
import {Link} from 'react-router-dom';
import ShowDefaultPicture from "../components/showDefaultPicture/ShowDefaultPicture";

function Home() {
    return (
        <>
            <h1>Homepagina</h1>
            <section>
                <p>Deze applicatie ondersteunt bij het plannen van workshops voor een niet-bestaande middelbare school.
                    <br/>Het is een proof-of-concept, maar zou met aanpassingen echt kunnen worden gebruikt.
                </p>
                <ul>
                    <li>Mentoren voegen hun leerlingen toe aan het systeem.</li>
                    <li>De planner kan meerdere workshops klaarzetten voor leerlingen van een bepaald leerjaar.</li>
                    <li>Leerlingen kunnen eenvoudig hun interesses aangeven; eventueel tot een vastgestelde deadline.</li>
                    <li>De planner kan leerlingen koppelen aan een workshop, rekening houdend met hun interesses.</li>
                    <li>Workshopleiders zien wie ze allemaal kunnen verwachten.
                        Ook kunnen ze feedback en presentie invoeren als terugkoppeling naar de mentoren.</li>
                </ul>
            </section>
            <section>
                <p>Om de applicatie te gebruiken moet je <Link to="/inloggen">inloggen</Link>, waarna je
                    op je dashboard relevante informatie ziet, die past bij jouw rol.</p>
            </section>
            <section>
                <ShowDefaultPicture/>
            </section>
        </>
    );
}

export default Home;