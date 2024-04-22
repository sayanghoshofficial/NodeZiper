import React, { useEffect, useState } from 'react'
import MainScreen from '../../MainScreen';
import { Link } from 'react-router-dom';
import { Button, Card, Badge, Accordion } from 'react-bootstrap';
// import { notes } from './mockData';
import axios from "axios";

const MyNotes = () => {
  const [notes, setNotes]  = useState([])

  const fetchNotes = async()=>{
    try {
      const res = await axios.get("http://localhost:5000/api/notes");
      setNotes(res?.data)
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  useEffect(()=>{
    fetchNotes()
  },[])

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {

    }
  }
  return (
    <MainScreen title={"Welcome back Sayan..."}>
      <Link to="createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size='lg'>
          Create New Notes
        </Button>
      </Link>
      {notes.map((note, i) =>
        <Accordion flush key={note?._id}>
          <Accordion.Item eventKey={i}>
            <Card style={{ margin: 10 }}>
              <Card.Header style={{ display: 'flex' }}>
                <Accordion.Header style={{width:"100%"}}>
                  <span style={{ color: 'black', textDecoration: 'none', flex: 1, cursor: 'pointer', alignSelf: 'center', fontSize: 18 }}>

                    {note?.title}

                  </span>
                  <div>
                    <Button href={`/note/${note?._id}`}>Edit</Button>
                    <Button varient='danger' className='mx-2' onClick={() => deleteHandler(note?._id)}>Delete</Button>
                  </div>
                </Accordion.Header>
              </Card.Header>
              <Card.Body>
                <Accordion.Body style={{width:"100%"}}>
                  <h4><Badge varient="success" style={{backgroundColor:"green", color:"white"}}>Catagory - {note?.category}</Badge></h4>
                  <blockquote className="blockquote mb-0">
                    <p>
                      {note?.content}
                    </p>
                    <footer className="blockquote-footer">
                      Someone famous in <cite title="Source Title">Source Title</cite>
                    </footer>
                  </blockquote>
                </Accordion.Body>
              </Card.Body>
            </Card>
          </Accordion.Item>
        </Accordion>
      )}
    </MainScreen>
  )
}

export default MyNotes;