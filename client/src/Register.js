import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios';
import LoadingBar from 'react-top-loading-bar';
import styled from "styled-components";

function Register() {
    const [progress, setProgress] = useState(0)
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [emailOk, setEmailOk] = useState(false);
    const [passwordOk, setPasswordOk] = useState(false);
    const [verifyMail, setverifyMail] = useState(false);
    const [errMsg, setErrMsg] = useState();
    const [emailMsg, setEmailMsg] = useState();
    const [pwMsg, setPwMsg] = useState();

    const emailValidator = (e) => {
        const eV = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const emailIsValid = eV.test(String(e.target.value).toLowerCase());
        if (emailIsValid) {
            setEmail(e.target.value);
            setEmailOk(true);
            setEmailMsg("✓");
        } else {
            setEmailMsg("Please Enter The Valid Email!");
        }
    }
    const passwordValidator = (e) => {
        const pwV = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        const pwIsValid = pwV.test(String(e.target.value));
        if (pwIsValid) {
            setPassword(e.target.value);
            setPasswordOk(true);
            setPwMsg("✓");
        } else {
            setPwMsg("Your Password Should Be 8 characters and Contain 1 Lower , 1 Upper , 1 Number At least.");
        }
    }

    const registerHandler = async (e) => {
        e.preventDefault()
        if (emailOk && passwordOk) {
            setProgress(30);
            setErrMsg('');
            try {
                const postData = await axios({
                    method: "POST",
                    url: "/api/auth/register",
                    data: {
                        email: email,
                        password: password
                    }
                })
                setProgress(100);
                return setverifyMail(true);
            } catch (error) {
                setProgress(100);
                if (error) {
                    setErrMsg(error?.response?.data?.message)
                    setTimeout(() => {
                        setErrMsg('');
                    }, 3000);
                } else {
                    setErrMsg("Something Went Wrong!")
                    setTimeout(() => {
                        setErrMsg('');
                    }, 3000);
                }
            }
        } else {
            setErrMsg("You Should Fill Email And Password Input With Right Info.")
            setTimeout(() => {
                setErrMsg('');
            }, 3000);
        }
    }

    const registerDivs = (
        <FormDiv>
            <h4>Register</h4>
            <InputDiv>
                <input onChange={(e) => emailValidator(e)} type="text" placeholder="Enter Email..." />
                <span>{emailMsg}</span>
            </InputDiv>
            <InputDiv>
                <input onChange={(e) => passwordValidator(e)} type="password" placeholder="Enter Password..." />
                <span>{pwMsg}</span>
            </InputDiv>
            <MsgDiv>{errMsg}</MsgDiv>
            <button onClick={(e) => registerHandler(e)}>Register</button>
        </FormDiv>
    );
    const verifyMailDivs = (
        <VerifyDiv>
            <h4>Register Complete , Now You Should Verify Your Email , We Sent A Link To Your Email , Open it!</h4>
            <VerifyLink to="/login">Goto Login Page</VerifyLink>
        </VerifyDiv>
    );
    return (
        <Container>
            <LoadingBar color="#FFD369" progress={progress} onLoaderFinished={() => setProgress(0)} />
            {verifyMail ? verifyMailDivs : registerDivs}
        </Container>
    )
}

export default Register;

const Container = styled.div`
    width: 100%;
    height: 700px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.mainTextColor};
    background-color: ${props => props.theme.bgColor};
`;

const FormDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & input {
        outline: none;
        border: none;
        height: 30px;
        margin-bottom: 2rem ;
        border-bottom: 2px solid #ccc;
        

        &:focus {
            transition: .7s;
            border-bottom: 2px solid ${props => props.theme.borderForNote};
        }
    }

    & button {
        color: ${props => props.theme.hfbColor};
        padding: .75rem 2rem;
        border: none;
        cursor: pointer;
        background-color: ${props => props.theme.btnSubmit};
        border-bottom: 2px solid #ccc;
        &:hover {
            transition: .7s;
            border-bottom: 2px solid ${props => props.theme.mainTextColor};
        }
    }
`;

const MsgDiv = styled.div`
    background-color: ${props => props.theme.hfbBgColor};
    padding: .75rem;
    margin: 0 0 0.5rem 0;
    &:empty {
        display: none;
    }
`

const InputDiv = styled.div`
    & span {
        position: absolute;
        padding-left: 0.5rem;
        padding-top: 0.5rem;
    }
`;

const VerifyDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const VerifyLink = styled(NavLink)`
    color: ${props => props.theme.hfbColor};
    text-decoration: none;
    padding: .75rem 2rem;
    border: none;
    cursor: pointer;
    background-color: ${props => props.theme.btnSubmit};
    border-bottom: 2px solid #ccc;
    &:hover {
        transition: .7s;
        border-bottom: 2px solid ${props => props.theme.mainTextColor};
    }
`;