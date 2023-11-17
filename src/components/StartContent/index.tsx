import React, {FC} from 'react';
import Button from "../../ui/Button";
import {useNavigate} from "react-router-dom";

const StartContent: FC = () => {
    const navigate = useNavigate()
    return (
        <div className={'p-6 text-gray-700 '}>
            <h3 className={'text-sm'}>Цель: Назвать как можно больше реальных городов.</h3>
            <ul className={'list-disc text-sm list-inside my-6'}>
                <li>Запрещается повторение городов</li>
                <li>Названий городов на твердый “ъ” и мягкий “ъ” знак нет. Из-за этого бы пропускаем эту букву и игрок должен назвать город на букву стоящую перед ъ или ь знаком.</li>
                <li>Каждому игроку дается 2 минуты на размышления, если спустя это время игрок не вводит слово он считается проигравшим</li>
            </ul>
            <Button callback={() => navigate('/game')}>Начать игру</Button>
        </div>
    );
};

export default StartContent;