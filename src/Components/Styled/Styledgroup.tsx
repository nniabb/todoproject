import styled from "@emotion/styled";

export const GroupDiv = styled.div`
display: flex;
width:350px;
height: fit-content;
padding:0 5px 7px 5px;
flex-direction: column;
gap:25px;
border: 3px solid gray;
border-radius: 7px;
`
export const GroupName = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`
export const H3 = styled.h3`
color: gray;
font-size: 18px;
font-family: cursive;
`
export const DeleteGroup = styled.button`
width: 70px;
height: 30px;
background: gray;
border:none;
border-radius: 5px;
cursor: pointer;
font-family: cursive;
color: white;
`

export const Taskside = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
justify-content: center;
align-items: center;
`

export const Input = styled.input`
height: 25px;
width: 200px;
border: 2px solid gray;
border-radius: 5px;
padding: 0 0 0 5px;
&::placeholder{
 font-family: cursive;
 color: white;
}
`
export const TodoBox = styled.div`
width: 350px;
padding: 0 2px 0 0;
height: 30px;
border: 2px solid gray;
border-radius: 5px;
display: flex;
justify-content: space-between;
`
export const Leftside=styled.div`
display: flex;
align-items: center;
`

export const Rightside=styled.div`
display: flex;
gap:3px;
align-items: center;
`
export const Checkbox = styled.input`
-webkit-appearance: none;
cursor: pointer;
width: 17px;
height: 17px;
border: 2px solid gray;
border-radius: 3px;
&:checked{
    background-color: gray;
}
`

export const Copy = styled.button`
height:25px;
width: 50px;
background: white;
cursor: pointer;
background: gray;
border:none;
border-radius: 4px;
font-family: cursive;
color: white;
`

export const Delete = styled.button`
height: 25px;
width: 60px;
background: white;
cursor: pointer;
background: gray;
border:none;
border-radius: 5px;
font-family: cursive;
color: white;
`

export const H4 = styled.h4`
color: #383838;
font-size: 14px;
font-family: cursive;
`


