import "../CSS/custom.css";
import React, { useState, useEffect } from "react";
import "./../../node_modules/bootstrap/dist/css/bootstrap.css";
import { requestForToken } from "../firebase";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import Navbar from '../components/navbar'

export default function SendNotify() {
    const [serverKey, setserverKey] = useState("");
    const [tokken, settokken] = useState("");
    const [body, setBody] = useState("");
    const [title, setTitle] = useState("");
    const [show, setShow] = useState(true);
    const [alertTxt, setAlertTxt] = useState("");
    const [alertIcon, setAlertIcon] = useState("");

    let cnt = 0;

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log("This will run after 5 second!");
            setAlertIcon("");
            setAlertTxt("");
            requestForToken();
            // onMessageListener();

        }, 5000);
        return () => clearTimeout(timer);
    }, [alertTxt, alertIcon]);

    const onSubmit = () => {
        console.log(serverKey, tokken);

        const headers = {
            Authorization: `key=${serverKey}`,
            "Content-Type": "application/json",
        };

        const data = {
            mode: "cors",
            notification: {
                body: body,
                title: title,
            },
            data: {
                body: body,
                title: title,
                key_1: "Value for key_1",
                key_2: "Value for key_2",
            },
            to: tokken,
        };

        axios
            .post("https://fcm.googleapis.com/fcm/send", data, { headers })
            .then((response) => {
                console.log("sucess", response);
                setAlertTxt("Successfully Notified!");
                setAlertIcon("success");
            })
            .catch((error) => {
                console.log(error);
                setAlertTxt(`Some thing went wrong.\n ${error.message}`);
                setAlertIcon("error");
            });
    };

    const switch1 = () => {
        if (cnt === 0) {
            setShow(false);
            cnt++;
        } else {
            setShow(true);
            cnt = 0;
        }
    };

    const customAlert = (type, text) => <Alert severity={type}>{text}</Alert>;

    return (
        <>
            {/* <div className="container-fluid bgImage -mt-2"> */}
            <Navbar />
            <div className="container mt-md-4 mt-0 ml-2 ml-md-0 mr-2 mr-md-0">
                <div className="row bg-gray-200 flex justify-content-center">
                    <div className="col-lg-8 col-sm-12  border  rounded-3 shadow">
                        <div className="header">
                            <h4 className="text-secondary m-2 mx-auto">
                                Notification Tester
                            </h4>
                        </div>
                        <label htmlFor="server key" className="form-label mt-3">
                            <div className="label">Server Key</div>
                        </label>
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Server Key"
                            onChange={(e) => {
                                setserverKey(e.target.value);
                            }}
                            value={serverKey}
                        />
                        <label htmlFor="fcm reg" className="form-label">
                            <div className="label">FCM Registration Token (Device Token)</div>
                        </label>
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="FCM Registration Token (Device Token)"
                            onChange={(e) => {
                                settokken(e.target.value);
                            }}
                            value={tokken}
                        />
                        <label htmlFor="fcm reg" className="form-label">
                            <div className="label">Title</div>
                        </label>
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Notification Title"
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                            value={title}
                        />
                        <label htmlFor="fcm reg" className="form-label">
                            <div className="label">Body</div>
                        </label>
                        <textarea
                            className="form-control mb-2"
                            placeholder="Notification Body"
                            onChange={(e) => {
                                setBody(e.target.value);
                            }}
                            value={body}
                        />
                        {/* <span className="hide" onClick={() => switch1()}>
                            Hide Optional
                        </span> */}
                        {/* Optional */}
                        {show ? (
                            <div id="hideShow">
                                <label htmlFor="fcm reg" className="form-label">
                                    <div className="label">Click Action URL - (optional)</div>
                                </label>
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="URL to redirect"
                                />
                                <label htmlFor="fcm reg" className="form-label">
                                    <div className="label">Icon URL - (optional)</div>
                                </label>
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Icon url"
                                />
                                <label htmlFor="fcm reg" className="form-label">
                                    <div className="label">Data - (optional)</div>
                                </label>
                                <textarea
                                    className="form-control mb-2"
                                    placeholder="Must be JSON Object like {'key':'value'}"
                                />
                                <div className="row mx-auto mt-4 fs-bold">
                                    <button
                                        style={{
                                            backgroundColor: "#4CAF50",
                                            border: "2px solid #00693C",
                                        }}
                                        className="col-12 btn text-white"
                                        onClick={onSubmit}
                                    >
                                        Push Notification
                                    </button>
                                    {/* <button className="col-4 btn btn-outline-primary fs-5">
                      Save Locally
                    </button> */}
                                </div>

                                {customAlert(alertIcon, alertTxt)}
                            </div>
                        ) : null}
                        {/* </form> */}
                    </div>
                </div>
            </div>
            {/* </div> */}
        </>
    );
}

