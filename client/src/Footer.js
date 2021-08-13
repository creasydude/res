
import styled from "styled-components";

function Footer() {
    return (
        <Container>
            <span>
                Coded By CreasY
            </span>
        </Container>
    )
}

export default Footer;

const Container = styled.footer`
    width: 100%;
    height: 65px;
    background-color: ${props => props.theme.hfbBgColor};
    color: ${props => props.theme.hfbColor};
    display: flex;
    justify-content: center;
    align-items: center;
    & span {
        font-weight: bold;
    }
`