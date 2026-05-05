import React from 'react';
import Input from '../common/Input'; 

const ProfileInput = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative w-full">
      {/* 1. Icon positioning */}
      {Icon && (
        <div className="absolute top-[38px] left-3.5 flex items-center pointer-events-none text-gray-400 z-10">
          <Icon size={18} strokeWidth={1.5} />
        </div>
      )}

      {/* 2. Base Input with forced Padding Left */}
      <Input 
        {...props} 
        // 'pl-10' (40px) ले placeholder लाई icon भन्दा पर धकेल्छ
        className={`w-full bg-[#F9FAFB] border-gray-200 rounded-lg py-2.5 text-sm transition-all duration-200 
          ${Icon ? '!pl-10' : ''} ${props.className || ''} 
          focus:ring-2 focus:ring-blue-100 focus:border-blue-400`} 
      />
    </div>
  );
};

export default ProfileInput;