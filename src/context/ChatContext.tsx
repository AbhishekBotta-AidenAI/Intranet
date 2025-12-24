import React, { createContext, useState } from 'react';

interface ChatContextType {
    isChatExpanded: boolean;
    setIsChatExpanded: (v: boolean) => void;
}

export const ChatContext = createContext<ChatContextType>({
    isChatExpanded: false,
    setIsChatExpanded: () => {},
});

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isChatExpanded, setIsChatExpanded] = useState(false);

    return (
        <ChatContext.Provider value={{ isChatExpanded, setIsChatExpanded }}>
            {children}
        </ChatContext.Provider>
    );
};
