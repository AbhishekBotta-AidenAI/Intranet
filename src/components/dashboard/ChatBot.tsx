import { useState, useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';

interface ChatMessage {
    type: 'user' | 'bot';
    text: string;
    time: string;
    avatar?: string;
    icon?: boolean;
}

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isChatExpanded, setIsChatExpanded } = useContext(ChatContext);
    const [messages, setMessages] = useState<ChatMessage[]>([]); // EMPTY CHAT
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);

    // ---- SEND MESSAGE ---- //
    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMessage: ChatMessage = {
            type: 'user',
            text: inputValue,
            time: new Date().toLocaleTimeString(),
            avatar: 'VM'
        };

        // Add user message instantly
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setLoading(true);

        try {
            // ---- CALL YOUR API HERE ---- //
            //
            // Example:
            // const res = await fetch("/api/chat", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({ query: userMessage.text }),
            // });
            // const data = await res.json();
            //
            // Replace below mock response with actual API result:
            
            const botReply = "Sure! I'm fetching that information for you.";

            const botMessage: ChatMessage = {
                type: 'bot',
                text: botReply,
                time: new Date().toLocaleTimeString(),
                icon: true
            };

            setMessages(prev => [...prev, botMessage]);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // If chat is expanded we want the panel to participate in layout (non-fixed)
    if (isChatExpanded) {   
        return (
            <div className="flex flex-col bg-white shadow-2xl w-full h-full border-l border-gray-200 pt-4 md:pt-6 relative z-50" style={{borderRadius:"10px"}}>
                {/* Header */}
                <div className="flex-shrink-0 bg-white p-4 md:p-6 border border-gray-200 flex items-start justify-between" style={{ padding: "15px", paddingLeft: "15px",borderRadius:"10px" }}>
                    <div className="pt-0.5">
                        <h3 className="font-bold text-base" style={{ background: '#1F89EF', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Chat with Evar</h3>
                        <p className="text-xs text-gray-600 mt-1">I'll make sure to help you with streamlining & fetching details.</p>
                    </div>
                    <div className="flex gap-1.5 flex-shrink-0 pt-0.5">
                        <button
                            onClick={() => { setIsChatExpanded(false); setIsOpen(false); }}
                            className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-sm hover:opacity-80 transition"
                            style={{ background: '#DEDEDE' }}
                            title="Close"
                        >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-2 h-2" fill="none" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                        </button>

                        </div>
                    </div>

                    {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 md:py-6 space-y-4 bg-gray-50" >
                    {messages.map((message, index) => (
                        <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} gap-3`}>
                            {message.type === "bot" && (
                                <div className="avatar-glow glow-lime flex-shrink-0">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                                        <img src="Dashboard/Eva.png" alt="Eva" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            )}

                            <div className="max-w-sm">
                                    <div
                                    className={`rounded-md p-2 text-xs ${message.type === "user" ? 'text-gray-800' : 'text-gray-800'}`}
                                    style={ message.type === 'bot'
                                        ? { padding: '8px', fontSize: '12px', backgroundColor: '#EFFFCF8C', border: '1px solid rgba(180,180,180,0.25)' }
                                        : { padding: '8px', fontSize: '12px', backgroundColor: '#e0e0e0ff', border: '1px solid rgba(180,180,180,0.25)' }
                                    }
                                >
                                    {message.text}
                                </div>
                                <p className={`mt-1 text-gray-500 ${message.type === "user" ? "text-right" : ""}`} style={{ fontSize: '6px' }}>
                                    {message.time}
                                </p>
                            </div>

                            {message.type === "user" && (
                                <div className="avatar-glow glow-blue flex-shrink-0">
                                    <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center text-white text-xs font-bold">
                                        {message.avatar}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {loading && (
                        <div className="flex justify-start gap-3">
                            <div className="avatar-glow glow-lime flex-shrink-0">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                                    <img src="Dashboard/Eva.png" alt="Eva" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <div className="rounded-md p-3 text-sm" style={{ backgroundColor: '#EFFFCF8C', border: '1px solid rgba(180,180,180,0.25)' }}>
                                Typing...
                            </div>
                        </div>
                    )}
                </div>

                {/* Input */}
                <div className="flex-shrink-0 border-t border-gray-200 p-4 md:p-6 bg-white" style={{ padding: "20px" }}>
                    <div className="flex items-center gap-4 border border-gray-300 rounded-full px-4 py-2 bg-gray-50 focus-within:border-blue-500" style={{ paddingRight: "20px" }}>
                        <input
                            type="text"
                            placeholder="Ask anything..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            className="flex-1 bg-transparent text-sm focus:outline-none"
                            style={{ fontSize: "14px", padding: "10px" }}
                        />
                        <button
                            className="text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-100 rounded-full transition"
                            title="Attachment"
                        >
                            <img src="/Dashboard/chatBot/attachmentIcon.png" alt="Attachment" className="w-3 h-4" />
                        </button>
                        <button
                            className="text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-100 rounded-full transition"
                            title="Voice"
                        >
                            <img src="/Dashboard/chatBot/micIcon.png" alt="Voice" className="w-3 h-4" />
                        </button>
                        <button
                            onClick={handleSend}
                            className="text-white transition flex items-center justify-center"
                            style={{ background: '#073663', padding:"10px 5px 10px 5px", height: '20px', borderRadius: '4px' }}
                            title="Send"
                        >
                            <img src="/Dashboard/chatBot/sendIcon.png" alt="Send" className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* CHAT OPEN BUTTON */}
            {!isChatExpanded && (
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="fixed bottom-15 right-8 w-15 h-15 bg-transparent rounded-full flex items-center justify-center hover:scale-110 transition-transform z-40 shadow-none"
                        style={{ background: 'transparent' }}
                    >
                        <div className="avatar-glow glow-blue">
                            <img 
                                src="Dashboard/Eva.png" 
                                alt="Chat" 
                                className="w-15 h-15 object-cover"
                            />
                        </div>
                    </button>
            )}


            {/* Floating chat window when not expanded */}
            <div
                className={`fixed bottom-15 right-8 w-96 h-[450px] rounded-3xl bg-white shadow-2xl flex flex-col
                transform transition-all duration-300 ease-out z-50
                ${(isOpen) ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"}
                `}
                style={{ marginRight: "0" }}
            >
                {/* HEADER - FIXED TOP */}
                <div className="flex-shrink-0 bg-white p-4 md:p-6 rounded-t-3xl border-b border-gray-200 flex items-start justify-between" style={{ padding: "15px", paddingLeft: "15px" }}>
                    <div className="pt-0.5">
                        <h3 className="font-bold text-base bg-gradient-to-r from-blue-600 to-lime-500 bg-clip-text text-[#1F89EF]">Chat with Eva</h3>
                        <p className="text-[10px] text-gray-600 mt-1">I'll make sure to help you with streamlining & fetching details.</p>
                    </div>
                    <div className="flex gap-1.5 flex-shrink-0 pt-0.5">
                        {/* Expand Button */}
                        <button
                            onClick={() => { setIsChatExpanded(true); setIsOpen(true); }}
                            className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-sm hover:opacity-80 transition"
                            style={{ background: '#DEDEDE' }}
                            title="Expand">
                            <img
                                src="/Dashboard/chatBot/extendIcon.png"
                                alt="Expand"
                                className="w-2 h-2 object-contain"
                            />
                        </button>

                        {/* Close Button */}
                        <button
                            onClick={() => { setIsOpen(false); setIsChatExpanded(false); }}
                            className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-sm hover:opacity-80 transition color-red"
                            style={{ background: '#F5D6D661' }}
                            title="Close"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* CHAT MESSAGES - SCROLLABLE MIDDLE */}
                <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 md:py-6 space-y-4 bg-gray-50">
                    {messages.map((message, index) => (
                        <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} gap-3`}>
                            {message.type === "bot" && (
                                <div className="w-8 h-8 rounded-full bg-lime-400 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                    <img src="Dashboard/Eva.png" alt="Eva" className="w-full h-full object-cover" />
                                </div>
                            )}

                            <div className="max-w-sm">
                                <div
                                    className={`rounded-md p-2 text-xs text-gray-800`}
                                    style={ message.type === 'bot'
                                        ? { padding: '8px', fontSize: '12px', backgroundColor: '#EFFFCF8C', border: '1px solid rgba(180,180,180,0.25)' }
                                        : { padding: '8px', fontSize: '12px', backgroundColor: '#ffffff', border: '1px solid rgba(180,180,180,0.25)' }
                                    }
                                >
                                    {message.text}
                                </div>
                                <p className={`mt-1 text-gray-500 ${message.type === "user" ? "text-right" : ""}`} style={{ fontSize: '7px' }}>
                                    {message.time}
                                </p>
                            </div>

                            {message.type === "user" && (
                                <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center text-white text-xs font-bold">
                                    {message.avatar}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* LOADING BUBBLE */}
                    {loading && (
                        <div className="flex justify-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-lime-400 flex items-center justify-center overflow-hidden flex-shrink-0">
                                <img src="Dashboard/Eva.png" alt="Eva" className="w-full h-full object-cover" />
                            </div>
                            <div className="rounded-md p-3 text-sm" style={{ backgroundColor: '#EFFFCF8C', border: '1px solid rgba(180,180,180,0.25)' }}>
                                Typing...
                            </div>
                        </div>
                    )}
                </div>

                {/* INPUT AREA - FIXED BOTTOM */}
                <div className="flex-shrink-0 border-gray-200 p-4 md:p-6 bg-white rounded-b-3xl" style={{ padding: "20px" }}>
                    <div className="flex items-center gap-4 border border-gray-300 rounded-full px-4 py-2 bg-gray-50 focus-within:border-blue-500" style={{ paddingRight: "20px" }}>
                        <input
                            type="text"
                            placeholder="Ask anything..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            className="flex-1 bg-transparent text-sm focus:outline-none"
                            style={{ fontSize: "14px", padding: "10px" }}
                        />

                        {/* ATTACHMENT */}
                        <button
                            className="text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-100 rounded-full transition"
                            title="Attachment"
                        >
                            <img src="/Dashboard/chatBot/attachmentIcon.png" alt="Attachment" className="w-2 h-4" />
                        </button>

                        {/* VOICE */}
                        <button
                            className="text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-100 rounded-full transition"
                            title="Voice"
                        >
                            <img src="/Dashboard/chatBot/micIcon.png" alt="Voice" className="w-3 h-4" />
                        </button>

                        {/* SEND */}
                        <button
                            onClick={handleSend}
                            className="text-white transition flex items-center justify-center"
                            style={{ background: '#073663', width: '25px', height: '25px', borderRadius: '4px' }}
                            title="Send"
                        >
                            <img src="/Dashboard/chatBot/sendIcon.png" alt="Send" className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>

            {/* BACKDROP */}
            {isOpen && <div className="fixed inset-0 bg-black/30 z-30" onClick={() => { setIsOpen(false); setIsChatExpanded(false); }} />}
        </>
    );
};

export default ChatBot;
