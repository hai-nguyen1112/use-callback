import React, {useState, useCallback} from 'react'
import './App.css'

const randomColor = () => '#' + (Math.random() * 0xFFFFFF << 0).toString(16)

type
ButtonProps = React.ButtonHTMLAttributes < HTMLButtonElement >

const Button = React.memo((props: ButtonProps) =>
    <button onClick={(props.onClick)} style={{background: randomColor()}}>
        {props.children}
    </button>
)

// Keeps track of all created functions during the app's life
const functions: Set<any> = new Set()

const App = () => {
    const [delta, setDelta] = useState(1)
    const [counter, setCounter] = useState(0)

    const incrementDelta = useCallback(() => setDelta(delta + 1), [delta])
    const incrementCounter = useCallback(() => setCounter(counter + delta), [delta, counter])

    //Register the functions so that we can count them
    functions.add(incrementDelta)
    functions.add(incrementCounter)

    return (
        <div className="App">
            <br/>
            <div>Delta is {delta}</div>
            <div>Counter is {counter}</div>
            <br/>
            <div>
                <Button onClick={incrementDelta}>Increment Delta</Button>
                &nbsp;
                <Button onClick={incrementCounter}>Increment Counter</Button>
            </div>
            <br/>
            <div>Newly Created Functions: {functions.size - 2}</div>
        </div>
    )
}

export default App
