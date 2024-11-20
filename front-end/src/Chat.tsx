"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, User, Bot } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  role: "user" | "bot";
  content: string;
}

const ChatMessage = ({ message }: { message: Message }) => {
  const formatContent = (content: string) => {
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                language={match[1]}
                style={tomorrow as { [key: string]: React.CSSProperties }}
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mb-6 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex max-w-[80%] items-start space-x-2 rounded-lg p-4 shadow-md
          ${message.role === "user"
            ? "bg-black text-white"
            : "bg-gray-100 text-black"
        }`}
      >
        {message.role === "bot" && <Bot className="mt-1 h-5 w-5 flex-shrink-0" />}
        <div className="prose prose-sm dark:prose-invert max-w-none">
          {formatContent(message.content)}
        </div>
        {message.role === "user" && <User className="mt-1 h-5 w-5 flex-shrink-0" />}
      </div>
    </motion.div>
  );
};

const WelcomeMessage = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-8 text-center"
  >
    <div className="inline-block rounded-lg bg-gray-200 p-1">
      <div className="rounded-lg bg-white px-6 py-4">
        <h2 className="mb-2 text-xl font-bold text-gray-800">
          Welcome to Arbitrum AI Code Helper!
        </h2>
        <p className="text-gray-600">How can I assist you today?</p>
      </div>
    </div>
  </motion.div>
);

const TemplateMessages = ({
  onSelect,
}: {
  onSelect: (message: string) => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-6 flex flex-wrap justify-center gap-2"
  >
    {[
      "How do I deploy a contract on Arbitrum?",
      "Explain Arbitrum's rollup technology",
      "What are the best practices for gas optimization?",
      "How to integrate Arbitrum with my dApp?",
    ].map((message, index) => (
      <Button
        key={index}
        variant="outline"
        size="sm"
        onClick={() => onSelect(message)}
        className="bg-white text-sm text-gray-700 hover:bg-gray-100 border-gray-300"
      >
        {message}
      </Button>
    ))}
  </motion.div>
);

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstInteraction, setIsFirstInteraction] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsFirstInteraction(false);
    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("https://arbitrum-dev-help-production.up.railway.app/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await response.json();
      const botMessage: Message = { role: "bot", content: data.message };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        role: "bot",
        content: "Sorry, I encountered an error. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTemplateSelect = (message: string) => {
    setInput(message);
  };

  return (
    <div className="flex h-screen flex-col bg-white">
      <header className="bg-black p-4 text-white">
        <h1 className="text-2xl font-bold">Arbitrum AI Code Helper</h1>
      </header>
      <ScrollArea className="flex-grow p-6" ref={scrollAreaRef}>
        {isFirstInteraction && <WelcomeMessage />}
        <AnimatePresence>
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-left italic text-gray-500"
          >
            <Loader2 className="mr-2 inline h-4 w-4 animate-spin" />
            AI is thinking...
          </motion.div>
        )}
      </ScrollArea>
      {isFirstInteraction && <TemplateMessages onSelect={handleTemplateSelect} />}
      <form onSubmit={handleSubmit} className="border-t border-gray-200 bg-white p-4">
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow rounded-full border-gray-300 bg-gray-100 px-4 py-2 focus:border-black focus:ring-black"
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="rounded-full bg-black px-6 py-2 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}