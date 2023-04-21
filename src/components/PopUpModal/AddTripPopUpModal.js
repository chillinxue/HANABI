import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import firebase from 'firebase/app';
// import 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { doc, setDoc, addDoc, collection } from 'firebase/firestore';
import { AuthContext } from '../../Context/AuthContext';
import { v4 as uuidv4 } from 'uuid';

// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';

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

const ModalContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 1.5px 3px rgba(0, 0, 0, 0.5);
    width: 900px;
    height: 500px;
    padding: 0;
    margin: 0;
    border: none;
    z-index: 2;
`;

const ModalOverlay = styled.div`
    background-color: rgba(255, 255, 255, 0.7);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
`;
const AddTripContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    border: 1px solid black;
    gap: 10px;
    border-box: box-sizing;
`;
const AddTripLeftContainer = styled.div`
    border: 1px solid black;
    width: 50%;
`;
const AddTripRightContainer = styled.div`
    border: 1px solid black;
    width: 50%;
`;
export default function AddPopUpModal({ modalOpen, setModalOpen }) {
    const [selectedStartedDate, setSelectedStartedDate] = useState(null);
    const [selectedEndedDate, setSelectedEndedDate] = useState(null);
    const [dateRange, setDateRange] = useState([]);
    const { userUID } = useContext(AuthContext);
    const [trips, setTrips] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const generateDateRange = (startDate, endDate) => {
            const range = [];
            let currentDate = new Date(startDate.getTime());
            while (currentDate <= endDate) {
                range.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
            }
            return range;
        };

        if (selectedStartedDate && selectedEndedDate) {
            const dateRange = generateDateRange(selectedStartedDate, selectedEndedDate);
            setDateRange(dateRange);
        }
    }, [selectedStartedDate, selectedEndedDate]);

    const handleStartDateChange = (date) => {
        setSelectedStartedDate(date);

        if (selectedEndedDate && date.getTime() > selectedEndedDate.getTime()) {
            setSelectedEndedDate(date);
        }
    };

    const handleEndDateChange = (date) => {
        if (selectedStartedDate && date.getTime() >= selectedStartedDate.getTime()) {
            setSelectedEndedDate(date);
        }
    };

    function handleSaveTrip() {
        const tripname = document.getElementById('tripname').value.trim();

        console.log(tripname);
        if (tripname.length === 0) {
            alert('請輸入旅行名稱');
            return;
        }
        if (dateRange.length === 0) {
            alert('請選擇旅遊期間');
            return;
        }
        const tripId = uuidv4();
        const tripRef = doc(db, 'users', userUID, 'trips', tripId);

        const formattedDateRange = dateRange.map((date) => date.toLocaleDateString());

        const dates = {};
        formattedDateRange.forEach((date) => {
            dates[date] = {
                time: [
                    {
                        placeAddress: '',
                        placeId: '',
                        placeName: '',
                        placeWebsite: '',
                        time: '',
                    },
                ],
            }; // 建立日期的空物件，並在其中加入時間的空陣列
        });
        setDoc(tripRef, {
            tripname: tripname,
            tripId: tripId,
            dates: dates,
        })
            .then(() => {
                console.log(`成功儲存旅行 ${tripname}`);
                closeModal();
            })
            .catch((error) => {
                console.error(`儲存旅行 ${tripname} 時發生錯誤`, error);
            });
    }

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
    return (
        <div>
            <ModalOverlay onClick={closeModal} />
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <AddTripContainer>
                    <AddTripLeftContainer>
                        <h1>旅行名稱</h1>
                        <input id='tripname' placeholder='先為行程取一個名字吧'></input>
                    </AddTripLeftContainer>
                    <AddTripRightContainer>
                        <h1>預計旅遊期間</h1>
                        <p>開始日期</p>
                        <DatePicker selected={selectedStartedDate} onChange={handleStartDateChange} />
                        <p>結束日期</p>
                        <DatePicker
                            selected={selectedEndedDate}
                            onChange={handleEndDateChange}
                            minDate={selectedStartedDate}
                        />
                        <button
                            onClick={() => {
                                console.log(dateRange);
                                closeModal();
                                handleSaveTrip();
                            }}
                        >
                            開始規劃旅程
                        </button>
                    </AddTripRightContainer>
                </AddTripContainer>
            </ModalContainer>
        </div>
    );
}
// export default function MenuPopUpModal({ modalOpen, setModalOpen }) {
//     const [selectedStartedDate, setSelectedStartedDate] = useState(null);
//     const [selectedEndedDate, setSelectedEndedDate] = useState(null);

//     const handleStartDateChange = (date) => {
//         setSelectedStartedDate(date);

//         if (selectedEndedDate && date.getTime() > selectedEndedDate.getTime()) {
//             setSelectedEndedDate(date);
//         }
//     };

//     const handleEndDateChange = (date) => {
//         if (selectedStartedDate && date.getTime() >= selectedStartedDate.getTime()) {
//             setSelectedEndedDate(date);
//         }
//     };
//     const openModal = () => {
//         setModalOpen(true);
//     };

//     const closeModal = () => {
//         setModalOpen(false);
//     };

//     const handlePlanTrip = () => {
//         if (selectedStartedDate && selectedEndedDate) {
//             const oneDay = 24 * 60 * 60 * 1000; // milliseconds
//             const daysBetween = Math.round(Math.abs((selectedStartedDate - selectedEndedDate) / oneDay)) + 1;
//             const dates = [];
//             for (let i = 0; i < daysBetween; i++) {
//                 const date = new Date(selectedStartedDate.getTime() + i * oneDay);
//                 dates.push(date);
//             }
//             // 設定日期區間
//             setModalOpen(false); // 關閉Modal
//             setSelectedStartedDate(null);
//             setSelectedEndedDate(null);
//         }
//         const tripName = document.getElementById('tripname').value;
//         console.log('行程名稱：', tripName);
//         console.log('開始日期：', selectedStartedDate);
//         console.log('結束日期：', selectedEndedDate);
//     };

//     return (
//         <div>
//             <ModalOverlay onClick={closeModal} />
//             <ModalContainer onClick={(e) => e.stopPropagation()}>
//                 <AddTripContainer>
//                     <AddTripLeftContainer>
//                         <h1>旅行名稱</h1>
//                         <input id='tripname' placeholder='先為行程取一個名字吧'></input>
//                     </AddTripLeftContainer>
//                     <AddTripRightContainer>
//                         <h1>預計旅遊期間</h1>
//                         <p>開始日期</p>
//                         <DatePicker id='starteddate' selected={selectedStartedDate} onChange={handleStartDateChange} />
//                         <p>結束日期</p>
//                         <DatePicker
//                             id='endeddate'
//                             selected={selectedEndedDate}
//                             onChange={(date) => setSelectedEndedDate(date)}
//                             minDate={selectedStartedDate}
//                         />
//                         <button onClick={handlePlanTrip}>開始規劃旅程</button>
//                     </AddTripRightContainer>
//                 </AddTripContainer>
//             </ModalContainer>
//         </div>
//     );
// }
