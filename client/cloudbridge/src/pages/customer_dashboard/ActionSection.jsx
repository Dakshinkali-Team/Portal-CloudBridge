import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionCard from "./ActionCard";
import useAxios from "../../hooks/useAxios";

import Icon1 from "../../assets/quickactionicon/newservicerequest.png";
import Icon2 from "../../assets/quickactionicon/pricecalculator.png";

const ActionSection = () => {
  const navigate = useNavigate();
  const api = useAxios();
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoadingRecent, setIsLoadingRecent] = useState(true);
  const [recentError, setRecentError] = useState("");

  useEffect(() => {
    let mounted = true;

    const statusMap = {
      PENDING: { color: "#FE9A00", title: "Request submitted" },
      APPROVED: { color: "#2563EB", title: "Request approved" },
      COMPLETED: { color: "#00C950", title: "Service completed" },
      REJECTED: { color: "#EF4444", title: "Request rejected" },
    };

    const formatTimeAgo = (dateInput) => {
      const date = new Date(dateInput);
      if (Number.isNaN(date.getTime())) {
        return "Just now";
      }

      const seconds = Math.max(1, Math.floor((Date.now() - date.getTime()) / 1000));
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (seconds < 60) return "Just now";
      if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
      if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
      return `${days} day${days === 1 ? "" : "s"} ago`;
    };

    const loadRecentActivity = async () => {
      setIsLoadingRecent(true);
      setRecentError("");

      try {
        const response = await api.get("/customer/my-services", {
          params: {
            page: 1,
            limit: 5,
          },
        });

        if (!mounted) {
          return;
        }

        const requests = Array.isArray(response?.data?.data) ? response.data.data : [];

        const normalized = requests.map((request) => {
          const status = request?.status?.toUpperCase?.() ?? "";
          const mappedStatus = statusMap[status] ?? {
            color: "#64748B",
            title: "Request updated",
          };

          const firstItem = request?.items?.[0];
          const serviceName = firstItem?.service?.name;
          const sub =
            serviceName ||
            (request?.totalItems > 0
              ? `${request.totalItems} service${request.totalItems === 1 ? "" : "s"} requested`
              : `Request #${request?.id ?? "-"}`);

          return {
            id: request?.id,
            color: mappedStatus.color,
            title: mappedStatus.title,
            sub,
            time: formatTimeAgo(request?.updatedAt || request?.createdAt),
          };
        });

        setRecentActivity(normalized);
      } catch (err) {
        if (!mounted) {
          return;
        }

        setRecentError("Unable to load recent activity.");
      } finally {
        if (mounted) {
          setIsLoadingRecent(false);
        }
      }
    };

    loadRecentActivity();

    return () => {
      mounted = false;
    };
  }, [api]);

  const recentActivityItems = useMemo(() => recentActivity.slice(0, 3), [recentActivity]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">

      {/* QUICK ACTIONS */}
      <ActionCard title="Quick Actions">
        <div className="w-full flex flex-col gap-[12px]">

          <div
            onClick={() => navigate("/service-request")}
            className="w-full flex items-center gap-[12px] p-[16px] rounded-[8px] border border-[#E2E8F0] bg-[#F8FAFC] hover:shadow-sm transition cursor-pointer"
          >
            <img src={Icon1} alt="" className="w-[20px] h-[20px] flex-shrink-0" />
            <div className="min-w-0 flex flex-col">
              <p className="text-[#0F172B] font-inter font-medium text-[15px] sm:text-[16px] leading-[22px] sm:leading-[24px] break-words">
                New Service Request
              </p>
              <p className="text-[#45556C] font-inter font-normal text-[13px] sm:text-[14px] leading-[18px] sm:leading-[20px] break-words">
                Configure and request cloud services
              </p>
            </div>
          </div>
 
          <div
            onClick={() => navigate("/price-calculator")}
            className="w-full flex items-center gap-[12px] p-[16px] rounded-[8px] border border-[#E2E8F0] bg-[#F8FAFC] hover:shadow-sm transition cursor-pointer"
          >
            <img src={Icon2} alt="" className="w-[20px] h-[20px] flex-shrink-0" />
            <div className="min-w-0 flex flex-col">
              <p className="text-[#0F172B] font-inter font-medium text-[15px] sm:text-[16px] leading-[22px] sm:leading-[24px] break-words">
                Price Calculator
              </p>
              <p className="text-[#45556C] font-inter font-normal text-[13px] sm:text-[14px] leading-[18px] sm:leading-[20px] break-words">
                Estimate costs before requesting
              </p>
            </div>
          </div>

        </div>
      </ActionCard>

      {/* RECENT ACTIVITY */}
<ActionCard title="Recent Activity">
  <div className="flex flex-col gap-4 min-w-0">

    {isLoadingRecent ? (
      <p className="font-inter text-[14px] text-[#45556C] leading-5">Loading recent activity...</p>
    ) : recentError ? (
      <p className="font-inter text-[14px] text-rose-600 leading-5">{recentError}</p>
    ) : recentActivityItems.length === 0 ? (
      <p className="font-inter text-[14px] text-[#45556C] leading-5">No recent activity yet.</p>
    ) : recentActivityItems.map((item) => (
      
      <div key={item.id} className="flex items-start gap-3 min-w-0">

        {/* dot */}
        <div
          className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
          style={{ backgroundColor: item.color }}
        />

        {/* text */}
        <div className="min-w-0 flex flex-col">
          <p className="font-inter text-[14px] sm:text-[15px] font-medium text-[#0F172B] leading-5 sm:leading-6 break-words">
            {item.title}
          </p>

          <p className="font-inter text-[13px] sm:text-[14px] text-[#45556C] leading-5 break-words">
            {item.sub}
          </p>

          <p className="font-inter text-[12px] text-[#90A1B9] leading-4">
            {item.time}
          </p>
        </div>

      </div>
    ))}

  </div>
</ActionCard>

    </div>
  );
};

export default ActionSection;