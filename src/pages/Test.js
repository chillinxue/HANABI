import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';
import useFirebase from '../components/utils/hook/firebase';
import userGoogle from '../components/utils/hook/google';

// // TODO: Replace the following with your app's Firebase project configuration
// // See: https://support.google.com/firebase/answer/7015592
// const firebaseConfig = {
//     apiKey: 'AIzaSyBx7Q_DL9eZ9zy9U-naVJ4iQPFdpfLL5Qc',
//     authDomain: 'hanabi-f5ee3.firebaseapp.com',
//     projectId: 'hanabi-f5ee3',
//     storageBucket: 'hanabi-f5ee3.appspot.com',
//     messagingSenderId: '602379997527',
//     appId: '1:602379997527:web:108c1f46f5e8788fe6ae12',
//     measurementId: 'G-Q9NRVJV8NH',
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firestore and get a reference to the service
// const db = getFirestore(app);

// console.log(db);
// // 文章收藏collection
// setDoc(doc(db, 'article', 'articleId'), {
//     title: '富士山自由行三日',
//     name: ['學', 'chelsie.xue@gmail.com'],
//     date: '2022/12/10',
//     mainImage: 'https://julianimage.com/wp-content/uploads/2017/12/340.jpg',
//     hashTag: {
//         富士河口湖溫泉新世紀飯店: {
//             place: '富士河口湖溫泉新世紀飯店',
//             latitudeAndLongitude: '35.503593,138.7634713',
//             image: [
//                 {
//                     imageUrl: 'https://julianimage.com/wp-content/uploads/2017/12/340.jpg',
//                     imageTitle: '飯店湖窗外景色',
//                 },
//                 {
//                     imageUrl:
//                         'https://i0.wp.com/wanchen-travel.com/wp-content/uploads/2019/07/DSC06434.jpg?resize=720%2C480&ssl=1',
//                     imageTitle: '晚餐懷石料理',
//                 },
//             ],
//             article:
//                 '河口湖北麓數十家溫泉飯店該怎麼選擇呢？喵爸覺得河口湖新世紀飯店(New Century Hotel)會是不錯的選擇。在相同的親切服務與美味餐點品質下，河口湖新世紀飯店因為觀看富士山的角度稍微偏了一些，所以擁有河口湖北麓最低的住宿費用。儘管河口湖新世紀飯店觀看富士山的角度稍微偏了一些，但無損眺望山景、湖景的美好景致',
//         },
//         新倉富士淺間神社: {
//             place: '#新倉富士淺間神社',
//             latitudeAndLongitude: '35.503593,138.7634713',
//             image: [
//                 {
//                     imageUrl: 'https://i0.wp.com/boo2k.com/wp-content/uploads/2020/09/IMG_1051.jpg?fit=860%2C573&ssl=1',
//                     imageTitle: '神社山頂風景',
//                 },
//                 {
//                     imageUrl:
//                         'https://fujiyoshida.net/image/rendering/attraction_image/120/trim.800/3/2?v=6bab8cbd032bbf3dcecfdd28c7cfb15b206c1203',
//                     imageTitle: '神社鳥居與富士山',
//                 },
//             ],
//             article:
//                 '鳥居配富士山景非常漂亮，走398層階梯則可抵達忠靈塔，配富士山也非常美。有新倉山步道可登山望遠看富士山，上山約1小時，下山約半小時，非常推薦。',
//         },
//     },
// });
// // 會員資料collection
// setDoc(doc(db, 'users', 'Email'), {
//     name: '學',
//     password: 'xuexue',
//     articleId: [2266, 1234],
//     placeLayerSaved: {
//         hotel: {
//             富士河口湖溫泉新世紀飯店: {
//                 latitudeAndLongitude: '35.503593,138.7634713',
//                 address: '〒401-0303 山梨県南都留郡富士河口湖町浅川180-1',
//                 ranking: '4.4',
//                 description: '位於富士山河口湖旁的景觀飯店',
//                 comment: [
//                     '會讓人想再次造訪的飯店，這是我在日本遇過最特別的服務！當我一停好車，立刻就有服務人員走到飯店對面的停車場為我們卸下行李，從很多小細節可以看出飯店對客人的用心',
//                     '超級滿意這家住宿，所有接待人員都很親切熱心，大部分都英文流利。',
//                 ],
//                 image: [
//                     {
//                         imageUrl: 'https://julianimage.com/wp-content/uploads/2017/12/340.jpg',
//                         imageTitle: '飯店湖窗外景色',
//                     },
//                     {
//                         imageUrl:
//                             'https://i0.wp.com/wanchen-travel.com/wp-content/uploads/2019/07/DSC06434.jpg?resize=720%2C480&ssl=1',
//                         imageTitle: '晚餐懷石料理',
//                     },
//                 ],

