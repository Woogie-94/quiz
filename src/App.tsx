import { RouterProvider } from "react-router-dom";
import router from "./router";
import GlobalStyle from "./styles/globalStyle";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastProvider } from "./contexts/toastContext";
import Toast from "./components/Toast";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <RouterProvider router={router} />
        <Toast />
      </ToastProvider>
      <GlobalStyle />
    </QueryClientProvider>
  );
}

export default App;
