import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within a ToastProvider');
    return context;
};

// Icon components for Toast
const IconSuccess = () => (
    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 animate-bounce">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
    </div>
);

const IconError = () => (
    <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    </div>
);

const IconInfo = () => (
    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 111.083.856l-.37 1.061A1.5 1.5 0 0110.5 14.25v-.38a2 2 0 01.378-1.178l.372-.692zM12 7.5h.008v.008H12V7.5z" />
        </svg>
    </div>
);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const addToast = useCallback((message, type = 'success') => {
        const id = Math.random().toString(36).substring(2, 9);
        const newToast = { id, message, type };

        setToasts((prev) => [...prev, newToast]);

        // Auto remove after 4 seconds
        setTimeout(() => {
            removeToast(id);
        }, 4000);
    }, [removeToast]);

    const success = (msg) => addToast(msg, 'success');
    const error = (msg) => addToast(msg, 'error');
    const info = (msg) => addToast(msg, 'info');

    return (
        <ToastContext.Provider value={{ success, error, info }}>
            {children}
            
            {/* Toast Container */}
            <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        className="bg-white/95 backdrop-blur border border-slate-100/80 shadow-2xl rounded-2xl p-4 flex items-start gap-3 pointer-events-auto transform transition-all duration-300 ease-out translate-x-0 animate-slide-in"
                        style={{
                            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)'
                        }}
                    >
                        {t.type === 'success' && <IconSuccess />}
                        {t.type === 'error' && <IconError />}
                        {t.type === 'info' && <IconInfo />}
                        
                        <div className="flex-1 min-w-0 pt-0.5">
                            <p className="text-sm font-bold text-slate-800 leading-snug">{t.message}</p>
                        </div>
                        
                        <button
                            onClick={() => removeToast(t.id)}
                            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-50 flex-shrink-0"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
