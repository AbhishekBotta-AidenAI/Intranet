import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useMemo, useState, useEffect } from 'react';
import { Eye, Download, Loader, X } from 'lucide-react';
import type { ColDef } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import DocumentAPI from '../services/api';

// Register all community modules
ModuleRegistry.registerModules([AllCommunityModule]);

interface PolicyDocument {
    id: number;
    name: string;
    description: string;
    last_updated: string;
    link: string;
}

const HRPolicies = () => {
    const [documents, setDocuments] = useState<PolicyDocument[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedDocument, setSelectedDocument] = useState<PolicyDocument | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    // Fetch documents on component mount
    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                setLoading(true);
                const response = await DocumentAPI.getDocuments();
                setDocuments(response.documents);
                setError(null);
            } catch (err) {
                console.error('Failed to fetch documents:', err);
                setError('Failed to load documents. Please check if the backend is running.');
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, []);

    const handleView = (documentId: number) => {
        const doc = documents.find(d => d.id === documentId);
        if (doc) {
            setSelectedDocument(doc);
            setModalOpen(true);
        }
    };

    const handleDownload = async (documentId: number) => {
        try {
            const doc = documents.find(d => d.id === documentId);
            if (doc && doc.link) {
                // Extract file ID from Google Drive link
                const fileIdMatch = doc.link.match(/\/d\/([a-zA-Z0-9-_]+)/);
                if (fileIdMatch && fileIdMatch[1]) {
                    const fileId = fileIdMatch[1];
                    // Direct download link for Google Drive
                    const downloadUrl = `https://drive.google.com/uc?id=${fileId}&export=download`;
                    window.location.href = downloadUrl;
                } else {
                    // Fallback: open the link in new tab
                    window.open(doc.link, '_blank');
                }
            }
        } catch (err) {
            console.error('Failed to download document:', err);
            alert('Failed to download document');
        }
    };

    // Helper function to convert Google Drive link to embed URL
    const getEmbedUrl = (link: string): string => {
        // Extract file ID from Google Drive link
        const fileIdMatch = link.match(/\/d\/([a-zA-Z0-9-_]+)/);
        if (fileIdMatch && fileIdMatch[1]) {
            const fileId = fileIdMatch[1];
            // For Google Docs/Sheets/Slides
            if (link.includes('docs.google.com')) {
                return `https://docs.google.com/document/d/${fileId}/preview`;
            } else if (link.includes('sheets.google.com')) {
                return `https://docs.google.com/spreadsheets/d/${fileId}/preview`;
            } else if (link.includes('slides.google.com')) {
                return `https://docs.google.com/presentation/d/${fileId}/preview`;
            }
            // Default: Try document preview
            return `https://docs.google.com/document/d/${fileId}/preview`;
        }
        return link;
    };

    const columnDefs = useMemo<ColDef<PolicyDocument>[]>(
        () => [
            {
                field: 'name' as keyof PolicyDocument,
                headerName: 'Document Name',
                flex: 1,
                cellStyle: { alignItems: 'center', display: 'flex', color: '#47505E' },
                headerClass: 'custom-header',
            },
            {
                field: 'description' as keyof PolicyDocument,
                headerName: 'Description',
                flex: 1,
                cellStyle: { alignItems: 'center', display: 'flex', color: '#47505E' },
                headerClass: 'custom-header',
            },
            {
                field: 'last_updated' as keyof PolicyDocument,
                headerName: 'Last Updated',
                flex: 1,
                cellStyle: { alignItems: 'center', display: 'flex', color: '#47505E' },
                headerClass: 'custom-header',
                valueFormatter: (params) => {
                    if (params.value) {
                        return new Date(params.value).toLocaleDateString('en-GB');
                    }
                    return 'N/A';
                }
            },
            {
                headerName: 'Actions',
                flex: 0.8,
                sortable: false,
                filter: false,
                headerClass: 'custom-header',
                cellRenderer: (params: any) => (
                    <div className="flex items-center gap-3 h-full">
                        <button 
                            onClick={() => handleView(params.data.id)}
                            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors text-neutral-600 hover:text-neutral-900"
                            title="View document"
                        >
                            <Eye size={18} />
                        </button>
                        <button 
                            onClick={() => handleDownload(params.data.id)}
                            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors text-neutral-600 hover:text-neutral-900"
                            title="Download document"
                        >
                            <Download size={18} />
                        </button>
                    </div>
                ),
                cellStyle: { alignItems: 'center', display: 'flex' },
            } as ColDef<PolicyDocument>,
        ],
        [documents]
    );

    const defaultColDef = useMemo(
        () => ({
            resizable: true,
            sortable: true,
            filter: false,
        }),
        []
    );

    return (
        <div className="w-full min-h-screen px-6 py-6" style={{paddingLeft:"40px",paddingRight:"40px", backgroundColor: '#EBF5FF'}}>
            {/* Header */}
            <div className="mb-8">
                <p style={{fontSize:"20px",paddingBottom:"20px",fontWeight: 500}}>Organization Documents</p>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            {/* Loading State */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader size={24} className="animate-spin text-neutral-400 mr-2" />
                    <p className="text-neutral-600">Loading documents...</p>
                </div>
            ) : (
                /* AG Grid Table */
                <div className="ag-theme-quartz rounded-2xl overflow-hidden" style={{ width: '100%' }}>
                    <style>{`
                        .custom-header {
                            background-color: #9BBAD8 !important;
                            color: #000000ff !important;
                            font-weight: 400 !important;
                        }
                        .ag-theme-quartz {
                            border-radius: 1rem !important;
                        }
                    `}</style>
                    <AgGridReact
                        rowData={documents}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        pagination={false}
                        suppressPaginationPanel={true}
                        headerHeight={40}
                        rowHeight={30}
                        domLayout='autoHeight'
                    />
                </div>
            )}

            {/* Document Viewer Modal */}
            {modalOpen && selectedDocument && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full h-[95vh] flex flex-col overflow-hidden relative">
                        {/* Close Button - Top Right */}
                        <button
                            onClick={() => {
                                setModalOpen(false);
                                setSelectedDocument(null);
                            }}
                            className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-lg transition-colors z-10"
                        >
                            <X size={24} className="text-gray-600" />
                        </button>

                        {/* Modal Body - IFrame for document */}
                        <div className="flex-1 overflow-auto">
                            <iframe
                                src={getEmbedUrl(selectedDocument.link)}
                                title={selectedDocument.name}
                                className="w-full h-full border-0"
                                allow="fullscreen"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HRPolicies;
