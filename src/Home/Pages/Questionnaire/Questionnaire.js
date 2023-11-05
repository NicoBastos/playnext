import './Questionnaire.css'
import { Route, Routes, Link } from 'react-router-dom'
import React, { useState } from 'react'
import { Button, ButtonGroup, Center, Card } from "@chakra-ui/react"


function Questionnaire() {
    const [selectedGenres, setGenres] = useState([]);

    const toggleGenre = (genre) => {
        if (selectedGenres.includes(genre)) {
            setGenres(selectedGenres.filter(item => item !== genre));
        } else if (selectedGenres.length < 3) {
            setGenres([...selectedGenres, genre]);
        }
    };

    const buttonStyle = {
        fontSize: "16px",
        fontWeight: "bold",
        backgroundColor: "blue.500",
        color: "gray",
        _hover: {
            backgroundColor: "blue.600",
        },
    };

    return(
        <Center>
            <Card>
                <div className = 'Questionnaire'>
                <p>Questionnaire</p>
                <p>Please select the genres you would like to add to the queue.</p>
                <p>Genre: {selectedGenres.join(', ')}</p>
                <Button value="Alternative" onClick={e => toggleGenre(e.target.value)}>Alternative</Button>
                <Button value="Blues" onClick={e => toggleGenre(e.target.value)}>Blues</Button>
                <Button value="Classical" onClick={e => toggleGenre(e.target.value)}>Classical</Button>
                <Button value="Country" onClick={e => toggleGenre(e.target.value)}>Country</Button>
                <Button value="EDM" onClick={e => toggleGenre(e.target.value)}>EDM</Button>
                <Button value="Indie" onClick={e => toggleGenre(e.target.value)}>Indie</Button>
                <Button value="Hip-hop" onClick={e => toggleGenre(e.target.value)}>Hip-hop</Button>
                <Button value="Rock" onClick={e => toggleGenre(e.target.value)}>Rock</Button>
                <Button value="Pop" onClick={e => toggleGenre(e.target.value)}>Pop</Button>
                <div>
                    <Button>Queue!</Button>
                </div>
                </div>

            </Card>
        </Center>
    )
}

export default Questionnaire