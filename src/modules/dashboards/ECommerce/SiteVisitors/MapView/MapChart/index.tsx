// import React, { memo } from 'react';
// import {
//   ComposableMap,
//   Geographies,
//   Geography,
//   ZoomableGroup,
// } from 'react-simple-maps';
//
// const geoUrl =
//   'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json';
//
// const rounded = (num: number) => {
//   if (num > 1000000000) {
//     return Math.round(num / 100000000) / 10 + 'Bn';
//   } else if (num > 1000000) {
//     return Math.round(num / 100000) / 10 + 'M';
//   } else {
//     return Math.round(num / 100) / 10 + 'K';
//   }
// };
//
// type GeographiesType = {
//   geographies: {
//     rsmKey: number;
//     properties: {
//       NAME: string;
//       POP_EST: number;
//     };
//   }[];
// };
//
// const MapChart = () => {
//   return (
//     <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
//       <ZoomableGroup>
//         <Geographies geography={geoUrl}>
//           {({ geographies }: GeographiesType) =>
//             geographies.map((geo) => (
//               <Geography
//                 key={geo.rsmKey}
//                 geography={geo}
//                 style={{
//                   default: {
//                     fill: '#2a334d',
//                     outline: 'none',
//                   },
//                   hover: {
//                     fill: '#0A8FDC',
//                     outline: 'none',
//                   },
//                   pressed: {
//                     fill: '#0A8FDC',
//                     outline: 'none',
//                   },
//                 }}
//               />
//             ))
//           }
//         </Geographies>
//       </ZoomableGroup>
//     </ComposableMap>
//   );
// };
//
// export default memo(MapChart);
