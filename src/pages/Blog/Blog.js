import React, { useState, useContext, useEffect } from 'react';
import StorySearchBar from '../../components/SearchBar/StorySearchBar';
import styled from 'styled-components/macro';
import Header from '../../components/Header/Header';
import LoginButton from '../../components/Header/LoginButton';
import JapanVideo from '../Home/JapanVideo.mp4';
import FujiLawson from './FujiLawson.jpg';
import Tokyo from './tokyo.jpg';
import FujiSan from './FujiSan.jpg';
import KobeTrain from './Kobetrain.mp4';
import FujiBus from './fujibus.mp4';

const OutSide = styled.div`
    padding-top: 70px;
    /* 給下方元素留出空間，避免覆蓋到 Poster */
`;
const MainContainer = styled.div`
    position: relative; /* 設置為相對定位，以便一起滾動 */
`;
const VideoContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
`;

const Video = styled.video`
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
const Poster = styled.div`
    position: relative;
    width: 100%;
    /* background-image: url(); */
    /* background: url() no-repeat center center fixed; */
    background-size: cover;
    height: 100vh;
    padding-top: 24px;
    padding-right: 24px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: fixed; /* 設置為固定定位 */
    top: 0;
    left: 0;
    right: 0;
    z-index: -1; /* 設置為-1，確保在其他元素之下 */
    overflow: hidden; /* 隱藏超出部分的元素 */
`;

const Login = styled.div`
    z-index: 2;
`;

const LogoContainer = styled.div`
    height: 100px; /* 您希望 LogoContainer 的高度 */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1;
    margin-bottom: 50vh;
`;

const Logo = styled.div`
    font-family: 'Prata';
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    line-height: 81px;
    text-align: center;
    color: #2d2d2d;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const PosterTextCon = styled.div``;
const SearchContainer = styled.div`
    border: 1px solid black;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const LinearGradient = styled.div`
    width: 100%;
    height: 200px;
    z-index: 1;
    position: relative;
    &:before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 200px;
        background: linear-gradient(to bottom, transparent, #446b94);
    }
`;
const BlogTitle = styled.div`
    position: absolute;
    top: 50px;
    left: 50px;
    font-family: 'Prata';
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    line-height: 81px;
    text-align: start;
    color: #ffffff;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    z-index: 2;
`;

const BlogBanner = styled.div``;
const MainPageContainer = styled.div`
    /* border: 1px solid black; */
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative; /* 設置為相對定位 */
    z-index: 1; /* 確保在下面的元素之上 */
    background-color: #446b94;
`;
const SectionOne = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: end;
    /* border: 1px solid black; */
`;
const SectionCon = styled.div`
    width: 83%;
    height: 100%;
    margin: 40px 0px;
`;
const SectionTitleCon = styled.div`
    height: 140px;
`;
const SectionTitle = styled.div`
    height: 70px;
    font-size: 22.5px;
    font-family: 'Noto Serif JP';
    font-weight: 200;
    line-height: 38px;
    color: #fafafa;
    display: flex;
    align-items: center;
`;
const SectionSubTitle = styled.div`
    height: 40px;
    font-size: 12px;
    font-family: 'Noto Serif JP';
    font-weight: 200;
    line-height: 20px;
    color: #fafafa;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
`;
const PicContainer = styled.div`
    display: flex;
    /* border: 1px solid black; */
    width: 100%;
    overflow: auto;
    /* 隱藏滾動條 */
    &::-webkit-scrollbar {
        display: none;
    }
`;

const PicBox = styled.div`
    width: 380px;
    /* border: 1px solid Black; */
    margin-right: 25px;
`;

const Pic = styled.img`
    width: 380px;
    height: 350px;
    object-fit: cover;
    display: block;
    margin: auto;
`;

const PicTitleContainer = styled.div`
    padding: 2px;
    box-sizing: border-box;
`;
const PicTitle = styled.div`
    height: 35px;
    font-size: 14px;
    font-family: 'Noto Serif JP';
    font-weight: 200;
    line-height: 38px;
    color: #fafafa;
    display: flex;
    align-items: center;
`;
const PicContent = styled.div`
    height: 70px;
    font-size: 12px;
    font-family: 'Noto Serif JP';
    font-weight: 200;
    line-height: 20px;
    color: #fafafa;
    display: flex;
    align-items: center;
`;

const SectionTwo = styled.div`
    height: 100px;
    background-color: transparent;
