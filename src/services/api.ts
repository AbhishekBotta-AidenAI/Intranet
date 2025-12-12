import axios from 'axios';
import type { AxiosInstance } from 'axios';

// Use local backend by default for development
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://intranet-service-1.onrender.com/';
// export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

export interface Document {
    id: number;
    name: string;
    description: string;
    last_updated: string;
    link: string;
    location: string;
    created_at: string;
    updated_at: string;
}

export interface DocumentCreate {
    name: string;
    description: string;
    link: string;
}

export interface DocumentUpdate {
    name?: string;
    description?: string;
    link?: string;
    last_updated?: string;
}

export interface DocumentListResponse {
    total: number;
    documents: Document[];
}

class DocumentAPI {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: API_BASE_URL,
            timeout: 40000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Add response interceptor for error handling
        this.client.interceptors.response.use(
            (response) => response,
            (error) => {
                console.error('API Error:', error.response?.data || error.message);
                return Promise.reject(error);
            }
        );
    }

    /**
     * Fetch all documents
     */
    async getDocuments(location?: string): Promise<DocumentListResponse> {
        try {
            const params = new URLSearchParams();
            if (location) {
                params.append('location', location);
            }
            const response = await this.client.get<DocumentListResponse>(`/api/documents/`, { params });
            return response.data;
        } catch (error) {
            console.error('Failed to fetch documents:', error);
            throw error;
        }
    }

    /**
     * Fetch a single document by ID
     */
    async getDocument(id: number): Promise<Document> {
        try {
            const response = await this.client.get<Document>(`/api/documents/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch document ${id}:`, error);
            throw error;
        }
    }

    /**
     * Create a new document
     */
    async createDocument(document: DocumentCreate): Promise<Document> {
        try {
            const response = await this.client.post<Document>('/api/documents', document);
            return response.data;
        } catch (error) {
            console.error('Failed to create document:', error);
            throw error;
        }
    }

    /**
     * Update an existing document
     */
    async updateDocument(id: number, updates: DocumentUpdate): Promise<Document> {
        try {
            const response = await this.client.put<Document>(`/api/documents/${id}`, updates);
            return response.data;
        } catch (error) {
            console.error(`Failed to update document ${id}:`, error);
            throw error;
        }
    }

    /**
     * Delete a document
     */
    async deleteDocument(id: number): Promise<void> {
        try {
            await this.client.delete(`/api/documents/${id}`);
        } catch (error) {
            console.error(`Failed to delete document ${id}:`, error);
            throw error;
        }
    }

    /**
     * Get the SharePoint link for a document
     */
    async getDocumentLink(id: number): Promise<string> {
        try {
            const response = await this.client.get<{ link: string }>(`/api/documents/${id}/link`);
            return response.data.link;
        } catch (error) {
            console.error(`Failed to get link for document ${id}:`, error);
            throw error;
        }
    }

    /**
     * Open document in a new tab
     */
    async viewDocument(id: number): Promise<void> {
        try {
            const link = await this.getDocumentLink(id);
            window.open(link, '_blank');
        } catch (error) {
            console.error('Failed to view document:', error);
            throw error;
        }
    }

    /**
     * Download document from SharePoint link
     */
    async downloadDocument(id: number): Promise<void> {
        try {
            const link = await this.getDocumentLink(id);
            const link_element = document.createElement('a');
            link_element.href = link;
            link_element.target = '_blank';
            link_element.download = '';
            document.body.appendChild(link_element);
            link_element.click();
            document.body.removeChild(link_element);
        } catch (error) {
            console.error('Failed to download document:', error);
            throw error;
        }
    }
}
const documentAPI = new DocumentAPI();

// Posts API
class PostsAPI {
    private client = documentAPI['client'];

    async listPosts(skip = 0, limit = 50) {
        const res = await this.client.get<{ total: number; posts: any[] }>(`/api/posts/`, { params: { skip, limit } });
        return res.data;
    }

    async getPost(id: number) {
        const res = await this.client.get(`/api/posts/${id}`);
        return res.data;
    }

    async addReaction(postId: number, user: string, reaction: string) {
        const params = new URLSearchParams({ user, reaction });
        const res = await this.client.post(`/api/posts/${postId}/reactions`, params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
        return res.data;
    }

    async addReply(postId: number, user: string, content: string) {
        // backend expects form data (user, content)
        const params = new URLSearchParams({ user, content });
        const res = await this.client.post(`/api/posts/${postId}/replies`, params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
        return res.data;
    }

    async listReplies(postId: number) {
        const res = await this.client.get<any[]>(`/api/posts/${postId}/replies`);
        return res.data;
    }

    // helper to build attachment URL
    attachmentUrl(postId: number, attId: number) {
        return `${API_BASE_URL}/api/posts/${postId}/attachments/${attId}`;
    }
}

export const postsAPI = new PostsAPI();

export default documentAPI;
