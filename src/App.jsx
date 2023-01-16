import React, {useEffect, useState} from 'react'
import loginFacade from "./utils/loginFacade.js";
import {Route, Routes} from "react-router";
import Header from "./components/Header.jsx";
import userFacade from "./utils/userFacade.js";
import Home from "./pages/Home.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignUpConfirmation from "./pages/SignUpConfirmation";
import Profile from "./pages/Profile.jsx";
import cphb from "./images/cphb.png"
import ProjectOverview from "./pages/ProjectOverview.jsx";
import adminFacade from "./utils/adminFacade.js";
import DeveloperPage from "./pages/DeveloperPage.jsx";
import UserOverview from "./pages/UserOverview.jsx";
import developerFacade from "./utils/developerFacade.js";
import ProjectHourPage from "./pages/ProjectHourPage.jsx";
import Invoice from "./pages/Invoice.jsx";

function App() {

    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        if (loginFacade.getToken()) setLoggedIn(true);
    }, []);

    return (
        <div className="main">
            <Header setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
            <Routes>
                <Route path="/" element={<Home userFacade={userFacade} setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>}/>
                <Route path="profile" element={<Profile setLoggedIn={setLoggedIn}/>}/>
                <Route path="myrecords" element={<ProjectHourPage userFacade={userFacade} developerFacade={developerFacade}/>}/>
                <Route path="developerpage" element={<DeveloperPage developerFacade={developerFacade} userFacade={userFacade}/>}/>
                <Route path="projectoverview" element={userFacade.hasUserAccess("admin",loggedIn) && <ProjectOverview adminFacade={adminFacade} userFacade={userFacade}/>}/>
                <Route path="signin" element={!loggedIn ? <SignIn setLoggedIn={setLoggedIn}/> : <Home loggedIn={loggedIn}/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="useroverview" element={userFacade.hasUserAccess("admin",loggedIn) && <UserOverview userFacade={userFacade}/>}/>
                <Route path="/SignUpConfirmation" element={<SignUpConfirmation/>}/>
                <Route path="invoice" element={<Invoice/>}/>
                <Route path="*" element={<h1>Page Not Found !!!!</h1>}/>
            </Routes>

            <br/>
            <br/>
            <footer className="container">
                &copy;Copyright 2022 | <a
                href="https://www.cphbusiness.dk/"
                target="_blank"
                rel="noreferrer noopener"
            >CphBusiness</a>
                <p className="footer-right">
                    <img src={cphb} width="175px" height="30px"/>
                </p>
            </footer>



        </div>
    )
}

export default App