`;

export default function Blog() {
    const [showHeader, setShowHeader] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const handleScroll = () => {
        const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollPosition > 550) {
            setShowHeader(true);
        } else {
            setShowHeader(false);
        }
    };
    return (
        <>
            <OutSide>
                {/* <SearchContainer>
                <StorySearchBar></StorySearchBar>
            </SearchContainer> */}
                <MainContainer>
                    {showHeader && (
                        <Header
                            style={{
                                transform: showHeader ? 'translateY(0%) scale(1)' : 'translateY(-100%) scale(0.8)',
                                transition: 'transform 1s ease-out',
                            }}
                        />
                    )}
                    <Poster>
                        <Login>
                            <LoginButton />
                        </Login>
                        <PosterTextCon></PosterTextCon>
                        <VideoContainer>
                            <Video autoPlay muted loop>
                                <source src={JapanVideo} type='video/mp4' />
                            </Video>
                        </VideoContainer>

                        {/* <PosterMenu /> */}
                    </Poster>
                    <LogoContainer>
                        <Logo>HANABI</Logo>
                    </LogoContainer>

                    <LinearGradient>
                        <BlogTitle>Blog</BlogTitle>
                    </LinearGradient>

                    <MainPageContainer>
                        <SectionOne>
                            <SectionCon>
                                <SectionTitleCon>
                                    <SectionTitle>自然と繋がり自然に浸る旅</SectionTitle>
                                    <SectionSubTitle>
                                        季節ごとにがらりと姿を変える自然を楽しむことができる、年間通しておすすめのプラン
                                    </SectionSubTitle>
                                </SectionTitleCon>
                                <PicContainer>
                                    <PicBox>
                                        <Pic src={FujiLawson}></Pic>
                                        <PicTitleContainer>
                                            <PicTitle>歴史に触れて地域に還元する旅</PicTitle>
                                            <PicContent>
                                                自然を守りながら楽しみたい人におすすめな、地域の環境保全に貢献できるプラン
                                            </PicContent>
                                        </PicTitleContainer>
                                    </PicBox>
                                    <PicBox>
                                        <Pic src={Tokyo}></Pic>
                                        <PicTitleContainer>
                                            <PicTitle>歴史に触れて地域に還元する旅</PicTitle>
                                            <PicContent>
                                                自然を守りながら楽しみたい人におすすめな、地域の環境保全に貢献できるプラン
                                            </PicContent>
                                        </PicTitleContainer>
                                    </PicBox>
                                    <PicBox>
                                        <Pic src={FujiSan}></Pic>
                                        <PicTitleContainer>
                                            <PicTitle>歴史に触れて地域に還元する旅</PicTitle>
                                            <PicContent>
                                                自然を守りながら楽しみたい人におすすめな、地域の環境保全に貢献できるプラン
                                            </PicContent>
                                        </PicTitleContainer>
                                    </PicBox>
                                    <PicBox>
                                        <Pic src={FujiSan}></Pic>
                                        <PicTitleContainer>
                                            <PicTitle>歴史に触れて地域に還元する旅</PicTitle>
                                            <PicContent>
                                                自然を守りながら楽しみたい人におすすめな、地域の環境保全に貢献できるプラン
                                            </PicContent>
                                        </PicTitleContainer>
                                    </PicBox>
                                </PicContainer>
                            </SectionCon>
                            <SectionCon>
                                <SectionTitleCon>
                                    <SectionTitle>自然と繋がり自然に浸る旅</SectionTitle>
                                    <SectionSubTitle>
                                        季節ごとにがらりと姿を変える自然を楽しむことができる、年間通しておすすめのプラン
                                    </SectionSubTitle>
                                </SectionTitleCon>
                                <PicContainer>
                                    <PicBox>
                                        <Pic src={FujiLawson}></Pic>
                                        <PicTitleContainer>
                                            <PicTitle>歴史に触れて地域に還元する旅</PicTitle>
                                            <PicContent>
                                                自然を守りながら楽しみたい人におすすめな、地域の環境保全に貢献できるプラン
                                            </PicContent>
                                        </PicTitleContainer>
                                    </PicBox>
                                    <PicBox>
                                        <Pic src={Tokyo}></Pic>
                                        <PicTitleContainer>
                                            <PicTitle>歴史に触れて地域に還元する旅</PicTitle>
                                            <PicContent>
                                                自然を守りながら楽しみたい人におすすめな、地域の環境保全に貢献できるプラン
                                            </PicContent>
                                        </PicTitleContainer>
                                    </PicBox>
                                    <PicBox>
                                        <Pic src={FujiSan}></Pic>
                                        <PicTitleContainer>
                                            <PicTitle>歴史に触れて地域に還元する旅</PicTitle>
                                            <PicContent>
                                                自然を守りながら楽しみたい人におすすめな、地域の環境保全に貢献できるプラン
                                            </PicContent>
                                        </PicTitleContainer>
                                    </PicBox>
                                    <PicBox>
                                        <Pic src={FujiSan}></Pic>
                                        <PicTitleContainer>
                                            <PicTitle>歴史に触れて地域に還元する旅</PicTitle>
                                            <PicContent>
                                                自然を守りながら楽しみたい人におすすめな、地域の環境保全に貢献できるプラン
                                            </PicContent>
                                        </PicTitleContainer>
                                    </PicBox>
                                </PicContainer>
                            </SectionCon>
                        </SectionOne>
                    </MainPageContainer>
                    <SectionTwo></SectionTwo>
                </MainContainer>
            </OutSide>
        </>
    );
}
