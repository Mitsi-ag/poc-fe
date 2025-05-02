export interface User {
  id: string;
  name: string;
  email: string;
  role: "agent" | "admin" | "manager";
  agentId?: string;
  agencyId: string;
  avatar?: string;
  phone?: string;
  created: string;
  lastLogin: string;
  preferences: {
    darkMode: boolean;
    emailNotifications: boolean;
    pushNotifications: boolean;
    defaultDashboard: "overview" | "listings" | "leads" | "calendar";
    defaultListingView: "grid" | "list" | "map";
  };
  subscription: {
    plan: "free" | "pro" | "team" | "enterprise";
    status: "active" | "trialing" | "expired" | "canceled";
    expiresAt: string;
  };
}

export const users: User[] = [
  {
    id: "u-001",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "agent",
    agentId: "a-001",
    agencyId: "ag-001",
    avatar: "/confident-agent.png",
    phone: "0421 123 456",
    created: "2022-06-15T00:00:00Z",
    lastLogin: "2023-12-06T09:23:18Z",
    preferences: {
      darkMode: false,
      emailNotifications: true,
      pushNotifications: true,
      defaultDashboard: "overview",
      defaultListingView: "grid",
    },
    subscription: {
      plan: "pro",
      status: "active",
      expiresAt: "2024-06-15T00:00:00Z",
    },
  },
  {
    id: "u-002",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    role: "admin",
    agentId: "a-002",
    agencyId: "ag-001",
    avatar: "/confident-urban-professional.png",
    phone: "0422 234 567",
    created: "2021-03-10T00:00:00Z",
    lastLogin: "2023-12-07T13:45:22Z",
    preferences: {
      darkMode: true,
      emailNotifications: true,
      pushNotifications: false,
      defaultDashboard: "leads",
      defaultListingView: "map",
    },
    subscription: {
      plan: "team",
      status: "active",
      expiresAt: "2024-03-10T00:00:00Z",
    },
  },
  {
    id: "u-003",
    name: "Jessica Smith",
    email: "jessica.smith@example.com",
    role: "agent",
    agentId: "a-003",
    agencyId: "ag-002",
    avatar: "/confident-city-woman.png",
    phone: "0423 345 678",
    created: "2022-09-22T00:00:00Z",
    lastLogin: "2023-12-05T16:12:38Z",
    preferences: {
      darkMode: false,
      emailNotifications: true,
      pushNotifications: true,
      defaultDashboard: "calendar",
      defaultListingView: "grid",
    },
    subscription: {
      plan: "pro",
      status: "active",
      expiresAt: "2024-09-22T00:00:00Z",
    },
  },
  {
    id: "u-004",
    name: "David Wilson",
    email: "david.wilson@example.com",
    role: "manager",
    agentId: "a-004",
    agencyId: "ag-002",
    avatar: "/thoughtful-urbanite.png",
    phone: "0424 456 789",
    created: "2021-11-05T00:00:00Z",
    lastLogin: "2023-12-07T08:37:14Z",
    preferences: {
      darkMode: true,
      emailNotifications: false,
      pushNotifications: false,
      defaultDashboard: "listings",
      defaultListingView: "list",
    },
    subscription: {
      plan: "team",
      status: "active",
      expiresAt: "2024-05-05T00:00:00Z",
    },
  },
  {
    id: "u-005",
    name: "Emma Taylor",
    email: "emma.taylor@example.com",
    role: "agent",
    agentId: "a-005",
    agencyId: "ag-003",
    avatar: "/serene-portrait.png",
    phone: "0425 567 890",
    created: "2023-01-18T00:00:00Z",
    lastLogin: "2023-12-06T14:02:45Z",
    preferences: {
      darkMode: false,
      emailNotifications: true,
      pushNotifications: true,
      defaultDashboard: "overview",
      defaultListingView: "grid",
    },
    subscription: {
      plan: "pro",
      status: "trialing",
      expiresAt: "2024-01-18T00:00:00Z",
    },
  },
];
