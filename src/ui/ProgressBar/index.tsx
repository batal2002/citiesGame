import React, {FC} from 'react';

interface Props {
    progressPercentage: number
}

const ProgressBar: FC<Props> = ({progressPercentage}) => {
    return (
        <div className='h-1 w-full bg-gray-100'>
            <div
                style={{width: `${100 - progressPercentage}%`}}
                className={`h-full bg-purple-300 transition-[width] duration-1000 ease-linear`}>
            </div>
        </div>
    );
};

export default ProgressBar;