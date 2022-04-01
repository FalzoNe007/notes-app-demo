import React, { useState, useEffect, Fragment } from "react";
import Button from 'react-bootstrap/Button'

import "./Auth.css";

const Logout = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem("token") == null) {
            window.location.replace("http://localhost:3000/login");
        } else {
            setLoading(false);
        }
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();

        fetch("http://127.0.0.1:8000/api/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                localStorage.clear();
                window.location.replace("http://localhost:3000/login");
            });
    };

    return (
        <div className="auth">
            {loading === false && (
                <Fragment>
                    <h1>Are you sure you want to logout?</h1>
                    
                    <Button size='lg' onClick={handleLogout} variant="dark">Logout</Button>
                </Fragment>
            )}
        </div>
    );
};

export default Logout;
