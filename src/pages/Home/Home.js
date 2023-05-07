import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components/macro';
import PlacesRecommend from '../../components/PlacesRecommend/PlacesRecommend';
import MenuSearchBar from '../../components/SearchBar/MenuSearchBar';
import PosterMenuOld from '../../components/PosterMenu/PosterMenuOld';
import FujiSan from './fujiSan.jpg';
// import FujiGif from './JapanBackground.gif';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import LoginButton from '../../components/Header/LoginButton';
import PosterMenu from '../../components/PosterMenu/PosterMenu';
// import PosterVideo from './JapanBackground.gif';
import JapanMap from './JapanMap.png';
import SecOneBlockTwo from './SecOneBlockTwo.jpg';
import SecOneBlockThree from './SecOneBlockThree.jpg';
import SecOneBlockFour from './SecOneBlockFour.jpg';
import Header from '../../components/Header/Header';
import JapanVideo from './JapanVideo.mp4';

const OutSide = styled.div`
    padding-top: 45vh;
    /* 給下方元素留出空間，避免覆蓋到 Poster */
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
    font-size: 45px;
    line-height: 81px;
    text-align: center;
    color: #ffffff;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const PosterTextCon = styled.div``;
const PosterText = styled.div``;
const MainPageContainer = styled.div`
    /* border: 1px solid black; */
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative; /* 設置為相對定位 */
    z-index: 1; /* 確保在下面的元素之上 */
    background-color: #fafafa;
`;

const MainContainer = styled.div`
    position: relative; /* 設置為相對定位，以便一起滾動 */
`;
const FirstSection = styled.div`
    background-color: #fafafa;
    width: 100%;
`;
const FirstSectionBlockOne = styled.div`
    width: 100%;
    height: 640px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    /* border: 1px solid black; */
`;
const FirstSectionBlockOneCon = styled.div`
    height: 405px;
    display: flex;
`;
const FirstSectionBlockOneTextCon = styled.div`
    width: 450px;
`;
const FirstSectionBlockOnePicCon = styled.div`
    width: 750px;
    background-image: url(${JapanMap});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    box-sizing: border-box;
`;

const TextTitle = styled.div`
    font-family: 'Noto Sans JP', sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 30px;
    line-height: 51px;

    color: #2d2d2d;
`;
const TextContent = styled.div`
    font-family: 'Noto Sans JP', sans-serif;

    font-style: normal;
    font-weight: 300;
    font-size: 13px;
    line-height: 30px;

    color: #2d2d2d;
    margin-top: 60px;
`;
const FirstSectionBlockTwo = styled.div`
    height: 550px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    /* border: 1px solid black; */
`;
const FirstSectionBlockTwoPicCon = styled.div`
    width: 55%;
    height: 550px;
    /* border: 1px solid black; */

    background-image: url(${SecOneBlockTwo});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    box-sizing: border-box;
`;
const FirstSectionBlockTwoTextCon = styled.div`
    width: 45%;
    /* border: 1px solid black; */
    display: flex;
    justify-content: center;
    align-items: center;
`;

const TextSubCon = styled.div`
    width: 465px;
`;
const FirstSectionBlockThree = styled.div`
    width: 100%;
    height: 540px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    /* border: 1px solid black; */
`;
const FirstSectionBlockThreeTextCon = styled.div`
    width: 64%;
    height: 540px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: 1px solid black; */
`;

const FirstSectionBlockThreePicCon = styled.div`
    width: 36%;
    height: 470px;
    background-image: url(${SecOneBlockThree});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    box-sizing: border-box;
`;
const FirstSectionBlockFourPicCon = styled.div`
    width: 36%;
    height: 470px;
    background-image: url(${SecOneBlockFour});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    box-sizing: border-box;
