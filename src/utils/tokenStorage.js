// Token storage utility to handle both localStorage and cookies
class TokenStorage {
    static setTokens(accessToken, refreshToken) {
        try {
            if (accessToken) {
                localStorage.setItem('accessToken', accessToken);
            }
            if (refreshToken) {
                localStorage.setItem('refreshToken', refreshToken);
            }
        } catch (error) {
            console.error('Error storing tokens:', error);
        }
    }

    static getAccessToken() {
        try {
            return localStorage.getItem('accessToken');
        } catch (error) {
            console.error('Error getting access token:', error);
            return null;
        }
    }

    static getRefreshToken() {
        try {
            return localStorage.getItem('refreshToken');
        } catch (error) {
            console.error('Error getting refresh token:', error);
            return null;
        }
    }

    static clearTokens() {
        try {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        } catch (error) {
            console.error('Error clearing tokens:', error);
        }
    }

    static hasValidTokens() {
        const accessToken = this.getAccessToken();
        const refreshToken = this.getRefreshToken();
        return !!(accessToken && refreshToken);
    }
}

export default TokenStorage;
