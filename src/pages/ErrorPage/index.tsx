import {isRouteErrorResponse, useRouteError} from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);
    let errorMessage: string

    if (isRouteErrorResponse(error)) {
        errorMessage = error.statusText
    } else if (error instanceof Error) {
        errorMessage = error?.message
    } else {
        errorMessage = 'Unexpected error'
    }

    return (
        <div className={'text-center flex justify-center items-center h-screen'}>
            <div>
                <h1 className={'prose prose-2xl'}>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{errorMessage}</i>
                </p>
            </div>
        </div>
    );
}

export default ErrorPage