export const Config = {
  API_URL: process.env.NEXT_PUBLIC_DOMAIN!,

  CONNECT_SERVER: {
    USER: process.env.NEXT_PUBLIC_USER!,
    PROFILE: process.env.NEXT_PUBLIC_PROFILE!,
  },

  SERVICES: {
    AUTH: {
      SIGNOUT: "/signout",
      SIGNUP: "/signup",
      SIGNIN: "/signin",
      GOOGLE: "/signin/google",
      GOOGLE_VERIFY: "/signin/google/verify",
      SESSION: "/session",
      ALL_LIMIT: "/users?limit=",
      IMAGES: "/images?query=",
    },
    USER: {
      ALL: "/api/user",
      LIST: "/api/user/",
    },
    PROFILE: {
      ALL: "/api/profile",
      LIST: "/api/profile/",
      UPLOAD: "/api/profile/upload",
      REMOVE_UPLOAD: "/api/profile/remove",
    },
  },
};
