export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";


//Check .env file
//    ↓
// VITE_API_BASE_URL छ?
//    ↓ yes → use that
//    ↓ no
// fallback → localhost:5000/api