//                 hashTag: {
//                     name: '#富士河口湖溫泉新世紀飯店',
//                     latitudeAndLongitude: '35.503593,138.7634713',
//                     image: [
//                         {
//                             imageUrl: 'https://julianimage.com/wp-content/uploads/2017/12/340.jpg',
//                             imageTitle: '飯店湖窗外景色',
//                         },
//                         {
//                             imageUrl:
//                                 'https://i0.wp.com/wanchen-travel.com/wp-content/uploads/2019/07/DSC06434.jpg?resize=720%2C480&ssl=1',
//                             imageTitle: '晚餐懷石料理',
//                         },
//                     ],
//                     article:
//                         '河口湖北麓數十家溫泉飯店該怎麼選擇呢？喵爸覺得河口湖新世紀飯店(New Century Hotel)會是不錯的選擇。在相同的親切服務與美味餐點品質下，河口湖新世紀飯店因為觀看富士山的角度稍微偏了一些，所以擁有河口湖北麓最低的住宿費用。儘管河口湖新世紀飯店觀看富士山的角度稍微偏了一些，但無損眺望山景、湖景的美好景致',
//                 },
//             },
//         },
//         attraction: {
//             新倉富士淺間神社: {
//                 latitudeAndLongitude: '35.487404,138.795665',
//                 address: '〒403-0031 山梨県富士吉田市浅間２丁目４−1',
//                 ranking: '4.4',
//                 description: '可以從高處觀看富士山全景的神社',
//                 comment: [
//                     '這間神社雖然小，但是也屬於淺間神社，神社旁邊的樓梯往上爬以後就能登高望遠，可以看見塔樓和富士山的全景。',
//                     '知名的五重塔搭配富士山攝影絕景，秋天及春天時期，只要是大晴天都會遊客眾多',
//                 ],
//                 image: [
//                     {
//                         imageUrl:
//                             'https://i0.wp.com/boo2k.com/wp-content/uploads/2020/09/IMG_1051.jpg?fit=860%2C573&ssl=1',
//                         imageTitle: '神社山頂風景',
//                     },
//                     {
//                         imageUrl:
//                             'https://fujiyoshida.net/image/rendering/attraction_image/120/trim.800/3/2?v=6bab8cbd032bbf3dcecfdd28c7cfb15b206c1203',
//                         imageTitle: '神社鳥居與富士山',
//                     },
//                 ],
//                 hashTag: {
//                     name: '#新倉富士淺間神社',
//                     latitudeAndLongitude: '35.503593,138.7634713',
//                     image: [
//                         {
//                             imageUrl:
//                                 'https://i0.wp.com/boo2k.com/wp-content/uploads/2020/09/IMG_1051.jpg?fit=860%2C573&ssl=1',
//                             imageTitle: '神社山頂風景',
//                         },
//                         {
//                             imageUrl:
//                                 'https://fujiyoshida.net/image/rendering/attraction_image/120/trim.800/3/2?v=6bab8cbd032bbf3dcecfdd28c7cfb15b206c1203',
//                             imageTitle: '神社鳥居與富士山',
//                         },
//                     ],
//                     article:
//                         '鳥居配富士山景非常漂亮，走398層階梯則可抵達忠靈塔，配富士山也非常美。有新倉山步道可登山望遠看富士山，上山約1小時，下山約半小時，非常推薦。',
//                 },
//             },
//         },
//         restaurant: {
//             '冨士天ぷら いだ天': {
//                 latitudeAndLongitude: '35.4988753,138.76763',
//                 address: '〒401-0301 山梨県南都留郡富士河口湖町船津3486-4',
//                 ranking: '4.2',
//                 description: '位於河口湖站旁的天婦羅店',
//                 comment: [
//                     '這天婦羅，我認為只能說一般，並沒到很驚艷。外皮麵衣層次過於平凡，並無一層一層加疊上去，可能這會花更長時間製作吧。但食材倒是很新鮮！',
//                     '排隊的人潮眾多，要記得先去店內填寫候位表，不要在外面傻傻被冷風吹。',
//                 ],
//                 image: [
//                     {
//                         imageUrl:
//                             'https://igx.4sqi.net/img/general/750x500/9406138_k-9RXPqgkadfBVThC0vQX4ROQCA9vWF2xFdR_VTbQc8.jpg',
//                         imageTitle: '現炸天婦羅',
//                     },
//                     {
//                         imageUrl: 'https://www.porta-y.jp/wp-content/uploads/2018/06/gourmet_idaten5.jpg',
//                         imageTitle: '餐廳照片',
//                     },
//                 ],
//                 hashTag: {
//                     name: '#冨士天ぷら いだ天',
//                     latitudeAndLongitude: '35.4988753,138.76763',
//                     image: [
//                         {
//                             imageUrl:
//                                 'https://igx.4sqi.net/img/general/750x500/9406138_k-9RXPqgkadfBVThC0vQX4ROQCA9vWF2xFdR_VTbQc8.jpg',
//                             imageTitle: '現炸天婦羅',
//                         },
//                         {
//                             imageUrl: 'https://www.porta-y.jp/wp-content/uploads/2018/06/gourmet_idaten5.jpg',
//                             imageTitle: '餐廳照片',
//                         },
//                     ],
//                     article:
//                         '但還第一次看到炸蝦天婦羅可以堆得跟富士山一樣的碗公，冷冷的天超適合一家人一起吃，丼飯裡除了有好吃的炸蝦丼，上方還有紅如岩漿噴發的鮭魚卵、白飯的料也大有文章',
//                 },
//             },
//         },
//         transportation: {
//             河口湖站: {
//                 latitudeAndLongitude: '35.5000822,138.7689502',
//                 address: '〒401-0301 山梨県南都留郡富士河口湖町船津3641',
//                 ranking: '4.2',
//                 description: '位於山梨縣河口湖町的車站',
//                 comment: [
//                     '.車站本身就是個小景點，後方就是龐大富士山，這是初次到訪河口湖的人會第一次感受到富士山震撼的地方',
//                     '非常美麗的車站，從新宿前來，搭乘中央線到大月換乘富士急行線即可抵達',
//                 ],
//                 image: [
//                     {
//                         imageUrl: 'https://img.bobblog.tw/2019/tokyo/hotel/ueno-apa/Kawaguchiko-Station-16.jpg',
//                         imageTitle: '河口湖站',
//                     },
//                     {
//                         imageUrl: 'https://www.porta-y.jp/wp-content/uploads/2018/06/gourmet_idaten5.jpg',
//                         imageTitle: '餐廳照片',
//                     },
//                 ],
//                 hashTag: {
//                     name: '#河口湖站',
//                     latitudeAndLongitude: '35.5000822,138.7689502',
//                     image: [
//                         {
//                             imageUrl:
//                                 'https://igx.4sqi.net/img/general/750x500/9406138_k-9RXPqgkadfBVThC0vQX4ROQCA9vWF2xFdR_VTbQc8.jpg',
//                             imageTitle: '現炸天婦羅',
//                         },
//                         {
//                             imageUrl: 'https://www.porta-y.jp/wp-content/uploads/2018/06/gourmet_idaten5.jpg',
//                             imageTitle: '餐廳照片',
//                         },
//                     ],
//                     article:
//                         '但還第一次看到炸蝦天婦羅可以堆得跟富士山一樣的碗公，冷冷的天超適合一家人一起吃，丼飯裡除了有好吃的炸蝦丼，上方還有紅如岩漿噴發的鮭魚卵、白飯的料也大有文章',
//                 },
//             },
//         },
//     },
//     trip: {
//         '2023日本畢業旅行': {
//             '0608': {
//                 '10:00': {
//                     place: '富士山河口湖',
//                     address: '〒401-0301 山梨県南都留郡富士河口湖町船津3641',
//                     latitudeAndLongitude: '35.5000822,138.7689502',
//                     time: '10:00',
//                     description: '谷哥書包要記得拿',
//                 },
//                 '11:00': {
//                     place: '河濱公園',
//                     address: '〒401-0301 山梨県南都留郡富士河口湖町船津3641',
//                     latitudeAndLongitude: '35.5000822,138.7689502',
//                     time: '11:00',
//                     description: '谷哥書包被偷了',
//                 },
//             },
//             '0609': {
//                 '10:00': {
//                     place: '富士山河口湖',
//                     address: '〒401-0301 山梨県南都留郡富士河口湖町船津3641',
//                     latitudeAndLongitude: '35.5000822,138.7689502',
//                     time: '10:00',
//                     description: '谷哥書包要記得拿',
//                 },
//                 '11:00': {
//                     place: '河濱公園',
//                     address: '〒401-0301 山梨県南都留郡富士河口湖町船津3641',
//                     latitudeAndLongitude: '35.5000822,138.7689502',
//                     time: '11:00',
//                     description: '谷哥書包被偷了',
//                 },
//             },
//         },
//     },
//     articleSaved: {
//         'Fuji-San': {
//             articleId: [2266, 1234],
//         },
//         Tokyo: {
//             articleId: [2266, 1234],
//         },
//     },
// });

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 50px 100px;
    margin-bottom: 150px;
