import React from 'react';

interface WidgetProps {
    title: string;
    children: React.ReactNode;
    className?: string;
    action?: React.ReactNode;
}

const Widget: React.FC<WidgetProps> = ({ title, children, className = '', action }) => {
    return (
        <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">{title}</h3>
                {action && <div>{action}</div>}
            </div>
            <div className="p-6">
                {children}
            </div>
        </div>
    );
};

export default Widget;
