
import React, { useState, useEffect } from "react";
import "./../../node_modules/bootstrap/dist/css/bootstrap.css";
import { messaging } from "../firebase";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import "../CSS/custom.css";
import Navbar from '../components/navbar'
import { onMessage, getToken } from "firebase/messaging";
//import { onBackgroundMessage } from "firebase/messaging/sw";
import { MSG, Msg } from '../backgroundMsgs'


function GetNotify() {
    const [serverKey, setserverKey] = useState("");
    const [tokken, settokken] = useState("");
    const [body, setBody] = useState("");
    const [title, setTitle] = useState("");
    const [alertTxt, setAlertTxt] = useState("");
    const [alertIcon, setAlertIcon] = useState("");

    const [payload, setpayload] = useState([]);

    const addObjectToArray = obj => {
        console.log('obj', obj)
        setpayload(current => [...current, obj]);
        console.log('DATA', payload)
    };


    useEffect(() => {

        try {
            MSG()
            console.log('item1', localStorage.getItem('body'))
            console.log('item2', localStorage.getItem('title'))
            addObjectToArray({
                body: localStorage.getItem('body'),
                title: localStorage.getItem('title')
            })
        } catch (e) {
            console.log('ex', e)
        }
        onMessage(messaging, (payload) => {
            console.log('msg', payload.notification.body)
            console.log('title', payload.notification.title)
            addObjectToArray({
                body: payload.notification.body,
                title: payload.notification.title
            })
        });


        getToken(messaging, { vapidKey: 'BBPbyWdLuf6q_o4j0DoRL7voH1QI_XWhHkr43sMXjAk3mSaCvGAL0aPOXRh4WL8rphNWVSoxCrbZOpc4IoRcOUg' })
            .then((currentToken) => {
                if (currentToken) {
                    console.log('current token for client: ', currentToken);
                    settokken(currentToken)
                } else {

                    console.log('No registration token available. Request permission to generate one.');
                }
            })
            .catch((err) => {
                console.log('An error occurred while retrieving token. ', err.message);
            });




    }, [])




    useEffect(() => {
        const timer = setTimeout(() => {
            setAlertIcon("");
            setAlertTxt("");
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

    const customAlert = (type, text) => <Alert severity={type}>{text}</Alert>;

    return (
        <>
            <Navbar />
            <div className="container-fluid mt-2 ml-2 ml-md-0">
                <div className="row bg-gray-200 flex justify-content-center ">
                    <div className="col-lg-5 col-10 px-4 mx-5 mt-2 mt-md-0 border rounded-3 shadow">
                        {/*  */}
                        <div className="header">
                            <h4 className="text-secondary m-2 mx-auto">
                                Notification Tester
                            </h4>
                        </div>
                        <label htmlFor="server key" className="form-label">
                            <div className="label">
                                Server Key <span className="text-danger fw-bolder">*</span>
                            </div>
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
                            <div className="label">
                                FCM Registration Token (Device Token)&nbsp;
                                <span className="text-danger fw-bolder">*</span>
                            </div>
                        </label>
                        <input
                            readOnly // send in props
                            type="text"
                            className="form-control mb-2"
                            placeholder="FCM Registration Token (Device Token)"
                            onChange={(e) => {
                                settokken(e.target.value);
                            }}
                            value={tokken}
                        />
                        <label htmlFor="fcm reg" className="form-label">
                            <div className="label">
                                Title&nbsp;
                                <span className="text-danger fw-bolder">*</span>
                            </div>
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
                            <div className="label">
                                Body&nbsp;
                                <span className="text-danger fw-bolder">*</span>
                            </div>
                        </label>
                        <textarea
                            className="form-control mb-2"
                            placeholder="Notification Body"
                            onChange={(e) => {
                                setBody(e.target.value);
                            }}
                            value={body}
                        />
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
                        <div className="row mx-auto mt-4">
                            <button
                                style={{
                                    backgroundColor: "#4CAF50",
                                }}
                                className="col-12 btn text-white"
                                onClick={onSubmit}
                            >
                                <h4>Push Notification</h4>
                            </button>
                        </div>
                        {customAlert(alertIcon, alertTxt)}
                    </div>

                    <div className="col-lg-5 col-10 px-4 mx-5 mt-2 mt-sm-0 border  rounded-3 shadow">
                        <div className="header">
                            <h4 className="text-secondary m-2 mx-auto">Notification List</h4>
                        </div>


                        <div className="row mx-auto">
                            <table className="table table-striped table-hover mt-4 table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Message</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        payload.map(i => (
                                            <tr>
                                                <td>{i.title}</td>
                                                <td>{i.body}</td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GetNotify;