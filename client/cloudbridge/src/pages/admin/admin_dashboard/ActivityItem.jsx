import React from "react";

// SVGs (used as images - Vite safe)
import AlertCircle1Icon from "../../../assets/alertcircleicon/alertcircle1.svg";
import AlertCircle2Icon from "../../../assets/alertcircleicon/alertcircle2.svg";
import AlertCircle3Icon from "../../../assets/alertcircleicon/alertcircle3.svg";

/* -----------------------------
   STATUS STYLES (REQUEST TYPE)
------------------------------ */
const statusStyles = {
  pending: {
    bg: "bg-[#FFFBEB]",
    text: "text-[#BB4D00]",
  },
  approved: {
    bg: "bg-[#EFF6FF]",
    text: "text-[#1447E6]",
  },
  deployed: {
    bg: "bg-[#F0FDF4]",
    text: "text-[#008236]",
  },
};

/* -----------------------------
   ALERT ICONS (SAFE SVG USAGE)
------------------------------ */
const alertIcons = {
  warning: (
    <img src={AlertCircle2Icon} alt="warning" className="w-5 h-5" />
  ),
  info: (
    <img src={AlertCircle1Icon} alt="info" className="w-5 h-5" />
  ),
  success: (
    <img src={AlertCircle3Icon} alt="success" className="w-5 h-5" />
  ),
};

const ActivityItem = ({
  type = "request", // "request" | "alert"
  company,
  service,
  message,
  time,
  status,
  alertType,
}) => {
  // safe fallback
  const currentStatus = statusStyles[status] || statusStyles.pending;

  return (
    <div className="w-full flex items-center justify-between gap-4 p-4 border border-[#E2E8F0] rounded-lg bg-white">

      {/* LEFT SIDE */}
      <div className="flex items-start gap-3 min-w-0">

        {/* ALERT ICON */}
        {type === "alert" && (
          <div className="mt-1 flex-shrink-0">
            {alertIcons[alertType] || alertIcons.warning}
          </div>
        )}

        {/* TEXT BLOCK */}
        <div className="flex flex-col gap-1 min-w-0">

          {/* REQUEST CONTENT */}
          {type === "request" && (
            <>
              <h3 className="text-[16px] font-medium text-[#0F172B] font-[Work Sans] truncate">
                {company}
              </h3>

              <p className="text-[14px] text-[#45556C] font-[Work Sans] truncate">
                {service}
              </p>
            </>
          )}

          {/* ALERT CONTENT */}
          {type === "alert" && (
            <p className="text-[14px] text-[#0F172B] font-[Work Sans]">
              {message}
            </p>
          )}

          {/* TIME */}
          <span className="text-[12px] text-[#90A1B9] font-[Work Sans]">
            {time}
          </span>
        </div>
      </div>

      {/* RIGHT SIDE (ONLY REQUEST) */}
      {type === "request" && (
        <div
          className={`px-3 py-1 rounded-full flex-shrink-0 whitespace-nowrap ${currentStatus.bg}`}
        >
          <span
            className={`text-[12px] font-medium ${currentStatus.text} font-[Work Sans]`}
          >
            {status}
          </span>
        </div>
      )}
    </div>
  );
};

export default ActivityItem;