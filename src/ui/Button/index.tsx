import React, {FC} from 'react';

interface Props {
    children: React.ReactNode;
    callback: () => void
}

const Button: FC<Props> = ({children, callback}) => {
    return (
        <button onClick={callback} className={'py-2 px-4 text-white bg-purple-600 rounded font-medium mx-auto block'}>
            {children}
        </button>
    );
};

export default Button;