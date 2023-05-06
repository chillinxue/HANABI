import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
// import PocTest from './pages/PocTest';
// import AutoComplete from './pages/AutoComplete';
// import GoogleMap from './pages/GoogleMap';
import Test from './pages/Test';
// import GoogleLogin from './pages/GoogleLogin';
import App from './App';
import GetPlaceSaved from './components/utils/firebase/GetPlaceSaved';
import Home from './pages/Home/Home';
import Trips from './pages/Trips/Trips';
import Blog from './pages/Blog/Blog';
import Profile from './pages/Profile/Profile';
import { AuthContextProvider } from './Context/AuthContext';
import { TripsContextProvider } from './pages/Trips/tripsContext';
import BlogArticle from './pages/BlogArticle/BlogArticle';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <AuthContextProvider>
            <TripsContextProvider>
                <Routes>
                    <Route path='/' element={<App />}>
                        <Route index element={<Home />} />
                        <Route path='Home' element={<Home />} />
                        <Route path='Trips' element={<Trips />} />
                        {/* <Route path='PocTest' element={<PocTest />} /> */}
                        {/* <Route path='Test' element={<Test />} /> */}
                        <Route path='Blog' element={<Blog />} />
                        <Route path='BlogArticle' element={<BlogArticle />} />
                        <Route path='Profile' element={<Profile />} />
                        {/* <Route path='GoogleLogin' element={<GoogleLogin />} /> */}
                        {/* <Route path='GetPlaceSaved' element={<GetPlaceSaved />} /> */}
                        <Route path='*' element={<Navigate to='/Home' replace />} />
                    </Route>
                </Routes>
            </TripsContextProvider>
        </AuthContextProvider>
    </BrowserRouter>
);
