import React, { useState, useEffect } from "react";
import { onMessage, getToken } from "firebase/messaging";
import { messaging } from "./../firebase";
import Form from '../components/form'

export default function List() {

    const [payload, setpayload] = useState([]);
    const [tokken, settokken] = useState("");

    const addObjectToArray = obj => {
        console.log('obj', obj)
        setpayload(current => [...current, obj]);
        console.log('DATA', payload)
    };


    useEffect(() => {
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
    return (

        <>
            <Form tkn={tokken} />
            <div className="container-fluid mt-2 ml-2 ml-md-0">
                <div className="row bg-gray-200 flex justify-content-center ">


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
    )
}