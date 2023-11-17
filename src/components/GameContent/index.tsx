import React, {FC, memo, useEffect, useRef} from 'react';
import {Answer} from "../../types/answer";

interface Props {
    answerList: Answer[]
}

const GameContent: FC<Props> = memo(({answerList}) => {
    const ref = useRef<HTMLDivElement | null>(null)
    const scrollBot = () => {
        if (ref.current) ref.current.scrollIntoView()
    }
    useEffect(() => {
        scrollBot()
    }, [answerList])

    return (
        <>
            <div className={'min-h-[320px] max-h-[384px] overflow-auto flex flex-col pt-10 px-4 pb-5 scrollbar-hide'}>
                {answerList.length === 0 ?
                    <p className={'text-gray-400 text-center text-sm mt-[110px]'}>Первый участник вспоминает
                        города...</p> :
                    <>
                        <div className={'flex flex-col gap-2'}>
                            {answerList.map(item =>
                                <div key={item.text}
                                     className={`max-w-fit py-1.5 px-5  rounded-xl 
                                 ${item.author === 'player1' ?
                                         'ml-auto rounded-br-none bg-purple-500 text-white' :
                                         'bg-purple-50 text-gray-700 rounded-bl-none'}`}
                                >
                                    {item.text}
                                </div>)}
                        </div>
                        {answerList.length > 0 && <div ref={ref}></div>}
                    </>
                }
            </div>
            {answerList.length > 0 &&
                <p className={'text-sm text-center text-gray-400'}>Всего перечислено городов: {answerList.length}</p>}
        </>
    );
})

export default GameContent;