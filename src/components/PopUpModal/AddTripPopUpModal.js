import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/macro';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { doc, setDoc } from 'firebase/firestore';
import { AuthContext } from '../../Context/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../utils/firebase/firbase';
import FujiLawson from './FujiLawson.jpg';

const ModalOutSide = styled.div`
    position: absolute;
`;
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
    padding: 15px;
    background: rgba(250, 250, 250, 0.5);
    border-radius: 15px;
    border: none;
`;
const DatePickerCon = styled.div`
    display: flex;
`;
const AddTripStart = styled.div`
    background: rgb(250, 250, 250);
    border: 1px solid rgb(250, 250, 250);
    border-radius: 15px;
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
    border: 1px solid #fafafa;
    border-radius: 15px;
    background-color: transparent;
    padding-left: 15px;
    width: 200px;
    height: 40px;
    outline: none;
    color: #fafafa;
`;

const StartedDatePicker = styled(StyledDatePickerInput)`
    margin-right: 5px;
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

        let dateArray = [];
        dateRange.map((date) => dateArray.push({ date: date.toLocaleDateString() }));
        const tripId = uuidv4();
        const tripRef = doc(db, 'users', userUID, 'trips', tripId);
        setDoc(tripRef, {
            tripname: tripname,

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
        <ModalOutSide>
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
                                        <StartedDatePicker
                                            placeholderText='From'
                                            selected={selectedStartedDate}
                                            onChange={handleStartDateChange}
                                        ></StartedDatePicker>
                                        <StyledDatePickerInput
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
                            <AddTripRightContainer></AddTripRightContainer>
                        </AddTripFooter>
                    </AddTripContainer>
                </OutSide>
            </ModalContainer>
        </ModalOutSide>
    );
}
