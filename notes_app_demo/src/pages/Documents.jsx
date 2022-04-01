import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

const DOCUMENTS_URL = "http://127.0.0.1:8000/api/documents/";
// const FILE_URL = "http://127.0.0.1:8000/api/file/";

function Documents() {
    const [documents, setDocuments] = useState([]);
    // const [filename, setFilename] = useState("");
    // const [decodedString, setDecodedString] = useState("");

    const getDocuments = async () => {
        await axios
            .get(DOCUMENTS_URL)
            .then((response) => {
                console.log(response.data);
                setDocuments(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    // const getFile = () => {
    //     axios
    //         .get(FILE_URL + `${filename}`)
    //         .then((response) => {
    //             console.log(response.data);
    //             setDecodedString(atob(response.data));
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };

    useEffect(() => {
        getDocuments();
    }, []);

    return (
        <>
            <h1 style={{ textAlign: "center" }}>Documents</h1>
            <Button style={{ margin: "5px 30px" }} variant="dark">
                Create New Document
            </Button>
            <div className="doc-container">
                <div className="docList">
                    {documents.map((document, id) => {
                        console.log(document.upload);
                        return (
                            <>
                                <a href={document.upload}>
                                <div className="document" key={id}>
                                    <h4>{document.name}</h4>
                                    <span>
                                        {(document.file_size / 1024).toFixed(2)}
                                        &nbsp;&nbsp;KB
                                    </span>
                                    <span>
                                        &bull;
                                        {document.uploaded_at.replace(
                                            /-/g,
                                            " "
                                        )}
                                    </span>
                                </div>
                                </a>
                            </>
                        );
                    })}
                </div>
                {/* <div style={{ maxWidth: "35%", overflowX: "scroll" }}>
                    {decodedString}
                </div> */}
            </div>
        </>
    );
}

export default Documents;
