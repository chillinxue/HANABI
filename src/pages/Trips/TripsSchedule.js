import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import styled from 'styled-components/macro';
import { TripsContext } from './tripsContext';
import { TripsContextProvider } from './tripsContext';
import { arrayUnion, getFirestore, onSnapshot } from 'firebase/firestore';
import { doc, setDoc, addDoc, collection, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../components/utils/firebase/firbase';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { AuthContext } from '../../Context/AuthContext';

const TripsContainer = styled.div`
    width: 100%;
    height: 265px;
    padding-top: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
`;
const TripsHeader = styled.div`
    width: 100%;
    height: 25px;
    padding-left: 33px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    font-size: 14px;
    line-height: 17px;
`;
const TripsBoxContainer = styled.div`
    width: 100%;
    height: 215px;

    overflow: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`;
const TripsBox = styled.div`
    width: 100%;
    height: 46px;

    display: flex;
    justify-content: space-between;
    padding: 5px 10px 5px 73px;

    &:hover {
        color: #fafafa;
    }
    cursor: pointer;
    &:hover {
        background-color: #8dadd0;
        color: #fafafa;
    }

    &:active {
        box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.1);
    }
`;
const TripsBoxLine = styled.div`
    width: 22px;
    height: 1px;
    background-color: black;
    transform: rotate(90deg);
`;
const TripsContent = styled.div``;
const TripsName = styled.div`
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 17px;

    color: #2d2d2d;
`;
const TripsDate = styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 14px;
    color: #2d2d2d;
`;
const DeleteTripsBox = styled.div`
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 14px;
    text-align: center;
    color: #2d2d2d;

    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
`;
const DateBoxContainer = styled.div`
    height: 35px;
    display: flex;
    overflow-x: auto;
    gap: 10px;
    box-sizing: border-box;
    margin: 20px 43px 0px 43px;
    &::-webkit-scrollbar {
        display: none;
    }
`;
const DateBox = styled.div`
    width: 45 px;
    height: 13px;
    flex-shrink: 0;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
    padding: 1px;
    box-sizing: border-box;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    color: ${(props) => (props.isSelected ? '#fafafa' : '#2d2d2d')};
    background-color: ${(props) => (props.isSelected ? '#818181' : 'none')};

    cursor: pointer;
    &:hover {
        background-color: #2c3e50;
        color: #fafafa;
    }

    &:active {
        box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.1);
    }
`;
const TodayTripContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    opacity: 0.9;

    padding: 0px 8px 8px 8px;
    box-sizing: border-box;
`;
const TodayTripHeader = styled.div`
    display: flex;
    height: 37px;
    justify-content: center;
`;
const TodayTripHeaderTitle = styled.div`
    font-style: normal;
    width: 352px;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    color: #2d2d2d;
    border-bottom: 1px solid #2d2d2d;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const TodayTripSubContainer = styled.div``;

const TripDeatailContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const TripDetailBox = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 352px;
    min-height: 65px;
    height: fit-content;
    padding: 5px;
    box-sizing: border-box;
    border-bottom: 1px solid #2d2d2d;
`;
const TripTime = styled.div`
    width: 50px;
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
    text-align: center;

    color: #2d2d2d;
`;
const TripPlace = styled.div`
    color: #2d2d2d;
    width: 145px;
    margin-right: 20px;
`;
const TripName = styled.div`
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 17px;

    color: #2d2d2d;
`;

const TripAddress = styled.div`
    font-family: 'Noto Sans JP';
    font-style: normal;

    font-weight: 400;
    font-size: 8px;
    line-height: 12px;

    color: #2d2d2d;
`;
const TripDescription = styled.div`
    width: 127px;
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 14px;

    color: #2d2d2d;
`;
const DeleteDetailBox = styled.div`
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 14px;
    text-align: center;
    color: #2d2d2d;

    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
`;
const AddNewTripContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-right: 5px;
`;
const AddNewTrip = styled.div`
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
`;
const AddTripDetailBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 390px;
    height: 60px;
    background-color: #e7e7e7;
`;
const AddTripDetailTime = styled.input`
    border: transparent;
    background-color: transparent;
    /* margin-right: 20px; */
    font-family: 'Noto Sans JP';
    font-style: normal;
    width: 70px;
    font-weight: 400;
    font-size: 10px;
    line-height: 23px;
    text-align: end;

    color: #2d2d2d;

    position: relative;
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
    width: 145px;
    margin-left: 5px;
`;
const AddTripDetailName = styled.div`
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 17px;

    color: #2d2d2d;
`;

