import React,{ useState } from 'react';
import axios from 'axios';
import path2url from "../../helpers/path2url";

function WorkshopBanner() {
  const [file, setFile] = useState([]);
  const [previewUrl, setPreviewUrl] = useState('');
  const [addSuccess, toggleAddSuccess] = useState(false);

  function handleImageChange(e) {
    // Sla het gekozen bestand op
    const uploadedFile = e.target.files[0];
    console.log(uploadedFile);
    // Sla het gekozen bestand op in de state
    setFile(uploadedFile);
    // Sla de preview URL op zodat we deze kunnen laten zien in een <img>
    setPreviewUrl(URL.createObjectURL(uploadedFile));
  }

  async function sendImage(e) {
    // Voorkom een refresh op submit
    e.preventDefault();

    // maak een nieuw FormData object (ingebouwd type van JavaScript)
    const formData = new FormData();
    // Voeg daar ons bestand uit de state aan toe onder de key "file"
    formData.append("file", file);

    try {
      const jwt = localStorage.getItem("token");
      // verstuur ons formData object en geef in de header aan dat het om een form-data type gaat
      const result = await axios.post(path2url("/upload-default"), formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${jwt}`,
          },
        });
      console.log(result.data);
      localStorage.setItem( 'bannerUrl', result.data.url );
      toggleAddSuccess(true);
    } catch (e) {
      console.error(e)
    }
  }

  // console.log(auth);

  return (
    <div className="page-container">
      <h1>Afbeelding uploaden en preview bekijken</h1>
      <p>Op de pagina kun je een afbeelding uploaden voor deze workshopronde.
        <br/>De afbeelding wordt getoond op de homepage en tijdens het inloggen.</p>

      { (addSuccess) ? <span><strong>Uploaden is gelukt!</strong></span> : <span>&nbsp;</span>}

      <form onSubmit={sendImage}>
        <section>

        <label htmlFor="student-image">
          Kies afbeelding:
          <input type="file" name="image-field" id="student-image" onChange={handleImageChange} onClick={ (e) => toggleAddSuccess(false)} />
        </label>
        {/*Als er een preview url is, dan willen we deze in een afbeelding tonen*/}
        {previewUrl &&
          <label>
            Preview:
            <img src={previewUrl} alt="Voorbeeld van de afbeelding die zojuist gekozen is" className="image-preview"/>
          </label>
        }
        <button type="submit">Uploaden</button>
        </section>
      </form>
    </div>
  );
}

export default WorkshopBanner;