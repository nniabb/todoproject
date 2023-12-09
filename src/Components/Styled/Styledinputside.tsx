import styled from "styled-components";

export const GroupInput = styled.input`
width:300px;
height:50px;
border: 2px solid gray;
border-radius: 5px;
margin-right: 10px;
font-size: 15px;
padding: 0 0 0 8px;
&::placeholder{
    color: white;
    font-family: cursive;
}
`
export const Div = styled.div`
display: flex;
justify-content: center;
`
export const Button = styled.div`
display: flex;
justify-content: center;
align-items: center;
font-size: 18px;
width: 70px;
height: 52px;
border-radius: 5px;
background: gray;
cursor: pointer;
margin-top: 1px;
color: white;
font-family: cursive;
`
