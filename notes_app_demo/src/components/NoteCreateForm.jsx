import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NoteCreateForm.css";

// import RichTextEditor from "./RichTextEditor";
import { EditorState } from "draft-js";
import { convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const NOTE_TYPES_URL = "http://127.0.0.1:8000/api/notetypes/";
const NOTES_URL = "http://127.0.0.1:8000/api/";

const NoteCreateForm = () => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [noteTypes, setNoteTypes] = useState([]);

    const [inputs, setInputs] = useState({});
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
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };
    const handleFileChange = (event) => {
        const name = event.target.name;
        const value = event.target.files[0];
        setInputs((values) => ({ ...values, [name]: value }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = editorState.getCurrentContent();
        const content = JSON.stringify(convertToRaw(data));
        let formData = new FormData();
        formData.append("title", inputs.title);
        formData.append("description", content);
        if (inputs.upload) {
            formData.append("image", inputs.upload);
        }
        formData.append("note_type", parseInt(inputs.note_type)+1);
        for (let [key, value] of formData) {
            console.log(`${key}: ${value}`);
        }
        
        axios
            .post(NOTES_URL, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            window.location.replace("http://localhost:3000/login");
        } else {
            getNoteTypes();
        }
    }, []);
    return (
        <>
            <h1 style={{ textAlign: "center" }}>Create New Note</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Note title:
                    <input
                        type="text"
                        name="title"
                        value={inputs.title || ""}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Description:
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={setEditorState}
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class"
                        toolbarClassName="toolbar-class"
                    />
                </label>
                {/* <RichTextEditor /> */}
                {/* <label>
                    Note description:
                    <textarea
                        name="description"
                        value={inputs.description || ""}
                        onChange={handleChange}
                    />
                </label> */}
                <label>
                    Upload image:
                    <input
                        name="upload"
                        type="file"
                        onChange={handleFileChange}
                    />
                </label>
                <label>
                    Select the type of Note:
                    <br />
                    <select name="note_type" onChange={handleChange} required>
                    <option value="">--Choose the Note Type--</option>
                        {noteTypes.map((noteType, id) => {
                            return (
                                <option name="note_type" key={id} value={id}>
                                    {noteType.name}
                                </option>
                            );
                        })}
                    </select>
                </label>

                <input className="submitButton" type="submit" value="Create" />
            </form>
        </>
    );
};

export default NoteCreateForm;
