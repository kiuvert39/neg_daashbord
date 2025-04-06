import { API_BASE_URL } from "@/lib/config";

class HomepageService {
    private baseurl = API_BASE_URL

    async createhero(data: any ): Promise<any> {
        try {
            const response = await fetch(`${this.baseurl}/homepage/create`, {
                method: 'POST',
                body: data
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch homepage');
            }

            return await response.json();
        } catch (error: any) {
            throw new Error(error.message || 'An error occurred while fetching homepage');
        }
    }

    async createFaq(data: any ): Promise<any> {
        try {
            const response = await fetch(`${this.baseurl}/faq/create`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch homepage');
            }

            return await response.json();
        } catch (error: any) {
            throw new Error(error.message || 'An error occurred while fetching homepage');
        }
    }

    async getFaq(page: number = 1, per_page: number = 10): Promise<any> {
        try {
            // Make a GET request with page and per_page parameters for pagination
            const response = await fetch(`${this.baseurl}/faq?page=${page}&per_page=${per_page}`, {
                method: 'GET', // Use GET method to fetch FAQs
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include credentials (cookies)
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch FAQs');
            }
    
            return await response.json();
        } catch (error: any) {
            throw new Error(error.message || 'An error occurred while fetching FAQs');
        }
    }
    
}

export const homepageService = new HomepageService();