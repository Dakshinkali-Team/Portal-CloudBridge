// import ServiceIcon from "../../common/ServiceIcon";
// import databaseIcon from "../../../assets/icon-database.png";

// const EmptyState = ({ activeFilter }) => {
//   return (
//     <div className="flex flex-col items-center justify-center py-24 text-center">
//       {/* Scale and Opacity create that 'ghost' icon look from Figma */}
//       <div className="opacity-20 mb-6 scale-150">
//         <ServiceIcon src={databaseIcon} />
//       </div>
//       <h3 className="text-xl font-bold text-slate-800">No services found</h3>
//       <p className="text-gray-400 mt-2 max-w-xs">
//         No services match the <strong>{activeFilter}</strong> filter
//       </p>
//     </div>
//   );
// };

// export default EmptyState;


// // const EmptyState = ({ activeFilter }) => {
// //   return (
// //     <div className="flex flex-col items-center justify-center py-24 text-center">
// //       <img
// //         src="/assets/icon-database.png"
// //         alt=""
// //         className="w-12 h-12 opacity-40 mb-4"
// //       />

// //       <h3 className="text-lg font-semibold text-gray-900">
// //         No services found
// //       </h3>

// //       <p className="text-gray-500 mt-2 text-sm">
// //         No services match {activeFilter}
// //       </p>
// //     </div>
// //   );
// // };

// // export default EmptyState;


import databaseIcon from "../../../assets/icon-database.png";

const EmptyState = ({ activeFilter }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {/* Real icon without ghost/opacity effects */}
      <div className="mb-6">
        <img 
          src={databaseIcon} 
          alt="Database Icon" 
          className="w-13 h-13 object-contain" 
        />
      </div>
      
      <h3 className="text-xl font-bold text-slate-800">No services found</h3>
      
      <p className="text-gray-400 mt-2 max-w-xs">
        No services match the <strong>{activeFilter}</strong> filter
      </p>
    </div>
  );
};

export default EmptyState;