`;
const GoogleMap = styled.div`
    display: flex;
    gap: 50px;
    width: 100%;
    margin-top: 60px;
`;
const SearchGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`;
const SearchButton = styled.button`
    width: 300px;
    height: 50px;
    font-size: 18px;
    background-color: #88c8ec;
    color: white;
    &:hover {
        background-color: #88c8ec;
    }
`;
const MapLabel = styled.div`
    font-size: 20px;
`;
const MapTitle = styled.div`
    font-size: 30px;
    font-weight: 700;
    padding-bottom: 20px;
`;

function Test() {
    useFirebase();
    const { handleLoginGoogle } = userGoogle();
    let cachedScripts = [];
    function useScript(src) {
        // Keeping track of script loaded and error state   //load SDK 初始資料 （收）

        const [state, setState] = useState({
            loaded: false,
            error: false,
        });

        useEffect(() => {
            if (cachedScripts.includes(src)) {
                setState({
                    loaded: true,

                    error: false,
                });
            } else {
                cachedScripts.push(src);
                let script = document.createElement('script');
                script.src = src;
                script.async = true;
                const onScriptLoad = () => {
                    setState({
                        loaded: true,
                        error: false,
                    });
                };

                const onScriptError = () => {
                    const index = cachedScripts.indexOf(src);
                    if (index >= 0) cachedScripts.splice(index, 1);
                    script.remove();
                    setState({
                        loaded: true,
                        error: true,
                    });
                };
                script.addEventListener('load', onScriptLoad);
                script.addEventListener('error', onScriptError);
                document.body.appendChild(script);
                return () => {
                    script.removeEventListener('load', onScriptLoad);
                    script.removeEventListener('error', onScriptError);
                };
            }
        }, [src]);
        return [state.loaded, state.error];
    }
    const [loaded, error] = useScript(
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyCszxEdzSyD5fLI9-m_nRiUr6GEbeIfTG4&libraries=places&callback=initMap'
    ); //憑證
    const [map, setDataMap] = useState();
    const [from, setFrom] = useState(''); //起始地點，要加個to
    const fromInputRef = useRef(null); // 新增起點 ref
    const toInputRef = useRef(null); // 新增終點 ref
    const [to, setTo] = useState(''); // 新增終點 state
    const [favorites, setFavorites] = useState([]);
    const [locationInfo, setLocationInfo] = useState(null);
    const marker = new window.google.maps.Marker({
        position: { lat: 35.503593, lng: 138.7634713 },
        map: map,
    });

    const infowindow = new window.google.maps.InfoWindow({
        content: '<div>InfoWindow Content</div>',
    });
    console.log();
    marker.addListener('click', () => {
        infowindow.open(map, marker);
    });

    useEffect(() => {
        if (loaded) {
            //load到才會執行
            const myLatLng = [
                { lat: 35.503593, lng: 138.7634713 },
                { lat: 35.487404, lng: 138.795665 },
                { lat: 35.503593, lng: 138.7634713 },
                { lat: 35.4988753, lng: 138.76763 },
            ];
            const map = new window.google.maps.Map(document.getElementById('map'), {
                //div render map
                zoom: 20, //zoom in
                center: myLatLng[0], //初始經緯度 （替換）
                mapTypeId: window.google.maps.MapTypeId.ROADMAP, //一般地圖
            });

            const fromAutocomplete = new window.google.maps.places.Autocomplete(fromInputRef.current);
            const toAutocomplete = new window.google.maps.places.Autocomplete(toInputRef.current);

            fromAutocomplete.addListener('place_changed', () => {
                setFrom(fromAutocomplete.getPlace().formatted_address);
                setLocationInfo(fromAutocomplete.getPlace());
            });

            toAutocomplete.addListener('place_changed', () => {
                setTo(toAutocomplete.getPlace().formatted_address);
                toInputRef.current.value = toAutocomplete.getPlace().formatted_address;
            });

            const icons = {
                red: {
                    url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/library_maps.png',
                    scaledSize: new window.google.maps.Size(50, 50),
                },
                blue: {
                    url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                    scaledSize: new window.google.maps.Size(50, 50),
                },
                green: {
                    url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png',
                    scaledSize: new window.google.maps.Size(50, 50),
                },
            };
            myLatLng.forEach((location, index) => {
                const marker = new window.google.maps.Marker({
                    position: location,
                    map,
                    icon: icons[index % 3 === 0 ? 'red' : index % 3 === 1 ? 'blue' : 'green'],
                });
            });
            setDataMap(map);
            console.log(toInputRef);
        }
    }, [loaded]);

    if (!loaded) {
        return;
    }

    //create a DirectionsService object to use the route method and get a result for our request
    const directionsService = new window.google.maps.DirectionsService(); //路線計算

    //create a DirectionsRenderer object which we will use to display the route
    const directionsDisplay = new window.google.maps.DirectionsRenderer(); //路線render

    //bind the DirectionsRenderer to the map
    directionsDisplay.setMap(map); //綁定到map

    function calcRoute() {
        //create request
        const request = {
            origin: from, //
            destination: to, //存一個state 控制
            travelMode: window.google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT 路線模式
            unitSystem: window.google.maps.UnitSystem.METRIC, //單位
        };

        directionsService.route(request, function (result, status) {
            console.log(status);
            if (status == window.google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result); //寫路線的功能
                console.log(result);
            } else {
                //delete route from map
                directionsDisplay.setDirections({ routes: [] });
                //center map in London
                map.setCenter({ lat: 25.033964, lng: 121.564468 });
                //show error message
            }
        });
    }

    function addToFavorites() {
        if (to) {
            // setFavorites((prevFavorites) => [...prevFavorites, to]);
            console.log(locationInfo);
            const favoriteList = [...favorites, locationInfo];
            setFavorites(favoriteList);
        }
    }

    console.log('favorites:', favorites);
    console.log(favorites.name);
    // console.log('LoactionInfo:', locationInfo);

    return (
        <Wrapper>
            <SearchGroup>
                <MapTitle>HANABi🎇</MapTitle>
                <button onClick={handleLoginGoogle}>使用google登入</button>
                <MapLabel>搜尋路徑</MapLabel>
                <input
                    type='text'
                    ref={fromInputRef} // 使用 ref
                    placeholder='你在哪裏?'
                    className='form-control'
                />
                <input
                    type='text'
                    ref={toInputRef} // 使用 ref
                    placeholder='你要去哪裡?'
                    className='form-control'
                />
                <SearchButton onClick={() => calcRoute()}>搜尋</SearchButton>
                <SearchButton onClick={() => addToFavorites()}>加入最愛</SearchButton> {/* 新增加入最愛按鈕 */}
            </SearchGroup>
            <GoogleMap>
                <div id='map' style={{ height: '700px', width: '1280px', border: `20px solid #88C8EC` }} />
            </GoogleMap>
            <div>
                <h2>我的最愛地點</h2>
                {/* {console.log('favorites 下', favorites.name)} */}
                {console.log(typeof favorites)}
                {favorites.length > 0 && (
                    <>
                        {favorites.map((favorite, index) => (
                            <h3 key={index}>{favorite.name}</h3>
                        ))}
                    </>
                )}
            </div>
        </Wrapper>
    );
}
export default Test;
