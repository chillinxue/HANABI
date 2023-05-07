import styled from 'styled-components/macro';
import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MenuSearchBar from '../../components/SearchBar/MenuSearchBar';
// import PosterMenuOld from '../../components/PosterMenu/PosterMenuOld';
import { initializeApp } from 'firebase/app';
import { arrayUnion, getFirestore, onSnapshot } from 'firebase/firestore';
import { doc, setDoc, addDoc, collection, updateDoc, deleteDoc } from 'firebase/firestore';
import GetPlaceSaved from '../../components/utils/firebase/GetPlaceSaved';
import Modal from 'react-modal';
import AddTripPopUpModal from '../../components/PopUpModal/AddTripPopUpModal';
import { AuthContext } from '../../Context/AuthContext';
import { TripsContextProvider } from './tripsContext';
import { Link } from 'react-router-dom';
import { TripsContext } from './tripsContext';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import PosterMenuBlack from '../../components/PosterMenuBlack/PosterMenuBlack';
import FujiMt from './FujiMt.jpg';
import SearchIcon from './search.png';
import Header from '../../components/Header/Header';
import './Trips.css';
import FujiLake from './SecOneBlockTwo.jpg';
import FujiLakee from './FujiLakee.jpg';
import Fujii from './Fujii.png';

const firebaseConfig = {
    apiKey: 'AIzaSyBx7Q_DL9eZ9zy9U-naVJ4iQPFdpfLL5Qc',
    authDomain: 'hanabi-f5ee3.firebaseapp.com',
    projectId: 'hanabi-f5ee3',
    storageBucket: 'hanabi-f5ee3.appspot.com',
    messagingSenderId: '602379997527',
    appId: '1:602379997527:web:108c1f46f5e8788fe6ae12',
    measurementId: 'G-Q9NRVJV8NH',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

const Outside = styled.div`
    width: 100%;
    height: 100%;
    background-color: #fafafa;
    display: flex;
    justify-content: center;
`;
const Inside = styled.div`
    width: 1440px;
`;
const Login = styled.div`
    z-index: 2;
`;
const LoginContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
    padding-top: 24px;
    padding-right: 24px;
    box-sizing: border-box;
`;
const LoginInsideContainer = styled.div`
    display: flex;
    border: 1px solid #2d2d2d;
    justify-content: center;
    align-items: center;
`;
const LogInButton = styled.div`
    color: #2d2d2d;
    border-right: 1px solid #2d2d2d;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    font-style: normal;
    font-weight: 700;
    font-size: 10px;
    line-height: 18px;
    text-align: center;
`;
const LogOutButton = styled.div`
    color: #2d2d2d;
    width: 45px;
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
`;
const HeadContainer = styled.div`
    padding-top: 60px;
`;
const LogoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const Logo = styled.div`
    width: 319px;
    height: 80px;
    font-family: 'Prata';
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    line-height: 81px;
    text-align: center;
    color: #2d2d2d;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    line-height: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const MainPage = styled.div`
    padding: 12px 65px;
    box-sizing: border-box;
`;
const PosterContainer = styled.div`
    display: flex;
    gap: 10px;
    width: 100%;
`;
// const Poster = styled.div`
//     background-image: url(${FujiLake});
//     background-size: cover;
//     background-position: center;
//     box-sizing: border-box;
//     box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
//     border-radius: 30px;
//     width: 100%;
//     height: 450px;
// `;
const Poster = styled.div`
    position: relative;
    width: 1040px;
    height: 450px;
    border-radius: 20px;
    overflow: hidden; // 加入這行
    .slick-slider {
        position: static;
    }
    .slick-list {
        // 加入這段
        overflow: hidden;
        margin: 0;
        padding: 0;
    }
    .slick-track {
        // 加入這段
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        height: 100%;

        .slick-slide {
            height: 100%;
            width: auto !important;
            margin: 0 10px;
            &:focus {
                outline: none;
            }
            img {
                object-fit: cover;
            }
        }
    }
`;

const RouteContainer = styled.div`
    width: 450px;
    height: 450px;
    background-color: #8dadd0;
    border-radius: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* margin-left: 30px; */
`;
const RouteSearchLogo = styled.div`
    height: 100px;

    font-family: '"Noto Sans JP", sans-serif';
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 58px;
    display: flex;
    align-items: end;
    color: #fafafa;

    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
const RouteSubContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 15px;
    margin-top: 30px;
`;
const RouteFromContainer = styled.div`
    width: 265px;
    height: 55px;

    background: rgba(255, 255, 255, 0.5);
    /* mix-blend-mode: soft-light; */
    border: 2px solid #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0px 15px;
    box-sizing: border-box;
`;
const RouteInput = styled.input`
    width: 180 px;
    border: none;
    box-shadow: none;
    outline: none;
    background: none;

    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
    color: #2d2d2d;
    ::placeholder {
        color: #828282;
        opacity: 0.75;
    }

    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
const RouteToContainer = styled.div`
    width: 265px;
    height: 55px;

    background: rgba(255, 255, 255, 0.5);
    /* mix-blend-mode: soft-light; */
    border: 2px solid #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0px 10px;
    box-sizing: border-box;
`;
const SearchIconContainer = styled.img`
    width: 25px;
    position: relative;
    right: 20px;
`;
const MiddleContainer = styled.div`
    height: 525px;
    display: flex;
    margin-top: 20px;
    gap: 10px;
`;
const AddtoFavContainer = styled.div`
    display: flex;
    gap: 5px;
`;
const SelectedTypeContainer = styled.div``;
const SelectedType = styled.select`
    width: 150px;
    height: 25px;
    background-color: transparent;
    padding: 1px;
    border-radius: 5px;
    opacity: 0.75;
    border: 1px solid #2d2d2d;

    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 17px;
    text-align: flex-start;

    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    &:hover {
        background-color: #2c3e50;
        color: #fafafa;
    }

    &:active {
        box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.1);
    }
