"use client";

import { Users, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface CommunityResource {
  title: string;
  description: string;
  url: string;
}

const communityResources: CommunityResource[] = [
  {
    title: "Join Discord",
    description:
      "Connect with other Arbitrum developers and get support in our Discord community.",
    url: "https://discord.com/invite/arbitrum",
  },
  {
    title: "Discuss on the Forum",
    description:
      "Participate in technical discussions and share ideas on the Arbitrum forum.",
    url: "https://forum.arbitrum.foundation/",
  },
  {
    title: "Arbitrum Ecosystem Events",
    description:
      "Stay up-to-date with the latest Arbitrum events, meetups, and conferences.",
    url: "https://arbitrum.io/community",
  },
  {
    title: "Arbitrum Developer Grants",
    description:
      "Apply for funding to support your Arbitrum-based projects and ideas.",
    url: "https://arbitrum.foundation/grants",
  },
  {
    title: "Arbitrum Community Channels",
    description:
      "Collaborate and share knowledge across various Arbitrum-focused social channels.",
    url: "https://arbitrum.io/community",
  },
];

const CommunityCard = ({ resource }: { resource: CommunityResource }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <a href={resource.url} className="block h-full">
        <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer">
          <CardHeader>
            <div className="flex items-start justify-between">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="mt-4 text-xl font-bold">
              {resource.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-sm text-gray-600">
              {resource.description}
            </CardDescription>
            <div className="mt-4">
              <span className="group flex items-center text-sm text-primary hover:text-primary-600 transition-colors">
                <span className="flex-1">Learn More</span>
                <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
            </div>
          </CardContent>
        </Card>
      </a>
    </motion.div>
  );
};

export default function Community() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800">
            Community Resources
          </h1>
          <p className="text-gray-600 mt-4">
            Explore resources designed to help you engage with the Arbitrum
            community, enhance your skills, and build your projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {communityResources.map((resource, index) => (
            <CommunityCard key={index} resource={resource} />
          ))}
        </div>
      </div>
    </div>
  );
}