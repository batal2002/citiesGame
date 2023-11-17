import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import StartPage from "../StartPage";
import GamePage from "../GamePage";
import ResultPage from "../ResultPage";

export const HashRouting = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path={'/'} element={<StartPage/>}/>
                <Route path={'/game'} element={<GamePage/>}/>
                <Route path={'/result'} element={<ResultPage/>}/>
                <Route path={'*'} element={<Navigate to="/"/>}/>
            </Routes>
        </HashRouter>
    )
}

