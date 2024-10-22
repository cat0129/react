import { useState } from "react";

function App(){
    const [list, setList] = useState(["자바", "오라클"]);
    const [subject, setSubject] = useState("");
    const addSubject = ()=>{
        // console.log(subject);
        // var list2 = [...list, subject];
        // console.log(list2);
        setList((prev)=>{
            return [...prev, subject]
        })
    }
    return <>
        <input value={subject} onChange={(e)=>{
            setSubject(e.target.value);
        }}></input>
        <button onClick={addSubject}>추가</button>
        <div>{list.map(item=>{
            return <li key={item}>{item}</li>
        })}</div>
    </>
}

export default App;