`;

export default function Home() {
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
        <OutSide>
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
                <MainPageContainer>
                    {/* <PlacesRecommend /> */}
                    <FirstSection>
                        <FirstSectionBlockOne>
                            <FirstSectionBlockOneCon>
                                <FirstSectionBlockOneTextCon>
                                    <TextTitle style={{ fontSize: '36px', lineHeight: '60px' }}>
                                        日本への一人旅のため
                                        <br />
                                        日本が大好き
                                    </TextTitle>
                                    <TextContent>
                                        深い森と美しい水に囲まれた、北海道弟子屈町。
                                        面積の65％が阿寒摩周国立公園に位置する自然豊かなエリアです。
                                        ここには世界有数の透明度を誇る摩周湖や、100年以上の歴史を持つ温泉街、
                                        日本一大きなカルデラ湖の屈斜路湖、今なお噴気を上げる硫黄山など、
                                        森と湖と火山の織りなす、大自然が広がっています。
                                        このまちで自然とともに暮らしてきた人々もまた、まちの魅力のひとつ。
                                        弟子屈町へ旅してみませんか。
                                    </TextContent>
                                </FirstSectionBlockOneTextCon>
                                <FirstSectionBlockOnePicCon></FirstSectionBlockOnePicCon>
                            </FirstSectionBlockOneCon>
                        </FirstSectionBlockOne>
                        <FirstSectionBlockTwo>
                            <FirstSectionBlockTwoPicCon></FirstSectionBlockTwoPicCon>
                            <FirstSectionBlockTwoTextCon>
                                <TextSubCon>
                                    <TextTitle>
                                        さまざまな水がつくりだす、
                                        <br />
                                        まちの物語
                                    </TextTitle>
                                    <TextContent style={{ marginTop: '40px' }}>
                                        弟子屈町は美しい水が流れるまち。神秘的な深いブルーの広がる摩周湖、母のように懐広く人々の暮らしをそっと支える屈斜路湖、湖から流れ出す美しい釧路川。まちの至るところから湧き出る温泉や井戸水も、大切な存在です。
                                    </TextContent>
                                </TextSubCon>
                            </FirstSectionBlockTwoTextCon>
                        </FirstSectionBlockTwo>
                        <FirstSectionBlockThree>
                            <FirstSectionBlockThreeTextCon>
                                <TextSubCon style={{ width: '450px' }}>
                                    <TextTitle>
                                        自然とともに暮らしてきた、
                                        <br />
                                        このまちの魅力
                                    </TextTitle>
                                    <TextContent style={{ fontSize: '10px', marginTop: '30px' }}>
                                        自然に逆らわず、自然の恵みとともに暮らしを紡いできたアイヌの人々も、厳しい自然に負けじと力強くこの地に鍬を下ろし続けた開拓者の人々も、今のまちの礎を築いた大切な人たち。先人たちの暮らしの知恵と、訪れた人々を誰でも迎え入れるあたたかさ、伝え続けた歴史や文化は、このまちの魅力となり、しっかりと根づいています。
                                    </TextContent>
                                </TextSubCon>
                            </FirstSectionBlockThreeTextCon>
                            <FirstSectionBlockThreePicCon></FirstSectionBlockThreePicCon>
                        </FirstSectionBlockThree>
                        <FirstSectionBlockThree>
                            <FirstSectionBlockFourPicCon></FirstSectionBlockFourPicCon>
                            <FirstSectionBlockThreeTextCon>
                                <TextSubCon style={{ width: '450px' }}>
                                    <TextTitle>
                                        厳しい自然が育む、
                                        <br />
                                        豊かな食文化
                                    </TextTitle>
                                    <TextContent style={{ fontSize: '10px', marginTop: '30px' }}>
                                        冬と夏の気温差は60℃以上。寒暖の差は、農産物を豊かに育て、人々の食卓を彩ります。香り高い摩周そば、みずみずしい摩周メロン、温泉熱で育つイチゴやマンゴーに加え、摩周和牛や弟子屈ポーク、牛乳など、弟子屈ならではの食材から生まれる珠玉の一皿が、多くの人を魅了します。
                                    </TextContent>
                                </TextSubCon>
                            </FirstSectionBlockThreeTextCon>
                        </FirstSectionBlockThree>
                    </FirstSection>
                </MainPageContainer>
            </MainContainer>
        </OutSide>
    );
}
