import styled from "styled-components";
import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import LoadingBar from 'react-top-loading-bar';

function Todo({ token }) {
    const [progress, setProgress] = useState(0)
    const [data, setData] = useState();
    const [errMsg, setErrMsg] = useState();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [titleValid, setTitleValid] = useState(false);
    const [descriptionValid, setDescriptionValid] = useState(false);

    const titleValidator = (e) => {
        const validate = e.target.value !== '';
        if (validate) {
            setTitle(e.target.value);
            setTitleValid(true);
        }
    }
    const desValidator = (e) => {
        const validate = e.target.value !== '';
        if (validate) {
            setDescription(e.target.value);
            setDescriptionValid(true);
        }
    }

    useEffect(async () => {
        try {
            const res = await axios({
                method: "GET",
                url: "/api/todo/todos"
            })
            setErrMsg('');
            setData(res.data)
        } catch (err) {
            setErrMsg("Something Went Wrong")
        }
    }, [token])

    const addTodo = async (e) => {
        setProgress(30)
        e.preventDefault()
        if (titleValid && descriptionValid) {
            try {
                const res = await axios({
                    method: "POST",
                    url: "/api/todo/addTodo",
                    data: {
                        title: title,
                        description: description
                    }
                })
                setProgress(100)
                window.location.reload()
            } catch (err) {
                setErrMsg("Something Went Wrong!")
                setProgress(100)
            }
        }
    };

    const checkHandler = async (e) => {
        setProgress(30)
        try {
            const res = await axios({
                method: "PUT",
                url: "/api/todo/checkTodo",
                data: {
                    isChecked: !e.target.checked,
                    objId: e.target.id
                }
            })
            setProgress(100)
        } catch (err) {
            setErrMsg("Something Went Wrong!")
            setProgress(100)
        }
    }

    const deleteTodo = async (e) => {
        setProgress(30)
        try {
            const res = await axios({
                method: "DELETE",
                url: "/api/todo/deleteTodo",
                data: {
                    objId: e.target.id
                }
            })
            setProgress(100)
            window.location.reload()
        } catch (err) {
            setErrMsg("Something Went Wrong!")
            setProgress(100)
        }
    }

    const Todos = (
        <Fragment>
            {data?.map(item => {
                return (
                    <TodosDiv key={item._id}>
                        <TodoTC>
                            <p>{item.title}</p>
                            <span>Done? : <input type="checkbox" onChange={(e) => checkHandler(e)} id={item._id} defaultChecked={item.isChecked} /></span>
                            <span onClick={(e) => deleteTodo(e)} id={item._id}>Delete</span>
                        </TodoTC>
                        <TodoDesc>
                            <span>{item.description}</span>
                        </TodoDesc>
                    </TodosDiv>
                );
            })}
        </Fragment>
    );

    return (
        <Container>
            <LoadingBar color="#FFD369" progress={progress} onLoaderFinished={() => setProgress(0)} />
            <InputsDiv>
                <p>Create New Todo!</p>
                <input
                    type="text"
                    placeholder="Enter The Title..."
                    onChange={(e) => titleValidator(e)}
                />
                <textarea
                    type="text"
                    placeholder="Enter The Description..."
                    onChange={(e) => desValidator(e)}
                />
                <SubmitBtn onClick={(e) => addTodo(e)} >Save Todo!</SubmitBtn>
                <p>{errMsg}</p>
            </InputsDiv>
            {Todos}
        </Container>
    )
}

export default Todo;

const Container = styled.section`
    width: 100%;
    min-height: 800px;
    background-color: ${props => props.theme.bgColor};
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const InputsDiv = styled.div`
    padding-top: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & input {
        margin: 2rem 0 0.5rem 0;
        width: 400px;
        height: 25px;
        outline: none;
        border: none;
        border-bottom: 1px solid #ccc;
        background-color: ${props => props.theme.bgForNote};
        transition: .4s;
    }
    & input:focus {
        border-bottom: 1px solid ${props => props.theme.borderForNote};
    }
    & textarea {
        outline: none;
        width: 400px;
        height: 50px;
        border: none;
        background-color: ${props => props.theme.bgForNote};
        border-left: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        transition: .6s;
        
    }
    
    & textarea:focus {
        border-left: 1px solid ${props => props.theme.borderForNote};
        border-bottom: 1px solid ${props => props.theme.borderForNote};
    }
    & p {
        color: ${props => props.theme.mainTextColor};
        font-size: 20px;
    }
`;

const SubmitBtn = styled.button`
    margin-top: 2rem;
    width: 125px;
    height: 35px;
    border: none;
    background-color: ${props => props.theme.btnSubmit};
    font-weight: bold;
    transition: .6s;
    color: ${props => props.theme.mainTextColor};
    cursor: pointer;
    &:hover {
        background-color: ${props => props.theme.hfbBgColor};
    }
    
`

const TodosDiv = styled.div`
    margin-top: 2rem;
    margin-bottom: 1rem;
    background-color: ${props => props.theme.hfbBgColor};
    color: ${props => props.theme.mainTextColor};
`;

const TodoTC = styled.div`
    min-width: 400px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    & p {
        width: 300px;
        word-wrap: break-word;
    }

    & span:nth-child(3) {
        cursor: pointer;
        font-weight: bold;
    }

`

const TodoDesc = styled.div`
    word-wrap: break-word ;
    width: 400px;
    min-height: 50px;
    text-align: center;

`