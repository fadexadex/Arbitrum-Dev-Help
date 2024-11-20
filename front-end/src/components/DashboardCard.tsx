import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { motion } from "framer-motion";
import { useState } from "react";

export default function DashboardCard({
  title,
  icon: Icon,
  tagline,
  route,
}: {
  title: string;
  icon: React.ElementType;
  tagline: string;
  route: string;
}) {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  const handleNavigate = () => {
    setIsClicked(true);
    setTimeout(() => navigate(route), 300); // Delay navigation to allow animation to complete
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className="bg-white border border-gray-200 hover:scale-105 transition-all duration-300 group cursor-pointer h-64 shadow-lg hover:shadow-xl relative overflow-hidden"
        onClick={handleNavigate}
      >
        <CardContent className="p-6 h-full flex flex-col justify-between">
          <div>
            <Icon className="text-black mb-4 h-8 w-8" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {title}
            </h3>
            <p className="text-sm text-gray-600">{tagline}</p>
          </div>
          <div className="flex justify-between items-center mt-4">
            <Button 
              variant="outline" 
              size="sm"
              className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
            >
              Learn More
            </Button>
            <div className="flex items-center space-x-2 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              <span className="text-sm font-medium">Get Started</span>
              <ArrowRight className="h-4 w-4" /> 
            </div>
          </div>
        </CardContent>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {isClicked && (
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </Card>
    </motion.div>
  );
}