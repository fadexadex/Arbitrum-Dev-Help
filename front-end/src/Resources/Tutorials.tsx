"use client";

import { PlayCircle, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface TutorialResource {
  title: string;
  description: string;
  url: string;
}

const tutorialResources: TutorialResource[] = [
  {
    title: "Getting Started with Arbitrum",
    description:
      "Learn the fundamentals of deploying and interacting with Arbitrum.",
    url: "https://youtu.be/VySjTWkX1wg?si=2t1IidT00Esy0wdK",
  },
  {
    title: "Deployment on Arbitrum",
    description:
      "Learn how to deploy your smart contracts on the Arbitrum network.",
    url: "https://youtu.be/LCZ0RiT0M_w?si=SN15urde0GOrMf8h",
  },
  {
    title: "Optimizing Solidity Code",
    description:
      "Techniques and best practices for writing efficient, gas-optimized Solidity.",
    url: "https://youtu.be/Q3I5EnPZOYw?si=Cm8pGOUY6EafYlAH",
  },
  {
    title: "Building dApps on Arbitrum",
    description:
      "A step-by-step guide to developing decentralized applications on Arbitrum.",
    url: "https://youtu.be/JofW2hrre64?si=4uOmwfwYktp09npj",
  },
  {
    title: "Interacting with the Arbitrum SDK",
    description:
      "Master the Arbitrum SDK to build powerful, feature-rich smart contracts.",
    url: "https://youtu.be/YEKy5NhaDPU?si=p5XHKLdvUYPkItek",
  },
  {
    title: "Arbitrum Scaling Strategies",
    description:
      "Explore advanced scaling techniques to optimize the performance of your Arbitrum dApps.",
    url: "https://youtu.be/TjmE3Vg8mKI?si=YPmtg_TAJzH3gm77",
  },
];

const TutorialCard = ({ tutorial }: { tutorial: TutorialResource }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <a href={tutorial.url} className="block h-full">
        <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer">
          <CardHeader>
            <div className="flex items-start justify-between">
              <PlayCircle className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="mt-4 text-xl font-bold">
              {tutorial.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-sm text-gray-600">
              {tutorial.description}
            </CardDescription>
            <div className="mt-4">
              <span className="group flex items-center text-sm text-primary hover:text-primary-600 transition-colors">
                <span className="flex-1">Watch Now</span>
                <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
            </div>
          </CardContent>
        </Card>
      </a>
    </motion.div>
  );
};

export default function Tutorials() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Tutorials
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn from step-by-step video walkthroughs covering essential
            Arbitrum development topics.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorialResources.map((tutorial, index) => (
            <TutorialCard key={index} tutorial={tutorial} />
          ))}
        </div>
      </div>
    </div>
  );
}