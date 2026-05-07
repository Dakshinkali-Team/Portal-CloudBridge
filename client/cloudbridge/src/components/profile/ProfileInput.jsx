import React from 'react';

const ProfileInput = ({ label, placeholder, icon: Icon }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] font-semibold text-slate-500 ml-0.5">
        {label}
      </label>

      <div className="flex items-center gap-3 px-3 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-lg focus-within:border-blue-400 transition-all">
        <Icon size={16} className="text-slate-400" />

        <input
          type="text"
          placeholder={placeholder}
          className="bg-transparent w-full text-[13px] outline-none text-slate-700 placeholder:text-slate-500"
        />
      </div>
    </div>
  );
};

export default ProfileInput;