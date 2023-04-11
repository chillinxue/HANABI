import React from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';

export default function StorageFirebase() {
    // TODO: Replace the following with your app's Firebase project configuration
    // See: https://support.google.com/firebase/answer/7015592
    const firebaseConfig = {
        apiKey: 'AIzaSyBx7Q_DL9eZ9zy9U-naVJ4iQPFdpfLL5Qc',
        authDomain: 'hanabi-f5ee3.firebaseapp.com',
        projectId: 'hanabi-f5ee3',
        storageBucket: 'hanabi-f5ee3.appspot.com',
        messagingSenderId: '602379997527',
        appId: '1:602379997527:web:108c1f46f5e8788fe6ae12',
        measurementId: 'G-Q9NRVJV8NH',
    };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Firestore and get a reference to the service
    const db = getFirestore(app);

    console.log(db);
    setDoc(doc(db, 'article', 'articleId'), {
        title: '富士山自由行三日',
        name: ['學', 'chelsie.xue@gmail.com'],
        date: '2022/12/10',
        mainImage: 'https://julianimage.com/wp-content/uploads/2017/12/340.jpg',
        hashTag: {
            富士河口湖溫泉新世紀飯店: {
                place: '富士河口湖溫泉新世紀飯店',
                latitudeAndLongitude: '35.503593,138.7634713',
                image: [
                    {
                        imageUrl: 'https://julianimage.com/wp-content/uploads/2017/12/340.jpg',
                        imageTitle: '飯店湖窗外景色',
                    },
                    {
                        imageUrl:
                            'https://i0.wp.com/wanchen-travel.com/wp-content/uploads/2019/07/DSC06434.jpg?resize=720%2C480&ssl=1',
                        imageTitle: '晚餐懷石料理',
                    },
                ],
                article:
                    '河口湖北麓數十家溫泉飯店該怎麼選擇呢？喵爸覺得河口湖新世紀飯店(New Century Hotel)會是不錯的選擇。在相同的親切服務與美味餐點品質下，河口湖新世紀飯店因為觀看富士山的角度稍微偏了一些，所以擁有河口湖北麓最低的住宿費用。儘管河口湖新世紀飯店觀看富士山的角度稍微偏了一些，但無損眺望山景、湖景的美好景致',
            },
            新倉富士淺間神社: {
                place: '#新倉富士淺間神社',
                latitudeAndLongitude: '35.503593,138.7634713',
                image: [
                    {
                        imageUrl:
                            'https://i0.wp.com/boo2k.com/wp-content/uploads/2020/09/IMG_1051.jpg?fit=860%2C573&ssl=1',
                        imageTitle: '神社山頂風景',
                    },
                    {
                        imageUrl:
                            'https://fujiyoshida.net/image/rendering/attraction_image/120/trim.800/3/2?v=6bab8cbd032bbf3dcecfdd28c7cfb15b206c1203',
                        imageTitle: '神社鳥居與富士山',
                    },
                ],
                article:
                    '鳥居配富士山景非常漂亮，走398層階梯則可抵達忠靈塔，配富士山也非常美。有新倉山步道可登山望遠看富士山，上山約1小時，下山約半小時，非常推薦。',
            },
        },
    });
    // 會員資料collection
    setDoc(doc(db, 'users', 'Email'), {
        name: '學',
        password: 'xuexue',
        articleId: [2266, 1234],
        trip: {
            '2023日本畢業旅行': {
                '0608': {
                    '10:00': {
                        place: '富士山河口湖',
                        address: '〒401-0301 山梨県南都留郡富士河口湖町船津3641',
                        latitudeAndLongitude: '35.5000822,138.7689502',
                        time: '10:00',
                        description: '谷哥書包要記得拿',
                    },
                    '11:00': {
                        place: '河濱公園',
                        address: '〒401-0301 山梨県南都留郡富士河口湖町船津3641',
                        latitudeAndLongitude: '35.5000822,138.7689502',
                        time: '11:00',
                        description: '谷哥書包被偷了',
                    },
                },
                '0609': {
                    '10:00': {
                        place: '富士山河口湖',
                        address: '〒401-0301 山梨県南都留郡富士河口湖町船津3641',
                        latitudeAndLongitude: '35.5000822,138.7689502',
                        time: '10:00',
                        description: '谷哥書包要記得拿',
                    },
                    '11:00': {
                        place: '河濱公園',
                        address: '〒401-0301 山梨県南都留郡富士河口湖町船津3641',
                        latitudeAndLongitude: '35.5000822,138.7689502',
                        time: '11:00',
                        description: '谷哥書包被偷了',
                    },
                },
            },
        },
        articleSaved: {
            'Fuji-San': {
                articleId: [2266, 1234],
            },
            Tokyo: {
                articleId: [2266, 1234],
            },
        },
    });

    return <div>StorageFirebase</div>;
}

// 文章收藏collection
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
