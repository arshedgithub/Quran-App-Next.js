const axios = require('axios');

export async function getAccessToken(): Promise<string> {
    const clientId = process.env.TEST_CLIENT_ID;
    const clientSecret = process.env.TEST_CLIENT_SECRET;
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    try {
        const response = await axios({
            method: 'post',
            url: 'https://prelive-oauth2.quran.foundation/oauth2/token',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: 'grant_type=client_credentials&scope=content'
        });
        return response.data.access_token;

    } catch (error) {
        console.error('Error getting access token:', error);
        return "";
    }
}
