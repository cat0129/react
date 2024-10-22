import {useEffect, useState} from "react";

function App(){
    const [user, setUser] = useState([])
    useEffect(()=>{
        async function userList(){
            const res = await fetch("https://jsonplaceholder.org/users");
            const result = await res.json();
            setUser(result);
        userList();
        }
    }, []);
    // useEffect(()=>{}, []);
    //useEffect는 렌더링 될때마다 실행되는 함수
    return <>
       <table>
            <tr>
                <th>아이디</th>
                <th>이름</th>
                <th>이메일</th>
                <th>생일</th>
            </tr>
            <tr>
                <td>{user.id}</td>
                <td>{user.firstname}</td>
                <td>{user.email}</td>
                <td>{user.birthDate}</td>
            </tr>
       </table>
    </>
}

export default App;