// src/data/adminNav.js

import {
  LayoutDashboard,
  Settings,
  FileText,
} from "lucide-react";

export const adminNavItems = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },

  {
    label: "Service Config",
    path: "/admin/service-config",
    icon: Settings,
  },

  {
    label: "Service Requests",
    path: "/admin/service-requests",
    icon: FileText,
  },
];