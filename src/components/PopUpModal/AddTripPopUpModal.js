import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

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
export default function MenuPopUpModal({ modalOpen, setModalOpen }) {
    const [selectedStartedDate, setSelectedStartedDate] = useState(null);
    const [selectedEndedDate, setSelectedEndedDate] = useState(null);

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
                        <input placeholder='先為行程取一個名字吧'></input>
                    </AddTripLeftContainer>
                    <AddTripRightContainer>
                        <h1>預計旅遊期間</h1>
                        <p>開始日期</p>
                        <DatePicker selected={selectedStartedDate} onChange={handleStartDateChange} />
                        <p>結束日期</p>
                        <DatePicker
                            selected={selectedEndedDate}
                            onChange={(date) => setSelectedEndedDate(date)}
                            minDate={selectedStartedDate}
                        />
                        <button>開始規劃旅程</button>
                    </AddTripRightContainer>
                </AddTripContainer>
            </ModalContainer>
        </div>
    );
}