const AddTripDetailAddress = styled.div`
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 400;
    font-size: 8px;
    line-height: 12px;

    color: #2d2d2d;
`;
const AddDescription = styled.input`
    width: 120px;
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 14px;
    margin-right: 5px;

    outline: none;

    color: #2d2d2d;
    padding: 0;
    border: none;
    background-color: transparent;
    ::placeholder {
        color: #2d2d2d;
    }
    cursor: pointer;
`;
const AddToTrip = styled.div`
    width: 40px;
    height: 20px;
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 700;
    font-size: 10px;
    line-height: 14px;
    text-align: center;

    color: #2d2d2d;

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
const TripContainerTop = styled.div``;
const TripsContentContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export default function TripsSchedule() {
    const { userUID } = useContext(AuthContext);
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const { signIn, logOut } = useContext(AuthContext);

    const { places, setPlaces, addPlaces, setAddPlaces, trips, setTrips } = useContext(TripsContext);
    const [selectedTrip, setSelectedTrip] = useState({});
    const [selectedTripDate, setSelectedTripDate] = useState(undefined);
    const [selectedDateIndex, setSelectedDateIndex] = useState(0);
    const [time, setTime] = useState('');
    const [enterDescription, setEnterDescription] = useState('');
    const [tripUpdated, setTripUpdated] = useState(false);

    // const [trips, setTrips] = useState([]);
    const initialSelectedDates = trips && trips.length > 0 ? trips[0].dateRange : [];
    // const [selectedTrip, setSelectedTrip] = useState(initialSelectedDates);
    const [sortedData, setSortedData] = useState();
    const [autoUpdateTrips, setAutoUpdateTrips] = useState({});
    const [isClickTrip, setIsClickTrip] = useState(false);
    const [isClickDate, setIsClickDate] = useState(false);

    const handleDateClick = (date) => {
        setSelectedTripDate(date);
    };
    useEffect(() => {
        getNewSortedDate(); //.map之前consloe出來是個array，讓他
    }, [selectedTrip]); //當點擊trip，產生時間順續的array

    useEffect(() => {
        console.log('123');
        if (!userUID) {
            return;
        }
        const tripsRef = collection(db, `users/${userUID}/trips`);
        const unsubscribe = onSnapshot(tripsRef, (snapshot) => {
            const newTrips = snapshot.docs.map((doc) => doc.data());
            setTrips(newTrips);
            const updatedSelectedTrip = newTrips.find((trip) => trip.tripId === selectedTrip.tripId);

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
    // const [modalOpen, setModalOpen] = useState(false);
    const { modalOpen, setModalOpen } = useContext(TripsContext);

    const openModal = () => {
        if (!userUID) {
            // 如果用戶未登入，則顯示警告框
            alert('請先登入');
            return;
        }
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    const handleTimeChange = (event) => {
        setTime(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setEnterDescription(event.target.value);
    };

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
    // const selectedDate = selectedTrip.dates[selectedDateIndex];
    console.log();
    async function deleteTripDetailToFirebase(timeToDelete) {
        const deleteTripDetailTestRef = doc(db, 'users', userUID, 'trips', selectedTrip.tripId);
        const selectedDate = selectedTrip.dates[selectedDateIndex];

        await updateDoc(deleteTripDetailTestRef, {
            dates: selectedTrip.dates.map((date) => {
                if (date.date === selectedDate.date) {
                    const updatedDate = { ...date };
                    delete updatedDate[timeToDelete];
                    return updatedDate;
                }
                return date;
            }),
        });
        setTripUpdated(true);
    }
    console.log(selectedTrip);
    return (
        <>
            <TripsContainer>
                <AddNewTripContainer>
                    <AddNewTrip onClick={openModal}>Add new Trip</AddNewTrip>
                </AddNewTripContainer>
                <TripsHeader>TRIPS</TripsHeader>
                <TripsBoxContainer>
                    {trips &&
                        trips.map((trip, index) => (
                            <>
                                <TripsBox
                                    key={index}
                                    onClick={() => {
                                        console.log(trip);
                                        setSelectedTrip(trip);
                                        console.log(trips);
                                    }}
                                >
                                    <TripsContentContainer>
                                        <TripsBoxLine></TripsBoxLine>
                                        <TripsContent>
                                            <TripsName>{trip.tripname}</TripsName>
                                            <TripsDate>
                                                {trip.dates[0].date} - {trip.dates[trip.dates.length - 1].date}
                                            </TripsDate>
                                        </TripsContent>
                                    </TripsContentContainer>
                                    <DeleteTripsBox
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteTrip(trip.tripId);
                                        }}
                                    >
                                        x
                                    </DeleteTripsBox>
                                </TripsBox>
                            </>
                        ))}
                </TripsBoxContainer>
            </TripsContainer>
            <DateBoxContainer>
                {selectedTrip.dates?.map((date, index) => (
                    <DateBox
                        isSelected={selectedDateIndex === index}
                        key={index}
                        onClick={() => {
                            setSelectedDateIndex(index);
                            setSelectedTripDate(
                                `${date.date.split('/')[0]}/${date.date.split('/')[1]}/${date.date.split('/')[2]}`
                            );
                        }}
                    >
                        [ {date.date.split('/')[1]}/{date.date.split('/')[2]} ]
                    </DateBox>
                ))}
            </DateBoxContainer>
            <TodayTripContainer>
                <TripContainerTop>
                    <TodayTripHeader>
                        <TodayTripHeaderTitle>今日の行程</TodayTripHeaderTitle>
                    </TodayTripHeader>
                    <TodayTripSubContainer style={{ overflow: 'scroll', maxHeight: 'calc( 100vh - 450px)' }}>
                        <TripDeatailContainer>
                            {getNewSortedDate() &&
                                getNewSortedDate().map((time) => (
                                    <>
                                        <TripDetailBox>
                                            <TripTime>{time}</TripTime>
                                            <TripPlace>
                                                <TripName>
                                                    {selectedTrip.dates[selectedDateIndex][time].placeName}
                                                </TripName>
                                                <TripAddress>
                                                    {selectedTrip.dates[selectedDateIndex][time].placeAddress}
                                                </TripAddress>
                                            </TripPlace>
                                            <TripDescription>
                                                {selectedTrip.dates[selectedDateIndex][time].description}
                                            </TripDescription>
                                            <DeleteDetailBox onClick={() => deleteTripDetailToFirebase(time)}>
                                                x
                                            </DeleteDetailBox>
                                        </TripDetailBox>
                                    </>
                                ))}
                        </TripDeatailContainer>
                    </TodayTripSubContainer>
                </TripContainerTop>
                <AddTripDetailContainer>
                    <AddTripDetailBox>
                        <AddTripDetailTime type='time' value={time} onChange={handleTimeChange}></AddTripDetailTime>
                        <AddTripDetailPlace>
                            <AddTripDetailName>{addPlaces.name}</AddTripDetailName>
                            <AddTripDetailAddress>{addPlaces.formatted_address}</AddTripDetailAddress>
                        </AddTripDetailPlace>
                        <AddDescription
                            value={enterDescription}
                            onChange={handleDescriptionChange}
                            placeholder='add some notes...'
                        ></AddDescription>
                        <AddToTrip onClick={addTripDetailToFirebase}>Done</AddToTrip>
                    </AddTripDetailBox>
                </AddTripDetailContainer>
            </TodayTripContainer>
        </>
    );
}
