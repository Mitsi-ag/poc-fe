const API_BACKEND_URL = "http://170.64.164.95";

// Base fetch utility for all API calls
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const response = await fetch(`${API_BACKEND_URL}/api/v1/${endpoint}`, config);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  return response.json();
}

// Listings API
export const listingsAPI = {
  getListings: (params?: Record<string, string | number>) => {
    const queryString = params
      ? `?${new URLSearchParams(params as Record<string, string>).toString()}`
      : "";
    return fetchAPI(`listings${queryString}`);
  },

  getListing: (id: string) => fetchAPI(`listings/${id}`),

  createListing: (data: unknown) =>
    fetchAPI("listings", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateListing: (id: string, data: unknown) =>
    fetchAPI(`listings/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteListing: (id: string) =>
    fetchAPI(`listings/${id}`, {
      method: "DELETE",
    }),
};

// Agents API
export const agentsAPI = {
  getAgents: (params?: Record<string, string | number>) => {
    const queryString = params
      ? `?${new URLSearchParams(params as Record<string, string>).toString()}`
      : "";
    return fetchAPI(`agents${queryString}`);
  },

  getAgent: (id: string) => fetchAPI(`agents/${id}`),
};

// Agencies API
export const agenciesAPI = {
  getAgencies: (params?: Record<string, string | number>) => {
    const queryString = params
      ? `?${new URLSearchParams(params as Record<string, string>).toString()}`
      : "";
    return fetchAPI(`agencies${queryString}`);
  },

  getAgency: (id: string) => fetchAPI(`agencies/${id}`),
};

// Users API
export const usersAPI = {
  getUsers: (params?: Record<string, string | number>) => {
    const queryString = params
      ? `?${new URLSearchParams(params as Record<string, string>).toString()}`
      : "";
    return fetchAPI(`users${queryString}`);
  },

  getUser: (id: string) => fetchAPI(`users/${id}`),

  updateUser: (id: string, data: unknown) =>
    fetchAPI(`users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};

// Calendar API
export const calendarAPI = {
  getEvents: (params?: Record<string, string | number>) => {
    const queryString = params
      ? `?${new URLSearchParams(params as Record<string, string>).toString()}`
      : "";
    return fetchAPI(`calendar${queryString}`);
  },

  getEvent: (id: string) => fetchAPI(`calendar/${id}`),

  createEvent: (data: unknown) =>
    fetchAPI("calendar", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateEvent: (id: string, data: unknown) =>
    fetchAPI(`calendar/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteEvent: (id: string) =>
    fetchAPI(`calendar/${id}`, {
      method: "DELETE",
    }),
};

// Contacts API
export const contactsAPI = {
  getContacts: (params?: Record<string, string | number>) => {
    const queryString = params
      ? `?${new URLSearchParams(params as Record<string, string>).toString()}`
      : "";
    return fetchAPI(`contacts${queryString}`);
  },

  getContact: (id: string) => fetchAPI(`contacts/${id}`),

  createContact: (data: unknown) =>
    fetchAPI("contacts", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateContact: (id: string, data: unknown) =>
    fetchAPI(`contacts/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteContact: (id: string) =>
    fetchAPI(`contacts/${id}`, {
      method: "DELETE",
    }),
};

// Competitors API
export const competitorsAPI = {
  getCompetitors: (params?: Record<string, string | number>) => {
    const queryString = params
      ? `?${new URLSearchParams(params as Record<string, string>).toString()}`
      : "";
    return fetchAPI(`competitors${queryString}`);
  },

  getCompetitor: (id: string) => fetchAPI(`competitors/${id}`),
};
