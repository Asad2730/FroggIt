import React from "react";
import "../CSS/custom.css";
import logo from "../images/logo.png";
import "./../../node_modules/bootstrap/dist/css/bootstrap.css";
import {
    Link
} from "react-router-dom";

function Navbar() {
    return (
        <>

            <div className="container border-secondary border-1  px-3 my-4">
                <div className="col shadow border d-flex justify-content-between px-3 rounded-2 py-1">
                    <img
                        src={logo}
                        className=""
                        height="40rem"
                        width="auto"
                        alt="MDB Logo"
                        loading="lazy"
                    />
                    <div className="d-flex">
                        <span>
                            <Link to="/">
                                <a className="text-dark fs-4 px-3 text-decoration-none" href="">
                                    Send
                                </a>
                            </Link>
                        </span>
                        <span>
                            <Link to="/recive">
                                <a className="text-dark fs-4 px-3 text-decoration-none" href="">
                                    Receive
                                </a>
                            </Link>
                        </span>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Navbar;