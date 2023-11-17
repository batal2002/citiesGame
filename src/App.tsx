import React from 'react';
// import {Outlet} from "react-router-dom";
import {HashRouting} from "./pages/Routing";

function App() {
    return (
        <div className={'flex justify-center items-center h-screen px-4'}>
            <div className='max-w-xl w-full bg-white rounded-2xl shadow'>
                {/*<Outlet/>*/}
                <HashRouting />
            </div>
        </div>

    );
}

export default App;
