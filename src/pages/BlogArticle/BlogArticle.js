import React, { useState, useContext } from 'react';
import './BlogArticle.css';
import styled from 'styled-components/macro';
import Header from '../../components/Header/Header';
import { AuthContext } from '../../Context/AuthContext';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, addDoc, collection, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../Trips/Trips';
import Schedule from './schedule.png';
import FujiSan from './FujiSan.jpg';
import Tokyo from './tokyo.jpg';
import TokyoTemple from './TokyoTemple.jpg';
import TokyoTempleB from './TokyoTempleB.jpg';
import TokyoTempleWedding from './TokyoTempleWedding.jpg';
import ArticleLikesButton from '../../components/Button/ArticleLikesButton';
import ShibuyaStA from './ShibuyaStA.jpg';
import ShibuyaStB from './ShibuyaStB.jpg';
import ShibuyaStC from './ShibuyaStC.jpg';
import ShibuyaStD from './ShibuyaStD.jpg';
import ShibuyaStE from './ShibuyaStE.jpg';
import ShibuyaStF from './ShibuyaStF.jpg';
import TakeshitaA from './TakeshitaA.jpg';
import TakeshitaB from './TakeshitaB.jpg';
import TakeshitaC from './TakeshitaC.jpg';

const OutSide = styled.div`
    width: 100%;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* border: 1px solid white; */
`;
const InsideOutline = styled.div`
    width: 100%;
    border: 1px solid black;
    background-color: #2d2d2d;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* border: 1px solid white; */
`;
const SummarySection = styled.div`
    display: flex;
    height: 688px;
    padding-top: 47px;
    /* border: 1px solid black; */
    box-sizing: border-box;
    align-items: center;
`;

const SummaryCon = styled.div`
    /* border: 1px solid white; */
`;
const SummarySubCon = styled.div`
    width: 600px;
    display: flex;
    flex-direction: column;
    /* border: 1px solid white; */
`;

const TitleCon = styled.div`
    width: 520px;
    height: 220px;
    /* border: 1px solid white; */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 60px 20px 20px 20px;
    box-sizing: border-box;
`;
const ArticleNum = styled.div`
    width: 100%;
    height: 25px;
    margin-top: 40px;
    /* border: 1px solid white; */
    text-align: start;

    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 30px;

    color: #fafafa;

    opacity: 0.75;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
const Title = styled.div`
    width: 100%;
    height: 40px;

    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 400;
    font-size: 22.5px;
    /* identical to box height */

    /* text-align: center; */
    color: #fafafa;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    margin: 20px 0px;
`;

const AttractionCon = styled.div`
    width: 520px;
    height: 340px;
    display: flex;
    flex-direction: column;
    /* border: 1px solid black; */
    box-sizing: border-box;
    padding: 40px 20px 20px 20px;
`;
const HashTagCon = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: start;
    gap: 20px;
`;
const HashTag = styled.div`
    display: flex;
    font-size: 20px;
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;

    color: #fafafa;
`;
const AddTagFav = styled.div`
    font-size: 20px;
    margin-left: 10px;
`;
const PicContainer = styled.div`
    width: 100%;
`;
const PicSubCon = styled.img`
    width: 400px;
    height: 350px;
    /* border: 1px solid black; */
    object-fit: cover;
    display: block;
    margin: auto;
`;
const ArticleSectionConOne = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    /* align-items: center; */
`;
const ArticleSection = styled.div`
    height: 688px;
    display: flex;
    /* border: 1px solid black; */
`;
const MainInfoCon = styled.div`
    width: 60%;
    /* border: 1px solid black; */
`;
const MainInfo = styled.div`
    width: 680px;
    /* border: 1px solid black; */

    display: flex;
    flex-direction: column;
    /* margin: 40px 0px 55px 85px; */
`;
const MainInfoHeader = styled.div`
    width: 100%;
    height: 180px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    box-sizing: border-box;
    margin-top: 20px;
`;
const InfoTitle = styled.div`
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 400;
    font-size: 22.5px;
    line-height: 33px;
    /* identical to box height */

    color: #2d2d2d;
    margin-top: 70px;
