import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as Io5Icons from "react-icons/io5";

import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";

function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [username, setUsername] = useState("");
    const showSidebar = () => {
        setSidebar(!sidebar);
    };
    useEffect(() => {
        if (localStorage.getItem("token") !== null) {
            setIsAuth(true);
            setUsername(localStorage.getItem("username"));
        }
    }, []);

    return (
        <>
            <IconContext.Provider value={{ color: "#fff" }}>
                <div className="navbar">
                    <Link to="#" className="menu-bars">
                        <FaIcons.FaBars
                            style={{ marginBottom: "8px" }}
                            onClick={showSidebar}
                        />
                    </Link>
                    {isAuth === true ? (
                        <>
                            <span className="user-info">
                                Hello,&nbsp;&nbsp;
                                {username.charAt(0).toUpperCase() +
                                    username.slice(1)}
                            </span>
                            <span style={{ marginLeft: "0" }}>
                                <Io5Icons.IoNotificationsOutline />
                            </span>
                            <span style={{ marginRight: "3rem" }}>
                                <Link style={{ color: "white" }} to="/logout">
                                    Logout
                                </Link>
                            </span>
                        </>
                    ) : (
                        <>
                            <li>
                                <span style={{ marginRight: "3rem" }}>
                                    <Link
                                        style={{ color: "white" }}
                                        to="/login"
                                    >
                                        Login
                                    </Link>
                                </span>
                            </li>
                            {/* <li>
                                <Link to="/signup">Signup</Link>
                            </li> */}
                        </>
                    )}
                </div>
                <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                    <ul className="nav-menu-items" onClick={showSidebar}>
                        <li className="navbar-toggle">
                            <Link to="#" className="menu-bars">
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                        <div className="bot-div">
                            <a href="https://www.facebook.com">
                                <Io5Icons.IoLogoFacebook />
                            </a>
                            <a href="https://www.twitter.com">
                                <Io5Icons.IoLogoTwitter
                                    style={{ marginLeft: "1rem" }}
                                />
                            </a>
                            <a href="https://www.linkedin.com">
                                <Io5Icons.IoLogoLinkedin
                                    style={{ marginLeft: "1rem" }}
                                />
                            </a>
                            <br />
                            <span
                                style={{
                                    marginLeft: "0",
                                    marginTop: "5px",
                                    fontSize: ".8rem",
                                }}
                            >
                                2022 All Rights Reserved
                            </span>
                        </div>
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default Navbar;
