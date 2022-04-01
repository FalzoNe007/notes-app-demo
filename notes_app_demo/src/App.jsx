import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Documents from "./pages/Documents";
import 'bootstrap/dist/css/bootstrap.min.css';
import Notes from "./pages/Notes";
import Tasks from "./pages/Tasks";
import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import NoteCreateForm from "./components/NoteCreateForm";

import NoteDetailPage from "./pages/NoteDetailPage";
function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />

                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="/documents" element={<Documents />} />
                    <Route path="/notes" element={<Notes />} />
                    <Route path="/notes/:noteId" exact element={<NoteDetailPage />} />
                    <Route path='/login' exact element={<Login />}  />
                    <Route path='/logout' exact element={<Logout />}  />
                    <Route path='/notes/create' element={<NoteCreateForm />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
