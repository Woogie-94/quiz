import { RouterProvider } from "react-router-dom";
import router from "./router";
import GlobalStyle from "./styles/globalStyle";
import { QueryClient, QueryClientProvider } from "react-query";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <GlobalStyle />
    </QueryClientProvider>
  );
}

export default App;
