import { TestUser } from './auth';

export interface TestUserResponse {
  user: Omit<TestUser, 'password'>;
}

export interface ApiError {
  error: string;
}