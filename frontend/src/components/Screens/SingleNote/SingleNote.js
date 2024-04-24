import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import MainScreen from "../../MainScreen";
import axios from "axios";
import { BASE_URL } from "../../utils";
import { deleteNotes, updateNotes } from "../../../Redux/actions/noteActions";

const SingleNote = () => {
  const navigate = useNavigate();
  const params = useParams()
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("")

  const dispatch = useDispatch();

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;

  const noteDelete = useSelector(state => state.noteDelete)
  const { loading: loadingDelete, error: errorDelete } = noteDelete;

  // console.log(note);

  const deleteHandler = () => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNotes(params.id))
      navigate("/mynotes");
    }
  };
  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    if (!title || !content || !category) return;
    dispatch(updateNotes(params.id, title, content, category));

    resetHandler();
    navigate("/mynotes");
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`${BASE_URL}api/notes/${params.id}`)

      setTitle(data?.title)
      setContent(data?.content)
      setCategory(data?.category)
      setDate(data?.updatedAt)
    }
    fetching()
  }, [params.id, date]);

  return (
    <MainScreen title="Edit Note">
      <Card>
        <Card.Header>Edit your Note</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {errorDelete && <ErrorMessage>{errorDelete}</ErrorMessage>}
            {loadingDelete && <Loader />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {loading && <Loader />}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter the content"
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                value={category}
                placeholder="Enter the Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Update Note
            </Button>
            <Button className="mx-2" onClick={deleteHandler} variant="danger">
              Delete Note
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default SingleNote