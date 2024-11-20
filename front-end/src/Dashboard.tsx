"use client";

import { useState, useEffect } from "react";
import { Code, FileCode, MessageSquareCode, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardCard from "./components/DashboardCard";
import { TypeAnimation } from "react-type-animation";

export default function Start() {
  const [showSubheading, setShowSubheading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSubheading(true);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="fixed inset-0 z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-white">
            <TypeAnimation
              sequence={[
                "The Ultimate Arbitrum Developer Tooling",
                () => setShowSubheading(true),
              ]}
              wrapper="span"
              speed={50} // Faster typing speed
              cursor={false}
            />
          </h1>
        </motion.div>
        <motion.p
          className="text-xl text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: showSubheading ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          Simplify your development journey with these tools!
        </motion.p>

        <AnimatePresence>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DashboardCard
              title="Deploy one-file Solidity contracts on Arbitrum"
              icon={FileCode}
              tagline="Deploy faster, code smarter"
              route="/deploy"
            />
            <DashboardCard
              title="Contracts template snippets"
              icon={Code}
              tagline="Jumpstart your development with ready-to-use templates"
              route="/templates"
            />
            <DashboardCard
              title="Chat with AI for code generation and debugging"
              icon={MessageSquareCode}
              tagline="Get instant help from our AI assistant"
              route="/chat"
            />
            <DashboardCard
              title="Resources"
              icon={BookOpen}
              tagline="Access comprehensive guides and documentation"
              route="/resources"
            />
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}
