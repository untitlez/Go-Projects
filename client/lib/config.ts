export const Config = {
  API_URL: process.env.NEXT_PUBLIC_DOMAIN!,

  API_URL_SERVICES: {
    USER: process.env.NEXT_PUBLIC_USER!,
    PROFILE: process.env.NEXT_PUBLIC_PROFILE!,
  },

  SERVICES: {
    AUTH: {
      SIGNUP: "/signup",
      SIGNIN: "/signin",
      SIGNOUT: "/signout",
      SESSION: "/session",
      ALL_LIMIT: "/users?limit=",
    },
    USER: {
      ALL_LIMIT: "/api/user?limit=",
      ALL: "/api/user",
      LIST: "/api/user/",
    },
    PROFILE: {
      ALL_LIMIT: "/api/profile?limit=",
      ALL: "/api/profile",
      LIST: "/api/profile/",
      UPLOAD: "/api/profile/upload",
      REMOVE_UPLOAD: "/api/profile/remove",
    },
  },
};
