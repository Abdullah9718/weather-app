import { useState } from "react";

function Counter() {
    const [count, setCount]= useState(0);
    return(
        <div className="button-container">
            <h1>Count {count}</h1>
            <button onClick={() => setCount(count+1)}>add</button>
            <button onClick={() => setCount(count-1)}>Sub</button>
        </div>
    )
}

export default Counter;