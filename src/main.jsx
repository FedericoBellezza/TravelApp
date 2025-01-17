import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// import css
import "./assets/css/index.css";

import App from "./App.jsx";

// bootrsap import
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <App />
  // </StrictMode>,
);
