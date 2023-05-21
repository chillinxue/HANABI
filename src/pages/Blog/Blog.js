import React, { useState, useContext, useEffect } from 'react';
import StorySearchBar from '../../components/SearchBar/StorySearchBar';
import styled from 'styled-components/macro';
import Header from '../../components/Header/Header';
import LoginButton from '../../components/Header/LoginButton';
import { Link } from 'react-router-dom';

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
    color: #fafafa;
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
        window.scrollTo(0, 0); // 在页面加载完成或页面切换时滚动到顶部
    }, []);

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
                                <source
                                    src={
                                        'https://firebasestorage.googleapis.com/v0/b/hanabi-f5ee3.appspot.com/o/Blog%2FBlogBackgroundVideo.mp4?alt=media&token=d4c7f504-f50e-4c33-a44d-2c53a9adc508'
                                    }
                                    type='video/mp4'
                                />
                            </Video>
                        </VideoContainer>

                        {/* <PosterMenu /> */}
                    </Poster>
                    <LogoContainer>
                        <Logo></Logo>
                    </LogoContainer>

                    <LinearGradient>
                        <BlogTitle>HANABI - BLOG</BlogTitle>
                    </LinearGradient>

                    <MainPageContainer>
                        <SectionOne>
                            <SectionCon>
                                <SectionTitleCon>
                                    <SectionTitle>日本の大都市と小都市を旅する、没入型の旅</SectionTitle>
                                    <SectionSubTitle>
                                        好きな場所を選んで、一人旅を楽しんで、日本全国、大小の都市を旅して。
                                    </SectionSubTitle>
                                </SectionTitleCon>
                                <PicContainer>
                                    <Link to='/BlogArticle' style={{ textDecoration: 'none' }}>
                                        <PicBox>
                                            <Pic
                                                src={
                                                    'https://firebasestorage.googleapis.com/v0/b/hanabi-f5ee3.appspot.com/o/materials%2FBlogA1.jpg?alt=media&token=32ba05fd-fe12-4aa7-9e58-b4c6d537bd52'
                                                }
                                            ></Pic>
                                            <PicTitleContainer>
                                                <PicTitle>大切な人と富士山を見る</PicTitle>
                                                <PicContent>
                                                    世界で最も美しいコンビニエンス ストアを見たことがありますか?
                                                </PicContent>
                                            </PicTitleContainer>
                                        </PicBox>
                                    </Link>
                                    <Link to='/BlogArticle' style={{ textDecoration: 'none' }}>
                                        <PicBox>
                                            <Pic
                                                src={
                                                    'https://firebasestorage.googleapis.com/v0/b/hanabi-f5ee3.appspot.com/o/materials%2FBlogA2.jpg?alt=media&token=e101bc36-be9a-436a-9272-a4397a6d133f'
                                                }
                                            ></Pic>
                                            <PicTitleContainer>
                                                <PicTitle>世界最大の都市：東京</PicTitle>
                                                <PicContent>
                                                    カルチャー、ファッション、フードのすべてがここに
                                                </PicContent>
                                            </PicTitleContainer>
                                        </PicBox>
                                    </Link>
                                    <Link to='/BlogArticle' style={{ textDecoration: 'none' }}>
                                        <PicBox>
                                            <Pic
                                                src={
                                                    'https://firebasestorage.googleapis.com/v0/b/hanabi-f5ee3.appspot.com/o/materials%2FBlogA3.jpg?alt=media&token=44f81ec4-310f-44f6-bd52-601001e8abb1'
                                                }
                                            ></Pic>
                                            <PicTitleContainer>
                                                <PicTitle>奈良は鹿だけじゃない！</PicTitle>
                                                <PicContent>一生に一度は見ておきたい非日常の東大寺</PicContent>
                                            </PicTitleContainer>
                                        </PicBox>
                                    </Link>
                                    <Link to='/BlogArticle' style={{ textDecoration: 'none' }}>
                                        <PicBox>
                                            <Pic
                                                src={
                                                    'https://firebasestorage.googleapis.com/v0/b/hanabi-f5ee3.appspot.com/o/materials%2FBlogA4.jpg?alt=media&token=290661d7-0169-4a2f-9e90-03a611338e2d'
                                                }
                                            ></Pic>
                                            <PicTitleContainer>
                                                <PicTitle>東京の中心：歴史ある明治神宮</PicTitle>
                                                <PicContent>明治神宮と人々の関係は切っても切れないものです</PicContent>
                                            </PicTitleContainer>
                                        </PicBox>
                                    </Link>
                                </PicContainer>
                            </SectionCon>
                            <SectionCon>
                                <SectionTitleCon>
                                    <SectionTitle>ニッチな旅行先に旅行したいですか？</SectionTitle>
                                    <SectionSubTitle>休日は一人でいたい、混みたくない</SectionSubTitle>
                                </SectionTitleCon>
                                <PicContainer>
                                    <PicBox>
                                        <Pic
                                            src={
                                                'https://firebasestorage.googleapis.com/v0/b/hanabi-f5ee3.appspot.com/o/materials%2FBlogB1.jpg?alt=media&token=efd96f19-e70d-48e5-97be-e77698af284e'
                                            }
                                        ></Pic>
                                        <PicTitleContainer>
                                            <PicTitle>秋葉原：オタクだけじゃない</PicTitle>
                                            <PicContent>秋葉原で居酒屋と寿司から始まった食の旅</PicContent>
                                        </PicTitleContainer>
                                    </PicBox>
                                    <PicBox>
                                        <Pic
                                            src={
                                                'https://firebasestorage.googleapis.com/v0/b/hanabi-f5ee3.appspot.com/o/materials%2FBlogB2.jpg?alt=media&token=20ba9db5-70ae-4d78-9abb-19d1820f766c'
                                            }
                                        ></Pic>
                                        <PicTitleContainer>
                                            <PicTitle>浅草寺から見たスカイツリー</PicTitle>
                                            <PicContent>見ているだけで気分が上がるスカイツリー</PicContent>
                                        </PicTitleContainer>
                                    </PicBox>
                                    <PicBox>
                                        <Pic
                                            src={
                                                'https://firebasestorage.googleapis.com/v0/b/hanabi-f5ee3.appspot.com/o/materials%2FBlogB3.jpg?alt=media&token=1aafe777-49cd-4fc8-b4e3-5bb24b0a28a2'
                                            }
                                        ></Pic>
                                        <PicTitleContainer>
                                            <PicTitle>奈良の鹿は怖い</PicTitle>
                                            <PicContent>
                                                奈良の鹿は気をつけないと噛まれてしまうほど怖いです。
                                            </PicContent>
                                        </PicTitleContainer>
                                    </PicBox>
                                    <PicBox>
                                        <Pic
                                            src={
                                                'https://firebasestorage.googleapis.com/v0/b/hanabi-f5ee3.appspot.com/o/materials%2FBlogB4.jpg?alt=media&token=79765338-7389-439f-85b9-fdb26082d168'
                                            }
                                        ></Pic>
                                        <PicTitleContainer>
                                            <PicTitle>奈良の鹿物語</PicTitle>
                                            <PicContent>角のある鹿に挨拶してみましたか？</PicContent>
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
