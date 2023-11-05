import './Questionnaire.css'
import { Route, Routes, Link } from 'react-router-dom'
import React, { useState } from 'react';



function Questionnaire() {
    const [genreOptions, setGenre] = useState('');


    return(
        <div className = 'Questionnaire'>
        <p>Questionnaire</p>
        <q1>Please select the genres you would like to add to the queue.<br />
        <p>Genre: {genreOptions}</p>
        <select value={genreOptions} onChange={e => setGenre(e.target.value)}>
            <option value="Alternative">Alternative</option>
            <option value="Blues">Blues</option>
            <option value="Classical">Classical</option>
            <option value="Country">Country</option>
            <option value="EDM">EDM</option>
            <option value="Indie">Indie</option>
            <option value="Hip-hop">Hip-hop</option>
            <option value="Rock">Rock</option>
            <option value="Pop">Pop</option>
        </select>

            (Press the 'all genres' button if you wish to select all genres.)
        </q1>
        </div>
    )
}

export default Questionnaire