import {QueryClient} from "@tanstack/react-query";

export const useQueryClientConfig = () => {
    return new QueryClient({
        defaultOptions: {
            queries: {refetchOnWindowFocus: true}
        }
    });

}