`;
const Option = styled.option`
    background-color: rgba(255, 255, 255, 0.5);
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
    color: #2d2d2d;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const AddtoFav = styled.div`
    width: 105px;
    background-color: transparent;
    padding: 1px;
    border-radius: 5px;
    opacity: 0.75;
    border: 1px solid #2d2d2d;
    display: flex;
    align-items: center;
    justify-content: center;

    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 17px;
    text-align: flex-start;

    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    &:hover {
        background-color: #2c3e50;
        color: #fafafa;
    }

    &:active {
        box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.1);
    }
`;
const FavoritesContainer = styled.div`
    width: 400px;
    height: 525px;
    border: 1px solid white;
    box-sizing: border-box;
    background: #8dadd0;
    border-radius: 20px;
`;
const FavoritesHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
`;
const FavLogo = styled.div`
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
    text-align: center;

    color: #fafafa;

    mix-blend-mode: normal;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
const FavShowOnMap = styled.div`
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 700;
    font-size: 8px;
    line-height: 14px;
    text-align: center;
    border: 1px solid #2d2d2d;
    padding: 4px 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 95px;
    height: 20px;

    color: #2d2d2d;
    cursor: pointer;
    &:hover {
        background-color: #2c3e50;
        color: #fafafa;
    }

    &:active {
        box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.1);
    }
`;
const MapOutContainer = styled.div``;

const PlanOutContainer = styled.div`
    display: flex;
    margin-top: 10px;
    gap: 10px;
    height: 525px;
`;
const PlanLeftContainer = styled.div`
    width: 400px;
    padding: 0px 5px;
    box-sizing: border-box;
    background: #2d2d2d;
    background: rgba(45, 45, 45, 0.2);
    opacity: 0.9;
    border-radius: 20px;
`;
const TripsLogo = styled.div`
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
    text-align: center;

    color: #2d2d2d;

    mix-blend-mode: normal;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
const PlanLeftHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
`;
const TripsBoxSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    width: 380px;
`;

const TripsBox = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    &:hover {
        color: #fafafa;
    }
`;
const PlanRightContainer = styled.div`
    width: 100%;
`;
const TripDateContainer = styled.div`
    display: flex;
    gap: 10px;
    width: 100%;
    height: 50px;
    align-items: end;
`;

const TripsContent = styled.div`
    width: 300px;
    background: #f3f3f3;
    mix-blend-mode: normal;
    border: 2px solid rgba(250, 250, 250, 0.75);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding: 0px 20px 10px 20px;
    cursor: pointer;
    &:hover {
        background-color: #8dadd0;
        color: #fafafa;
    }

    &:active {
        box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.1);
    }
`;
const TripsBoxName = styled.div`
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 23px;
    text-align: center;

    color: #2d2d2d;
    margin-top: 10px;
`;
const TripsDate = styled.div`
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 14px;

    color: #2d2d2d;
`;
const TripsBoxHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 2px;
`;
const DeleteTripsBox = styled.div`
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 22px;
    text-align: end;
    margin-right: 10px;

    color: #404143;

    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
`;
const DateBox = styled.div`
    width: 60px;
    height: 30px;

    background: ${(props) => (props.isSelected ? '#2d2d2d' : '#fafafa')};
    opacity: 0.9;
    border: 1px solid #2d2d2d;
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;

    color: ${(props) => (props.isSelected ? '#fafafa' : '#2d2d2d')};
    cursor: pointer;
    &:hover {
        background-color: #2c3e50;
        color: #fafafa;
    }

    &:active {
        box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.1);
    }
`;
const TripInfoContainer = styled.div`
    border: 1px solid black;
    width: 100%;
    height: 475px;
    box-sizing: border-box;
    background-color: #2d2d2d;
    opacity: 0.9;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const TripInfoSubContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
const TripInfoTitleContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const TripInfoTitle = styled.div`
    height: 65px;
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
    border-bottom: 1px solid #fafafa;
    width: 640px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fafafa;
`;

const SavedTripContainer = styled.div`
    /* display: flex;
    flex-direction: column; */
    /* justify-content: center;
    align-items: center; */
`;
const SavedTripDetailContainer = styled.div`
    height: 50px;
    display: flex;
    flex-direction: column;
    margin: 5px;
    width: 645px;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #fafafa;
