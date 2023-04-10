import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PocTest from './pages/PocTest';
import AutoComplete from './pages/AutoComplete';
import GoogleMap from './pages/GoogleMap';
import Test from './pages/Test';
import GoogleLogin from './pages/GoogleLogin';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <Routes>
            <Route>
                <Route path='PocTest' element={<PocTest />} />
                <Route path='Test' element={<Test />} />
                <Route path='GoogleMap' element={<GoogleMap />} />
                <Route path='AutoComplete' element={<AutoComplete />} />
                <Route path='GoogleLogin' element={<GoogleLogin />} />
                <Route path='*' element={<Navigate to='/' replace />} />
            </Route>
        </Routes>
    </BrowserRouter>
);
