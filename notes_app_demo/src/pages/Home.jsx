import React, { useState, useEffect, Fragment } from "react";

const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            window.location.replace("http://localhost:3000/login");
        } else {
            fetch("http://127.0.0.1:8000/api/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setLoading(false);
                });
        }
    }, []);

    return (
        <div
            style={{
                margin: "auto",
                textAlign: "center",
                width: "50%",
                fontSize: "2rem",
            }}
        >
            {loading === false && (
                <Fragment>
                    <h1>Home</h1>
                </Fragment>
            )}
        </div>
    );
};

export default Home;
