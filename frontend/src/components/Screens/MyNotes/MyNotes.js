import React from 'react'
import MainScreen from '../../MainScreen';
import { Link } from 'react-router-dom';
import { Button, Card , Badge} from 'react-bootstrap';
import { notes } from './mockData';

const MyNotes = () => {

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
      {notes.map(note =>

        <Card style={{ margin: 10 }}>
          <Card.Header style={{ display: 'flex' }}>
            <span style={{ color: 'black', textDecoration: 'none', flex: 1, cursor: 'pointer', alignSelf: 'center', fontSize: 18 }}>{note?.title}</span>
            <div>
              <Button href={`/note/${note?._id}`}>Edit</Button>
              <Button varient='danger' className='mx-2' onClick={() => deleteHandler(note?._id)}>Delete</Button>
            </div>
          </Card.Header>
          <Card.Body>
          <h4><Badge varient="success">Catagory - {note?.category}</Badge></h4>
            <blockquote className="blockquote mb-0">
              <p>
                {note?.content}
              </p>
              <footer className="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </footer>
            </blockquote>
          </Card.Body>
        </Card>
      )}
    </MainScreen>
  )
}

export default MyNotes;