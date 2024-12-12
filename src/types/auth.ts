export interface TestUser {
    id: string;
    username: string;
    password: string;
  }
  
  export interface TestUserState {
    user: TestUser | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    register: (username: string, password: string) => Promise<void>;
  }