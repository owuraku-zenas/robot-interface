import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React from 'react'
import MainView from './views/MainView'
import ConnectionView from './views/ConnectionView'

const AppRouter = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<MainView />} >
                       <Route path="/dashboard" element={ <h1>Dashboard</h1> }/>
                       <Route path="/gps" element={ <h1>GPS</h1> }/>
                       <Route path="/video-stream" element={ <h1>Video</h1> }/>
                       <Route path="/2d-map" element={ <h1>2D Map</h1> }/>
                       <Route path="/3d-map" element={ <h1>3D Map</h1> }/>
                       <Route path="/rover-model" element={ <h1>Model</h1> }/>
                       <Route path="/topics" element={ <h1>List of Topics</h1> }/>
                       <Route path="*" element={ <h1>Page Not Found</h1> } />
                    </Route>
                    <Route path="/connect" element={<ConnectionView />} />
                    <Route path="*" element={ <h1>Page Not Found</h1> } />
                </Routes>
            </Router>
        </div>
    )
}

export default AppRouter