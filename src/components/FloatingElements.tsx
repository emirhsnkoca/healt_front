import React from 'react';
import { Heart, Activity, Plus } from 'lucide-react';

const FloatingElements: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating hearts */}
      <Heart className="absolute top-20 left-20 w-6 h-6 text-white/20 float" />
      <Heart className="absolute top-40 right-32 w-4 h-4 text-white/15 float-delayed" />
      <Heart className="absolute bottom-40 left-16 w-5 h-5 text-white/20 float" />
      
      {/* Floating activity lines */}
      <Activity className="absolute top-32 right-20 w-8 h-8 text-white/10 float-delayed" />
      <Activity className="absolute bottom-32 right-40 w-6 h-6 text-white/15 float" />
      <Activity className="absolute top-60 left-40 w-7 h-7 text-white/10 float-delayed" />
      
      {/* Floating plus icons */}
      <Plus className="absolute top-80 right-16 w-5 h-5 text-white/15 float" />
      <Plus className="absolute bottom-60 left-32 w-4 h-4 text-white/20 float-delayed" />
      
      {/* Additional decorative elements */}
      <div className="absolute top-24 right-1/4 w-2 h-2 bg-white/20 rounded-full float" />
      <div className="absolute bottom-24 left-1/4 w-3 h-3 bg-white/15 rounded-full float-delayed" />
      <div className="absolute top-1/2 right-12 w-1.5 h-1.5 bg-white/25 rounded-full float" />
    </div>
  );
};

export default FloatingElements;