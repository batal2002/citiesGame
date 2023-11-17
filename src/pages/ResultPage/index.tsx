import React, {FC} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import Button from "../../ui/Button";

const ResultPage: FC = () => {
    const location = useLocation();
    const data = location.state
    const navigate = useNavigate()

    return (
        <div className={'p-10 text-center text-xl flex flex-col gap-8'}>
            <div>
                {data.winner === 'player1' ?
                    <>
                        <p>Поздравляем тебя с победой!</p>
                        <p>Твой противник не вспомнил нужный город!</p>
                    </> :
                    <>
                        <p>К сожалению твое время вышло!</p>
                        <p>Твой противник победил!</p>
                    </>
                }
            </div>
            <p className={`text-3xl font-medium ${data.winner === 'player1' ? 'text-green-600' : 'text-red-600'}`}>00:00</p>
            <div>
                <p>Всего было перечислено городов: {data.answerListLength}</p>
                <p>Очень не плохой результат!</p>
            </div>
            <div>
                <p className={'mb-1.5'}>Последний город названный победителем</p>
                <p className={'text-2xl font-medium'}>{data.lastCity}</p>
            </div>
            <Button callback={() => navigate('/game')}>Начать новую игру</Button>
        </div>
    );
};

export default ResultPage;