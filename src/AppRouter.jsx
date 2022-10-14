import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React from 'react'
import MainView from './views/MainView'
import ConnectionView from './views/ConnectionView'
import DashboardView from "./views/DashboardView";
import LocationView from "./views/LocationView";
import VideoStreamView from "./views/VideoStreamView";
import Map2dView from "./views/Map2dView";
import Map3dView from "./views/Map3dView";
import SettingView from "./views/SettingView";
import PageNotFound from "./views/PageNotFound";
import LogsView from "./views/TopicsView";

const AppRouter = () => {
    return (
        <div style={{height: "100vh"}}>
            <Router>
                <Routes>
                    <Route path="/" element={<MainView />} >
                        <Route path="/" element={ <DashboardView /> } />
                        <Route path="/location" element={ <LocationView /> } />
                        <Route path="/video-stream" element={ <VideoStreamView /> } />
                        <Route path="/2d-map" element={ <Map2dView /> } />
                        <Route path="/logs" element={ <LogsView /> } />
                        <Route path="/settings" element={ <SettingView /> } />
                        <Route path="*" element={ <PageNotFound /> } />
                    </Route>
                    <Route path="/connect" element={<ConnectionView />} />
                    <Route path="*" element={<h1>Page Not Found</h1>} />
                </Routes>
            </Router>
        </div>
    )
}

export default AppRouter