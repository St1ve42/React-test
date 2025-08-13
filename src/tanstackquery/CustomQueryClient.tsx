import type {PropsWithChildren} from "react";
import {useQueryClientConfig} from "./hooks/useQueryClientConfig.tsx";
import {QueryClientProvider} from "@tanstack/react-query";

export const CustomQueryClient = ({children}: PropsWithChildren) => {
    const queryClient = useQueryClientConfig()
    return (
        <>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </>
    )
}