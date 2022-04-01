import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import NoteDetail from '../components/NoteDetail';

const NoteDetailPage = ({ match }) => {
    const { noteId } = useParams();
    const [note, setNote] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      if (localStorage.getItem("token") === null) {
        window.location.replace("http://localhost:3000/login");
    }else{
      const URL = "http://127.0.0.1:8000/api"
      const fetchNote = async () => {
        setLoading(true);
        setError(false);
        try {
          const result = await axios.get(`${URL}/${noteId}`);
          setNote(result.data);
        } catch (error) {
          setError(true);
        }
        setLoading(false);
      };
      // Call the API
      fetchNote();
    }
    }, [noteId]);
  
    return (
      <>
        <Link to={`/notes`}>Go back to Notes</Link>
        {loading && (
          <div style={{ color: `green` }}>
            loading note detail for note ID: <strong>{noteId}</strong>
          </div>
        )}
        {error && (
          <div style={{ color: `red` }}>
            some error occurred, while fetching api
          </div>
        )}
        {note && <NoteDetail note={note} />}
      </>
    );
  };

export default NoteDetailPage