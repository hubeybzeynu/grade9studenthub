import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, BookOpen, Users, Award, ClipboardList, FileCheck, FileText } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'textbooks', label: 'Textbooks', icon: BookOpen },
  { key: 'students', label: 'Students', icon: Users },
  { key: 'results', label: 'Results', icon: Award },
  { key: 'mid', label: 'Mid Exam', icon: ClipboardList },
  { key: 'final', label: 'Final Exam', icon: FileCheck },
  { key: 'report', label: 'Report Card', icon: FileText },
];

const Navbar = ({ currentPage, onNavigate }: NavbarProps) => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card rounded-none border-t-0 border-x-0"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16 gap-1 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-2 mr-4 shrink-0">
            <img
              src="https://i.postimg.cc/sfKMzbMn/photo-2025-06-12-19-39-13.jpg"
              alt="Logo"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-bold gradient-text hidden sm:inline">Grade 9 STS Portal</span>
          </div>

          {navItems.map((item) => (
            <motion.button
              key={item.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate(item.key)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all shrink-0 ${
                currentPage === item.key
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-white/10 text-muted-foreground hover:text-foreground'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="hidden md:inline">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
