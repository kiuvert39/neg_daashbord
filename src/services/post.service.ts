import { API_BASE_URL } from "@/lib/config";


interface BlogPost {
    title: string;
    description: string
    subject: string
    solution: string
    image: File
    message: string
}

class BlogPostService {

    private baseurl = API_BASE_URL

    async createPost(data: BlogPost): Promise<any> {
        try {
            const formData = new FormData()

            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('subject', data.subject);
            formData.append('solution', data.solution);
            formData.append('image', data.image);


            const response = await fetch(`${this.baseurl}/post/create`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create post');
            }

            return await response.json();
        } catch (error: any) {
            throw new Error(error.message || 'An error occurred while creating the post');
        }
    }


    async getPosts(): Promise<any> {
        try {
            const response = await fetch(`${this.baseurl}/post/`, {
                method: 'GET',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch posts');
            }

            return await response.json();
        } catch (error: any) {
            throw new Error(error.message || 'An error occurred while fetching posts');
        }
    }


    async getProject(): Promise<any>{
        try {

            const response = await fetch(`${API_BASE_URL}/project/`, {
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
}

export const blogPostService = new BlogPostService(); 