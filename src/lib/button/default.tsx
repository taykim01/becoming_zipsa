export default function Default(){ // parent
    return(
    <div>
        <Child textFromParent="무지성"></Child>
        <Child textFromParent="주영"></Child>
    </div>
    )
}

function Child(props: {textFromParent: string}){
    return(
    <div className="h-8">
        {props.textFromParent}
    </div>
    )
}