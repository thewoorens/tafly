// src/services/apiClient.js

class ApiClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    /**
     * GET isteği için esnek bir metod.
     * @param {string} endpoint - API endpoint'i (örneğin: '/posts')
     * @param {Object} [params={}] - İsteğe bağlı query parametreleri (örneğin: { ownerId: 123 })
     * @returns {Promise<Object>} - API'den gelen yanıt
     */
    async get(endpoint, params = {}) {
        const queryString = Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            .join('&');

        const url = `${this.baseUrl}/api/get${endpoint}${queryString ? `?${queryString}` : ''}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("API-CLIENT | GET " + response.status)
        return await response.json();
    }

    /**
     * POST isteği için esnek bir metod.
     * @param {string} endpoint - API endpoint'i (örneğin: '/posts')
     * @param {Object} data - Gönderilecek veri
     * @param {Object} [headers={}] - İsteğe bağlı özel headers
     * @returns {Promise<Object>} - API'den gelen yanıt
     */
    async post(endpoint, data, headers = {}) {
        const isFormData = data instanceof FormData;

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                ...(!isFormData && { 'Content-Type': 'application/json' }), // FormData ise Content-Type ekleme
                ...headers
            },
            body: isFormData ? data : JSON.stringify(data), // FormData ise direkt gönder, değilse JSON'a çevir
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log("API-CLIENT | POST " + response.status);

        return await response.json();
    }


    /**
     * PUT isteği için esnek bir metod.
     * @param {string} endpoint - API endpoint'i (örneğin: '/posts/1')
     * @param {Object} data - Güncellenecek veri
     * @param {Object} [headers={}] - İsteğe bağlı özel headers
     * @returns {Promise<Object>} - API'den gelen yanıt
     */
    async put(endpoint, data, headers = {}) {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...headers // İsteğe bağlı headers'ları ekleyin
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    /**
     * DELETE isteği için esnek bir metod.
     * @param {string} endpoint - API endpoint'i (örneğin: '/posts/1')
     * @param params
     * @param {Object} [headers={}] - İsteğe bağlı özel headers
     * @returns {Promise<Object>} - API'den gelen yanıt
     */
    async delete(endpoint, params = {}, headers = {}) {
        const queryString = Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            .join('&');

        const url = `${this.baseUrl}/api/delete${endpoint}${queryString ? `?${queryString}` : ''}`;

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log("API-CLIENT | DELETE " + response.status);

        return await response.json();
    }



}

const apiClient = new ApiClient('http://localhost:3000');

export default apiClient;