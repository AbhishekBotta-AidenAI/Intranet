import { useAuth } from '../context/useAuth';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useMemo, useState, useEffect } from 'react';
import { Eye, Download, Loader } from 'lucide-react';
import type { ColDef } from 'ag-grid-community';
import DocumentAPI from '../services/api';

// // Register all community modules
// ModuleRegistry.registerModules([AllCommunityModule]);

interface PolicyDocument {
    id: number;
    name: string;
    description: string;
    last_updated: string;
    link: string;
    location: string;
}

const HRPolicies = () => {
    const { user } = useAuth();
    const [documents, setDocuments] = useState<PolicyDocument[]>([]);
    const displayName = user?.name ?? localStorage.getItem('user_name') ?? 'User';
    // console.log('=== 👤 MICROSOFT USER DETAILS ===');
    // console.log('Username:', displayName);
    // console.log('Email:', localStorage.getItem('user_email') ?? '');
    // console.log('Full Name:', displayName);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedLocation, setSelectedLocation] = useState('India'); // Default location
    const [open, setOpen] = useState(false);
    // UI tab state for banner navigation
    const [activeTab, setActiveTab] = useState<'policies' | 'holidays' | null>('policies');
    // Search query for filtering documents
    const [searchQuery, setSearchQuery] = useState<string>('');

    const options = ['India', 'USA', 'Canada'];

    // Fetch documents on component mount or when selectedLocation changes
    useEffect(() => {
        const fetchDocuments = async (location: string) => {
            if (!location) return; // Do not fetch if no location is selected
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

        fetchDocuments(selectedLocation);

        // const fetchLocationAndDocuments = async () => {
        //     const countryCodeMap: { [key: string]: string } = {
        //         US: 'USA',
        //         IN: 'India',
        //         CA: 'Canada',
        //         // Add other mappings as needed
        //     };

        //     try {
        //         // Fetch location based on IP address
        //         const locationResponse = await fetch('https://ipapi.co/json/');
        //         if (!locationResponse.ok) {
        //             throw new Error('IP-based geolocation request failed');
        //         }
        //         const locationData = await locationResponse.json();
        //         const countryCode = locationData.country; // e.g., 'US', 'IN'

        //         // Map the code to the full name, defaulting to 'India'
        //         const countryName = countryCodeMap[countryCode] || 'India';

        //         console.log(`Detected country code: ${countryCode}, mapped to: ${countryName}`);
        //         fetchDocuments(countryName);

        //     } catch (error) {
        //         console.error('Error fetching IP-based location:', error);
        //         fetchDocuments('India'); // Fallback to India on any error
        //     }
        // };

        // fetchLocationAndDocuments();
    }, [selectedLocation]);

    const handleView = (documentId: number) => {
        const doc = documents.find(d => d.id === documentId);
        if (doc) {
            window.open(doc.link, '_blank');
        }
    };

    const handleDownload = (doc: PolicyDocument) => {
        if (doc && doc.link) {
            // For SharePoint, ensure download parameter is present
            let downloadUrl = doc.link;
            
            // Check if the link already has query parameters
            if (downloadUrl.includes('?')) {
                // If it already has download=1, keep it, otherwise add it
                if (!downloadUrl.includes('download=1')) {
                    downloadUrl += '&download=1';
                }
            } else {
                // No query parameters, add download=1
                downloadUrl += '?download=1';
            }
            
            // // Open in current window to trigger direct download
            // window.location.href = downloadUrl;
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
                    <div className="flex items-center gap-2 h-full">
                        <button 
                            onClick={() => handleView(params.data.id)}
                            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors text-neutral-600 hover:text-neutral-900"
                            title="View document"
                        >
                            <Eye size={18} />
                        </button>

                        {/* vertical divider between buttons */}
                        <div className="w-px h-6 bg-neutral-200 mx-1" aria-hidden="true" />

                        <button 
                            onClick={() => handleDownload(params.data)}
                            className="p-2 rounded-lg transition-colors text-neutral-300 cursor-not-allowed"
                            title="Download document"
                            disabled
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

    // Filter documents based on active tab and search query
    const filteredDocuments = useMemo(() => {
        let filtered = documents;

        // Filter by tab - show only holiday-related documents in Holiday Calendar tab
        if (activeTab === 'holidays') {
            filtered = documents.filter(d => {
                const name = d.name?.toLowerCase() || '';
                const description = d.description?.toLowerCase() || '';
                return name.includes('holiday') || name.includes('calendar') || 
                       description.includes('holiday') || description.includes('calendar');
            });
        }

        // Apply search filter
        if (!searchQuery) return filtered;
        const q = searchQuery.trim().toLowerCase();
        return filtered.filter(d => {
            // collect stringified values
            const values: string[] = Object.values(d)
                .filter(v => v !== null && v !== undefined)
                .map(v => String(v));

            // add formatted last_updated if present
            if (d.last_updated) {
                try {
                    const formatted = new Date(d.last_updated).toLocaleDateString('en-GB');
                    values.push(formatted);
                } catch (e) {
                    // ignore
                }
            }

            const joined = values.join(' | ').toLowerCase();
            return joined.includes(q);
        });
    }, [documents, searchQuery, activeTab]);

    return (
        <div className="w-full min-h-screen px-6 py-6" style={{padding: "0px 32px 32px 32px", backgroundColor: '#f0F2F5' }}>
            {/* Top banner that touches the navbar */}
            <div className="relative w-full h-[220px] md:h-[220px]  rounded-b-[45px]" >
                <img src="/HRPolicies/banner.png" alt="HR Banner" className="w-full h-full object-cover rounded-b-[45px]" />
                <div className="absolute inset-0 "></div>

                {/* Bottom-left tab buttons (policies / holidays) */}
                <div className="absolute left-20 bottom-0 z-40 flex items-center gap-6">
                    {/* POLICIES TAB */}
                    <button
                        type="button"
                        onClick={() => setActiveTab('policies')}
                        className={`px-4 py-1 rounded-t-lg text-[14px] transition-all ${activeTab === 'policies' ? 'bg-[#ECFFD5] text-black ' : 'text-white/90 hover:text-black'}`}
                        style={{
                            padding:"5px 10px 5px 10px",
                            borderBottom: activeTab === 'policies' ? '4px solid #909F7E' : 'none',
                            boxShadow: activeTab === 'policies' ? '0px 4px 6px rgba(0, 0, 0, 0.1)' : 'none'
                        }}
                    >
                        Organization Documents
                    </button>

                    {/* HOLIDAYS TAB */}
                    <button
                        type="button"
                        onClick={() => setActiveTab('holidays')}
                        className={`px-4 py-1 rounded-t-lg text-[14px] transition-all ${activeTab === 'holidays' ? 'bg-[#ECFFD5] text-black' : 'text-white/90 hover:text-white'}`}
                        style={{
                            padding:"5px 10px 5px 10px",
                            borderBottom: activeTab === 'holidays' ? '4px solid #909F7E' : 'none'
                        }}
                    >
                        Holiday Calendar
                    </button>
                </div>
            </div>

            {/* Card wrapper for Organization Documents header + table */}
            <div className="bg-white rounded-2xl  p-6" style={{ marginTop: '32px',padding:"32px"}}>
                {/* Greeting */}
                <div className="mb-3">
                    <h3 className="text-[25px] font-medium font-['Mulish']">Hey, <span style={{ color: '#1F89EF' }}>{displayName}</span></h3>
                </div>
                <div className='text-black/60 text-[12px]' style={{paddingBottom:"32px"}}>
                    {activeTab === 'policies' ? 'Welcome To HR Policies' : 'View Holiday Calendar'}
                </div>
                {/* Header */}
                <div className="mb-8 flex justify-between items-center">
                <p style={{fontSize:"20px", fontWeight: 500}}>
                    {activeTab === 'policies' ? 'Organization Documents' : 'Holiday Calendar'}
                </p>
                <div className="flex items-center ">
                    <div className="relative hidden md:flex items-center">
                        <div className="absolute left-3 flex items-center pointer-events-none">
                            <img
                                src="/Dashboard/searchIcon.png"
                                className="w-4 h-4"
                                alt="search"
                            />
                        </div>

                        <input
                            type="text"
                            placeholder="Search Document"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 h-8 w-72 text-sm bg-white border border-[#E6E7E8] rounded-[12px] placeholder:text-neutral-500 focus:outline-none focus:border-neutral-400"
                            style={{ paddingLeft: "35px" }}
                        />
                    </div>

                    <div className="flex items-center" style={{paddingLeft:"32px",gap:"32px"}}>
                        
                        <div className="relative w-40">
                            {/* SELECT BOX */}
                            <div
                                onClick={() => setOpen(!open)}
                                className="cursor-pointer bg-white border border-[#E6E7E8] rounded-[12px] px-3 py-2 text-sm flex items-center justify-between hover:border-neutral-400"
                                style={{padding:"6px"}}
                            >
                                <div className="flex items-center gap-2">
                                    <img src="/HRPolicies/locationIcon.png" alt="Location" className="w-4 h-4" />
                                    <span>{selectedLocation}</span>
                                </div>

                                <svg
                                    className={`w-4 h-4 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>

                            {/* DROPDOWN OPTIONS */}
                            {open && (
                                <div className="absolute z-50 mt-1 w-full bg-white border border-neutral-200 rounded-md  overflow-hidden" style={{padding:"5px"}}>
                                    {options.map(option => (
                                        <div
                                            key={option}
                                            onClick={() => {
                                                setSelectedLocation(option);
                                                setOpen(false);
                                            }}
                                            className={`px-3 py-2 text-sm cursor-pointer hover:bg-indigo-50 ${selectedLocation === option ? 'bg-indigo-100 font-medium' : ''}`}
                                            style={{padding:"5px"}}
                                        >
                                            {option}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
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
                    <div className="ag-theme-quartz rounded-t-2xl overflow-hidden mt-2" style={{ width: '100%',paddingTop:"25px"}}>
                        <style>{`
                            .custom-header {
                                background-color: #BFDAF0 !important;
                                color: #000000ff !important;
                                font-size: 13px !important;
                                font-weight: 450 !important;
                            }
                            // .ag-theme-quartz {
                            //     border-radius: 1rem !important;
                            // }
                            /* reduce font size for row cells */
                            .ag-theme-quartz .ag-cell {
                                font-size: 12px !important;
                                padding-top: 8px !important;
                                padding-bottom: 8px !important;
                                color: #47505E;
                            }
                        `}</style>
                        <AgGridReact
                            rowData={filteredDocuments}
                            columnDefs={columnDefs}
                            defaultColDef={defaultColDef}
                            pagination={false}
                            suppressPaginationPanel={true}
                            headerHeight={40}
                            rowHeight={70}
                            domLayout='autoHeight'
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default HRPolicies;
