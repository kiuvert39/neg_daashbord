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
}

export const homepageService = new HomepageService();