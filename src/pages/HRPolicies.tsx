import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useMemo } from 'react';
import { Eye, Download } from 'lucide-react';
import type { ColDef } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

// Register all community modules
ModuleRegistry.registerModules([AllCommunityModule]);

interface PolicyDocument {
    name: string;
    description: string;
    lastUpdated: string;
}

const HRPolicies = () => {
    const documents: PolicyDocument[] = [
        {
            name: 'Employee Handbook',
            description: 'This policy is...',
            lastUpdated: 'dd/mm/yyyy',
        },
        {
            name: 'Leave Policy',
            description: 'This policy is...',
            lastUpdated: 'dd/mm/yyyy',
        },
        {
            name: 'Attendance Policy',
            description: 'This policy is...',
            lastUpdated: 'dd/mm/yyyy',
        },
        {
            name: 'Performance Improvement Plan',
            description: 'This policy is...',
            lastUpdated: 'dd/mm/yyyy',
        },
        {
            name: 'Prevention of Sexual Harassment (POSH)',
            description: 'This policy is...',
            lastUpdated: 'dd/mm/yyyy',
        },
        {
            name: 'Global Travel Policy',
            description: 'This policy is...',
            lastUpdated: 'dd/mm/yyyy',
        },
        {
            name: 'Acknowledgement on Assignment of Company',
            description: 'This policy is...',
            lastUpdated: 'dd/mm/yyyy',
        },
        {
            name: 'Information Security Policy',
            description: 'This policy is...',
            lastUpdated: 'dd/mm/yyyy',
        },
    ];

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
                field: 'lastUpdated' as keyof PolicyDocument,
                headerName: 'Last Updated',
                flex: 1,
                cellStyle: { alignItems: 'center', display: 'flex', color: '#47505E' },
                headerClass: 'custom-header',
            },
            {
                headerName: 'Actions',
                flex: 0.8,
                sortable: false,
                filter: false,
                headerClass: 'custom-header',
                cellRenderer: () => (
                    <div className="flex items-center gap-3 h-full">
                        <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors text-neutral-600 hover:text-neutral-900">
                            <Eye size={18} />
                        </button>
                        <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors text-neutral-600 hover:text-neutral-900">
                            <Download size={18} />
                        </button>
                    </div>
                ),
                cellStyle: { alignItems: 'center', display: 'flex' },
            } as ColDef<PolicyDocument>,
        ],
        []
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
                <p className="text-neutral-600" style={{fontSize:"20px",paddingBottom:"20px"}}>Organization Documents</p>
            </div>

            {/* AG Grid Table */}
            <div className="ag-theme-quartz rounded-2xl overflow-hidden" style={{ width: '100%' }}>
                <style>{`
                    .custom-header {
                        background-color: #9BBAD8 !important;
                        color: #000000ff !important;
                        font-weight: 600 !important;
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
        </div>
    );
};

export default HRPolicies;
