import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BookOpen } from 'lucide-react';

interface TextbookContentFinderProps {
  subject: string;
}

const TextbookContentFinder = ({ subject }: TextbookContentFinderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full btn-gradient shadow-lg"
      >
        <Search className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 glass-card p-4 w-80"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                {subject} Content Finder
              </h3>
              <button onClick={() => setIsOpen(false)} className="p-1 rounded-lg hover:bg-white/10">
                <X className="w-4 h-4" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Search activities, exercises..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="input-glass text-sm"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Search for activities, exercises, and topics in {subject}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TextbookContentFinder;
