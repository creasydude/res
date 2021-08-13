import { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios';

function Register() {
    const [email, setEmail] = useState();
    const [emailMsg, setEmailMsg] = useState();
    const [password, setPassword] = useState();
    const [errMsg, setErrMsg] = useState();
    const [pwMsg, setPwMsg] = useState();
    const [emailOk, setEmailOk] = useState(false);
    const [passwordOk, setPasswordOk] = useState(false);
    const [verifyMail, setverifyMail] = useState(false);

    const emailValidator = (e) => {
        const eV = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const emailIsValid = eV.test(String(e.target.value).toLowerCase());
        if (emailIsValid) {
            setEmail(e.target.value);
            setEmailOk(true);
            return setEmailMsg("");
        } else {
            return setEmailMsg("Please Enter The Valid Email!");
        }
    }
    const passwordValidator = (e) => {
        const pwV = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        const pwIsValid = pwV.test(String(e.target.value));
        if (pwIsValid) {
            setPassword(e.target.value);
            setPasswordOk(true);
            return setPwMsg("");
        } else {
            return setPwMsg("Your Password Should Be 8 characters and Contain 1 Lower , 1 Upper , 1 Number At least.");
        }
    }

    const registerHandler = async (e) => {
        e.preventDefault()
        if (emailOk && passwordOk) {
            setErrMsg('');
            try {
                const postData = await axios({
                    method: "POST",
                    url: "http://localhost:8080/api/auth/register",
                    data: {
                        email: email,
                        password: password
                    }
                })
                return setverifyMail(true);
            } catch (error) {
                return error
            }
        } else {
            setErrMsg("You Should Fill Email And Password Input With Right Info.")
        }
    }

    const registerDivs = (
        <Fragment>
            email <input onChange={(e) => emailValidator(e)} type="text" />
            password <input onChange={(e) => passwordValidator(e)} type="password" />
            <button onClick={(e) => registerHandler(e)}>Submit</button>
        </Fragment>
    );
    const verifyMailDivs = (
        <Fragment>
        <p>Register Complete , Now You Should Verify Your Email , We Sent A Link To Your Email , Open it!</p>
        <NavLink to="/login">Goto Login Page</NavLink>
        </Fragment>
    );
    return (
        <div>
            {verifyMail ? verifyMailDivs : registerDivs}
        </div>
    )
}

export default Register;
