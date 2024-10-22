import { useState } from "react";

function App(){
    const [text, setText] = useState("");
    const inputText = (e)=>{
        console.log("호출", e.target.value);
        setText(e.target.value);
    }
    return (<>
        <input value={text} onChange={inputText}></input>
        <button>클릭</button>
        <div>{text}</div>
    </>)
}

export default App;