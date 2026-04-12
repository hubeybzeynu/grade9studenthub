import { motion } from 'framer-motion';
import { BookOpen, Users, Award, ClipboardList, FileCheck, FileText, Sparkles } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const features = [
  { key: 'textbooks', label: 'Textbooks', desc: 'Access all digital textbooks', icon: BookOpen, color: 'bg-emerald-500' },
  { key: 'students', label: 'Student Info', desc: 'Explore student profiles', icon: Users, color: 'bg-violet-500' },
  { key: 'results', label: 'Ministry Results', desc: 'View your exam results', icon: Award, color: 'bg-amber-500' },
  { key: 'mid', label: 'Mid Exam', desc: 'Mid-term exam results', icon: ClipboardList, color: 'bg-indigo-500' },
  { key: 'final', label: 'Final Exam', desc: 'Final exam results', icon: FileCheck, color: 'bg-rose-500' },
  { key: 'report', label: 'Report Card', desc: 'Full academic report', icon: FileText, color: 'bg-teal-500' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const HomePage = ({ onNavigate }: HomePageProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen pt-16 pb-20 px-4"
    >
      <div className="max-w-lg mx-auto">
        {/* Hero */}
        <motion.div variants={itemVariants} className="text-center mb-6 mt-2">
          <img
            src="/logo.jpg"
            alt="School Logo"
            className="w-20 h-20 rounded-full mx-auto mb-3 border-2 border-primary/30 shadow-lg"
          />
          <h1 className="text-2xl font-bold text-foreground mb-1">
            Grade 9 Portal
          </h1>
          <p className="text-muted-foreground text-sm">
            St. Theresa School
          </p>
        </motion.div>

        {/* Welcome Card - Material elevated style */}
        <motion.div
          variants={itemVariants}
          className="bg-card rounded-2xl p-4 mb-6 shadow-md border border-border"
        >
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Welcome, Students!</h2>
              <p className="text-muted-foreground text-xs mt-0.5">
                Access textbooks, profiles, and exam results.
              </p>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">Academic Progress</span>
              <span className="text-xs text-primary font-semibold">75%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="h-full rounded-full bg-primary"
              />
            </div>
          </div>
        </motion.div>

        {/* Feature Cards - Material style */}
        <motion.div variants={containerVariants} className="grid grid-cols-2 gap-3">
          {features.map((feature) => (
            <motion.button
              key={feature.key}
              variants={itemVariants}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate(feature.key)}
              className="bg-card rounded-2xl p-4 text-left shadow-sm border border-border active:bg-muted transition-colors"
            >
              <div className={`w-11 h-11 rounded-xl ${feature.color} flex items-center justify-center mb-3`}>
                <feature.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-0.5">{feature.label}</h3>
              <p className="text-muted-foreground text-[11px] leading-tight">{feature.desc}</p>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomePage;
