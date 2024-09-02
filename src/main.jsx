import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ConfigProvider } from "antd";
import ar_EG from "antd/lib/locale/ar_EG";
ReactDOM.createRoot(document.getElementById("root")).render(
  <ConfigProvider locale={ar_EG}>
    <App />
  </ConfigProvider>
);
