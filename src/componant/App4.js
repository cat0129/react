import {useState} from "react";

function Main(){
    return <div>메인페이지임</div>
}
function MyPage(){
    return <div>마이페이지에요</div>
}
function App(){
    const [menu, setMenu] = useState(1);
    //1번메뉴 : 홈, 2번메뉴 : 마이페이지
    var display = "";
    if(menu==1){
        display = <Main></Main>
    }else{
        display = <MyPage></MyPage>
    }
    return (
        <div name="App_">
            <button onClick={()=>{setMenu(1)}}>1번메뉴</button>
            <button onClick={()=>{setMenu(2)}}>2번메뉴</button>
            {display}
            {menu==1?<Main></Main>:<MyPage></MyPage>}
        </div>
    )
}

export default App;