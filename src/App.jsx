import React,{lazy, Suspense} from "react"
import { Button } from 'antd'
// import Home from "./pages/home"
// import About from "./pages/about"
const Home = lazy(() => import(/*webpackChunkName: 'home' */ "./pages/home"))
const About = lazy(() => import(/*webpackChunkName: 'about' */ "./pages/about"))
import {BrowserRouter as Router,Link, Routes, Route} from 'react-router-dom'

function App() {
    return <Router>
        <div>
        <h1>App</h1>
        <Button type="primary">按钮</Button>
        <ul>
            <li>
                <Link to="/home">Home</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
        </ul>
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/about" element={<About />}></Route>
            </Routes>
        </Suspense>
    </div>
    </Router>
}

export default App