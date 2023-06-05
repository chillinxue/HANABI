import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components/macro';
import LoginButton from '../../components/Header/LoginButton';
import Header from '../../components/Header/Header';

const SecondTextSubCon = styled(TextSubCon)`
    width: 450px;
`;

const ForthTextContent = styled(TextContent)`
    font-size: 10px;
    margin-top: 30px;
`;

const ThirdTextContent = styled(TextContent)`
    font-size: 10px;
    margin-top: 30px;
`;

const SecondTextContent = styled(TextContent)`
    margin-top: 40px;
`;

const FirstBlockTextTitle = styled(TextTitle)`
    font-size: 36px;
    line-height: 60px;
`;

const HeaderStyle = styled(Header)`
    transition: transform 1s ease-out;
`;

const OutSide = styled.div`
    padding-top: 45vh;
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
    background-size: cover;
    height: 100vh;
    padding-top: 24px;
    padding-right: 24px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: -1;
    overflow: hidden;
`;

const Login = styled.div`
    z-index: 2;
    padding: 30px 35px 0px 0px;
`;

const LogoContainer = styled.div`
    height: 100px;
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
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 1;
    background-color: #fafafa;
`;

const MainContainer = styled.div`
    position: relative;
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
    background-image: url('https://firebasestorage.googleapis.com/v0/b/hanabi-f5ee3.appspot.com/o/Home%2FHomeA1JapanMap.png?alt=media&token=7e89d48f-fb54-45d4-8135-a7843a44e97c');
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

    background-image: url('https://firebasestorage.googleapis.com/v0/b/hanabi-f5ee3.appspot.com/o/Home%2FHomeA2FujiSan.jpg?alt=media&token=13388884-0c1a-4fdc-bc3e-cc95bfb8ab3b');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    box-sizing: border-box;
`;
const FirstSectionBlockTwoTextCon = styled.div`
    width: 45%;
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
`;
const FirstSectionBlockThreeTextCon = styled.div`
    width: 64%;
    height: 540px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FirstSectionBlockThreePicCon = styled.div`
    width: 36%;
    height: 470px;
    background-image: url('https://firebasestorage.googleapis.com/v0/b/hanabi-f5ee3.appspot.com/o/Home%2FHomeA3FujiStation.jpg?alt=media&token=aeb0ad7b-4e0e-4b7c-bfee-0198d9e0a68c');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    box-sizing: border-box;
`;
const FirstSectionBlockFourPicCon = styled.div`
    width: 36%;
    height: 470px;
    background-image: url('https://firebasestorage.googleapis.com/v0/b/hanabi-f5ee3.appspot.com/o/Home%2FHomeA4Fujimt.jpg?alt=media&token=415304aa-3134-404f-b9a2-6975ae2aaf4a');
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
        <>
            <Login>
                <LoginButton />
            </Login>
            <OutSide>
                <MainContainer>
                    {showHeader && <HeaderStyle />}
                    <Poster>
                        <PosterTextCon></PosterTextCon>
                        <VideoContainer>
                            <Video autoPlay muted loop>
                                <source
                                    src={
                                        'https://firebasestorage.googleapis.com/v0/b/hanabi-f5ee3.appspot.com/o/Home%2FHomeBackgroundVideo.mp4?alt=media&token=e53d4e20-3072-4ae4-9034-607c2fae8766'
                                    }
                                    type='video/mp4'
                                />
                            </Video>
                        </VideoContainer>
                    </Poster>
                    <LogoContainer>
                        <Logo>HANABI</Logo>
                    </LogoContainer>
                    <MainPageContainer>
                        <FirstSection>
                            <FirstSectionBlockOne>
                                <FirstSectionBlockOneCon>
                                    <FirstSectionBlockOneTextCon>
                                        <FirstBlockTextTitle>
                                            日本への一人旅のため
                                            <br />
                                            日本が大好き
                                        </FirstBlockTextTitle>
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
                                        <SecondTextContent>
                                            弟子屈町は美しい水が流れるまち。神秘的な深いブルーの広がる摩周湖、母のように懐広く人々の暮らしをそっと支える屈斜路湖、湖から流れ出す美しい釧路川。まちの至るところから湧き出る温泉や井戸水も、大切な存在です。
                                        </SecondTextContent>
                                    </TextSubCon>
                                </FirstSectionBlockTwoTextCon>
                            </FirstSectionBlockTwo>
                            <FirstSectionBlockThree>
                                <FirstSectionBlockThreeTextCon>
                                    <SecondTextSubCon>
                                        <TextTitle>
                                            自然とともに暮らしてきた、
                                            <br />
                                            このまちの魅力
                                        </TextTitle>
                                        <ThirdTextContent>
                                            自然に逆らわず、自然の恵みとともに暮らしを紡いできたアイヌの人々も、厳しい自然に負けじと力強くこの地に鍬を下ろし続けた開拓者の人々も、今のまちの礎を築いた大切な人たち。先人たちの暮らしの知恵と、訪れた人々を誰でも迎え入れるあたたかさ、伝え続けた歴史や文化は、このまちの魅力となり、しっかりと根づいています。
                                        </ThirdTextContent>
                                    </SecondTextSubCon>
                                </FirstSectionBlockThreeTextCon>
                                <FirstSectionBlockThreePicCon></FirstSectionBlockThreePicCon>
                            </FirstSectionBlockThree>
                            <FirstSectionBlockThree>
                                <FirstSectionBlockFourPicCon></FirstSectionBlockFourPicCon>
                                <FirstSectionBlockThreeTextCon>
                                    <SecondTextSubCon>
                                        <TextTitle>
                                            厳しい自然が育む、
                                            <br />
                                            豊かな食文化
                                        </TextTitle>
                                        <ForthTextContent>
                                            冬と夏の気温差は60℃以上。寒暖の差は、農産物を豊かに育て、人々の食卓を彩ります。香り高い摩周そば、みずみずしい摩周メロン、温泉熱で育つイチゴやマンゴーに加え、摩周和牛や弟子屈ポーク、牛乳など、弟子屈ならではの食材から生まれる珠玉の一皿が、多くの人を魅了します。
                                        </ForthTextContent>
                                    </SecondTextSubCon>
                                </FirstSectionBlockThreeTextCon>
                            </FirstSectionBlockThree>
                        </FirstSection>
                    </MainPageContainer>
                </MainContainer>
            </OutSide>
        </>
    );
}
