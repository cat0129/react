import { useState } from "react";

function App(){
    const [count, setCount] = useState(0)
    const [input, setInput] = useState("")
    const addCount = ()=>{
        const input_int = parseInt(input);
        setCount(count+input_int)
    }

    const minusCount = ()=>{
        const input_int = parseInt(input);
        var result = count - input_int;
        if(result<0) result = 0;

        setCount(result);
    }

    var initCount = ()=>{
        setCount(0);
        setInput("");
    }
    
    return (<>
        <div>현재 카운트 : {count} </div>
        <input value={input} onChange={(e)=>setInput(e.target.value)}></input>
        <button onClick={addCount}>증가</button>
        <button onClick={minusCount}>감소</button>
        <button onClick={initCount}>초기화</button>
        </>)
}

export default App;