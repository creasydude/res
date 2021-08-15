import { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import LoadingBar from 'react-top-loading-bar';

function Login() {
    const history = useHistory();
    const [progress, setProgress] = useState(0)
    const [email, setEmail] = useState();
    const [emailMsg, setEmailMsg] = useState();
    const [password, setPassword] = useState();
    const [pwMsg, setPwMsg] = useState();
    const [errMsg, setErrMsg] = useState();
    const [emailOk, setEmailOk] = useState(false);
    const [passwordOk, setPasswordOk] = useState(false);

    const emailValidator = (e) => {
        const mail = e.target.value
        const emailIsValid = mail !== '';
        if (emailIsValid) {
            setEmail(e.target.value);
            setEmailOk(true);
            return setEmailMsg("✓");
        } else {
            return setEmailMsg("Please Enter The Email!");
        }
    }

    const passwordValidator = (e) => {
        const pw = e.target.value;
        const pwIsValid = pw !== '';
        if (pwIsValid) {
            setPassword(e.target.value);
            setPasswordOk(true);
            return setPwMsg("✓");
        } else {
            return setPwMsg("Your Password Should Be 8 characters and Contain 1 Lower , 1 Upper , 1 Number At least.");
        }
    }

    const loginHandler = async (e) => {
        if (emailOk && passwordOk) {
            setProgress(30);
            try {
                const postData = await axios({
                    method: "POST",
                    url: "/api/auth/login",
                    data: {
                        email: email,
                        password: password
                    }
                })
                setProgress(100)
                history.push('/')
                window.location.reload();
            } catch (error) {
                setProgress(100)
                if (error) {
                    setErrMsg(error?.response?.data?.message)
                } else {
                    setErrMsg("Something Went Wrong!")
                }
            }
        }
    }
    return (
        <Container>
            <LoadingBar color="#FFD369" progress={progress} onLoaderFinished={() => setProgress(0)} />
            <FormDiv>
                <h4>Login</h4>
                <InputDiv>
                    <input onChange={(e) => emailValidator(e)} type="text" placeholder="Enter Email..." />
                    <span>{emailMsg}</span>
                </InputDiv>
                <InputDiv>
                    <input onChange={(e) => passwordValidator(e)} type="password" placeholder="Enter Password..." />
                    <span>{pwMsg}</span>
                </InputDiv>
                <MsgDiv>{errMsg}</MsgDiv>
                <button onClick={(e) => loginHandler(e)}>Login</button>
            </FormDiv>
        </Container>
    )
}

export default Login;


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