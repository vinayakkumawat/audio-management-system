export const API_CONFIG = {
    BASE_URL: 'http://localhost:3001',
    ENDPOINTS: {
      TEST_USERS: {
        LOGIN: '/test-users/login',
        REGISTER: '/test-users/register',
      },
    },
  } as const;