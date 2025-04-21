import { API_BASE_URL } from '@/lib/config';




class OptinService {
    private baseUrl = API_BASE_URL;
    async createOptin(data: any): Promise<any> {
        try {
            const response = await fetch(`${this.baseUrl}/dashboard/create`, {
                method: 'POST',
                body: data,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create optin');
            }

            return await response.json();
        } catch (error: any) {
            throw new Error(error.message || 'An error occurred while creating optin');
        }
    }

    async getOptin(): Promise<any> {
        try {
            const response = await fetch(`${this.baseUrl}/optin/`, {
                method: 'GET',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch optin');
            }

            return await response.json();
        } catch (error: any) {
            throw new Error(error.message || 'An error occurred while fetching optin');
        }
    }

    async createExaplaination(data: any): Promise<any> {
        try {
            const response = await fetch(`${this.baseUrl}/explaination/create`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create explaination');
            }

            return await response.json();
        } catch (error: any) {
            throw new Error(error.message || 'An error occurred while creating explaination');
        }
    }


    async createStory(data: any): Promise<any> {
        try {
            const response = await fetch(`${this.baseUrl}/message/create`, {
                method:'POST',
                body:data,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create explaination');
            }

            return await response.json();
        } catch (error: any) {
            throw new Error(error.message || 'An error occurred while creating explaination');
        }


        
    }

    async createFooter(data: any): Promise<any> {
        try {
            const response = await fetch(`${this.baseUrl}/footer/create`, {
                method:'POST',
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create explaination');
            }

            return await response.json();
        } catch (error: any) {
            throw new Error(error.message || 'An error occurred while creating explaination');
        }   
    }
}

export const optinService = new OptinService();
