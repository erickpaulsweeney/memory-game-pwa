import { useState } from "react";
import Card from "./Card";

// svgNo = 1: grape, 2: cherry, 3: watermelon, 4: mango, 5: banana, 6: carrot, 7: apple, 8: strawberry

async function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

let dataArr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]; 
dataArr = shuffleArray(dataArr);
let timer;

function Main() {
    let [start, setStart] = useState(false);
    let [time, setTime] = useState(0);
    let [moves, setMoves] = useState(0);
    let [score, setScore] = useState(0);
    let [selected1, setSelected1] = useState(null);
    let [selected2, setSelected2] = useState(null);
    let [details1, setDetails1] = useState(null);
    // eslint-disable-next-line
    let [details2, setDetails2] = useState(null);
    let [matched, setMatched] = useState([]);

    function restart() {
        clearInterval(timer);
        setStart(false);
        dataArr = shuffleArray(dataArr);
        setTime(0);
        setMoves(0);
        setScore(0);
        setSelected1(null);
        setSelected2(null);
        setDetails1(null);
        setDetails2(null);
        setMatched([]);
    }

    async function handleClick(input) {
        if (!start) {
            setStart(true);
            timer = setInterval(() => {
                setTime(++time);
            }, 1000)
        }

        if (matched.includes(input.idx)) return;
        if (selected1 === null) {
            setSelected1(input.idx);
            setDetails1(input.svgNo);
        }
        else if (selected2 === null && input.idx !== selected1) {
            setSelected2(input.idx);
            setDetails2(input.svgNo);
            if (details1 === input.svgNo) {
                // console.log(details2);
                setScore(++score);
                matched.push(selected1);
                matched.push(input.idx);
                setMatched(matched);
            }
            setMoves(++moves);
            await wait(1000);
            setSelected1(null);
            setSelected2(null);
        }
    }

    if (score === 8) {
        clearTimeout(timer);
    }

    return (
        <div className="container-all">

            <div className="title">Memory Game</div>
            <div className="info-bar">
                <div className="time-elapsed">Time: {time}s</div>
                <div className="moves-num">{moves} moves</div>
                <div className="score-num">Score: {score}</div>
                <button className="restart-button" onClick={() => restart()}>Restart</button>
            </div>

            <div className="container-cards" style={{ display: score === 8 ? 'none' : null }}>
                {dataArr.map((el, idx) => <Card key={`${el}-${idx}`} svgNo={el} idx={idx} bgColor={matched.includes(idx) ? '#60dd8e' : '#f6fcb4'}
                display={selected1 === idx || selected2 === idx || matched.includes(idx) ? true : false} handleClick={handleClick}/>)}
            </div>

            <div className="win-notice" style={{ display: score === 8 ? null : 'none' }}>
                Congratulations! You won in {moves} moves! You took {time} seconds!
            </div>
        </div>
    )
}

export default Main;