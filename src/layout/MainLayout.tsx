import {HeaderComponent} from "../components/header/HeaderComponent.tsx";
import {Outlet, useLocation} from "react-router-dom";
import {ErrorFallbackComponent} from "../errors/ErrorFallbackComponent.tsx";
import {ErrorBoundary} from "react-error-boundary";

export const MainLayout = () => {
    const location =  useLocation();
    return (
        <>
            <HeaderComponent></HeaderComponent>
            <ErrorBoundary FallbackComponent={ErrorFallbackComponent} key={location.pathname}>
                <Outlet/>
            </ErrorBoundary>
        </>
    );
};