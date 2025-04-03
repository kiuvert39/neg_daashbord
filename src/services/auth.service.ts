import { API_BASE_URL } from '@/lib/config';

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

class AuthService {
  private baseUrl = API_BASE_URL;

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),

    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Registration failed');
    }

    return response.json();
  }

  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include', // Include credentials (cookies)
      });

      if (!response.ok) {
        // Handle non-OK responses
        const error = await response.json();
        throw new Error(error.error || 'Login failed');
      }

      // Return the response JSON (in case you need to use it)
      return response.json();
    } catch (error: any) {
      // If the login fails or any network issue occurs, throw an error
      throw new Error(error.message || 'An error occurred during login');
    }


  }

  async logout(): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include credentials (cookies)
      });

      if (!response.ok) {
        throw new Error(`Logout failed: ${response.statusText}`);
      }

      // Return the response JSON (in case you need to use it)
      return await response.json();
    } catch (error: any) {
      // If the login fails or any network issue occurs, throw an error
      throw new Error(error.message || 'An error occurred during login');
    }}
}

export const authService = new AuthService(); 