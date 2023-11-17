import React, {Dispatch, FC, useEffect} from 'react';
import ProgressBar from "../../ui/ProgressBar";
import {Answer} from "../../types/answer";

interface Props {
    timer: number
    setTimer: Dispatch<React.SetStateAction<number>>
    answerList: Answer[]
}

const GameHeader: FC<Props> = ({timer, setTimer, answerList}) => {
    let youTurn = (answerList[answerList.length - 1]?.author === 'player2') || answerList.length === 0
    const timerToString = () => {
        let minutes = ('0' + Math.floor(timer / 60)).slice(-2);
        let seconds = ('0' + timer % 60).slice(-2);
        return minutes + ":" + seconds;
    }

    useEffect(() => {
        if (answerList.length > 0) {
            const interval = setInterval(() => {
                setTimer(prevTime => prevTime - 1);
            }, 1000)
            if (timer === 0) {
                clearInterval(interval)
            }

            return () => clearInterval(interval)
        }
    }, [answerList]);

    const progressPercentage = timer / 120 * 100

    return (
        <>
            <div className={'flex justify-between items-center px-4 py-[17px]'}>
                {youTurn ?
                    <p>Сейчас ваша очередь</p> :
                    <p>Сейчас очередь соперника</p>
                }
                <p className={'text-xl font-medium'}>{timerToString()}</p>
            </div>
            <ProgressBar progressPercentage={progressPercentage}/>
        </>
    );
};

export default GameHeader;