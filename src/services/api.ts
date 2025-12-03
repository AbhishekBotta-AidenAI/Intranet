import axios from 'axios';
import type { AxiosInstance } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://intranet-mb42.vercel.app';

export interface Document {
    id: number;
    name: string;
    description: string;
    last_updated: string;
    link: string;
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
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
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
    async getDocuments(): Promise<DocumentListResponse> {
        try {
            const response = await this.client.get<DocumentListResponse>('/api/documents/');
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

export default new DocumentAPI();
