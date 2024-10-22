
function App(){
    return <>
        <Header select="kor"></Header>
        <div>컨텐츠</div>
    </>
}

function Header(props){
    var header = "";
    if(props.select=="kor"){
        header = <div>헤더</div>
    } else{
        header = <div>Header</div>
    }
    return {header}
}

export default App;