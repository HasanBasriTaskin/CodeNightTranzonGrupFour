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
        return { tokens: 0, message: 'Backend bağlantısı yok, mock response' };
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
};

