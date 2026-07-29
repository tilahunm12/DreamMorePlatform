import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/appworks';

// Initial Mock Data Store for offline / direct browser testing
let mockJobs = [
  {
    id: 1,
    employer_id: 1,
    employer_name: 'TechCorp Ethiopia',
    employer_avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=80',
    title: 'Full-Stack Developer for E-Learning Dashboard',
    description: 'We require an experienced developer to create an interactive LMS dashboard using React 19, Vite, and PHP REST API. Must include student analytics and course progress tracking.',
    category: 'Technology',
    budget: 1200,
    deadline: '2026-08-15',
    status: 'open',
    proposals_count: 3,
    created_at: '2026-07-28'
  },
  {
    id: 2,
    employer_id: 2,
    employer_name: 'Ethio-Creative Studio',
    employer_avatar: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&auto=format&fit=crop&q=80',
    title: 'Brand Identity & Logo Redesign for Dream More',
    description: 'Redesign our corporate identity and logo suite. We need modern vector assets (SVG), color palettes, and social media banners.',
    category: 'Creative',
    budget: 450,
    deadline: '2026-08-10',
    status: 'open',
    proposals_count: 2,
    created_at: '2026-07-27'
  },
  {
    id: 3,
    employer_id: 1,
    employer_name: 'Addis Mech Engineering',
    employer_avatar: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=100&auto=format&fit=crop&q=80',
    title: 'SolidWorks 3D Modeling for Prototype Gearbox',
    description: 'CAD modeling and stress simulation for custom mechanical gearbox components. Engineering certification preferred.',
    category: 'Engineering',
    budget: 850,
    deadline: '2026-08-20',
    status: 'open',
    proposals_count: 1,
    created_at: '2026-07-26'
  },
  {
    id: 4,
    employer_id: 2,
    employer_name: 'Habesha Tech Hub',
    employer_avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&auto=format&fit=crop&q=80',
    title: 'Digital Marketing & Lead Generation Strategy',
    description: 'Drive target tech graduate signups for our career incubation launch. Experience with Google Ads, Meta Ads, and Telegram channel growth required.',
    category: 'Business',
    budget: 650,
    deadline: '2026-08-25',
    status: 'open',
    proposals_count: 4,
    created_at: '2026-07-25'
  }
];

let mockProposals = [
  {
    id: 101,
    job_id: 1,
    job_title: 'Full-Stack Developer for E-Learning Dashboard',
    freelancer_id: 3,
    freelancer_name: 'Tilahun Abebe',
    freelancer_title: 'Full-Stack React & PHP Developer',
    freelancer_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    freelancer_rating: 4.95,
    completed_jobs: 14,
    proposal_text: 'I have extensive experience building React 19 dashboards with pure PHP REST backend. I can complete this within 5 days with zero friction.',
    amount: 1100,
    delivery_days: 5,
    status: 'pending',
    created_at: '2026-07-29'
  },
  {
    id: 102,
    job_id: 2,
    job_title: 'Brand Identity & Logo Redesign for Dream More',
    freelancer_id: 4,
    freelancer_name: 'Selamawit Kassa',
    freelancer_title: 'UI/UX & Visual Designer',
    freelancer_avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    freelancer_rating: 5.0,
    completed_jobs: 9,
    proposal_text: 'I specialize in clean modern corporate branding and Figma design systems. I will deliver full vector assets, brand style guide, and presentation mockups.',
    amount: 400,
    delivery_days: 3,
    status: 'accepted',
    created_at: '2026-07-28'
  }
];

export const fetchJobs = async (category = 'All', search = '') => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get_jobs.php`, {
      params: { category, search },
      timeout: 2500
    });
    if (response.data && response.data.status === 'success') {
      return response.data.data;
    }
  } catch (error) {
    // Fallback to client-side mock store
  }

  return mockJobs.filter(job => {
    const matchCategory = (category === 'All' || job.category === category);
    const matchSearch = (
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.description.toLowerCase().includes(search.toLowerCase())
    );
    return matchCategory && matchSearch;
  });
};

export const createJob = async (jobData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create_job.php`, jobData, { timeout: 2500 });
    if (response.data && response.data.status === 'success') {
      return response.data;
    }
  } catch (error) {
    // Fallback mock insertion
  }

  const newJob = {
    id: Date.now(),
    employer_id: jobData.employer_id || 1,
    employer_name: jobData.employer_name || 'My Company',
    employer_avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=80',
    title: jobData.title,
    description: jobData.description,
    category: jobData.category,
    budget: parseFloat(jobData.budget),
    deadline: jobData.deadline,
    status: 'open',
    proposals_count: 0,
    created_at: new Date().toISOString().split('T')[0]
  };

  mockJobs.unshift(newJob);
  return { status: 'success', message: 'Job created locally', job: newJob };
};

export const submitProposal = async (proposalData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/submit_proposal.php`, proposalData, { timeout: 2500 });
    if (response.data && response.data.status === 'success') {
      return response.data;
    }
  } catch (error) {
    // Fallback mock proposal
  }

  const newProposal = {
    id: Date.now(),
    job_id: proposalData.job_id,
    job_title: proposalData.job_title || 'AppWorks Project',
    freelancer_id: proposalData.freelancer_id || 3,
    freelancer_name: proposalData.freelancer_name || 'Tilahun Abebe',
    freelancer_title: proposalData.freelancer_title || 'AppWorks Freelancer',
    freelancer_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    freelancer_rating: 4.9,
    completed_jobs: 12,
    proposal_text: proposalData.proposal_text,
    amount: parseFloat(proposalData.amount),
    delivery_days: parseInt(proposalData.delivery_days || 7),
    status: 'pending',
    created_at: new Date().toISOString().split('T')[0]
  };

  mockProposals.unshift(newProposal);

  // update job proposals count
  const targetJob = mockJobs.find(j => j.id === proposalData.job_id);
  if (targetJob) {
    targetJob.proposals_count = (targetJob.proposals_count || 0) + 1;
  }

  return { status: 'success', message: 'Proposal submitted successfully', proposal: newProposal };
};

export const fetchProposals = async (job_id = null, freelancer_id = null) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get_proposals.php`, {
      params: { job_id, freelancer_id },
      timeout: 2500
    });
    if (response.data && response.data.status === 'success') {
      return response.data.data;
    }
  } catch (error) {
    // Fallback mock proposals fetch
  }

  return mockProposals.filter(p => {
    if (job_id && p.job_id !== job_id) return false;
    if (freelancer_id && p.freelancer_id !== freelancer_id) return false;
    return true;
  });
};

export const updateProposalStatus = async (proposal_id, status) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/update_proposal.php`, { proposal_id, status }, { timeout: 2500 });
    if (response.data && response.data.status === 'success') {
      return response.data;
    }
  } catch (error) {
    // Fallback update
  }

  const prop = mockProposals.find(p => p.id === proposal_id);
  if (prop) {
    prop.status = status;
    if (status === 'accepted') {
      const job = mockJobs.find(j => j.id === prop.job_id);
      if (job) job.status = 'in_progress';
    }
  }
  return { status: 'success', message: `Proposal status updated to ${status}` };
};
