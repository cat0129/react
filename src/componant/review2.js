import { useState } from "react";

function App(){
    const [cnt, setCnt] = useState(0) //[배열]을 리턴해줌
    const increment = ()=>{
        cnt++;
        console.log(cnt);
    }
    return <>
        <div>{cnt}</div>
        <button onClick={increment}>증가</button>
    </>
}

export default App;