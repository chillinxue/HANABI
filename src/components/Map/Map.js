// import React from 'react';
// import styled from 'styled-components';
// import React, { useState, useEffect, useRef } from 'react';

// const Wrapper = styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     margin: 50px 100px;
//     margin-bottom: 150px;
// `;
// const GoogleMap = styled.div`
//     display: flex;
//     gap: 50px;
//     width: 100%;
//     margin-top: 60px;
// `;
// export default function Map() {
//     const [loaded, error] = useScript(
//         'https://maps.googleapis.com/maps/api/js?key=AIzaSyCszxEdzSyD5fLI9-m_nRiUr6GEbeIfTG4&libraries=places&callback=initMap'
//     ); //憑證
//     const [map, setDataMap] = useState();

//     function useScript(src) {
//         // Keeping track of script loaded and error state   //load SDK 初始資料 （收）
//         const [map, setDataMap] = useState();
//         const [state, setState] = useState({
//             loaded: false,
//             error: false,
//         });

//         useEffect(() => {
//             if (cachedScripts.includes(src)) {
//                 setState({
//                     loaded: true,

//                     error: false,
//                 });
//             } else {
//                 cachedScripts.push(src);
//                 let script = document.createElement('script');
//                 script.src = src;
//                 script.async = true;
//                 const onScriptLoad = () => {
//                     setState({
//                         loaded: true,
//                         error: false,
//                     });
//                 };

//                 const onScriptError = () => {
//                     const index = cachedScripts.indexOf(src);
//                     if (index >= 0) cachedScripts.splice(index, 1);
//                     script.remove();
//                     setState({
//                         loaded: true,
//                         error: true,
//                     });
//                 };
//                 script.addEventListener('load', onScriptLoad);
//                 script.addEventListener('error', onScriptError);
//                 document.body.appendChild(script);
//                 return () => {
//                     script.removeEventListener('load', onScriptLoad);
//                     script.removeEventListener('error', onScriptError);
//                 };
//             }
//         }, [src]);
//         return [state.loaded, state.error];
//     }

//     return <div>Map</div>;
// }
