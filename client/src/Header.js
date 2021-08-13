import styled from "styled-components";
import { NavLink } from "react-router-dom";

function Header({ thememode, themeHandler }) {
    return (
        <Container>
            <span>NOTE APP</span>
            <span><Linkx to="/login" >Login</Linkx> / <Linkx to="/register">Register</Linkx></span>
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