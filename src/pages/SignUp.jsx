import React, {useEffect, useState} from 'react';
import userFacade from "../utils/userFacade.js";
import {useNavigate} from "react-router";

function SignUp() {

    const navigate = useNavigate()
    const init = {
        userName: "",
        userPass: "",
        userEmail: "",
        userPhone: "",
        userBillingPrHour: ""
    };
    const [userCredentials, setUserCredentials] = useState(init);
    const [error, setError] = useState("")

    const atSymbol = "@"

    //Checks for numbers in string
    function containsNumber(str) {
        return /[0-9]/.test(str);
    }


    const performSignUp = (evt) => {
        evt.preventDefault();

        // Email needs "@" to become valid.
        if (!userCredentials.userEmail.includes(atSymbol)) {
            alert("Please enter a valid email address")
            return
        }
        if (!containsNumber(userCredentials.userPass)) {
            alert("Password must contain at least one number")
            return
        }

        signUp(userCredentials.userName, userCredentials.userPass, userCredentials.userEmail,userCredentials.userPhone,userCredentials.userBillingPrHour);

    }

    const signUp = (user, pass, email,phone,billingPrHour) => {
        userFacade.createUser(user, pass, email,phone,billingPrHour)
            .then(res => navigate("/SignUpConfirmation"))
            .catch(async err => {
                if (err.status) {
                    setError(await err.fullError.then(e => e.message))
                    err.fullError.then(e => console.log(e.message))
                }
            })


    }

    const onChange = (evt) => {
        setUserCredentials({...userCredentials, [evt.target.id]: evt.target.value})
    }


    return (
        <div className="signup">
            <form>
                <h2>Sign Up</h2>
                <p>_________________________________________</p>
                <label htmlFor="username"><b>Username<font color="#DC143C">*</font></b></label>
                <input onChange={onChange} type="text" placeholder="Enter Username" name="username" id="userName"/>

                <label htmlFor="password"><b>Password<font color="#DC143C">*</font></b></label>
                <input onChange={onChange} type="password" placeholder="Enter Password" id="userPass"/>

                <label htmlFor="email"><b>Email<font color="#DC143C">*</font></b></label>
                <input onChange={onChange} type="text" placeholder="Enter Email" name="name" id="userEmail"/>

                <label htmlFor="phone"><b>Phone<font color="#DC143C">*</font></b></label>
                <input onChange={onChange} type="text" placeholder="Enter Phone" name="name" id="userPhone"/>

                <label htmlFor="billing"><b>Billing Per Hour<font color="#DC143C">*</font></b></label>
                <input onChange={onChange} type="text" placeholder="Enter Billing Per Hour" name="name" id="userBillingPrHour"/>


                <button className="signup-btn" onClick={performSignUp} type="submit">Sign up</button>
            </form>
        </div>
    )
}

export default SignUp;