import React, {FC, useEffect, useState} from 'react';
import GameHeader from "../../components/GameHeader";
import GameContent from "../../components/GameContent";
import GameFooter from "../../components/GameFooter";
import {Answer} from "../../types/answer";
import {useNavigate} from "react-router-dom";


const GamePage: FC = () => {
    const [answerList, setAnswerList] = useState<Answer[]>([])
    const [timer, setTimer] = useState<number>(120);
    const navigate = useNavigate()
    let lastCity = answerList[answerList.length - 1]

    useEffect(() => {
        if (timer === 0) {
            navigate("/result", {
                state: {
                    winner: lastCity.author,
                    lastCity: lastCity.text,
                    answerListLength: answerList.length
                },
            });
        }
    }, [timer])

    return (
        <div>
            <GameHeader timer={timer} setTimer={setTimer} answerList={answerList}/>
            <GameContent answerList={answerList}/>
            <GameFooter setAnswerList={setAnswerList} answerList={answerList} setTimer={setTimer} lastCity={lastCity}/>
        </div>
    );
};

export default GamePage;