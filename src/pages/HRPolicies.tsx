import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useMemo, useState, useEffect } from 'react';
import { Eye, Download, Loader } from 'lucide-react';
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
    location: string;
}

const HRPolicies = () => {
    const [documents, setDocuments] = useState<PolicyDocument[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch documents on component mount
    useEffect(() => {
        const fetchDocuments = async (location: string) => {
            try {
                setLoading(true);
                const response = await DocumentAPI.getDocuments(location);
                setDocuments(response.documents);
                setError(null);
            } catch (err) {
                console.error('Failed to fetch documents:', err);
                setError('Failed to load documents. Please check if the backend is running.');
            } finally {
                setLoading(false);
            }
        };

        const fetchLocationAndDocuments = async () => {
            const countryCodeMap: { [key: string]: string } = {
                US: 'USA',
                IN: 'India',
                CA: 'Canada',
                // Add other mappings as needed
            };

            try {
                // Fetch location based on IP address
                const locationResponse = await fetch('https://ipapi.co/json/');
                if (!locationResponse.ok) {
                    throw new Error('IP-based geolocation request failed');
                }
                const locationData = await locationResponse.json();
                const countryCode = locationData.country; // e.g., 'US', 'IN'

                // Map the code to the full name, defaulting to 'India'
                const countryName = countryCodeMap[countryCode] || 'India';

                console.log(`Detected country code: ${countryCode}, mapped to: ${countryName}`);
                fetchDocuments(countryName);

            } catch (error) {
                console.error('Error fetching IP-based location:', error);
                fetchDocuments('India'); // Fallback to India on any error
            }
        };

        fetchLocationAndDocuments();
    }, []);

    const handleView = (documentId: number) => {
        const doc = documents.find(d => d.id === documentId);
        if (doc) {
            window.open(doc.link, '_blank');
        }
    };

    const handleDownload = (doc: PolicyDocument) => {
        if (doc && doc.link) {
            // For SharePoint, append '?download=1' to force download
            const downloadUrl = doc.link.split('?')[0] + '?download=1';
            const linkElement = document.createElement('a');
            linkElement.href = downloadUrl;
            linkElement.setAttribute('download', doc.name || 'document'); // Use document name for the file
            document.body.appendChild(linkElement);
            linkElement.click();
            document.body.removeChild(linkElement);
        }
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
                            onClick={() => handleDownload(params.data)}
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
        </div>
    );
};

export default HRPolicies;
