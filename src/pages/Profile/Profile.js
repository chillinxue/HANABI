import React, { useContext, useState } from 'react';
import Header from '../../components/Header/Header';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import ProfilePhoto from './ProfilePhoto.png';
import Tokyo from './Tokyo.jpg';
import { AuthContext } from '../../Context/AuthContext';
import { TripsContext } from '../Trips/tripsContext';
import { handleDelete } from '../../components/utils/firebase/GetPlaceSaved';

const OutSide = styled.div`
    background-color: #fafafa;
    padding: 50px 0px;
`;

const BannerContainer = styled.div`
    background-image: url(${Tokyo});
    background-size: cover;
    background-position: center;
    box-sizing: border-box;
    width: 100%;
    height: 400px;
    padding-top: 40px;
`;
const LogoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
`;
const Logo = styled.div`
    position: absolute;

    font-family: 'Prata';
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    line-height: 54px;
    text-align: center;

    color: #2d2d2d;

    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
const MainContainer = styled.div`
    width: 100%;
    display: flex;
`;
const BarContainer = styled.div`
    width: 365px;
`;
const ProfileContainer = styled.div`
    height: 240px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin: 50px 0px;
`;
const ProfilePic = styled.img`
    width: 150px;
    height: 150px;
    /* background-image: url({user.photoURL});
    background-size: cover;
    background-position: center; */
    box-sizing: border-box;
    border-radius: 180px;
    margin-bottom: 20px;
`;
const ProfileName = styled.div`
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 29px;
    text-align: center;

    color: #2d2d2d;

    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
const ProfileMail = styled.div`
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    text-align: center;

    color: #2d2d2d;

    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
const CategoryContainer = styled.div`
    display: flex;
    justify-content: center;
`;
const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 40px;
`;

const Title = styled.div`
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    text-align: center;

    color: #2d2d2d;

    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const InfoContainer = styled.div`
    background: rgba(45, 45, 45, 0.2);
    opacity: 0.9;
    border-radius: 30px;
    width: 100%;
    margin-top: 50px;
`;
const InfoTitle = styled.div`
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    height: 60px;

    color: #2d2d2d;

    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    text-align: start;
    margin-left: 50px;
    display: flex;
    align-items: center;
`;

const TripsInfoContainer = styled.div`
    padding: 0 100px;
    margin: 20px 0px;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
`;
const TripsBox = styled.div`
    width: 180px;
    height: 100px;
    background: #fafafa;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
`;
const TripsBoxHeader = styled.div`
    margin-bottom: 10px;
    width: 100%;
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
    display: flex;
    justify-content: flex-end;
`;
const TripsBoxName = styled.div`
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 23px;
    text-align: center;

    color: #2d2d2d;
`;
const TripsBoxDate = styled.div`
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
    text-align: center;

    color: #404143;
`;
const PlacesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(1fr, 5);
    grid-auto-rows: 1fr;
    gap: 20px;
    box-sizing: border-box;
    padding: 20px 100px;
`;
const PlaceContainer = styled.div`
    width: 180px;
    height: 50px;
    background: #fafafa;
    border-radius: 10px;
`;
const SaveContent = styled.div`
    background: #f3f3f3;
    mix-blend-mode: normal;
    border: 2px solid rgba(250, 250, 250, 0.75);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding: 0px 10px 10px 10px;
`;
const SavedBoxHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 2px;
`;
const SavedBoxName = styled.div`
    font-family: 'Noto Sans JP', sans-serif;
    font-style: normal;
    font-size: 16px;
    line-height: 23px;
    text-align: center;

    color: #2d2d2d;
    margin-top: 10px;
`;
const DeleteSaveBox = styled.div`
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 22px;
    text-align: end;
    margin-right: 10px;

    color: #404143;

    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
const StoriesContainer = styled.div``;

export default function Profile() {
    const [activeTab, setActiveTab] = useState('trips');
    const { user, userUID } = useContext(AuthContext);
    const { trips, setTrips } = useContext(TripsContext);
    const { places, setPlaces } = useContext(TripsContext);

    console.log(user);
    console.log(places);

    return (
        <>
            <OutSide>
                <Header></Header>
                <BannerContainer>
                    <LogoContainer>
                        <Logo>HANABI</Logo>
                    </LogoContainer>
                </BannerContainer>
                <MainContainer>
                    <BarContainer>
                        <ProfileContainer>
                            <ProfilePic src={user.userImage}></ProfilePic>
                            <ProfileName>{user.name}</ProfileName>
                            <ProfileMail>{user.email}</ProfileMail>
                        </ProfileContainer>
                        <CategoryContainer>
                            <TitleContainer>
                                <Title onClick={() => setActiveTab('trips')}>Trips</Title>
                                <Title onClick={() => setActiveTab('places')}>Places</Title>
                                <Title onClick={() => setActiveTab('stories')}>Stories</Title>
                            </TitleContainer>
                        </CategoryContainer>
                    </BarContainer>
                    <InfoContainer>
                        <InfoTitle>Hi {user.name} !</InfoTitle>
                        {activeTab === 'trips' && (
                            <TripsInfoContainer>
                                {trips &&
                                    trips.map((trip, index) => (
                                        <TripsBox
                                            key={index}
                                            onClick={() => {
                                                console.log(trip);
                                                // setSelectedTrip(trip);
                                                console.log(trips);
                                            }}
                                        >
                                            <TripsBoxHeader>
                                                <DeleteTripsBox>X</DeleteTripsBox>
                                            </TripsBoxHeader>
                                            <TripsBoxName>{trip.tripname}</TripsBoxName>
                                            <TripsBoxDate>
                                                {trip.dates[0].date} - {trip.dates[trip.dates.length - 1].date}
                                            </TripsBoxDate>
                                        </TripsBox>
                                    ))}
                            </TripsInfoContainer>
                        )}
                        {activeTab === 'places' && (
                            <PlacesContainer>
                                {places &&
                                    places.map((data, index) => (
                                        <PlaceContainer key={index}>
                                            <SaveContent>
                                                <SavedBoxHeader>
                                                    <SavedBoxName>📍 {data.name}</SavedBoxName>
                                                    {/* <DeleteSaveBox onClick={() => handleDelete(data.id, userUID)}>
                                                        X
                                                    </DeleteSaveBox> */}
                                                </SavedBoxHeader>
                                                {/* <SavedBoxAddress>{data.formatted_address}</SavedBoxAddress> */}
                                            </SaveContent>
                                            {/* <AddToTrip onClick={() => setAddPlaces(data)}>Add</AddToTrip> */}
                                        </PlaceContainer>
                                    ))}
                            </PlacesContainer>
                        )}
                        {activeTab === 'stories' && <StoriesContainer>{/* Your StoriesBox code */}</StoriesContainer>}
                    </InfoContainer>
                </MainContainer>
            </OutSide>
        </>
    );
}
