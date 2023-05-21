import React, { useState, useContext, useEffect } from 'react';
import './BlogArticle.css';
import styled from 'styled-components/macro';
import Header from '../../components/Header/Header';
import { AuthContext } from '../../Context/AuthContext';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, addDoc, collection, updateDoc, deleteDoc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../../components/utils/firebase/firbase';
import ArticleLikesButton from '../../components/Button/ArticleLikesButton';

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
    /* height: 65px; */
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
    useEffect(() => {
        window.scrollTo(0, 0); // 在页面加载完成或页面切换时滚动到顶部
    }, []);

    const recommendation = [
        {
            name: '明治神宮',
            placeId: 'ChIJ5SZMmreMGGARcz8QSTiJyo8',
            formatted_address: '1-1 Yoyogikamizonochō, Shibuya City, Tokyo 151-8557日本',
            rating: '4.6',
            url: 'https://maps.google.com/?cid=10361244767556222835',
            website: 'https://www.meijijingu.or.jp/',
            photo: 'https://www.kkday.com/zh-tw/blog/wp-content/uploads/batch_shutterstock_1510366601.jpg',
            type: 'attraction',
            isLike: false,
        },
        {
            name: '竹下通',
            placeId:
                'EkdUYWtlc2hpdGEgU3QsIDEtY2jFjW1lLTYgSmluZ8WrbWFlLCBTaGlidXlhIENpdHksIFRva3lvIDE1MC0wMDAxLCBKYXBhbiIuKiwKFAoSCZVZ3vG6jBhgEbV-TuqIzL7CEhQKEgnLZd6tpIwYYBGhihayiuWxHg',
            formatted_address: 'Takeshita St, 1-chōme-6 Jingūmae, Shibuya City, Tokyo 150-0001日本',
            rating: '',
            url: 'https://maps.google.com/?q=Takeshita+St,+1-ch%C5%8Dme-6+Jing%C5%ABmae,+Shibuya+City,+Tokyo+150-0001%E6%97%A5%E6%9C%AC&ftid=0x60188cbaf1de5995:0xc2becc88ea4e7eb5',
            website: 'https://www.gotokyo.org/tc/spot/48/index.html',
            photo: 'https://static.gltjp.com/glt/prd/data/directory/13000/12452/20220607_120400_3004bce1_w1920.jpg',
            type: 'attraction',
            isLike: false,
        },
        {
            name: '澀谷',
            placeId: 'ChIJGfSRvl6LGGAR5GDIDOVf4Bc',
            formatted_address: '日本〒150-0002 東京都澀谷區澀谷',
            rating: '',
            url: 'https://maps.google.com/?q=%E6%97%A5%E6%9C%AC%E3%80%92150-0002+%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%BE%80%E8%B0%B7%E5%8D%80%E6%BE%80%E8%B0%B7&ftid=0x60188b5ebe91f419:0x17e05fe50cc860e4',
            website: 'https://www.city.shibuya.tokyo.jp.c.mu.hp.transer.com/',
            photo: 'https://static.gltjp.com/glt/prd/data/directory/13000/12452/20220607_120400_3004bce1_w1920.jpg',
            type: 'attraction',
            isLike: false,
        },
    ];

    const [isLiked, setIsLiked] = useState(false);
    console.log(isLiked);
    const handleCheckboxChange = () => {
        setIsLiked(!isLiked);
    };

    async function uploadItems(data) {
        //存入user sub-collection Places
        try {
            const itemsRef = doc(db, 'users', userUID);
            await setDoc(doc(itemsRef, 'SavedPlaces', data.placeId), data);
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
    const handleDelete = async (id) => {
        const placeRef = doc(db, 'users', userUID, 'SavedPlaces', id);
        await deleteDoc(placeRef);
    };

    // useEffect(() => {
    //     if (isLiked) {
    //         uploadItems();
    //     } else {
    //         deleteItems();
    //     }
    // }, [isLiked]);

    // console.log(recommendation);
    const [article, setArticle] = useState();
    useEffect(() => {
        const getDocumentData = async () => {
            const docRef = doc(db, 'article', 'uqFBj9367agJPnk7UPtj');
            const docSnap = await getDoc(docRef);
            const readableSnap = docSnap.data();
            console.log(readableSnap);
            setArticle(readableSnap);
        };

        // 调用函数以获取文档数据
        getDocumentData();
    }, []);

    useEffect(() => {
        const getDocumentData = async () => {
            const docRef = collection(db, 'article');
            const docSnap = await getDocs(docRef);
            const articles = [];
            docSnap.forEach((doc) => articles.push(doc.data()));
            console.log(articles);
        };
        // 调用函数以获取文档数据
        getDocumentData();
    }, []);

    if (!article) {
        return;
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
                                    <Title>{article.title}</Title>
                                    <DetailText>Date: {article.date}</DetailText>
                                    <DetailText>Writer: {article.Writer[0]}</DetailText>
                                </TitleCon>
                                <AttractionCon>
                                    <HashTagCon>
                                        {recommendation.map((place, index) => (
                                            <HashTag key={index}>
                                                # {place.name}
                                                <AddTagFav
                                                // type='button'
                                                // onClick={() => {
                                                //     uploadItems(place);
                                                // }}
                                                >
                                                    <ArticleLikesButton
                                                        onChange={() => {
                                                            if (!place.isLike) {
                                                                uploadItems(place);
                                                                place.isLike = true;
                                                            } else {
                                                                handleDelete(place.placeId);
                                                                place.isLike = false;
                                                            }
                                                        }}
                                                    />
                                                </AddTagFav>
                                            </HashTag>
                                        ))}
                                    </HashTagCon>
                                </AttractionCon>
                            </SummarySubCon>
                        </SummaryCon>
                        <PicContainer>
                            <PicSubCon src={article.mainImage}></PicSubCon>
                        </PicContainer>
                    </SummarySection>
                </InsideOutline>
                <ArticleSectionConOne>
                    <ArticleSection>
                        <MainInfoCon>
                            <MainInfo>
                                <MainInfoHeader>
                                    <InfoTitle># {article.blockA.placeName}</InfoTitle>
                                    <InfoDetail>
                                        <DetailText style={{ color: '#2d2d2d' }}>Open Time</DetailText>
                                        <DetailText style={{ color: '#2d2d2d' }}>Tickets</DetailText>
                                        <DetailText style={{ color: '#2d2d2d' }}>Station</DetailText>
                                    </InfoDetail>
                                </MainInfoHeader>
                                <MainPicContainer>
                                    <PicBox>
                                        <Pic src={article.blockA.photo.photoA.photoURL}></Pic>
                                        <PicTitleContainer>
                                            <PicTitle># {article.blockA.photo.photoA.photoTitle}</PicTitle>
                                            <PicContent>{article.blockA.photo.photoA.photoInfo}</PicContent>
                                        </PicTitleContainer>
                                    </PicBox>
                                    <PicBox>
                                        <Pic src={article.blockA.photo.photoB.photoURL}></Pic>
                                        <PicTitleContainer>
                                            <PicTitle># {article.blockA.photo.photoB.photoTitle} </PicTitle>
                                            <PicContent>{article.blockA.photo.photoB.photoInfo}</PicContent>
                                        </PicTitleContainer>
                                    </PicBox>
                                    <PicBox>
                                        <Pic src={article.blockA.photo.photoC.photoURL}></Pic>
                                        <PicTitleContainer>
                                            <PicTitle># {article.blockA.photo.photoC.photoTitle} </PicTitle>
                                            <PicContent>{article.blockA.photo.photoC.photoInfo} </PicContent>
                                        </PicTitleContainer>
                                    </PicBox>
                                </MainPicContainer>
                            </MainInfo>
                        </MainInfoCon>
                        <MainArticleCon>
                            <MainArticleSubCon>
                                <MainArticle style={{ overflow: 'scroll', maxHeight: '505px' }}>
                                    {/* <ScrollCon> */}
                                    <MainArticleTitle>{article.blockA.article[0]}</MainArticleTitle>
                                    <MainArticleContent>{article.blockA.article[1]}</MainArticleContent>
                                    <MainArticleTitle>{article.blockA.article[2]}</MainArticleTitle>
                                    <MainArticleContent>{article.blockA.article[3]}</MainArticleContent>
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
                                    <MainArticleTitle>{article.blockB.article[0]}</MainArticleTitle>
                                    <MainArticleContent>{article.blockB.article[1]}</MainArticleContent>
                                    <MainArticleTitle>{article.blockB.article[2]}</MainArticleTitle>
                                    <MainArticleContent>{article.blockB.article[3]}</MainArticleContent>
                                    {/* </ScrollCon> */}
                                </MainArticle>
                            </MainArticleSubCon>
                        </MainArticleCon>
                        <MainInfoCon>
                            <MainInfo>
                                <MainInfoHeader>
                                    <InfoTitle># {article.blockB.placeName}</InfoTitle>
                                    <InfoDetail>
                                        <DetailText style={{ color: '#2d2d2d' }}>Open Time</DetailText>
                                        <DetailText style={{ color: '#2d2d2d' }}>Tickets</DetailText>
                                        <DetailText style={{ color: '#2d2d2d' }}>Station</DetailText>
                                    </InfoDetail>
                                </MainInfoHeader>
                                <MainPicContainer>
                                    <PicBox>
                                        <Pic src={article.blockB.photo.photoA.photoURL}></Pic>
                                        <PicTitleContainer>
                                            <PicTitle># {article.blockB.photo.photoA.photoTitle} </PicTitle>
                                            <PicContent>{article.blockB.photo.photoA.photoInfo}</PicContent>
                                        </PicTitleContainer>
                                    </PicBox>
                                    <PicBox>
                                        <Pic src={article.blockB.photo.photoB.photoURL}></Pic>
                                        <PicTitleContainer>
                                            <PicTitle># {article.blockB.photo.photoB.photoTitle}</PicTitle>
                                            <PicContent>{article.blockB.photo.photoB.photoInfo}</PicContent>
                                        </PicTitleContainer>
                                    </PicBox>
                                    <PicBox>
                                        <Pic src={article.blockB.photo.photoC.photoURL}></Pic>
                                        <PicTitleContainer>
                                            <PicTitle># {article.blockB.photo.photoC.photoTitle}</PicTitle>
                                            <PicContent>{article.blockB.photo.photoC.photoInfo}</PicContent>
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
                                <DetailText style={{ color: '#fafafa', fontWeight: '200' }}>
                                    Date: {article.greyBlockA.date}
                                </DetailText>
                                <PicPageTitle>{article.greyBlockA.mainTitle}</PicPageTitle>
                            </PicPageHeader>
                            <PicPagePicContainer>
                                <PicPagePicBox>
                                    <PicPagePic src={article.greyBlockA.photo.photoA.photoURL}></PicPagePic>
                                    <PicPagePicTitleContainer>
                                        <PicTitle style={{ color: '#fafafa', fontWeight: '200', marginTop: '10px' }}>
                                            # {article.greyBlockA.photo.photoA.photoTitle}
                                        </PicTitle>
                                        <PicContent style={{ color: '#fafafa', fontWeight: '200' }}>
                                            {article.greyBlockA.photo.photoA.photoInfo}
                                        </PicContent>
                                    </PicPagePicTitleContainer>
                                </PicPagePicBox>
                                <PicPagePicBox>
                                    <PicPagePic src={article.greyBlockA.photo.photoB.photoURL}></PicPagePic>
                                    <PicPagePicTitleContainer>
                                        <PicTitle style={{ color: '#fafafa', fontWeight: '200', marginTop: '10px' }}>
                                            # {article.greyBlockA.photo.photoB.photoTitle}
                                        </PicTitle>
                                        <PicContent style={{ color: '#fafafa', fontWeight: '200' }}>
                                            {article.greyBlockA.photo.photoB.photoInfo}
                                        </PicContent>
                                    </PicPagePicTitleContainer>
                                </PicPagePicBox>
                                <PicPagePicBox>
                                    <PicPagePic src={article.greyBlockA.photo.photoC.photoURL}></PicPagePic>
                                    <PicPagePicTitleContainer>
                                        <PicTitle style={{ color: '#fafafa', fontWeight: '200', marginTop: '10px' }}>
                                            # {article.greyBlockA.photo.photoC.photoTitle}
                                        </PicTitle>
                                        <PicContent style={{ color: '#fafafa', fontWeight: '200' }}>
                                            {article.greyBlockA.photo.photoC.photoInfo}
                                        </PicContent>
                                    </PicPagePicTitleContainer>
                                </PicPagePicBox>
                                <PicPagePicBox>
                                    <PicPagePic src={article.greyBlockA.photo.photoD.photoURL}></PicPagePic>
                                    <PicPagePicTitleContainer>
                                        <PicTitle style={{ color: '#fafafa', fontWeight: '200', marginTop: '10px' }}>
                                            # {article.greyBlockA.photo.photoD.photoTitle}
                                        </PicTitle>
                                        <PicContent style={{ color: '#fafafa', fontWeight: '200' }}>
                                            {article.greyBlockA.photo.photoD.photoInfo}
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
