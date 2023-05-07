import React, { useState, useContext, useEffect } from 'react';
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
    // async function deleteItems(data) {
    //     //存入user sub-collection Places
    //     try {
    //         const itemsRef = doc(db, 'users', userUID);
    //         await deleteDoc(collection(itemsRef, 'SavedPlaces',), data);
    //         // {
    //         //     name: name,
    //         //     placeId: id,
    //         //     formatted_address: address,
    //         //     rating: rating,
    //         //     url: url,
    //         //     website: website,
    //         //     type: type,
    //         // }
    //         // console.log('Item uploaded with ID: ', docRef.id);
    //     } catch (e) {
    //         console.error('Error uploading item: ', e);
    //     }
    // }
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
                                    <Title>世界最大の都市：東京</Title>
                                    <DetailText>Date: Mar 22 2023</DetailText>
                                    <DetailText>Writer: 安雨真</DetailText>
                                </TitleCon>
                                <AttractionCon>
                                    <HashTagCon>
                                        {recommendation.map((place, index) => (
                                            <HashTag key={index}>
                                                #{place.name}
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
                                            <PicTitle># 明治神宮金鳥居 </PicTitle>
                                            <PicContent>
                                                高さが12メートル、幅が17．1メートル、柱の太さが直径1．2メートル、重さが13トンもあり、木造の明神鳥居としては日本一の大きさを誇っています{' '}
                                            </PicContent>
                                        </PicTitleContainer>
                                    </PicBox>
                                    <PicBox>
                                        <Pic src={TokyoTempleB}></Pic>
                                        <PicTitleContainer>
                                            <PicTitle># 明治神宮本堂 </PicTitle>
                                            <PicContent>
                                                三間社流造の本殿。先の大戦で戦渦に遭い、昭和33年（1958）に復興しました。
                                            </PicContent>
                                        </PicTitleContainer>
                                    </PicBox>
                                    <PicBox>
                                        <Pic src={TokyoTempleWedding}></Pic>
                                        <PicTitleContainer>
                                            <PicTitle># 明治神宮婚禮 </PicTitle>
                                            <PicContent>明治神宮で日本の伝統的な結婚式を初めて見た </PicContent>
                                        </PicTitleContainer>
                                    </PicBox>
                                </MainPicContainer>
                            </MainInfo>
                        </MainInfoCon>
                        <MainArticleCon>
                            <MainArticleSubCon>
                                <MainArticle style={{ overflow: 'scroll', maxHeight: '505px' }}>
                                    {/* <ScrollCon> */}
                                    <MainArticleTitle>明治神宮の杜は人工林</MainArticleTitle>
                                    <MainArticleContent>
                                        明治神宮は明治天皇と皇后の昭憲皇太后をおまつりする神社です。
                                        およそ70万平方メートルの広大な鎮守の杜は、明治神宮創建にあたって全国から献木された約10万本を植栽し、「永遠の杜」を目指して造成された人工林です。
                                        国民の願いで創建
                                        明治45年（1912）に明治天皇が、大正3年（1914）に昭憲皇太后が崩御になりましたが、国民から御神霊をおまつりして御聖徳を永久に敬い、お慕いしたいとの熱い願いが沸き上がり、御祭神とゆかりの深い代々木の地に創建されました。
                                        祈りの杜
                                        以来、明治神宮では皇室の弥栄（いやさか）とわが国の隆盛、世界の平和をお祈りしています。
                                        初詣は例年、日本一となるほどの参拝者数を集めますが、平常は豊かに大きく成長した杜と森厳な神気が静かに人々の祈りを包みこんでいます。
                                    </MainArticleContent>
                                    <MainArticleTitle>
                                        剛毅果断で、御仁徳高く、またユーモアを解せられたお方
                                    </MainArticleTitle>
                                    <MainArticleContent>
                                        明治天皇は立派な御体格で、剛毅果断であらせられた反面、御仁徳高く博愛の心に富ませられ、またユーモアを解せられたお方であったと伝えられています。
                                        和歌をお好みになり、御一代にお詠みになった御製（ぎょせい＝和歌）の数は93,032首に及んでおり、常に国家国民の繁栄と世界の平和を祈念された尊い大御心（おおみごころ）を拝することができます。
                                        おごそかにたもたざらめや神代よりうけつぎ来たるうらやすの国
                                        国民のうへやすかれとおもふのみわが世にたえぬ思なりけり
                                        これらの御製を拝することによっても、いかに明治天皇が、万世一系の天子としての御自覚をもって、多難な時局に対処し近代国家の建設に邁進あそばされたか、そして明けても暮れても国民の上に御心をおそそぎになったかを、うかがい知ることができます。
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
                                    <MainArticleTitle>原宿に来たらまずはコレ！</MainArticleTitle>
                                    <MainArticleContent>
                                        修学旅行で初めて原宿に来たけれど、 どこに行っていいかわからない…。
                                        そんな時、気軽に原宿を実感できる定番のコースをご紹介します！
                                        3フロア、400坪の売り場に多くのブランド・コスメ商品を取り揃えている新体験フラッグシップショップの@cosme
                                        TOKYO。各階では今注目されているアイテムを見たり、美容機器やテスターもお試しできたりと、美容好きにはたまらないお店です。その日の気分や用途に合わせて、コスメ選びを楽しむことができます。{' '}
                                        IKEA（WITH HARAJUKU） ikea（with harajuku） 日本初となるイケアの都心型店舗「IKEA
                                        原宿」。休日や平日のランチ、仕事の後にでも気軽に立ち寄れる都心型ショップです。店内は、都市部の暮らしに合わせたレイアウトで“眠る”“整える”“くつろぐ”“料理する”の4つをコンセプトに
                                        しています。ルームセットは狭い部屋にも合うおしゃれなインテリアを提案しています。
                                    </MainArticleContent>
                                    <MainArticleTitle>
                                        SWEET BOXは、タレントショップやファーストフード店
                                    </MainArticleTitle>
                                    <MainArticleContent>
                                        SWEET
                                        BOXは、タレントショップやファーストフード店が立ち並ぶ、東京の観光名所、原宿の竹下通りの入ってすぐににあります。
                                        クレープのおいしさ故、行列ができる事もしばしばです。並んででも食べたくなるそのおいしさの秘密は、サクサクの薄皮生地と特製の濃厚クリームです。
                                        日本初、“長さ”をテーマにしたフード&スイーツ専門店「LONG! LONGER!!
                                        LONGEST!!!」。メニューはソフトクリームやポテトなど幅広い品揃えです。メディアにも多く取り上げられる原宿話題のスイーツとフードです。味だけでなく見た目も存分に楽しもう！
                                    </MainArticleContent>
                                    {/* </ScrollCon> */}
                                </MainArticle>
                            </MainArticleSubCon>
                        </MainArticleCon>
                        <MainInfoCon>
                            <MainInfo>
                                <MainInfoHeader>
                                    <InfoTitle>#竹下通</InfoTitle>
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
                                            <PicTitle># 竹下通り原宿駅 </PicTitle>
                                            <PicContent>原宿駅が竹下通りの最寄り駅です</PicContent>
                                        </PicTitleContainer>
                                    </PicBox>
                                    <PicBox>
                                        <Pic src={TakeshitaB}></Pic>
                                        <PicTitleContainer>
                                            <PicTitle># 原宿駅前のイチョウ並木 </PicTitle>
                                            <PicContent>原宿駅前のイチョウの木がたまたま綺麗だった </PicContent>
                                        </PicTitleContainer>
                                    </PicBox>
                                    <PicBox>
                                        <Pic src={TakeshitaA}></Pic>
                                        <PicTitleContainer>
                                            <PicTitle># 竹下通りでショッピング </PicTitle>
                                            <PicContent>
                                                竹下通りのショッピングはファッショントレンドの発信地
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
                                <PicPageTitle>今日の国の出発点/ 渋谷駅</PicPageTitle>
                            </PicPageHeader>
                            <PicPagePicContainer>
                                <PicPagePicBox>
                                    <PicPagePic src={ShibuyaStB}></PicPagePic>
                                    <PicPagePicTitleContainer>
                                        <PicTitle style={{ color: '#fafafa', fontWeight: '200', marginTop: '10px' }}>
                                            # 渋谷駅の外観
                                        </PicTitle>
                                        <PicContent style={{ color: '#fafafa', fontWeight: '200' }}>
                                            私は今の国が好きなので、来なければなりません。
                                        </PicContent>
                                    </PicPagePicTitleContainer>
                                </PicPagePicBox>
                                <PicPagePicBox>
                                    <PicPagePic src={ShibuyaStA}></PicPagePic>
                                    <PicPagePicTitleContainer>
                                        <PicTitle style={{ color: '#fafafa', fontWeight: '200', marginTop: '10px' }}>
                                            # 渋谷で最も有名な交差点
                                        </PicTitle>
                                        <PicContent style={{ color: '#fafafa', fontWeight: '200' }}>
                                            この交差点を自分の目で見るのは今でも信じられないほどです。{' '}
                                        </PicContent>
                                    </PicPagePicTitleContainer>
                                </PicPagePicBox>
                                <PicPagePicBox>
                                    <PicPagePic src={ShibuyaStC}></PicPagePic>
                                    <PicPagePicTitleContainer>
                                        <PicTitle style={{ color: '#fafafa', fontWeight: '200', marginTop: '10px' }}>
                                            # 今日の国主人公たちがチャットする場所
                                        </PicTitle>
                                        <PicContent style={{ color: '#fafafa', fontWeight: '200' }}>
                                            いつゲームが始まるかわからない？
                                        </PicContent>
                                    </PicPagePicTitleContainer>
                                </PicPagePicBox>
                                <PicPagePicBox>
                                    <PicPagePic src={ShibuyaStD}></PicPagePic>
                                    <PicPagePicTitleContainer>
                                        <PicTitle style={{ color: '#fafafa', fontWeight: '200', marginTop: '10px' }}>
                                            # 渋谷スカイ
                                        </PicTitle>
                                        <PicContent style={{ color: '#fafafa', fontWeight: '200' }}>
                                            渋谷スカイから見た東京タワー{' '}
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
