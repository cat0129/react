import logo from './logo.svg';
import './App.css';

function Header(props){
  return <div id="header">
         <div><a href="#" onClick={()=>{
          props.printText();
         }}>{props.title}</a></div>
         </div>
}
//props 안에는 타이틀이 담겨있음, {안에는 동적인 처리}

function Main(props){
  var list = [];
  props.list.forEach(subject => {
    list.push(<li key={subject}> {subject} </li>); 
  });
  return <div id="main">
        <ul>
          {list}
        </ul>
      </div>
}

function Footer(props){
  return <div id="footer">
         <div>{props.title}</div>
         <div><a href="#" onClick={()=>{
          alert(props.test)
         }}>{props.test}</a></div>
        </div>
}

function App() {
  var subject1 = ["자바", "자바스크립트", "오라클"];
  var subject2 = ["html", "css", "리액트", "mysql"];
  return (
   <div>
      <Header title="자바 재밌다" printText={()=>{
        console.log("함수 보내기 테스트")
      }}></Header>
      <Header title="오라클 재밌다" printText={()=>{
        alert("함수 보내기 테스트22");
      }}></Header>
      <Header title="html 재밌다"></Header>
      <Main list={subject1}></Main>
      <Main list={subject2}></Main>
      <Footer title="푸터입니다"></Footer>
      <Footer test="시험중"></Footer>
    </div>
  );
}

export default App;
