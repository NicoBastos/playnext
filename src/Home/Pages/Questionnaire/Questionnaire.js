import './Questionnaire.css'
import { Route, Routes, Link } from 'react-router-dom'
import React, { useState } from 'react';



function Questionnaire() {

    return(
       
        <div className = 'Questionnaire'>
        <p>Questionnaire</p>
        <q1>Please select the genres you would like to add to the queue.<br />

            (Press the 'all genres' button if you wish to select all genres.)
        </q1>
        </div>
    )
}

export default Questionnaire