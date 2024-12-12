import { API_CONFIG } from '../config/api';
import { TestUserResponse } from '../types/api';

interface LoginCredentials {
  username: string;
  password: string;
}

class TestUserApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
  }

  private async request<T>(endpoint: string, options: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || 'Request failed');
    }

    return response.json();
  }

  async login(credentials: LoginCredentials): Promise<TestUserResponse> {
    return this.request<TestUserResponse>(
      API_CONFIG.ENDPOINTS.TEST_USERS.LOGIN,
      {
        method: 'POST',
        body: JSON.stringify(credentials),
      }
    );
  }

  async register(credentials: LoginCredentials): Promise<TestUserResponse> {
    return this.request<TestUserResponse>(
      API_CONFIG.ENDPOINTS.TEST_USERS.REGISTER,
      {
        method: 'POST',
        body: JSON.stringify(credentials),
      }
    );
  }
}

export const testUserApi = new TestUserApiClient();