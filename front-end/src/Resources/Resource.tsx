import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Book, Video, Users, PenToolIcon as Tool } from 'lucide-react';
import { Link } from "react-router-dom";

const ResourceCategory = ({
  title,
  description,
  url,
  icon: Icon,
}: {
  title: string;
  description: string;
  url: string;
  icon: React.ElementType;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Link to={url}>
        <Card className="h-full bg-white hover:bg-gray-50 transition-all duration-300 cursor-pointer overflow-hidden group relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardHeader className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <Icon className="h-8 w-8 text-primary" />
              <ArrowRight className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
            </div>
            <CardTitle className="text-xl font-bold text-gray-900">{title}</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <CardDescription className="text-sm text-gray-600">
              {description}
            </CardDescription>
            <div className="mt-4">
              <Button variant="link" className="p-0 h-auto font-semibold text-primary group-hover:underline">
                Explore {title}
              </Button>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default function ResourcesIndex() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16 relative">
        <div className="absolute inset-0 bg-grid-primary/[0.02] -z-10" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Arbitrum Developer Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore a wealth of guides, documentation, tutorials, tools, and
            community support to enhance your Arbitrum development journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ResourceCategory
            title="Documentation"
            description="Explore in-depth guides and technical documentation to master Arbitrum development."
            url="/resources/documentation"
            icon={Book}
          />
          <ResourceCategory
            title="Tutorials"
            description="Learn from step-by-step video walkthroughs covering essential Arbitrum development topics."
            url="/resources/tutorials"
            icon={Video}
          />
          <ResourceCategory
            title="Community"
            description="Connect with the Arbitrum developer community for support, collaboration, and knowledge sharing."
            url="/resources/community"
            icon={Users}
          />
          <ResourceCategory
            title="Tools"
            description="Discover a curated selection of helpful tools and libraries to streamline your Arbitrum development workflow."
            url="/resources/tools"
            icon={Tool}
          />
        </div>
      </div>
    </div>
  );
}