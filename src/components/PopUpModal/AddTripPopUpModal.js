import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/macro';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import firebase from 'firebase/app';
// import 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { doc, setDoc, addDoc, collection } from 'firebase/firestore';
import { AuthContext } from '../../Context/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import FujiLawson from './FujiLawson.jpg';

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
const OutSide = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #2d2d2d;
    height: 100%;
    padding: 10px;
`;
const AddTripContainer = styled.div`
    width: 100%;
    height: 100%;
    gap: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    margin-top: 30px;
`;
const AddTripLeftContainer = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const AddTripRightContainer = styled.div`
    width: 50%;
    height: 250px;
    background-image: url(${FujiLawson});
    background-size: cover;
    background-position: center;
`;
const AddTripHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 40px;
`;
const Logo = styled.div`
    width: 319px;
    height: 80px;
    font-family: 'Prata';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 81px;
    text-align: center;
    color: #2d2d2d;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    line-height: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fafafa;
`;
const AddTripFooter = styled.div`
    display: flex;
`;
const TripNameCon = styled.div`
    text-align: start;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
const TripText = styled.div`
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 30px;

    color: #fafafa;

    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
const TripNameInput = styled.input`
    width: 200px;
    height: 40px;

    background: rgba(250, 250, 250, 0.5);
    border-radius: 20px;
    border: none;
`;
const DatePickerCon = styled.div`
    display: flex;
`;
const datePickerStyle = {
    border: '1px solid #FAFAFA',
    borderRadius: '20px',
    backgroundColor: 'transparent',
    width: '100px',
    height: '50px',
};
const AddTripStart = styled.div`
    background: rgb(250, 250, 250);
    border: 1px solid rgb(250, 250, 250);
    border-radius: 20px;
    width: 100px;
    height: 40px;
    display: flex;
    color: rgb(45, 45, 45);
    align-items: center;
    justify-content: center;
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 30px;
`;

const StyledDatePickerInput = styled(DatePicker)`
    .react-datepicker__input-container input {
        border: 1px solid #fafafa;
        border-radius: 20px;
        background-color: transparent;
        height: 50px;
        width: 100px;
        padding: 0 10px;
    }
`;

export default function MenuPopUpModal({ modalOpen, setModalOpen }) {
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
        // const formattedDateRange = dateRange.map((date) => {date:date.toLocaleDateString()});
        let dateArray = [];
        dateRange.map((date) => dateArray.push({ date: date.toLocaleDateString() }));
        const tripId = uuidv4();
        const tripRef = doc(db, 'users', userUID, 'trips', tripId);
        setDoc(tripRef, {
            tripname: tripname,
            // dateRange: formattedDateRange,
            tripId: tripId,
            dates: dateArray,
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
            <></>
            <ModalOverlay onClick={closeModal} />
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <OutSide>
                    <AddTripContainer>
                        <AddTripHeader>
                            <Logo>HANABI</Logo>
                        </AddTripHeader>
                        <AddTripFooter>
                            <AddTripLeftContainer>
                                <TripNameCon>
                                    <TripText>Trip Name 旅行名稱</TripText>
                                    <TripNameInput id='tripname' placeholder='先為行程取一個名字吧'></TripNameInput>
                                    <TripText>Trip Date 旅遊期間 </TripText>
                                    <DatePickerCon>
                                        {/* <DatePicker
                                        style={{
                                            border: '1px solid #FAFAFA',
                                            borderRadius: '20px',
                                            backgroundColor: 'transparent',
                                            width: '100px',
                                            height: '50px',
                                        }}
                                        placeholderText='From'
                                        selected={selectedStartedDate}
                                        onChange={handleStartDateChange}
                                    />
                                    <DatePicker
                                        style={datePickerStyle}
                                        placeholderText='To'
                                        selected={selectedEndedDate}
                                        onChange={handleEndDateChange}
                                        minDate={selectedStartedDate}
                                    /> */}
                                        <StyledDatePickerInput
                                            style={{
                                                border: '1px solid #FAFAFA',
                                                borderRadius: '20px',
                                                backgroundColor: 'transparent',
                                                width: '100px',
                                                height: '50px',
                                            }}
                                            placeholderText='From'
                                            selected={selectedStartedDate}
                                            onChange={handleStartDateChange}
                                        ></StyledDatePickerInput>
                                        <StyledDatePickerInput
                                            style={datePickerStyle}
                                            placeholderText='To'
                                            selected={selectedEndedDate}
                                            onChange={handleEndDateChange}
                                            minDate={selectedStartedDate}
                                        ></StyledDatePickerInput>
                                    </DatePickerCon>
                                </TripNameCon>
                                <AddTripStart
                                    onClick={() => {
                                        console.log(dateRange);
                                        closeModal();
                                        handleSaveTrip();
                                    }}
                                >
                                    Start
                                </AddTripStart>
                            </AddTripLeftContainer>
                            <AddTripRightContainer>
                                {/* <h1>預計旅遊期間</h1>
                                <p>開始日期</p>
                                <DatePicker selected={selectedStartedDate} onChange={handleStartDateChange} />
                                <p>結束日期</p>
                                <DatePicker
                                    selected={selectedEndedDate}
                                    onChange={handleEndDateChange}
                                    minDate={selectedStartedDate}
                                /> */}
                                {/* <button
                                    onClick={() => {
                                        console.log(dateRange);
                                        closeModal();
                                        handleSaveTrip();
                                    }}
                                >
                                    開始規劃旅程
                                </button> */}
                            </AddTripRightContainer>
                        </AddTripFooter>
                    </AddTripContainer>
                </OutSide>
            </ModalContainer>
        </div>
    );
}
// async function getDates() {
//     const tripsRef = collection(db, `users/${userUID}/dates`);
//     const querySnapshot = await getDoc(tripsRef);
//     querySnapshot.data();
//     console.log(querySnapshot.data());
// }
// getDates();

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