`;
const SavedTripDetailSubContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #fafafa;
    height: 65px;
    width: 645px;
`;
const SavedBox = styled.div`
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
    align-items: center;
`;
const SavedTripDetailPlace = styled.div`
    border: 1px solid black;
    margin: 5px;
    width: 100%;
`;
const SavedTripDetailTime = styled.div`
    border: 1px solid black;
    margin: 5px;
`;
const SavedTripDetailAddress = styled.div`
    border: 1px solid black;
    width: 100%;
    margin: 5px;
`;
const SavedDescription = styled.div`
    border: 1px solid black;
    width: 100%;
    margin: 5px;
`;
const TodayTripContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid white;
    width: 100%;
    height: 475px;
    box-sizing: border-box;
    background-color: #fafafa;
    opacity: 0.9;
`;
const TodayTripHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const TodayTripHeaderTitle = styled.div`
    height: 65px;
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
    border-bottom: 1px solid #2d2d2d;
    width: 640px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #2d2d2d;
`;
const TodayTripSubContainer = styled.div`
    height: 400px;
`;

const TripDeatailContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const TripDetailBox = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 640px;
    height: 65px;
    border-bottom: 1px solid #2d2d2d;
`;
const TripTime = styled.div`
    width: 70px;
    margin-right: 20px;
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    text-align: end;

    color: #2d2d2d;
`;
const TripPlace = styled.div`
    color: #2d2d2d;
    width: 350px;
    margin-right: 35px;
`;
const TripName = styled.div`
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;

    color: #2d2d2d;
`;

const TripAddress = styled.div`
    width: 350px;

    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 14px;

    color: #2d2d2d;
`;
const TripDescription = styled.div`
    width: 155px;
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;

    color: #2d2d2d;
`;
const DeleteDetailBox = styled.div`
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 22px;
    text-align: center;

    color: #2d2d2d;

    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const AddNewTripContainer = styled.div`
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 700;
    font-size: 8px;
    line-height: 14px;
    text-align: center;
    border: 1px solid #2d2d2d;
    padding: 4px 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 95px;
    height: 20px;

    color: #2d2d2d;
    cursor: pointer;
    &:hover {
        background-color: #2c3e50;
        color: #fafafa;
    }

    &:active {
        box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.1);
    }
`;
const AddTripDetailContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid white;
    height: 65px;
    margin: 0px 10px 10px 10px;

    background: rgba(217, 217, 217, 0.5);
`;
const AddTripDetailBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 640px;
    height: 60px;
`;
const AddTripDetailTime = styled.input`
    border: none;
    background-color: transparent;
    /* margin-right: 20px; */
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 23px;
    text-align: end;

    color: #2d2d2d;

    position: relative;
    padding-left: 25px;
    ::-webkit-calendar-picker-indicator {
        position: absolute;
        top: 50%;
        left: 5px;
        transform: translateY(-50%);
    }
    cursor: pointer;
`;
const AddTripDetailPlace = styled.div`
    color: #fafafa;
    width: 350px;
    margin-right: 35px;
    margin-left: 20px;
`;
const AddTripDetailName = styled.div`
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;

    color: #2d2d2d;
`;

const AddTripDetailAddress = styled.div`
    width: 350px;

    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 14px;

    color: #2d2d2d;
`;
const AddDescription = styled.input`
    width: 155px;
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;

    color: #2d2d2d;

    border: none;
    background-color: transparent;
    ::placeholder {
        color: #2d2d2d;
    }
    cursor: pointer;
`;
const AddToTrip = styled.div`
    margin-left: 20px;
    width: 40px;
    height: 24px;
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 700;
    font-size: 8px;
    line-height: 14px;
    text-align: center;
    padding: 4px 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    color: #2d2d2d;

    border: 1px solid #2d2d2d;
    cursor: pointer;
    &:hover {
        background-color: #2c3e50;
        color: #fafafa;
    }

    &:active {
        box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.1);
    }
