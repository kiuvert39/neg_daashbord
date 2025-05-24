import { API_BASE_URL } from "@/lib/config";
import toast from "react-hot-toast";
import { json } from "stream/consumers";

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
            const response = await fetch(`${this.baseurl}/faq/?page=${page}&per_page=${per_page}`, {
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

    async getFaqById(id: string): Promise<any> {
        try {
            const response = await fetch(`${this.baseurl}/faq/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include credentials (cookies)
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch FAQ');
            }
    
            return await response.json();
        } catch (error: any) {
            throw new Error(error.message || 'An error occurred while fetching FAQ');
        }
    }


    async updateFaq(id: string, data: any): Promise<any> {


        try {
            const  response = await fetch(`${this.baseurl}/faq/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), 
                credentials: 'include', // Include credentials (cookies)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch FAQ');
            }
            
            return await response.json();
        }
        catch (error: any ){
            throw new Error(error.message || 'An error occurred while fetching FAQ');

        }
    }


    async deleteFaq(id: string): Promise<any> {
        try {
            const  response = await fetch(`${this.baseurl}/faq/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include credentials (cookies)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch FAQ');
            }
            
            return await response.json();
        }
        catch (error: any ){
            throw new Error(error.message || 'An error occurred while fetching FAQ');

        }
    }

    async createCaseStudy(data: any): Promise<any>{
        try {

            const formData = new FormData()

            formData.append('title', data.title);
            formData.append('content', data.content);
            formData.append('image', data.image);


            const response = await fetch(`${this.baseurl}/case_study/create`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch homepage');
            }

            toast.success('case study created successfully!');

            return await response.json();
        } catch (error: any) {
            throw new Error(error.message || 'An error occurred while fetching homepage');
        }
    }


    async getLastestCaseStudy():Promise<any>{
        try {

            const response = await fetch(`${this.baseurl}/case_study/`, {
                method: 'GET',
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

    async getProject(): Promise<any>{
        try {

            const response = await fetch(`${this.baseurl}/project/`, {
                method: 'GET',
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

    async createProject(data:any) : Promise<any>{
        try {
          const response = await fetch(`${this.baseurl}/project/create`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to fetch homepage");
          }

          return await response.json();
        } catch (error: any) {
          throw new Error(
            error.message || "An error occurred while fetching homepage"
          );
        }
    }
    async createConcept(data: any): Promise<any> {
        try {
          const response = await fetch(`${this.baseurl}/concept/create`, {
            method: 'POST',
            body: data,
          });
      
          console.log('Response Status:', response.status); // Log the status
          const responseData = await response.json();
          console.log('Response Data:', responseData); // Log the response body
      
          if (!response.ok) {
            throw new Error(responseData.error || 'Failed to fetch homepage');
          }
      
          return responseData; // Return the response data if everything is fine
        } catch (error: any) {
          throw new Error(error.message || 'An error occurred while fetching homepage');
        }
      }

    async createDes(data: any): Promise<any>{

        try {
            const response = await fetch(`${this.baseurl}/description/create`, {
              method: 'POST',
              body: JSON.stringify(data),
              headers: {
                'Content-Type': 'application/json',
            },
            });

            const responseData = await response.json();
        
            if (!response.ok) {
              throw new Error(responseData.error || 'Failed to fetch homepage');
            }
        
            return responseData; // Return the response data if everything is fine
          } catch (error: any) {
            throw new Error(error.message || 'An error occurred while fetching homepage');
          }

    }
      
    
}

export const homepageService = new HomepageService();