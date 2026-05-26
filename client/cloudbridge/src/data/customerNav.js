// src/data/customerNav.js

import {
  LayoutDashboard,
  ClipboardList,
  Calculator,
  Server,
  User,
} from "lucide-react";

export const customerNavItems = [
  { label: "Dashboard",        path: "/dashboard",        icon: LayoutDashboard },
  { label: "Service Request",  path: "/service-request",  icon: ClipboardList   },
  { label: "Price Calculator", path: "/price-calculator", icon: Calculator      },
  { label: "My Services",      path: "/my-services",      icon: Server          },
  { label: "Profile",          path: "/profile",          icon: User            },
];