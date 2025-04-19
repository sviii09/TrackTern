import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Define the Internship interface (same as in App.tsx)
interface Internship {
  _id?: string;
  title: string;
  location: string;
  type: string;
  company: string;
  date: string;
  description: string;
  openPositions: number;
}

const InternshipSearch: React.FC = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    category: 'All',
    experienceLevel: 'All',
    duration: 'All',
  });
  const [savedInternships, setSavedInternships] = useState<string[]>(() => {
    const saved = localStorage.getItem('savedInternships');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get<Internship[]>('http://localhost:5000/api/internships')
      .then((response) => {
        setInternships(response.data);
      })
      .catch((error: Error) => {
        setError('Failed to fetch internships');
      })
      .then(() => {
        setLoading(false); // Reset loading state after success or error
      });
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSaveInternship = (id: string) => {
    if (!savedInternships.includes(id)) {
      const updatedSaved = [...savedInternships, id];
      setSavedInternships(updatedSaved);
      localStorage.setItem('savedInternships', JSON.stringify(updatedSaved));
    }
  };

  const filteredInternships = internships.filter((internship) => {
    const matchesCategory = filters.category === 'All' || internship.title.toLowerCase().includes(filters.category.toLowerCase());
    const matchesExperience = filters.experienceLevel === 'All' || internship.type === filters.experienceLevel;
    const matchesDuration = filters.duration === 'All' || internship.description.toLowerCase().includes(filters.duration.toLowerCase());
    return matchesCategory && matchesExperience && matchesDuration;
  });

  if (loading) return <p className="p-10 text-center">Loading...</p>;
  if (error) return <p className="p-10 text-center text-red-500">{error}</p>;

  return (
    <section className="p-10 bg-gray-100">
      <h2 className="text-3xl font-bold mb-4">Advanced Internship Search</h2>
      <p className="text-gray-700 mb-6">Find internships with advanced filters and save your favorites.</p>

      {/* Advanced Search Filters */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-2">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="All">All Categories</option>
            <option value="Web Developer">Web Developer</option>
            <option value="Marketing">Marketing</option>
            <option value="Data Analyst">Data Analyst</option>
          </select>
          <select
            name="experienceLevel"
            value={filters.experienceLevel}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="All">All Levels</option>
            <option value="Intern">Intern</option>
            <option value="Entry Level">Entry Level</option>
          </select>
          <select
            name="duration"
            value={filters.duration}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="All">All Durations</option>
            <option value="3 months">3 months</option>
            <option value="6 months">6 months</option>
          </select>
        </div>
      </div>

      {/* Internship Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredInternships.map((internship) => (
          <div key={internship._id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-semibold">{internship.title}</h4>
                <p className="text-gray-600">{internship.company} | {internship.location}</p>
                <p className="text-gray-500 text-sm">{internship.date}</p>
                <p className="text-gray-700 mt-2">{internship.description.substring(0, 100)}...</p>
              </div>
              <button
                onClick={() => handleSaveInternship(internship._id || '')}
                className={`px-3 py-1 rounded ${savedInternships.includes(internship._id || '') ? 'bg-gray-400' : 'bg-blue-700 text-white hover:bg-blue-800'} transition`}
                disabled={savedInternships.includes(internship._id || '')}
              >
                {savedInternships.includes(internship._id || '') ? 'Saved' : 'Save'}
              </button>
            </div>
            <Link to={`/internship/${internship._id}`} className="text-blue-700 mt-2 inline-block hover:underline">
              View Details
            </Link>
          </div>
        ))}
      </div>

      {filteredInternships.length === 0 && !loading && !error && (
        <p className="text-center text-gray-500 mt-4">No internships found matching your criteria.</p>
      )}

      <button
        className="bg-blue-700 text-white px-4 py-2 rounded mt-6 hover:bg-blue-800 transition"
        onClick={() => window.history.back()}
      >
        Back to Home
      </button>
    </section>
  );
};

export default InternshipSearch;