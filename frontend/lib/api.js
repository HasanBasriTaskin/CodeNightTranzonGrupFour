const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5247/api';

// Mock data for development when backend is not available
const MOCK_USER_SUMMARY = {
  totalGCo2: 1250,
  dailyAverage: 178,
  weeklyAverage: 1246,
  weeklyGoalG: 500,
  goalProgress: 75,
  ecoLevel: 'Silver',
  recommendations: [
    'Toplu taşıma kullanımınızı artırın',
    'Enerji tasarruflu ampuller kullanın',
    'Kısa mesafeler için yürüyüş tercih edin'
  ]
};

const MOCK_LEADERBOARD = {
  teams: [
    { name: 'Yeşil Takım', members: 5, avgGCo2: 450, rank: 1 },
    { name: 'Eko Warriors', members: 4, avgGCo2: 520, rank: 2 },
    { name: 'Carbon Fighters', members: 6, avgGCo2: 580, rank: 3 },
    { name: 'Green Heroes', members: 3, avgGCo2: 620, rank: 4 },
  ]
};

// Get mock users from localStorage
const getMockUsers = () => {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('mock_users') || '[]');
  } catch {
    return [];
  }
};

// Save mock users to localStorage
const saveMockUsers = (users) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('mock_users', JSON.stringify(users));
    } catch (error) {
      console.error('Failed to save mock users:', error);
    }
  }
};

// Generate mock token
const generateMockToken = () => {
  return 'mock_token_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Helper function to check if error is connection refused
const isConnectionError = (error) => {
  return error?.message?.includes('fetch') || 
         error?.message?.includes('ERR_CONNECTION_REFUSED') ||
         error?.message?.includes('Failed to fetch') ||
         error?.code === 'ECONNREFUSED';
};

export const api = {
  async getUserSummary(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/summary`);
      if (!response.ok) throw new Error('Failed to fetch user summary');
      return response.json();
    } catch (error) {
      if (isConnectionError(error)) {
        console.warn('Backend bağlantı hatası, mock data kullanılıyor:', error.message);
        return MOCK_USER_SUMMARY;
      }
      throw error;
    }
  },

  async setWeeklyGoal(userId, weeklyGoalG) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/goal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weeklyGoalG }),
      });
      if (!response.ok) throw new Error('Failed to set weekly goal');
      return response.json();
    } catch (error) {
      if (isConnectionError(error)) {
        console.warn('Backend bağlantı hatası, mock response döndürülüyor:', error.message);
        return { success: true, weeklyGoalG };
      }
      throw error;
    }
  },

  async redeemTokens(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/redeem`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to redeem tokens');
      return response.json();
    } catch (error) {
      if (isConnectionError(error)) {
        console.warn('Backend bağlantı hatası, mock response döndürülüyor:', error.message);
        // Check if goal is completed by fetching user summary
        try {
          const summary = await this.getUserSummary(userId);
          if (summary.goalProgress >= 100) {
            return { tokens: 10, message: 'Jeton başarıyla alındı' };
          } else {
            return { tokens: 0, message: 'Hedefinize henüz ulaşmadınız' };
          }
        } catch {
          return { tokens: 0, message: 'Hedefinize henüz ulaşmadınız' };
        }
      }
      throw error;
    }
  },

  async getLeaderboard() {
    try {
      const response = await fetch(`${API_BASE_URL}/groups/leaderboard`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch leaderboard: ${response.status} ${response.statusText}${errorText ? ` - ${errorText}` : ''}`);
      }
      return response.json();
    } catch (error) {
      if (isConnectionError(error)) {
        console.warn('Backend bağlantı hatası, mock data kullanılıyor:', error.message);
        return MOCK_LEADERBOARD;
      }
      throw error;
    }
  },

  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || 'Giriş başarısız');
      }
      return response.json();
    } catch (error) {
      if (isConnectionError(error)) {
        console.warn('Backend bağlantı hatası, mock login kullanılıyor:', error.message);
        // Mock login logic
        const users = getMockUsers();
        const user = users.find(u => u.email === email && u.password === password);
        
        if (!user) {
          throw new Error('E-posta veya şifre hatalı');
        }

        const token = generateMockToken();
        const userData = {
          token,
          user: {
            id: user.id,
            email: user.email,
            name: user.name || email.split('@')[0],
          }
        };

        // Save token to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_token', token);
          localStorage.setItem('user_data', JSON.stringify(userData.user));
        }

        return userData;
      }
      throw error;
    }
  },

  async register(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || 'Kayıt başarısız');
      }
      return response.json();
    } catch (error) {
      if (isConnectionError(error)) {
        console.warn('Backend bağlantı hatası, mock register kullanılıyor:', error.message);
        // Mock register logic
        const users = getMockUsers();
        
        // Check if user already exists
        if (users.find(u => u.email === email)) {
          throw new Error('Bu e-posta adresi zaten kayıtlı');
        }

        // Create new user
        const newUser = {
          id: users.length + 1,
          email,
          password, // In real app, this should be hashed
          name: email.split('@')[0],
          createdAt: new Date().toISOString(),
        };

        users.push(newUser);
        saveMockUsers(users);

        const token = generateMockToken();
        const userData = {
          token,
          user: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
          }
        };

        // Save token to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_token', token);
          localStorage.setItem('user_data', JSON.stringify(userData.user));
        }

        return userData;
      }
      throw error;
    }
  },

  async getUserData(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/data`);
      if (!response.ok) throw new Error('Failed to fetch user data');
      return response.json();
    } catch (error) {
      if (isConnectionError(error)) {
        console.warn('Backend bağlantı hatası, mock user data kullanılıyor:', error.message);
        // Mock user data with internet_gb and other fields
        return {
          internet_gb: 15,
          electricity_kwh: 120,
          transportation_km: 50,
          water_liters: 200,
          // Add other fields as needed
        };
      }
      throw error;
    }
  },
};

