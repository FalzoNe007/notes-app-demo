import React, { useState, useEffect } from "react";
import "./Pages.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Editor, EditorState, convertFromRaw } from "draft-js";

const NOTES_URL = "http://127.0.0.1:8000/api/";
const NOTE_TYPES_URL = "http://127.0.0.1:8000/api/notetypes/";

function Notes() {
    const [notes, setNotes] = useState([]);
    const [noteTypes, setNoteTypes] = useState([]);
    const [clickedId, setClickedId] = useState(1);
    const navigate = useNavigate();

    const createNewNote = () => {
        navigate("/notes/create");
    };
    const getNotes = async () => {
        await axios
            .get(NOTES_URL)
            .then((response) => {
                // console.log(response.data);
                setNotes(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getNoteTypes = async () => {
        await axios
            .get(NOTE_TYPES_URL)
            .then((response) => {
                // console.log(response.data);
                setNoteTypes(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            window.location.replace("http://localhost:3000/login");
        } else {
            getNotes();
            getNoteTypes();
            console.log(clickedId);
        }
    }, [clickedId]);
    return (
        <>
            <div style={{ marginLeft: "3%", marginTop: "20px" }}>
                {noteTypes.map((noteType, id) => {
                    return (
                        <Button
                            style={{ marginRight: "10px" }}
                            variant="dark"
                            onClick={() => {
                                setClickedId(id);
                                getNotes();
                            }}
                            key={id}
                            className={
                                id === clickedId ? "activeButton" : "button"
                            }
                        >
                            {noteType.name}
                        </Button>
                    );
                })}
                <Button
                    onClick={createNewNote}
                    variant="dark"
                    style={{ float: "right", marginRight: "10px" }}
                >
                    Create New Note
                </Button>
            </div>
            <div>
                {notes
                    .filter((note) => note.note_type === clickedId + 1)
                    .map((note, id) => {
                        const contentState = convertFromRaw(
                            JSON.parse(note.description)
                        );
                        const editorState =
                            EditorState.createWithContent(contentState);
                        return (
                            <div
                                className="card container"
                                style={styles.card}
                                key={id}
                            >
                                <h4>{note.title}</h4>
                                {note.image ? (
                                    note.description ? (
                                        <>
                                            <img
                                                style={{
                                                    width: "80%",
                                                    height: "55%",
                                                }}
                                                src={note.image}
                                                alt=""
                                            ></img>
                                            <Link to={`/notes/${note.id}`}>
                                                Show details
                                            </Link>
                                        </>
                                    ) : (
                                        <img
                                            style={{
                                                width: "80%",
                                                height: "55%",
                                            }}
                                            src="{note.image}"
                                            alt=""
                                        ></img>
                                    )
                                ) : (
                                    <div>
                                        <Editor
                                            editorState={editorState}
                                            readOnly={true}
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
            </div>
        </>
    );
}
const styles = {
    card: {
        display: "inline-flex",
        flexWrap: "wrap",
        flexDirection: "column",
        border: "1px solid white",
        gap: "10px",
        fontSize: "1.2rem",
    },
};
export default Notes;
