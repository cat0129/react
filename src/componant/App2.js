
function App(){
    var list = ["자바", "오라클", "html"];
    return (<div>
        <Header text="web header!"></Header>
        <Body list={list} printSubject={(subject)=>{
            alert(subject);
        }}></Body>
        <Footer text="web footer!"></Footer>
    </div>)
}

function Header(props){
    return <div id="header">
        {props.text}
    </div>
}

function Body(props){
    var subList = []
    props.list.forEach((subject)=>{
        subList.push(
            <li key={subject} onClick={()=>props.printSubject(subject)}>
                {subject}
            </li>
        )
    })
    return <div id="body">
        <ul>{subList}</ul>
    </div>
}   

function Footer(props){
    return <div id="footer">
        {props.text}
    </div>
}


export default App;