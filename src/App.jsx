import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import JobMarketplace from './components/JobMarketplace';
import EmployerDashboard from './components/EmployerDashboard';
import FreelancerDashboard from './components/FreelancerDashboard';
import AdminDashboard from './components/AdminDashboard';
import PostJobModal from './components/PostJobModal';
import SubmitProposalModal from './components/SubmitProposalModal';
import JobDetailsModal from './components/JobDetailsModal';
import SubmitWorkModal from './components/SubmitWorkModal';
import RateReviewModal from './components/RateReviewModal';
import { fetchJobs } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('marketplace'); // 'marketplace' | 'employer' | 'freelancer' | 'admin'
  const [currentRole, setCurrentRole] = useState('freelancer'); // 'freelancer' | 'employer' | 'admin'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  // Modals state
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isSubmitWorkModalOpen, setIsSubmitWorkModalOpen] = useState(false);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);

  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedProposal, setSelectedProposal] = useState(null);

  useEffect(() => {
    loadJobs();
  }, [selectedCategory, searchQuery]);

  const loadJobs = async () => {
    setLoadingJobs(true);
    const data = await fetchJobs(selectedCategory, searchQuery);
    setJobs(data);
    setLoadingJobs(false);
  };

  const handleOpenDetails = (job) => {
    setSelectedJob(job);
    setIsDetailsModalOpen(true);
  };

  const handleOpenApply = (job) => {
    setSelectedJob(job);
    setIsApplyModalOpen(true);
  };

  const handleOpenSubmitWork = (proposal) => {
    setSelectedProposal(proposal);
    setIsSubmitWorkModalOpen(true);
  };

  const handleOpenRate = (proposal) => {
    setSelectedProposal(proposal);
    setIsRateModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-['Plus_Jakarta_Sans',sans-serif] flex flex-col">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        onOpenPostModal={() => setIsPostModalOpen(true)}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'marketplace' && (
          <JobMarketplace
            jobs={jobs}
            loadingJobs={loadingJobs}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelectJob={handleOpenDetails}
            onApplyJob={handleOpenApply}
          />
        )}

        {activeTab === 'employer' && (
          <EmployerDashboard
            jobs={jobs}
            onOpenPostModal={() => setIsPostModalOpen(true)}
            onRefresh={loadJobs}
            onRateFreelancer={handleOpenRate}
          />
        )}

        {activeTab === 'freelancer' && (
          <FreelancerDashboard
            onBrowseJobs={() => setActiveTab('marketplace')}
            onSubmitWork={handleOpenSubmitWork}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard
            jobs={jobs}
            onRefresh={loadJobs}
          />
        )}
      </main>


      {/* Footer */}
      <footer className="glass-panel border-t border-slate-800/80 py-8 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Dream More Platform • AppWorks Freelance Marketplace</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>React 19</span>
            <span>•</span>
            <span>PHP 8.3 REST API</span>
            <span>•</span>
            <span>MySQL 8</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <PostJobModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onJobCreated={loadJobs}
      />

      <SubmitProposalModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        job={selectedJob}
        onProposalSubmitted={loadJobs}
      />

      <JobDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        job={selectedJob}
        onApply={handleOpenApply}
      />

      <SubmitWorkModal
        isOpen={isSubmitWorkModalOpen}
        onClose={() => setIsSubmitWorkModalOpen(false)}
        contract={selectedProposal}
        onWorkSubmitted={loadJobs}
      />

      <RateReviewModal
        isOpen={isRateModalOpen}
        onClose={() => setIsRateModalOpen(false)}
        targetItem={selectedProposal}
        onReviewSubmitted={loadJobs}
      />
    </div>
  );
}

