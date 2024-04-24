import React, { useEffect } from 'react'
import MainScreen from '../../MainScreen';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Badge, Accordion } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNotes, listNotes } from '../../../Redux/actions/noteActions';
import Loader from '../../Loader/Loader';
import ErrorMessage from "../../ErrorMessage/ErrorMessage"

const MyNotes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const noteList = useSelector(state => state.noteList)
  const { loading, notes, error } = noteList;
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin;
  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;
  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;
  const noteDelete = useSelector(state => state.noteDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = noteDelete;


  useEffect(() => {
    dispatch(listNotes())
    if (!userInfo) {
      navigate('/')
    }
  }, [dispatch, successCreate, navigate, userInfo, successUpdate, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNotes(id))
    }
  }
  return (
    <MainScreen title={`Welcome back ${userInfo?.name}...`}>
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size='lg'>
          Create New Notes
        </Button>
      </Link>
      {errorDelete && <ErrorMessage varient='danger'>{errorDelete}</ErrorMessage>}
      {loadingDelete && <Loader />}
      {error && <ErrorMessage varient='danger'>{error}</ErrorMessage>}
      {loading && <Loader />}
      {notes && notes?.reverse().map((note, i) =>
        <Accordion flush key={note?._id}>
          <Accordion.Item eventKey={i}>
            <Card style={{ margin: 10 }}>
              <Card.Header style={{ display: 'flex' }}>
                <Accordion.Header style={{ width: "100%" }}>
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
                <Accordion.Body style={{ width: "100%" }}>
                  <h4><Badge varient="success" style={{ backgroundColor: "green", color: "white" }}>Catagory - {note?.category}</Badge></h4>
                  <blockquote className="blockquote mb-0">
                    <p>
                      {note?.content}
                    </p>
                    <footer className="blockquote-footer">
                      - Created on <cite title="Source Title">{note?.createdAt.substring(0, 10)}</cite>
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