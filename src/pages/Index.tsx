import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../components/ChatMessage';
import { ChatInput } from '../components/ChatInput';
import { Menu, X, LogOut } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm Edison, your AI tutor. I'm here to help you learn through thoughtful questions and guidance.\n\nWhat would you like to explore today? You can ask me about any subject—math, science, history, literature, or anything else you're curious about.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response with Socratic method
    setTimeout(() => {
      const socraticResponses = [
        "That's a great question! Before I explain, let me ask you: What do you already know about this topic?",
        "Interesting! Can you think of a real-world example where this concept applies?",
        "I see. Let me ask you this: Why do you think that might be the case?",
        "Excellent observation! Now, how do you think this connects to what we learned earlier?",
        "Let me turn that around—what would happen if the opposite were true?",
      ];

      const response =
        socraticResponses[Math.floor(Math.random() * socraticResponses.length)];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: "Hi! I'm Edison, your AI tutor. I'm here to help you learn through thoughtful questions and guidance.\n\nWhat would you like to explore today? You can ask me about any subject—math, science, history, literature, or anything else you're curious about.",
      },
    ]);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div
        className={`fixed md:relative w-64 h-screen bg-sidebar-background border-r border-sidebar-border flex flex-col transition-transform duration-300 z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-4 border-b border-sidebar-border">
          <h1 className="text-2xl font-bold text-sidebar-primary">Edison</h1>
          <p className="text-xs text-sidebar-foreground mt-1">AI Tutor</p>
        </div>

        <button
          onClick={handleNewChat}
          className="m-4 px-4 py-2 bg-sidebar-primary text-sidebar-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
        >
          + New Chat
        </button>

        <div className="flex-1 overflow-y-auto px-4 space-y-2">
          <div className="text-xs text-sidebar-foreground font-semibold uppercase tracking-wide mb-3">
            Recent
          </div>
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-sidebar-accent text-sm text-sidebar-foreground transition-colors">
            Math: Algebra
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-sidebar-accent text-sm text-sidebar-foreground transition-colors">
            Biology: Photosynthesis
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-sidebar-accent text-sm text-sidebar-foreground transition-colors">
            History: Renaissance
          </button>
        </div>

        <div className="p-4 border-t border-sidebar-border">
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent rounded-lg transition-colors text-sm">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-border bg-background px-4 py-3 flex items-center justify-between md:hidden">
          <h2 className="text-lg font-semibold">Edison</h2>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              role={message.role}
              content={message.content}
            />
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse" />
              </div>
              <div className="bg-secondary text-foreground rounded-lg px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-foreground rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-foreground rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Index;
