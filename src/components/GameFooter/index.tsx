import React, {ChangeEvent, Dispatch, FC, FormEvent, memo, SetStateAction, useEffect, useRef, useState} from 'react';
import {Answer} from "../../types/answer";
import cities from '../../assets/cities/cities.txt'

interface Props {
    setAnswerList: Dispatch<SetStateAction<Answer[]>>
    answerList: Answer[]
    setTimer: Dispatch<SetStateAction<number>>
    lastCity: Answer
}

const GameFooter: FC<Props> = memo(({setAnswerList, answerList, setTimer, lastCity}) => {
    const [text, setText] = useState<string>('')
    const [citiesList, setCitiesList] = useState<string[]>([])
    const [error, setError] = useState<string>('')
    const [disabled, setDisabled] = useState<boolean>(false)
    const textInput = useRef<HTMLInputElement | null>(null)

    const wrongSymbols = 'ъьый'
    let lastSymbol = wrongSymbols.includes(lastCity?.text.slice(-1)) ? lastCity?.text.slice(-2, -1) : lastCity?.text.slice(-1)
    let placeholder = ((lastSymbol && lastCity.author === 'player2') && `Знаете город на букву “${lastSymbol.toUpperCase()}”?`) ||
        (disabled && 'Ожидаем ответа соперника...') ||
        'Напишите любой город, например: Где вы живете?'

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value
        setError('')
        let city = text.includes('-') ?
            text.split('-').map(item => item.charAt(0).toUpperCase() + item.slice(1)).join('-') :
            text.charAt(0).toUpperCase() + text.slice(1)
        city = city.includes(' ') ?
            city.split(' ').map(item => item.charAt(0).toUpperCase() + item.slice(1)).join(' ') :
            city.charAt(0).toUpperCase() + city.slice(1)
        setText(city)
    }

    useEffect(() => {
        fetch(cities)
            .then(response => response.text())
            .then(textList => {
                setCitiesList(textList.split('\n'))
            })
    }, [])

    useEffect(() => {
        if (lastCity && lastCity.author === 'player1') {
            let delay = (Math.random() * (120 - 2) + 2) * 1000
            setTimeout(() => {
                let aiAnswer = citiesList.find(city => !answerList.find(answer => answer.text === city) && lastSymbol === city[0].toLowerCase())
                if (aiAnswer) {
                    setAnswerList([...answerList, {author: 'player2', text: aiAnswer}])
                    setTimer(120)
                    setDisabled(false)
                }
            }, delay)
        }
    }, [answerList])

    useEffect(() => {
        if (!disabled)
            textInput.current?.focus()
    }, [disabled])

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (text.length === 0) {
            setError('Поле не заполнено')
        } else if (lastSymbol && lastSymbol !== text[0].toLowerCase()) {
            setError(`Город должен начинаться на "${lastSymbol.toUpperCase()}"`)
        } else if (answerList.find(city => city.text === text)) {
            setError('Такой город уже был')
        } else if (citiesList.includes(text)) {
            setAnswerList([...answerList, {author: 'player1', text: text}])
            setTimer(120)
            setError('')
            setDisabled(true)
            setText('')
        } else {
            setError('Такого города нет')
        }
    }

    return (
        <div className={'p-4 relative'}>
            {error && <span className={'text-sm text-purple-700 absolute top-[-4px]'}>{error}</span>}
            <form onSubmit={e => onSubmit(e)} className={'relative'}>
                <input disabled={disabled} type="text" ref={textInput} value={text} onChange={(e) => onChange(e)}
                       placeholder={placeholder}
                       className={'w-full py-3 pl-3 pr-11 rounded-md bg-gray-100 text-gray-700 outline-0 placeholder-gray-700 placeholder:text-xs min-[470px]:placeholder:text-sm sm:placeholder:text-base'}/>
                <button disabled={disabled}
                        className={'bg-purple-500 p-1.5 rounded-md absolute right-2 top-2 disabled:bg-gray-400'}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <g clipPath="url(#clip0_7618_580)">
                            <path d="M8.33337 11.6667L17.5 2.5" stroke="white" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path
                                d="M17.5001 2.5L12.0834 17.5C12.0468 17.5798 11.9881 17.6474 11.9143 17.6948C11.8404 17.7422 11.7545 17.7674 11.6667 17.7674C11.579 17.7674 11.493 17.7422 11.4192 17.6948C11.3453 17.6474 11.2866 17.5798 11.2501 17.5L8.33339 11.6667L2.50006 8.75C2.42027 8.71344 2.35266 8.65474 2.30526 8.58088C2.25786 8.50701 2.23267 8.4211 2.23267 8.33333C2.23267 8.24557 2.25786 8.15965 2.30526 8.08579C2.35266 8.01193 2.42027 7.95323 2.50006 7.91667L17.5001 2.5Z"
                                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_7618_580">
                                <rect width="20" height="20" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                </button>
            </form>

        </div>
    );
})

export default GameFooter;