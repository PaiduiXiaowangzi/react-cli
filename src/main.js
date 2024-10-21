import React from "react"
import ReactDom from "react-dom/client";
import App from "./App.jsx"
import "antd/dist/antd.less"
const root = ReactDom.createRoot(document.getElementById("app"))

root.render(<App />)