`;

export default function Trips() {
    const { userUID } = useContext(AuthContext);
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const { signIn, logOut } = useContext(AuthContext);
    let cachedScripts = [];
    function useScript(src) {
        // Keeping track of script loaded and error state   //load SDK 初始資料 （收）
        useEffect(() => {
            window.scrollTo(0, 0); // 在页面加载完成或页面切换时滚动到顶部
        }, []);

        const [state, setState] = useState({
            loaded: false,
            error: false,
        });

        useEffect(() => {
            if (cachedScripts.includes(src)) {
                setState({
                    loaded: true,

                    error: false,
                });
            } else {
                cachedScripts.push(src);
                let script = document.createElement('script');
                script.src = src;
                script.async = true;
                const onScriptLoad = () => {
                    setState({
                        loaded: true,
                        error: false,
                    });
                };

                const onScriptError = () => {
                    const index = cachedScripts.indexOf(src);
                    if (index >= 0) cachedScripts.splice(index, 1);
                    script.remove();
                    setState({
                        loaded: true,
                        error: true,
                    });
                };
                script.addEventListener('load', onScriptLoad);
                script.addEventListener('error', onScriptError);
                document.body.appendChild(script);
                return () => {
                    script.removeEventListener('load', onScriptLoad);
                    script.removeEventListener('error', onScriptError);
                };
            }
        }, [src]);
        return [state.loaded, state.error];
    }
    const [loaded, error] = useScript(
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyCszxEdzSyD5fLI9-m_nRiUr6GEbeIfTG4&libraries=places&callback=initMap'
    ); //憑證
    const [map, setDataMap] = useState();
    const [from, setFrom] = useState(''); //起始地點，要加個to
    const fromInputRef = useRef(null); // 新增起點 ref
    const toInputRef = useRef(null); // 新增終點 ref
    const [to, setTo] = useState(''); // 新增終點 state
    const [locationInfo, setLocationInfo] = useState(null);
    // const [places, setPlaces] = useState();
    const { places, setPlaces, addPlaces, setAddPlaces, trips, setTrips } = useContext(TripsContext);

    const [favorites, setFavorites] = useState([]);
    const [typeSaved, setTypeSaved] = useState(null);
    const [address, setAddress] = useState('');
    const [latLngResults, setLatLngResults] = useState([]);
    const cachedPlaces = useMemo(() => places, [places]);
    const [markers, setMarkers] = useState([]);
    const [showMarkers, setShowMarkers] = useState(false);
    // const searchInputRef = useRef(null);
    const { searchInputRef } = useContext(TripsContext);

    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        if (!userUID) {
            // 如果用戶未登入，則顯示警告框
            alert('請先登入');
            return;
        }
        setModalOpen(true);
    };
    console.log(addPlaces);
    const closeModal = () => {
        setModalOpen(false);
    };

    // const [trips, setTrips] = useState([]); //抓到旅行資料
    const initialSelectedDates = trips && trips.length > 0 ? trips[0].dateRange : [];
    // const [selectedTrip, setSelectedTrip] = useState(initialSelectedDates);
    const [selectedTrip, setSelectedTrip] = useState({});
    const [selectedTripDate, setSelectedTripDate] = useState(undefined); // 預設為 undefined
    const [selectedDateIndex, setSelectedDateIndex] = useState(0);
    const [sortedData, setSortedData] = useState();
    const [enterDescription, setEnterDescription] = useState('');
    const [tripUpdated, setTripUpdated] = useState(false);
    const [autoUpdateTrips, setAutoUpdateTrips] = useState({});
    const [isClickTrip, setIsClickTrip] = useState(false);
    const [isClickDate, setIsClickDate] = useState(false);

    const handleDateClick = (date) => {
        setSelectedTripDate(date);
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            directionsDisplay.setMap(null);
            calcRoute();
        }
    };
    console.log(selectedTrip.dates);
    // const handleTripClick = (trip, index) => {
    //     const tripDates = trips[index].dates;
    //     setSelectedDates(tripDates);
    // };
    useEffect(() => {
        if (!userUID) {
            return;
        }
        const tripsRef = collection(db, `users/${userUID}/trips`);
        const unsubscribe = onSnapshot(tripsRef, (snapshot) => {
            const newTrips = snapshot.docs.map((doc) => doc.data());
            setTrips(newTrips);

            // Get the selected trip from the updated trips array
            const updatedSelectedTrip = newTrips.find((trip) => trip.tripId === selectedTrip.tripId);

            // If the selected trip's data has changed, update the autoUpdateTrips state
            if (updatedSelectedTrip && JSON.stringify(updatedSelectedTrip) !== JSON.stringify(selectedTrip)) {
                setSelectedTrip(updatedSelectedTrip);
                setAutoUpdateTrips(updatedSelectedTrip.dates[selectedDateIndex]);
            }
        });

        return () => {
            unsubscribe();
            // addTripDoc();
        };
    }, [userUID, tripUpdated]);

    const [time, setTime] = useState(''); //時間選擇器
    const handleTimeChange = (event) => {
        setTime(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setEnterDescription(event.target.value);
    };

    async function uploadItems(name, id, address, phone, rating, url, website, type) {
        //存入user sub-collection Places
        try {
            const itemsRef = doc(db, 'users', userUID);
            console.log(itemsRef);
            console.log(name, id, address, rating, url, website, type);
            await addDoc(collection(itemsRef, 'SavedPlaces'), {
                name: name,
                placeId: id,
                formatted_address: address,
                formatted_phone_number: phone || '',
                rating: rating || '',
                url: url || '',
                website: website || '',
                //如果要加回去，要在上面（）填回去，下方也要加（這個導致很多地方沒辦法加入fav
                type: type,
            });
            // console.log('Item uploaded with ID: ', docRef.id);
        } catch (e) {
            console.error('Error uploading item: ', e);
        }
    }

    async function fetchData() {
        const apiKey = 'AIzaSyCszxEdzSyD5fLI9-m_nRiUr6GEbeIfTG4';
        const addresses = cachedPlaces.map((place) => place.formatted_address);
        const promises = addresses.map(async (address) => {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`
            );
            const data = await response.json();
            const { lat, lng } = data.results[0].geometry.location;
            return { lat, lng };
        });
        const results = await Promise.all(promises);
        console.log(results);

        const filteredResults = results.filter(({ lat, lng }, index) => {
            const address = addresses[index];
            const place = places.find((place) => place.formatted_address === address);
            return !!place;
        });

        console.log(filteredResults);

        const allMarkers = filteredResults.map(({ lat, lng }, index) => {
            const place = places.find(({ formatted_address }) => formatted_address === addresses[index]);
            const title = `${place.name} (${place.formatted_address})`;
            const marker = new window.google.maps.Marker({
                position: { lat, lng },
                title,
            });

            const infowindow = new window.google.maps.InfoWindow({
                content: `
                    <article class='article-wrapper'>
                        <div class='rounded-lg container-project'  
                        style={{
                        
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                    
                          }}>
                          <img class="place-photo" src="${place.photo}">
                          </div>
                        <div class='project-info'>
                            <div class='flex-pr'>
                                <div class='project-title text-nowrap'>${place.name}</div>
                                <div class='project-hover'>
                                <a href=${place.website}>
                                <svg
                                style={{ color: 'black' }}
                                xmlns='http://www.w3.org/2000/svg'
                                width='2em'
                                height='2em'
       color='black'
       strokeLinejoin='round'
       strokeLinecap='round'
       viewBox='0 0 24 24'
       strokeWidth='2'
       fill='none'
       stroke='currentColor'
       style={{ cursor: 'pointer' }}
     >
                                 <line y2='12' x2='19' y1='12' x1='5'></line>
                                 <polyline points='12 5 19 12 12 19'></polyline>
                             </svg>
       </a>
                                </div>
                            </div>
                            <div style={{ color: 'black', fontSize: '8px', margin: '8px 0px' }}>
                                Address: ${place.formatted_address}
                                <br />
                                Phone: ${place.formatted_phone_number}
                            </div>
                            <div class='types'>
                                <span class='project-type'>• ${place.type}</span>
                            </div>
                        </div>
                    </article>`,
            });
            console.log(place);
            marker.addListener('click', () => {
                infowindow.open(map, marker);
            });

            marker.setMap(map);
            return marker;
        });

        setMarkers(allMarkers);
    }

    function addToFavorites() {
        if (to) {
            // setFavorites((prevFavorites) => [...prevFavorites, to]);
            console.log(locationInfo);
            const favoriteList = [...favorites, locationInfo];
            setFavorites(favoriteList);
            // console.log(favoriteList[favoriteList.length - 1].place_id);
            uploadItems(
                locationInfo.name,
                locationInfo.place_id,
                locationInfo.formatted_address,
                locationInfo.formatted_phone_number || '',
                locationInfo.rating || '',
                locationInfo.url || '',
                locationInfo.website || '',
                typeSaved
            );
            console.log(locationInfo.place_id);
        }
    }

    useEffect(() => {
        if (loaded) {
            //load到才會執行
            const myLatLng = [{ lat: 35.682518, lng: 139.765804 }];
            const map = new window.google.maps.Map(document.getElementById('map'), {
                //div render map
                zoom: 10, //zoom in
                center: myLatLng[0], //初始經緯度 （替換）
                mapTypeId: window.google.maps.MapTypeId.ROADMAP, //一般地圖
            });

            const fromAutocomplete = new window.google.maps.places.Autocomplete(fromInputRef.current);
            const toAutocomplete = new window.google.maps.places.Autocomplete(toInputRef.current);
            // const searchAutocomplete = new window.google.maps.places.Autocomplete(searchInputRef.current);

            fromAutocomplete.addListener('place_changed', () => {
                setFrom(fromAutocomplete.getPlace().formatted_address);
            });

            toAutocomplete.addListener('place_changed', () => {
                setTo(toAutocomplete.getPlace().formatted_address);
                toInputRef.current.value = toAutocomplete.getPlace().formatted_address;
                setLocationInfo(toAutocomplete.getPlace());
            });

            // searchAutocomplete.addListener('place_changed', () => {
            //     searchInputRef.current.value = searchAutocomplete.getPlace().formatted_address;
            //     setLocationInfo(searchAutocomplete.getPlace());
            // });
            setDataMap(map);
            console.log(latLngResults);
        }
    }, [loaded]);

    // useEffect(() => {
    //     if (loaded) {
    //         const myLatLng = [{ lat: 35.682518, lng: 139.765804 }];
    //         const map = new window.google.maps.Map(document.getElementById('map'), {
    //             zoom: 10,
    //             center: myLatLng[0],
    //             mapTypeId: window.google.maps.MapTypeId.ROADMAP,
    //         });

    //         const searchBox = new window.google.maps.places.SearchBox(searchInputRef.current);

    //         searchBox.addListener('places_changed', () => {
    //             const places = searchBox.getPlaces();
    //             if (places.length === 0) return;

    //             const bounds = new window.google.maps.LatLngBounds();
    //             places.forEach((place) => {
    //                 if (!place.geometry || !place.geometry.location) {
    //                     console.log('Returned place contains no geometry');
    //                     return;
    //                 }

    //                 const marker = new window.google.maps.Marker({
    //                     map,
    //                     title: place.name,
    //                     position: place.geometry.location,
    //                 });

    //                 setMarkers((markers) => [...markers, marker]);

    //                 if (place.geometry.viewport) {
    //                     bounds.union(place.geometry.viewport);
    //                 } else {
    //                     bounds.extend(place.geometry.location);
    //                 }
    //             });

    //             map.fitBounds(bounds);
    //         });
    //     }
    // }, [loaded, searchInputRef]);

    useEffect(() => {
        getNewSortedDate(); //.map之前consloe出來是個array，讓他
    }, [selectedTrip]); //當點擊trip，產生時間順續的array

    console.log(places);
    //create a DirectionsService object to use the route method and get a result for our request
    const directionsService = new window.google.maps.DirectionsService(); //路線計算

    //create a DirectionsRenderer object which we will use to display the route
    const directionsDisplay = new window.google.maps.DirectionsRenderer(); //路線render

    //bind the DirectionsRenderer to the map
    directionsDisplay.setMap(map); //綁定到map

    function calcRoute() {
        //create request

        const request = {
            origin: from, //
            destination: to, //存一個state 控制
            travelMode: window.google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT 路線模式
            unitSystem: window.google.maps.UnitSystem.METRIC, //單位
        };

        directionsService.route(request, function (result, status) {
            // console.log(status);
            if (status == window.google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result); //寫路線的功能

                // console.log(result);
            } else {
                //delete route from map
                directionsDisplay.setDirections({ routes: [] });
                //center map in London
                map.setCenter({ lat: 25.033964, lng: 121.564468 });
                //show error message
            }
            console.log(result);
        });
    }

    console.log(selectedTrip.dates);

    // if (locationInfo !== null) {
    //     console.log('locationInfo:', locationInfo.geometry);
    // } else {
    // }

    // console.log(selectedTrip.dates);

    function getSortedDate() {
        if (Object.keys(selectedTrip).length > 0) {
            const timeList = selectedTrip.dates.map((date) => date);
            const sortedData = Object.fromEntries(
                Object.entries(timeList)
                    .filter(([key]) => !isNaN(Date.parse(key))) // filter out non-time keys
                    .sort(([a], [b]) => new Date(`1970/01/01 ${a}`) - new Date(`1970/01/01 ${b}`))
            );
            return sortedData;
        }
    } //selectedtrip.date（有包含地址資料）按照時間順序排

    function getNewSortedDate() {
        if (getSortedDate()) {
            const dates = Object.keys(getSortedDate()[selectedDateIndex]).filter((time) => time !== 'date'); // { 9:00: {}, 10:00: {}, date: '' }
            dates.sort((a, b) => {
                return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b);
            });
            return dates;
        }
    } //單純把時間拿出來排

    console.log(selectedTrip.dates);
    async function addTripDetailToFirebase() {
        setEnterDescription('');
        setAddPlaces('');
        setTime('');

        const addTripDetailTestRef = doc(db, 'users', userUID, 'trips', selectedTrip.tripId);
        const selectedDate = selectedTrip.dates[selectedDateIndex];

        await updateDoc(addTripDetailTestRef, {
            dates: selectedTrip.dates.map((date) => {
                if (date.date === selectedDate.date) {
                    return {
                        ...date,
                        [time]: {
                            // date: selectedTripDate,
                            placeName: addPlaces.name,
                            placeAddress: addPlaces.formatted_address,
                            formatted_phone_number: addPlaces.formatted_phone_number || '',
                            placeId: addPlaces.placeId,
                            placesWebsite: addPlaces.website || '',
                            description: enterDescription,
                        },
                    };
                }
                return date;
            }),
        });
        setTripUpdated(true);
    }
    async function handleDeleteTrip(tripId) {
        try {
            const tripRef = doc(db, 'users', userUID, 'trips', tripId);
            await deleteDoc(tripRef);
            console.log('刪除成功');
        } catch (error) {
            console.error('刪除失敗');
        }
    }
    console.log(selectedTripDate);
    console.log(addPlaces.formatted_address);
    console.log(addPlaces.placeId);
    console.log(addPlaces.website);
    console.log(selectedDateIndex);
    console.log('userUID: ', userUID);
    console.log(autoUpdateTrips);
    // searchInputRef.current && console.log(searchInputRef.current.value);

    if (!loaded) {
        return;
    }
    return (
        <>
            <Outside>
                <Inside>
                    {/* <PosterMenuOld></PosterMenuOld> */}
                    <Header></Header>
                    <HeadContainer>
                        {/* <Login>
                            <LoginContainer to='/GoogleLogin'>
                                <LoginInsideContainer>
                                    <LogInButton onClick={() => signIn(auth, provider)}>Login</LogInButton>
                                    <LogOutButton onClick={() => logOut(auth)}>Logout</LogOutButton>
                                </LoginInsideContainer> */}
                        {/* <button onClick={() => signIn(auth, provider)}>Login</button>
                <button onClick={() => logOut(auth)}>Logout</button> */}
                        {/* </LoginContainer>
                        </Login> */}
                        <Link to='/Home' style={{ textDecoration: 'none' }}>
                            <LogoContainer>
                                <Logo>HANABI</Logo>
                            </LogoContainer>
                        </Link>
                    </HeadContainer>
                    {/* <PosterMenuBlack></PosterMenuBlack> */}
                    <MainPage>
                        <PosterContainer>
                            <RouteContainer>
                                <RouteSearchLogo>ROUTE SEARCH</RouteSearchLogo>
                                <RouteSubContainer>
                                    <RouteFromContainer>
                                        <RouteInput
                                            type='text'
                                            ref={fromInputRef} // 使用 ref
                                            placeholder='START 出発点'
                                        ></RouteInput>
                                    </RouteFromContainer>
                                    <RouteToContainer>
                                        <RouteInput
                                            type='text'
                                            ref={toInputRef} // 使用 ref
                                            placeholder='DESTINATION 终点'
                                            onKeyDown={handleKeyDown}
                                        ></RouteInput>
                                        <SearchIconContainer
                                            src={SearchIcon}
                                            onClick={() => calcRoute()}
                                        ></SearchIconContainer>
                                    </RouteToContainer>
                                    <AddtoFavContainer>
                                        <SelectedTypeContainer>
                                            <SelectedType
                                                name='layerSaved'
                                                id='placeSaved'
                                                onChange={(e) => setTypeSaved(e.target.value)}
                                            >
                                                <Option value=''>Selected Type</Option>
                                                <Option value='hotel'>Hotel</Option>
                                                <Option value='attraction'>Attraction</Option>
                                                <Option value='restaurant'>Restaurant</Option>
                                                <Option value='transportation'>Transport</Option>
                                            </SelectedType>
                                        </SelectedTypeContainer>
                                        <AddtoFav onClick={() => addToFavorites()}>Add to Favorites</AddtoFav>
                                    </AddtoFavContainer>
                                </RouteSubContainer>
                                {/* <button onClick={() => calcRoute()}>搜尋路線</button> */}
                            </RouteContainer>
                            <Poster>
                                <Slider autoplay={true} autoplaySpeed={4000} slidesToShow={1}>
                                    <div>
                                        <img
                                            src={FujiMt}
                                            alt='Fuji Lake'
                                            style={{ width: '100%', height: '450px', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div>
                                        <img
                                            src={FujiMt}
                                            alt='Mountain'
                                            style={{ width: '100%', height: '450px', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div>
                                        <img
                                            src={FujiMt}
                                            alt='Beach'
                                            style={{ width: '100%', height: '450px', objectFit: 'cover' }}
                                        />
                                    </div>
                                </Slider>
                            </Poster>
                        </PosterContainer>
                        <MiddleContainer>
                            <FavoritesContainer>
                                <FavoritesHeader>
                                    <FavLogo>Favorites</FavLogo>
                                    <FavShowOnMap
                                        onClick={() => {
                                            setShowMarkers(!showMarkers);
                                            if (!showMarkers) {
                                                fetchData();
                                            } else {
                                                markers.forEach((marker) => marker.setMap(null));
                                            }
                                        }}
                                    >
                                        Show on Map
                                    </FavShowOnMap>
                                </FavoritesHeader>
                                <div
                                    style={{ width: '380px', height: '500px', overflowY: 'auto', paddingLeft: '10px' }}
                                >
                                    <GetPlaceSaved
                                        places={places}
                                        setPlaces={setPlaces}
                                        setShowMarkers={setShowMarkers}
                                    />
                                </div>
                            </FavoritesContainer>
                            <MapOutContainer
                                id='map'
                                style={{ height: '100%', width: '100%', borderRadius: '20px' }}
                            ></MapOutContainer>
                        </MiddleContainer>
                        <PlanOutContainer>
                            <PlanLeftContainer>
                                <PlanLeftHeader>
                                    <TripsLogo>TRIPS</TripsLogo>
                                    <AddNewTripContainer onClick={openModal}>Add new Trip</AddNewTripContainer>
                                </PlanLeftHeader>
                                {/* <button onClick={openModal}>Add new Trip</button> */}
                                <TripsBoxSection>
                                    {trips &&
                                        trips.map((trip, index) => (
                                            <TripsBox
                                                key={index}
                                                onClick={() => {
                                                    console.log(trip);
                                                    setSelectedTrip(trip);
                                                    console.log(trips);
                                                }}
                                            >
                                                <TripsContent>
                                                    <TripsBoxHeader>
                                                        <TripsBoxName>{trip.tripname}</TripsBoxName>
                                                        <DeleteTripsBox
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDeleteTrip(trip.tripId);
                                                            }}
                                                        >
                                                            X
                                                        </DeleteTripsBox>
                                                    </TripsBoxHeader>
                                                    <TripsDate>
                                                        {trip.dates[0].date} - {trip.dates[trip.dates.length - 1].date}
                                                    </TripsDate>
                                                </TripsContent>
                                            </TripsBox>
                                        ))}
                                </TripsBoxSection>
                            </PlanLeftContainer>
                            <PlanRightContainer>
                                <TripDateContainer>
                                    {selectedTrip.dates?.map((date, index) => (
                                        <DateBox
                                            isSelected={selectedDateIndex === index}
                                            key={index}
                                            onClick={() => {
                                                setSelectedDateIndex(index);
                                                setSelectedTripDate(
                                                    `${date.date.split('/')[0]}/${date.date.split('/')[1]}/${
                                                        date.date.split('/')[2]
                                                    }`
                                                );
                                            }}
                                        >
                                            {date.date.split('/')[1]}/{date.date.split('/')[2]}
                                        </DateBox>
                                    ))}
                                </TripDateContainer>
                                <TodayTripContainer>
                                    <TodayTripHeader>
                                        <TodayTripHeaderTitle>今日の行程</TodayTripHeaderTitle>
                                    </TodayTripHeader>
                                    <TodayTripSubContainer style={{ overflow: 'scroll', maxHeight: '390px' }}>
                                        <TripDeatailContainer>
                                            {getNewSortedDate() &&
                                                getNewSortedDate().map((time) => (
                                                    <>
                                                        <TripDetailBox>
                                                            <TripTime>{time}</TripTime>
                                                            <TripPlace>
                                                                <TripName>
                                                                    {
                                                                        selectedTrip.dates[selectedDateIndex][time]
                                                                            .placeName
                                                                    }
                                                                </TripName>

                                                                <TripAddress>
                                                                    {
                                                                        selectedTrip.dates[selectedDateIndex][time]
                                                                            .placeAddress
                                                                    }
                                                                </TripAddress>
                                                            </TripPlace>
                                                            <TripDescription>
                                                                {
                                                                    selectedTrip.dates[selectedDateIndex][time]
                                                                        .description
                                                                }
                                                            </TripDescription>
                                                            <DeleteDetailBox>x</DeleteDetailBox>
                                                        </TripDetailBox>
                                                    </>
                                                ))}
                                        </TripDeatailContainer>
                                    </TodayTripSubContainer>
                                    <AddTripDetailContainer>
                                        <AddTripDetailBox>
                                            <AddTripDetailTime type='time' value={time} onChange={handleTimeChange}>
                                                {/* <input type='time' value={time} onChange={handleTimeChange} /> */}
                                            </AddTripDetailTime>
                                            <AddTripDetailPlace>
                                                <AddTripDetailName>{addPlaces.name}</AddTripDetailName>
                                                <AddTripDetailAddress>
                                                    {addPlaces.formatted_address}
                                                </AddTripDetailAddress>
                                            </AddTripDetailPlace>
                                            <AddDescription
                                                value={enterDescription}
                                                onChange={handleDescriptionChange}
                                                placeholder='add some notes...'
                                            ></AddDescription>
                                            <AddToTrip onClick={addTripDetailToFirebase}>Add</AddToTrip>
                                            {/* <button onClick={addTripDetailToFirebase}>Done</button> */}
                                        </AddTripDetailBox>
                                    </AddTripDetailContainer>
                                </TodayTripContainer>
                                {/* <TripInfoContainer> */}
                                {/* <TripInfoTitleContainer>
                                        <TripInfoTitle>今日の行程</TripInfoTitle>
                                    </TripInfoTitleContainer>
                                    <TripInfoSubContainer>
                                        <SavedTripContainer>
                                            <SavedTripDetailContainer>
                                                <SavedTripDetailSubContainer> */}
                                {/* {selectedTrip.dates[0]} */}
                                {/* {getNewSortedDate() &&
                                                        getNewSortedDate().map((time) => (
                                                            <>
                                                                <SavedBox>
                                                                    <SavedTripDetailTime>{time}</SavedTripDetailTime>
                                                                    <SavedTripDetailPlace>
                                                                        {
                                                                            selectedTrip.dates[selectedDateIndex][time]
                                                                                .placeName
                                                                        }
                                                                    </SavedTripDetailPlace>
                                                                    <SavedTripDetailAddress>
                                                                        {
                                                                            selectedTrip.dates[selectedDateIndex][time]
                                                                                .placeAddress
                                                                        }
                                                                    </SavedTripDetailAddress>
                                                                    <SavedDescription>
                                                                        {
                                                                            selectedTrip.dates[selectedDateIndex][time]
                                                                                .description
                                                                        }
                                                                    </SavedDescription>
                                                                </SavedBox>
                                                            </>
                                                        ))} */}
                                {/* </SavedTripDetailSubContainer>
                                            </SavedTripDetailContainer>
                                        </SavedTripContainer>
                                    </TripInfoSubContainer>
                                    <AddTripDetailContainer>
                                        <AddTripDetailTime>
                                            <input type='time' value={time} onChange={handleTimeChange} />
                                        </AddTripDetailTime>
                                        <AddTripDetailPlace>{addPlaces.name}</AddTripDetailPlace>
                                        <AddTripDetailAddress>{addPlaces.formatted_address}</AddTripDetailAddress>
                                        <AddDescription
                                            value={enterDescription}
                                            onChange={handleDescriptionChange}
                                        ></AddDescription>
                                        <button onClick={addTripDetailToFirebase}>Add</button>
                                    </AddTripDetailContainer>
                                </TripInfoContainer> */}
                            </PlanRightContainer>
                        </PlanOutContainer>
                    </MainPage>
                </Inside>
            </Outside>
            {modalOpen ? (
                // <div>
                //     <ModalOverlay onClick={closeModal} />
                //     <ModalContainer onClick={(e) => e.stopPropagation()}></ModalContainer>
                // </div>
                <AddTripPopUpModal modalOpen={modalOpen} setModalOpen={setModalOpen}></AddTripPopUpModal>
            ) : null}
        </>
    );
}
