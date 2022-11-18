import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap";
import "./assets/custom.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { getQueryClient } from "./services/queryClient";
import { QueryClientProvider } from "react-query";

const queryClient = getQueryClient();

ReactDOM.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>,
  document.getElementById("root")
);
