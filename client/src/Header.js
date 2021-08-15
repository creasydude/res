import { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import LoadingBar from 'react-top-loading-bar';

function Header({ thememode, themeHandler, token }) {
    const history = useHistory();
    const [progress, setProgress] = useState(0)
    const [userInfo, setUserInfo] = useState();
    const [isAuth, setIsAuth] = useState(false);
    useEffect(async () => {
        try {
            const { data } = await axios({
                method: "POST",
                url: "/api/auth/isAuth",
            })
            setIsAuth(true);
            setUserInfo(data);
        } catch (err) {
            setIsAuth(false);
        }
    }, [token])

    const logoutHandler = async () => {
        setProgress(30)
        try {
            const res = axios({
                method: "DELETE",
                url: "/api/auth/logout"
            })
            setProgress(100)
            history.push('/');
            window.location.reload()
        }catch (err) {
            setProgress(100)
            return err
        }

    }

    const userAuth = (
        <>
            <p>Welcome {userInfo?.email} <Logout onClick={logoutHandler} to="#">Logout</Logout></p>
        </>
    );
    const userNotAuth = (
        <>
            <Linkx to="/login" >Login</Linkx> / <Linkx to="/register">Register</Linkx>
        </>
    );
    return (
        <Container>
            <LoadingBar color="#FFD369" progress={progress} onLoaderFinished={() => setProgress(0)} />
            <span><Linkx to="/">NOTE APP</Linkx></span>
            <span>{isAuth ? userAuth : userNotAuth}</span>
            <BtnContainer>
                <Switch>
                    <BtnInput readOnly onClick={themeHandler} checked={thememode === "light" ? false : true} type="checkbox" />
                    <SliderRound />
                </Switch>
            </BtnContainer>
        </Container>
    )
}

export default Header;

const Container = styled.div`
            width: 100%;
            height: 65px;
            background-color: ${props => props.theme.hfbBgColor};
            color: ${props => props.theme.hfbColor};
            display: flex;
            justify-content: space-between;
            align-items: center;
            & span {
                padding-left: 2rem;
                font-weight: bold;
    }
`;

const BtnContainer = styled.div`
            padding-right: 2rem;
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  & input {
  opacity: 0;
  width: 0;
  height: 0;
  }
`;

const SliderRound = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fccde2;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 34px;
  &::before{
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
  }
`;

const BtnInput = styled.input`
    &:checked + ${SliderRound} {
    background-color: #393E46;
    }
    &:focus + ${SliderRound} {
    box-shadow: 0 0 1px #2196F3;
    }
    &:checked + ${SliderRound}::before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
    }
`;

const Linkx = styled(NavLink)`
    text-decoration: none;
    color: ${props => props.theme.hfbColor};
`;

const Logout = styled.a`
    text-decoration: none;
    cursor: pointer;
    color: ${props => props.theme.hfbColor};
`;