`;
const InfoCon = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 1px solid black;
    margin-bottom: 20px;
`;
const InfoDetail = styled.div`
    width: 100%;
    height: 70px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* border: 1px solid black; */
    justify-content: center;
    gap: 3px;
    margin-top: 10px;
`;
const DetailText = styled.div`
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;

    color: #fafafa;
    display: flex;
    align-items: center;
`;
const MainPicContainer = styled.div`
    display: flex;
    /* border: 1px solid black; */
    width: 100%;
    overflow: auto;
    /* 隱藏滾動條 */
    &::-webkit-scrollbar {
        display: none;
    }
    margin-top: 20px;
`;
const PicBox = styled.div`
    width: 275px;
    /* border: 1px solid Black; */
    margin-right: 25px;
    /* border: 1px solid black; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Pic = styled.img`
    width: 260px;
    height: 275px;
    object-fit: cover;
    display: block;
    margin: auto;
    /* border: 1px solid black; */
`;
const PicTitleContainer = styled.div`
    width: 230px;
    padding: 2px;
    box-sizing: border-box;
    /* border: 1px solid black; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const PicTitle = styled.div`
    height: 35px;
    font-size: 14px;
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 400;
    line-height: 38px;
    display: flex;
    justify-content: center;
    align-items: center;

    color: #2d2d2d;

    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
const PicContent = styled.div`
    height: 70px;
    font-size: 12px;
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 14px;

    color: #2d2d2d;
    /* border: 1px solid black; */
`;
const MainArticleCon = styled.div`
    /* border: 1px solid black; */
    width: 100%;
    /* border: 1px solid black; */
    display: flex;
    justify-content: center;
    align-items: center;
`;
const MainArticleSubCon = styled.div`
    /* border: 1px solid black; */
    width: 100%;
    height: 620px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 65px 0px 90px;
    box-sizing: border-box;
`;
const MainArticle = styled.div`
    width: 100%;
    height: 505px;
    /* border: 1px solid black; */
    &::-webkit-scrollbar {
        display: none;
    }
`;
const MainArticleTitle = styled.div`
    width: 387px;
    height: 65px;
    margin-top: 20px;
    margin-bottom: 43px;

    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 35px;

    color: #2d2d2d;
    /* border: 1px solid black; */
`;
const MainArticleContent = styled.div`
    width: 405px;
    height: 396px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 200;
    font-size: 14px;
    line-height: 30px;
    /* or 214% */

    color: #2d2d2d;
    /* border: 1px solid black; */
`;
const ArticleSectionConTwo = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    /* align-items: center; */
`;
const PicPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 900px;
    /* border: 1px solid #fafafa; */
`;
const PicPageHeader = styled.div`
    /* border: 1px solid #fafafa; */
`;
const PicPageTitle = styled.div`
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 200;
    font-size: 20px;
    line-height: 35px;
    /* identical to box height */

    color: #fafafa;
`;
const PicPagePicContainer = styled.div`
    display: flex;
    /* border: 1px solid black; */
    width: 100%;
    overflow: auto;
    /* 隱藏滾動條 */
    &::-webkit-scrollbar {
        display: none;
    }
    margin-top: 20px;
    padding-top: 10px;
