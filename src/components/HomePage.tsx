import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Award, ClipboardList, FileCheck, FileText, Sparkles } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const features = [
  { key: 'textbooks', label: 'Textbooks', desc: 'Access all digital textbooks', icon: BookOpen, gradient: 'from-emerald-500 to-teal-600' },
  { key: 'students', label: 'Student Info', desc: 'Explore student profiles', icon: Users, gradient: 'from-violet-500 to-purple-600' },
  { key: 'results', label: 'Ministry Results', desc: 'View your exam results', icon: Award, gradient: 'from-amber-500 to-orange-600' },
  { key: 'mid', label: 'Mid Exam', desc: 'Mid-term exam results', icon: ClipboardList, gradient: 'from-indigo-500 to-blue-600' },
  { key: 'final', label: 'Final Exam', desc: 'Final exam results', icon: FileCheck, gradient: 'from-rose-500 to-red-600' },
  { key: 'report', label: 'Report Card', desc: 'Full academic report', icon: FileText, gradient: 'from-teal-500 to-cyan-600' },
];

const HomePage = ({ onNavigate }: HomePageProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen pt-24 pb-12 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-24 h-24 rounded-full border-4 border-primary/30 flex items-center justify-center mx-auto mb-6 bg-gradient-to-br from-primary/20 to-cyan-500/20"
          >
            <img
              src="https://i.postimg.cc/sfKMzbMn/photo-2025-06-12-19-39-13.jpg"
              alt="School Logo"
              className="w-20 h-20 rounded-full object-cover"
            />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Grade 9</span> Student Portal
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            St. Theresa School - Your gateway to academic resources and information
          </p>
        </motion.div>

        {/* Welcome Card */}
        <motion.div variants={itemVariants} className="glass-card p-6 mb-8">
          <div className="flex items-start gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-primary shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xl font-bold">Welcome, Students!</h2>
              <p className="text-muted-foreground">
                Access your textbooks, view student profiles, and check your ministry exam results all in one place.
              </p>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-muted-foreground">Academic Progress</span>
              <span className="text-sm text-primary font-bold">75%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="h-full rounded-full bg-gradient-to-r from-primary to-cyan-400"
              />
            </div>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div variants={containerVariants} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <motion.div
              key={feature.key}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => onNavigate(feature.key)}
              className="glass-card-hover p-6 cursor-pointer group"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7 text-foreground" />
              </div>
              <h3 className="text-lg font-bold mb-1">{feature.label}</h3>
              <p className="text-muted-foreground text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomePage;
