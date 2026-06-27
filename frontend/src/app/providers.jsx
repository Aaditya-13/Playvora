import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

import queryClient from "./queryClient";

export default function Providers({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}

            <Toaster
                richColors
                position="top-center"
                closeButton
            />

            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}