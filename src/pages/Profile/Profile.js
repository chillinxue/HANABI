import React, { useContext } from 'react';
import Header from '../../components/Header/Header';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ProfilePhoto from './ProfilePhoto.png';
import Tokyo from './Tokyo.jpg';
import { AuthContext } from '../../Context/AuthContext';
import { TripsContext } from '../Trips/tripsContext';

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
const ProfilePic = styled.div`
    width: 150px;
    height: 150px;
    background-image: url(${ProfilePhoto});
    background-size: cover;
    background-position: center;
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
    font-size: 40px;
    line-height: 58px;
    height: 85px;

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
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
`;
const TripsBox = styled.div`
    width: 250px;
    height: 200px;
    background: #fafafa;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    border: 1px solid black;
`;
const TripsBoxHeader = styled.div`
    margin-bottom: 2px;
    border: 1px solid black;
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

export default function Profile() {
    const { user, userUID } = useContext(AuthContext);
    const { trips, setTrips } = useContext(TripsContext);

    console.log(user);

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
                            <ProfilePic></ProfilePic>
                            <ProfileName>{user.name}</ProfileName>
                            <ProfileMail>{user.email}</ProfileMail>
                        </ProfileContainer>
                        <CategoryContainer>
                            <TitleContainer>
                                <Title>Trips</Title>
                                <Title>Places</Title>
                                <Title>Stories</Title>
                            </TitleContainer>
                        </CategoryContainer>
                    </BarContainer>
                    <InfoContainer>
                        <InfoTitle>Hi {user.name} !</InfoTitle>
                        <TripsInfoContainer>
                            {/* <TripsBox>
                                <TripsBoxName></TripsBoxName>
                                <TripsBoxDate>2023 / 6 / 9 - 2023/ 6 / 20</TripsBoxDate>
                            </TripsBox> */}
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
                                        <TripsBoxDate>2023 / 6 / 9 - 2023 / 6 / 20</TripsBoxDate>
                                    </TripsBox>
                                ))}
                        </TripsInfoContainer>
                    </InfoContainer>
                </MainContainer>
            </OutSide>
        </>
    );
}
