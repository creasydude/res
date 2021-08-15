import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";


function VerifyMail() {
    const { email, code } = useParams();
    const [msg,setMsg] = useState();
    useEffect(async () => {
        try {
            const res = await axios({
                method: "POST",
                url: "/api/auth/verifyEmail",
                data: {
                    email: email,
                    code: code
                }
            })
            setMsg("Your Email Successfuly Verified!")
        } catch (err) {
            setMsg(err.response.data.message)
        }
    }, [])
    return (
        <Container>
            {msg}
        </Container>
    )
}

export default VerifyMail;

const Container = styled.div`
    width: 100%;
    height: 700px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.mainTextColor};
    background-color: ${props => props.theme.bgColor};
`;