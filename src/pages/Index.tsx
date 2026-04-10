import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import PasswordGate from '@/components/PasswordGate';
import WelcomeOnboarding from '@/components/WelcomeOnboarding';
import Navbar from '@/components/Navbar';
import HomePage from '@/components/HomePage';
import TextbooksPage from '@/components/TextbooksPage';
import StudentsPage from '@/components/StudentsPage';
import ResultsPage from '@/components/ResultsPage';
import ExamResultPage from '@/components/ExamResultPage';
import ReportCardPage from '@/components/ReportCardPage';

const Index = () => {
  const [unlocked, setUnlocked] = useState(() => localStorage.getItem('portal_unlocked') === 'true');
  const [onboarded, setOnboarded] = useState(() => localStorage.getItem('portal_onboarded') === 'true');
  const [currentPage, setCurrentPage] = useState('home');

  const handleUnlock = () => {
    localStorage.setItem('portal_unlocked', 'true');
    setUnlocked(true);
  };

  const handleOnboardComplete = () => {
    localStorage.setItem('portal_onboarded', 'true');
    setOnboarded(true);
  };

  if (!unlocked) {
    return <PasswordGate onUnlock={handleUnlock} />;
  }

  if (!onboarded) {
    return (
      <AnimatePresence>
        <WelcomeOnboarding onComplete={handleOnboardComplete} />
      </AnimatePresence>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'textbooks': return <TextbooksPage />;
      case 'students': return <StudentsPage onNavigate={setCurrentPage} />;
      case 'results': return <ResultsPage />;
      case 'mid': return <ExamResultPage type="mid" />;
      case 'final': return <ExamResultPage type="final" />;
      case 'report': return <ReportCardPage />;
      default: return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <AnimatePresence mode="wait">
        <div key={currentPage}>
          {renderPage()}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Index;
