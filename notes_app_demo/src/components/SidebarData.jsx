import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import {IoDocuments} from "react-icons/io5";
import { GiShare } from "react-icons/gi";
import {CgNotes} from "react-icons/cg";
import { BsShare } from "react-icons/bs";

export const SidebarData = [
    {
        title: "Home",
        path: "/",
        icon: <AiIcons.AiFillHome />,
        cName: "nav-text",
    },
    {
        title: "Tasks",
        path: "/tasks",
        icon: <FaIcons.FaTasks />,
        cName: "nav-text",
    },
    {
        title: "Documents",
        path: "/documents",
        icon: <IoDocuments />,
        cName: "nav-text",
    },
    {
        title: "Notes",
        path: "/notes",
        icon: <CgNotes />,
        cName: "nav-text",
    },
    {
        title: "Output",
        path: "/output",
        icon: <GiShare />,
        cName: "nav-text",
    },
    {
        title: "Support",
        path: "/support",
        icon: <BsShare />,
        cName: "nav-text",
    },
   
];
