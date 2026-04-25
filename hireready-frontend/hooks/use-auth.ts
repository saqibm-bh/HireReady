import { useState } from 'react';
import { useNavigation } from '@/lib/navigation-context';
import { authService } from '@/services/auth-service';
import type { LoginRequest, UserSignupRequest, UserResponse } from '@/lib/types/auth';

export function useAuth() {
  const { login: navLogin, logout: navLogout, userData } = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (data: LoginRequest) => {
    setIsLoading(true);
    try {
      const response = await authService.login(data);
      // Update global navigation state which handles token storage and user fetching
      navLogin(response.access_token);
      return response;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: UserSignupRequest) => {
    setIsLoading(true);
    try {
      return await authService.register(data);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    navLogout();
  };

  return {
    user: userData,
    isLoading,
    login,
    register,
    logout
  };
}
