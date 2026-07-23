import React, { useEffect, useMemo, useState } from "react";
import StatusCard from "./StatusCard";
import useAxios from "../../hooks/useAxios";

import Icon1 from "../../assets/dashboardcardicon/active.png";
import Icon2 from "../../assets/dashboardcardicon/pending.png";
import Icon3 from "../../assets/dashboardcardicon/completed.png";
import ActionIcon from "../../assets/dashboardcardicon/arrow.png";

const StatusCardSection = () => {
  const api = useAxios();
  const [counts, setCounts] = useState({
    activeServices: 0,
    pendingRequests: 0,
    completed: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const getStatusCount = async (status) => {
      const response = await api.get("/customer/my-services", {
        params: {
          status,
          page: 1,
          limit: 1,
        },
      });

      return (
        response?.data?.pagination?.total ??
        (Array.isArray(response?.data?.data) ? response.data.data.length : 0)
      );
    };

    const loadCounts = async () => {
      setLoading(true);
      setError("");

      try {
        const [activeServices, pendingRequests, completed] = await Promise.all([
          getStatusCount("APPROVED"),
          getStatusCount("PENDING"),
          getStatusCount("COMPLETED"),
        ]);

        if (!mounted) {
          return;
        }

        setCounts({ activeServices, pendingRequests, completed });
      } catch (err) {
        if (!mounted) {
          return;
        }

        setError("Unable to load dashboard stats.");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadCounts();

    return () => {
      mounted = false;
    };
  }, [api]);

  const displayValues = useMemo(() => {
    if (loading) {
      return {
        activeServices: "...",
        pendingRequests: "...",
        completed: "...",
      };
    }

    return {
      activeServices: String(counts.activeServices),
      pendingRequests: String(counts.pendingRequests),
      completed: String(counts.completed),
    };
  }, [counts, loading]);

  return (
    <>
      {error ? (
        <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      <div className="flex gap-6 w-full">
        <StatusCard
          icon={Icon1}
          value={displayValues.activeServices}
          label="Active Services"
          bgColor="#F4F8FF"
          actionIcon={ActionIcon}
        />
        <StatusCard
          icon={Icon2}
          value={displayValues.pendingRequests}
          label="Pending Requests"
          bgColor="#FFFCE8"
          actionIcon={ActionIcon}
        />
        <StatusCard
          icon={Icon3}
          value={displayValues.completed}
          label="Completed"
          bgColor="#F0FDF4"
          actionIcon={ActionIcon}
        />
      </div>
    </>
  );
};

export default StatusCardSection;