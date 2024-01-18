import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./satoshi.css";
import { store } from "./store/index";
import { Provider } from "react-redux";
import ErrorBoundary from "./components/ErrorBoundary";
import { ErrorFallBack } from "./features/ErrorFallBack";

// function ErrorFallback() {
//   return (
//     <div role="alert">
//       <p>Something went wrong...</p>
//     </div>
//   )
// }

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary fallbackComponent={ErrorFallBack}>
      <Router>
        <App />
      </Router>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);


