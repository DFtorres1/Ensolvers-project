import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserProvider from "./UserProvider";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RenderRoutes from "./Routes";

// Disabled due to unnecessary fast refresh
// eslint-disable-next-line react-refresh/only-export-components
export const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <RenderRoutes />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