`;
const PicPagePicBox = styled.div`
    width: 360px;
    margin-right: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const PicPagePic = styled.img`
    width: 360px;
    height: 300px;
    object-fit: cover;
    display: block;
    margin: auto;
`;
const PicPagePicTitleContainer = styled.div`
    width: 300px;
    padding: 2px;
    box-sizing: border-box;
    /* border: 1px solid white; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export default function BlogArticle() {
    const { userUID } = useContext(AuthContext);
    const recommendation = [
        {
            name: '明治神宮',
            placeId: 'ChIJ5SZMmreMGGARcz8QSTiJyo8',
            formatted_address: '1-1 Yoyogikamizonochō, Shibuya City, Tokyo 151-8557日本',
            rating: '4.6',
            url: 'https://maps.google.com/?cid=10361244767556222835',
            website: 'https://www.meijijingu.or.jp/',
            type: 'attraction',
        },
        { name: '竹下通', placeId: '', formattedAdress: '' },
        { name: '鐵塔', placeId: '', formattedAdress: '' },
    ];

    async function uploadItems(data) {
        //存入user sub-collection Places
        try {
            const itemsRef = doc(db, 'users', userUID);
            await addDoc(collection(itemsRef, 'SavedPlaces'), data);
            // {
            //     name: name,
            //     placeId: id,
            //     formatted_address: address,
            //     rating: rating,
            //     url: url,
            //     website: website,
            //     type: type,
            // }
            // console.log('Item uploaded with ID: ', docRef.id);
        } catch (e) {
            console.error('Error uploading item: ', e);
        }
    }

    return (
        <>
            <OutSide>
                <Header style={{ backgroundColor: 'rgba(45, 45, 45, 0.1);' }}></Header>
                <InsideOutline>
                    <SummarySection>
                        <SummaryCon>
                            <SummarySubCon>
                                <TitleCon>
                                    <ArticleNum>No.02</ArticleNum>
                                    <Title>歴史に触れて地域に還元する旅</Title>
                                    <DetailText>Date:</DetailText>
                                    <DetailText>Writer:</DetailText>
                                </TitleCon>
                                <AttractionCon>
                                    <HashTagCon>
                                        {recommendation.map((place, index) => (
                                            <HashTag key={index}>
                                                #{place.name}
                                                <AddTagFav
                                                    type='button'
                                                    onClick={() => {
                                                        uploadItems(place);
                                                    }}
                                                >
                                                    <ArticleLikesButton />
                                                </AddTagFav>
                                            </HashTag>
                                        ))}
                                    </HashTagCon>
                                </AttractionCon>
                            </SummarySubCon>
                        </SummaryCon>
                        <PicContainer>
                            <PicSubCon src={Tokyo}></PicSubCon>
                        </PicContainer>
                    </SummarySection>
                </InsideOutline>
                <ArticleSectionConOne>
                    <ArticleSection>
                        <MainInfoCon>
                            <MainInfo>
                                <MainInfoHeader>
                                    <InfoTitle>#明治神宮</InfoTitle>
                                    <InfoDetail>
                                        <DetailText style={{ color: '#2d2d2d' }}>Open Time</DetailText>
                                        <DetailText style={{ color: '#2d2d2d' }}>Tickets</DetailText>
                                        <DetailText style={{ color: '#2d2d2d' }}>Station</DetailText>
                                    </InfoDetail>
                                </MainInfoHeader>
                                <MainPicContainer>
                                    <PicBox>
                                        <Pic src={TokyoTemple}></Pic>
                                        <PicTitleContainer>
                                            <PicTitle># 明治神宮婚禮 </PicTitle>
                                            <PicContent>
                                                第一次在日本看到傳統的婚禮，屈斜路の大地を知ることができます。また、自然へ出かけるために心得ておくべきことも紹介されているため、旅のはじめにぜひ足を運んでほしいスポットです。
                                            </PicContent>
                                        </PicTitleContainer>
                                    </PicBox>
                                    <PicBox>
                                        <Pic src={TokyoTempleB}></Pic>
                                        <PicTitleContainer>
                                            <PicTitle># 明治神宮婚禮 </PicTitle>
                                            <PicContent>
                                                第一次在日本看到傳統的婚禮，屈斜路の大地を知ることができます。また、自然へ出かけるために心得ておくべきことも紹介されているため、旅のはじめにぜひ足を運んでほしいスポットです。
                                            </PicContent>
                                        </PicTitleContainer>
                                    </PicBox>
                                    <PicBox>
                                        <Pic src={TokyoTempleWedding}></Pic>
                                        <PicTitleContainer>
                                            <PicTitle># 明治神宮婚禮 </PicTitle>
                                            <PicContent>
                                                第一次在日本看到傳統的婚禮，屈斜路の大地を知ることができます。また、自然へ出かけるために心得ておくべきことも紹介されているため、旅のはじめにぜひ足を運んでほしいスポットです。
                                            </PicContent>
                                        </PicTitleContainer>
                                    </PicBox>
                                </MainPicContainer>
                            </MainInfo>
                        </MainInfoCon>
                        <MainArticleCon>
                            <MainArticleSubCon>
                                <MainArticle style={{ overflow: 'scroll', maxHeight: '505px' }}>
                                    {/* <ScrollCon> */}
                                    <MainArticleTitle>
                                        川湯温泉街から散策へ（川湯ビジターセンター～つつじヶ原）
                                    </MainArticleTitle>
                                    <MainArticleContent>
                                        旅のスタート地点は、「川湯ビジターセンター」。周辺の自然環境や歴史が豊富な資料で紹介されており、さまざまな角度から、摩周・屈斜路の大地を知ることができます。また、自然へ出かけるために心得ておくべきことも紹介されているため、旅のはじめにぜひ足を運んでほしいスポットです。
                                        川湯ビジターセンターのあとは「つつじヶ原自然探勝路」を通って硫黄山へ向かいましょう。約2.6kmの散策路には、イソツツジやハイマツなどが群生。火山の影響で、低地でありながら高山植物を間近に観察することができます。6月中旬から7月下旬にかけては、東京ドーム約21個分に相当する100ヘクタールに広がる日本最大のイソツツジの群落が、一斉に白い花を咲かせます。
                                    </MainArticleContent>
                                    <MainArticleTitle>
                                        川湯温泉街から散策へ（川湯ビジターセンター～つつじヶ原）
                                    </MainArticleTitle>
                                    <MainArticleContent>
                                        旅のスタート地点は、「川湯ビジターセンター」。周辺の自然環境や歴史が豊富な資料で紹介されており、さまざまな角度から、摩周・屈斜路の大地を知ることができます。また、自然へ出かけるために心得ておくべきことも紹介されているため、旅のはじめにぜひ足を運んでほしいスポットです。
                                        川湯ビジターセンターのあとは「つつじヶ原自然探勝路」を通って硫黄山へ向かいましょう。約2.6kmの散策路には、イソツツジやハイマツなどが群生。火山の影響で、低地でありながら高山植物を間近に観察することができます。6月中旬から7月下旬にかけては、東京ドーム約21個分に相当する100ヘクタールに広がる日本最大のイソツツジの群落が、一斉に白い花を咲かせます。
                                    </MainArticleContent>
                                    {/* </ScrollCon> */}
                                </MainArticle>
                            </MainArticleSubCon>
                        </MainArticleCon>
                    </ArticleSection>
                </ArticleSectionConOne>
                <ArticleSectionConTwo>
                    <ArticleSection>
                        <MainArticleCon>
                            <MainArticleSubCon>
                                <MainArticle style={{ overflow: 'scroll', maxHeight: '505px' }}>
                                    {/* <ScrollCon> */}
                                    <MainArticleTitle>
                                        川湯温泉街から散策へ（川湯ビジターセンター～つつじヶ原）
                                    </MainArticleTitle>
                                    <MainArticleContent>
                                        旅のスタート地点は、「川湯ビジターセンター」。周辺の自然環境や歴史が豊富な資料で紹介されており、さまざまな角度から、摩周・屈斜路の大地を知ることができます。また、自然へ出かけるために心得ておくべきことも紹介されているため、旅のはじめにぜひ足を運んでほしいスポットです。
                                        川湯ビジターセンターのあとは「つつじヶ原自然探勝路」を通って硫黄山へ向かいましょう。約2.6kmの散策路には、イソツツジやハイマツなどが群生。火山の影響で、低地でありながら高山植物を間近に観察することができます。6月中旬から7月下旬にかけては、東京ドーム約21個分に相当する100ヘクタールに広がる日本最大のイソツツジの群落が、一斉に白い花を咲かせます。
                                    </MainArticleContent>
                                    <MainArticleTitle>
                                        川湯温泉街から散策へ（川湯ビジターセンター～つつじヶ原）
                                    </MainArticleTitle>
                                    <MainArticleContent>
                                        旅のスタート地点は、「川湯ビジターセンター」。周辺の自然環境や歴史が豊富な資料で紹介されており、さまざまな角度から、摩周・屈斜路の大地を知ることができます。また、自然へ出かけるために心得ておくべきことも紹介されているため、旅のはじめにぜひ足を運んでほしいスポットです。
                                        川湯ビジターセンターのあとは「つつじヶ原自然探勝路」を通って硫黄山へ向かいましょう。約2.6kmの散策路には、イソツツジやハイマツなどが群生。火山の影響で、低地でありながら高山植物を間近に観察することができます。6月中旬から7月下旬にかけては、東京ドーム約21個分に相当する100ヘクタールに広がる日本最大のイソツツジの群落が、一斉に白い花を咲かせます。
                                    </MainArticleContent>
                                    {/* </ScrollCon> */}
                                </MainArticle>
                            </MainArticleSubCon>
                        </MainArticleCon>
                        <MainInfoCon>
                            <MainInfo>
                                <MainInfoHeader>
                                    <InfoTitle>#明治神宮</InfoTitle>
                                    <InfoDetail>
                                        <DetailText style={{ color: '#2d2d2d' }}>Open Time</DetailText>
                                        <DetailText style={{ color: '#2d2d2d' }}>Tickets</DetailText>
                                        <DetailText style={{ color: '#2d2d2d' }}>Station</DetailText>
                                    </InfoDetail>
                                </MainInfoHeader>
                                <MainPicContainer>
                                    <PicBox>
                                        <Pic src={TakeshitaC}></Pic>
                                        <PicTitleContainer>
                                            <PicTitle># 明治神宮婚禮 </PicTitle>
                                            <PicContent>
                                                第一次在日本看到傳統的婚禮，屈斜路の大地を知ることができます。また、自然へ出かけるために心得ておくべきことも紹介されているため、旅のはじめにぜひ足を運んでほしいスポットです。
                                            </PicContent>
                                        </PicTitleContainer>
                                    </PicBox>
                                    <PicBox>
                                        <Pic src={TakeshitaB}></Pic>
                                        <PicTitleContainer>
                                            <PicTitle># 明治神宮婚禮 </PicTitle>
                                            <PicContent>
                                                第一次在日本看到傳統的婚禮，屈斜路の大地を知ることができます。また、自然へ出かけるために心得ておくべきことも紹介されているため、旅のはじめにぜひ足を運んでほしいスポットです。
                                            </PicContent>
                                        </PicTitleContainer>
                                    </PicBox>
                                    <PicBox>
                                        <Pic src={TakeshitaA}></Pic>
                                        <PicTitleContainer>
                                            <PicTitle># 明治神宮婚禮 </PicTitle>
                                            <PicContent>
                                                第一次在日本看到傳統的婚禮，屈斜路の大地を知ることができます。また、自然へ出かけるために心得ておくべきことも紹介されているため、旅のはじめにぜひ足を運んでほしいスポットです。
                                            </PicContent>
                                        </PicTitleContainer>
                                    </PicBox>
                                </MainPicContainer>
                            </MainInfo>
                        </MainInfoCon>
                    </ArticleSection>
                </ArticleSectionConTwo>
                <InsideOutline>
                    <SummarySection>
                        <PicPageContainer>
                            <PicPageHeader>
                                <DetailText style={{ color: '#fafafa', fontWeight: '200' }}>Date:</DetailText>
                                <PicPageTitle>満天の星空を楽しむツアー/ 川湯温泉</PicPageTitle>
                            </PicPageHeader>
                            <PicPagePicContainer>
                                <PicPagePicBox>
                                    <PicPagePic src={ShibuyaStB}></PicPagePic>
                                    <PicPagePicTitleContainer>
                                        <PicTitle style={{ color: '#fafafa', fontWeight: '200', marginTop: '10px' }}>
                                            # 明治神宮婚禮
                                        </PicTitle>
                                        <PicContent style={{ color: '#fafafa', fontWeight: '200' }}>
                                            第一次在日本看到傳統的婚禮，屈斜路の大地を知ることができます。また、自然へ出かけるために心得ておくべきことも紹介されているため、旅のはじめにぜひ足を運んでほしいスポットです。
                                        </PicContent>
                                    </PicPagePicTitleContainer>
                                </PicPagePicBox>
                                <PicPagePicBox>
                                    <PicPagePic src={ShibuyaStA}></PicPagePic>
                                    <PicPagePicTitleContainer>
                                        <PicTitle style={{ color: '#fafafa', fontWeight: '200', marginTop: '10px' }}>
                                            # 明治神宮婚禮
                                        </PicTitle>
                                        <PicContent style={{ color: '#fafafa', fontWeight: '200' }}>
                                            第一次在日本看到傳統的婚禮，屈斜路の大地を知ることができます。また、自然へ出かけるために心得ておくべきことも紹介されているため、旅のはじめにぜひ足を運んでほしいスポットです。
                                        </PicContent>
                                    </PicPagePicTitleContainer>
                                </PicPagePicBox>
                                <PicPagePicBox>
                                    <PicPagePic src={ShibuyaStC}></PicPagePic>
                                    <PicPagePicTitleContainer>
                                        <PicTitle style={{ color: '#fafafa', fontWeight: '200', marginTop: '10px' }}>
                                            # 明治神宮婚禮
                                        </PicTitle>
                                        <PicContent style={{ color: '#fafafa', fontWeight: '200' }}>
                                            第一次在日本看到傳統的婚禮，屈斜路の大地を知ることができます。また、自然へ出かけるために心得ておくべきことも紹介されているため、旅のはじめにぜひ足を運んでほしいスポットです。
                                        </PicContent>
                                    </PicPagePicTitleContainer>
                                </PicPagePicBox>
                                <PicPagePicBox>
                                    <PicPagePic src={ShibuyaStD}></PicPagePic>
                                    <PicPagePicTitleContainer>
                                        <PicTitle style={{ color: '#fafafa', fontWeight: '200', marginTop: '10px' }}>
                                            # 明治神宮婚禮
                                        </PicTitle>
                                        <PicContent style={{ color: '#fafafa', fontWeight: '200' }}>
                                            第一次在日本看到傳統的婚禮，屈斜路の大地を知ることができます。また、自然へ出かけるために心得ておくべきことも紹介されているため、旅のはじめにぜひ足を運んでほしいスポットです。
                                        </PicContent>
                                    </PicPagePicTitleContainer>
                                </PicPagePicBox>
                            </PicPagePicContainer>
                        </PicPageContainer>
                    </SummarySection>
                </InsideOutline>
            </OutSide>
        </>
    );
}
