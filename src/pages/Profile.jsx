import React, {useEffect, useState} from 'react';
import userFacade from "../utils/userFacade.js";
import loginFacade from "../utils/loginFacade.js";
import {useNavigate} from "react-router";
import {API_URL} from "../../settings.js";


function Profile({setLoggedIn}) {


    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const getData = async () => {
            await userFacade.getUserByUserName(userFacade.getUserName()).then((data) => {
                setActiveUser(data);
            }, "Some error")
        }
        getData();
    }, []);
    const [activeUser, setActiveUser] = useState({userName: "", userEmail: "", userPass: ""})
    const init = {
        userName: activeUser.userName,
        userEmail: activeUser.userEmail,
        userPass: activeUser.userPass,
    }
    const [newUser, setNewUser] = useState(init)


    const performUpdateUser = (evt) => {
        evt.preventDefault();
        updateUser(userFacade.getUserName(), newUser.userEmail, newUser.userPass);
    }

    const updateUser = (username, updateEmail, updatePass) => {
        userFacade.updateUser(username, updateEmail, updatePass)
    }


    const performDeleteUser = () => {
        userFacade.deleteUser(userFacade.getUserName())
        loginFacade.logout()
        setLoggedIn(false)
        navigate("/")
    }

    const onChange = (evt) => {
        setNewUser({...newUser, [evt.target.id]: evt.target.value})

    }

    const btnClick = () => {
        if (checked) {
            setChecked(false)
        }
        if (!checked) {
            setChecked(true)
        }
    }


    return (
        <div>
            <div>
                <h1>PROFILE</h1>
                <button onClick={performDeleteUser}>DELETE PROFILE</button>
                <button onClick={btnClick}>Edit profile</button>

                <p>Username: {userFacade.getUserName()}</p>
                <p>Email: {activeUser.userEmail}</p>


            </div>
            {checked ? <form onSubmit={performUpdateUser}>
                <input id="userEmail" type="text" placeholder="Type a new email" onChange={onChange}/>
                <input id="userPass" type="password" placeholder="Type a new password" onChange={onChange}/>
                <input type="submit" value="Update"/>
                <br/>
                <br/>
            </form> : null}

        </div>
    );
}

export default Profile;