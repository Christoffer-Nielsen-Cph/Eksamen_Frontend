import React from 'react';
import {NavLink} from "react-router-dom";
import LoggedIn from "./LoggedIn.jsx";
import "../styles/header.css";
import SignUpBtn from "./SignUpBtn.jsx";
import SignInBtn from "./SignInBtn.jsx";
import userFacade from "../utils/userFacade.js";

function Header({loggedIn, setLoggedIn}) {
    return (

        <nav className="topnav">
            <NavLink className="nav-home" to="/"><i></i> HOME</NavLink>

            {loggedIn ? <NavLink className="nav-home" to="developerpage"> DEVELOPER PAGE </NavLink> : null}

            {loggedIn ? <NavLink className="nav-home" to="myrecords"> MY PROJECT HOURS </NavLink> : null}

            {userFacade.hasUserAccess('admin',loggedIn) && (<NavLink className="nav-home" to="useroverview"> USER OVERVIEW </NavLink>)}

            {userFacade.hasUserAccess('admin',loggedIn) && (<NavLink className="nav-home" to="projectoverview"> PROJECT OVERVIEW </NavLink>)}

            {loggedIn ? (<NavLink className="profileIcon" to="profile"><i className="fa fa-user"></i> {userFacade.getUserName()}</NavLink>) : <></>}

            {!loggedIn ? (<SignUpBtn/>) : (<div></div>)}

            {!loggedIn ? (<SignInBtn setLoggedIn={setLoggedIn}/>) : (<div><LoggedIn setLoggedIn={setLoggedIn}/></div>)}

        </nav>
    );
}

export default Header;