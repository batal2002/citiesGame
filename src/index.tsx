import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import {createBrowserRouter, RouterProvider} from "react-router-dom";
// import ErrorPage from "./pages/ErrorPage";
// import StartPage from "./pages/StartPage";
// import GamePage from "./pages/GamePage";
// import ResultPage from "./pages/ResultPage";

//чтобы роуты корректно работали на github pages был использован HashRouter

// const router = createBrowserRouter([
//     {
//         path: "./",
//         element: <App/>,
//         errorElement: <ErrorPage/>,
//         children: [
//             {
//                 path: "./",
//                 element: <StartPage/>,
//             },
//             {
//                 path: "./game",
//                 element: <GamePage/>,
//             },
//             {
//                 path: "./result",
//                 element: <ResultPage/>,
//             },
//         ],
//     },
// ]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    // <RouterProvider router={router}/>
    <App/>
);
