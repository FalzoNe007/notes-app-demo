import React from "react";
import "./NoteDetail.css";
import { Editor, EditorState, convertFromRaw } from "draft-js";

const NoteDetail = ({ note }) => {
    const contentState = convertFromRaw(JSON.parse(note.description));
    const editorState = EditorState.createWithContent(contentState);
    return (
        <section id="note">
            <div>
                <img
                    alt={`${note.title} Note`}
                    src={note.image}
                    style={{ width: "200px", height: "200px" }}
                />
                <h3>
                    <strong>Title:</strong> {note.title}
                </h3>
                <p>
                    <strong>Created Date:</strong> {note.created_at}
                </p>
                <p>
                    <strong>Last modified:</strong> {note.updated_at}
                </p>
                <div>Description:
                    <Editor editorState={editorState} readOnly={true} />
                </div>
            </div>
        </section>
    );
};

export default NoteDetail;
