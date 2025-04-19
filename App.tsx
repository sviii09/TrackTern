import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import './App.css';
import './index.css'; // Ensure Tailwind directives are included here
import InternshipDetails from './InternshipDetails';
import Demos from './Demos';
import DemoExamples from './DemoExamples';
import FindInternships from './FindInternships';
import Companies from './Companies';
import Candidates from './Candidates';
import Blog from './Blog';
import About from './About'; // New About component
import SignIn from './SignIn';

// Define the Internship interface based on the backend schema
interface Internship {
  _id?: string; // Optional MongoDB ID
  title: string;
  location: string;
  type: string;
  company: string;
  date: string;
  description: string;
  openPositions: number;
}

const Header = () => (
  <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-6 flex justify-between items-center">
    <h1 className="text-3xl font-bold">Tracktern</h1>
    <nav className="space-x-4">
      <NavLink to="/demos" className="hover:text-blue-300">Demos</NavLink>
      <NavLink to="/demo-examples" className="hover:text-blue-300">Demo Examples</NavLink>
      <NavLink to="/find-internships" className="hover:text-blue-300">Find Internships</NavLink>
      <NavLink to="/companies" className="hover:text-blue-300">Companies</NavLink>
      <NavLink to="/candidates" className="hover:text-blue-300">Candidates</NavLink>
      <NavLink to="/blog" className="hover:text-blue-300">Blog</NavLink>
      <NavLink to="/about" className="hover:text-blue-300">About</NavLink> {/* Replaced Pages with About */}
      <NavLink to="/sign-in" className="bg-white text-blue-700 px-4 py-2 rounded hover:bg-gray-200">Sign In</NavLink>
    </nav>
  </header>
);

const HeroSection = ({ searchTerm, setSearchTerm, location, setLocation }: { 
  searchTerm: string; 
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
}) => (
  <section className="relative bg-blue-100 p-10 text-center">
    <h2 className="text-5xl font-bold mb-4">Find the perfect internship for you</h2>
    <p className="text-lg mb-6">Search your career opportunity through 1,200 internships</p>
    <div className="flex justify-center mb-6">
      <input
        type="text"
        placeholder="Job Title or Course"
        className="p-2 rounded-l w-1/4 border border-gray-300"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        className="p-2 w-1/4 border-t border-b border-r border-gray-300"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button 
        className="bg-blue-700 text-white p-2 rounded-r ml-2"
        onClick={() => { setSearchTerm(searchTerm); setLocation(location); }}
      >
        Search
      </button>
    </div>
    <div className="flex justify-center space-x-2">
      <span className="bg-white p-2 rounded cursor-pointer hover:bg-gray-200">Designer</span>
      <span className="bg-white p-2 rounded cursor-pointer hover:bg-gray-200">Writer</span>
      <span className="bg-white p-2 rounded cursor-pointer hover:bg-gray-200">Team Leader</span>
      <span className="bg-white p-2 rounded cursor-pointer hover:bg-gray-200">Fullstack</span>
      <span className="bg-white p-2 rounded cursor-pointer hover:bg-gray-200">Tech</span>
    </div>
    <div className="absolute right-10 top-10">
      <img src="https://via.placeholder.com/200x300" alt="Professional" className="rounded" />
      <div className="bg-blue-200 p-2 rounded mt-2">
        <p>319 offers in Business Development</p>
        <p>265 offers in Marketing & Communication</p>
        <p>324 offers in Project Management</p>
      </div>
    </div>
  </section>
);

const CategorySection = ({ setCategory }: { setCategory: React.Dispatch<React.SetStateAction<string>> }) => (
  <section className="p-10 bg-white">
    <h3 className="text-2xl font-bold mb-4">Search by Category</h3>
    <p className="mb-6">Search your career opportunity with our categories</p>
    <div className="flex justify-center space-x-4">
      <div 
        className="bg-blue-50 p-6 rounded-lg text-center w-40 hover:bg-blue-100 transition cursor-pointer"
        onClick={() => setCategory('Business Development')}
      >
        <div className="bg-blue-200 rounded-full p-3 inline-block mb-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z" />
          </svg>
        </div>
        <h4>Business Development</h4>
        <p>2 open positions</p>
      </div>
      <div 
        className="bg-blue-50 p-6 rounded-lg text-center w-40 hover:bg-blue-100 transition cursor-pointer"
        onClick={() => setCategory('Construction')}
      >
        <div className="bg-blue-200 rounded-full p-3 inline-block mb-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h4>Construction</h4>
        <p>0 open positions</p>
      </div>
      <div 
        className="bg-blue-50 p-6 rounded-lg text-center w-40 hover:bg-blue-100 transition cursor-pointer"
        onClick={() => setCategory('Customer Service')}
      >
        <div className="bg-blue-200 rounded-full p-3 inline-block mb-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01" />
          </svg>
        </div>
        <h4>Customer Service</h4>
        <p>2 open positions</p>
      </div>
      <div 
        className="bg-blue-50 p-6 rounded-lg text-center w-40 hover:bg-blue-100 transition cursor-pointer"
        onClick={() => setCategory('Finance')}
      >
        <div className="bg-blue-200 rounded-full p-3 inline-block mb-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z" />
          </svg>
        </div>
        <h4>Finance</h4>
        <p>1 open positions</p>
      </div>
      <div 
        className="bg-blue-50 p-6 rounded-lg text-center w-40 hover:bg-blue-100 transition cursor-pointer"
        onClick={() => setCategory('Healthcare')}
      >
        <div className="bg-blue-200 rounded-full p-3 inline-block mb-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
          </svg>
        </div>
        <h4>Healthcare</h4>
        <p>0 open positions</p>
      </div>
      <div 
        className="bg-blue-50 p-6 rounded-lg text-center w-40 hover:bg-blue-100 transition cursor-pointer"
        onClick={() => setCategory('Human Resources')}
      >
        <div className="bg-blue-200 rounded-full p-3 inline-block mb-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h4>Human Resources</h4>
        <p>1 open positions</p>
      </div>
    </div>
  </section>
);

const JobOfferSection = ({ searchTerm, location, category }: { searchTerm: string; location: string; category: string }) => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    console.log('Starting API request...');
    axios
      .get<Internship[]>('http://localhost:5000/api/internships')
      .then((response) => {
        console.log('API response received:', response.data);
        setInternships(response.data);
        setLoading(false); // Set loading to false on success
      })
      .catch((error: Error) => {
        console.error('API error:', error);
        setError(`Failed to fetch internships: ${error.message}`);
        setLoading(false); // Set loading to false on error
      });
  }, []);

  const filteredInternships = internships.filter(internship =>
    internship.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    internship.location.toLowerCase().includes(location.toLowerCase()) &&
    (category === '' || internship.title.toLowerCase().includes(category.toLowerCase()))
  );

  if (loading) return <p className="p-10 text-center">Loading...</p>;
  if (error) return <p className="p-10 text-center text-red-500">{error}</p>;

  return (
    <section className="p-10 bg-gray-50">
      <h3 className="text-2xl font-bold mb-4">Featured Internship Offers</h3>
      <p className="mb-6">Search your career opportunity through 1,200 internships</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredInternships.map((internship) => (
          <div key={internship._id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <Link to={`/internship/${internship._id}`} className="block">
              <div className="flex items-center mb-2">
                <div className="bg-blue-200 rounded-full p-2 mr-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold">{internship.title}</h4>
                  <p className="text-gray-600">{internship.location} | {internship.type}</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm">{internship.date} by {internship.company}</p>
            </Link>
          </div>
        ))}
      </div>
      {filteredInternships.length === 0 && !loading && !error && (
        <p className="text-center text-gray-500 mt-4">No internships found matching your criteria.</p>
      )}
      <button className="bg-blue-700 text-white px-4 py-2 rounded mt-6 hover:bg-blue-800 transition">All Job Offers</button>
    </section>
  );
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');

  return (
    <Router>
      <div>
        <Header />
        <HeroSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} location={location} setLocation={setLocation} />
        <CategorySection setCategory={setCategory} />
        <JobOfferSection searchTerm={searchTerm} location={location} category={category} />
        <Routes>
          <Route path="/" element={<><HeroSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} location={location} setLocation={setLocation} /><CategorySection setCategory={setCategory} /><JobOfferSection searchTerm={searchTerm} location={location} category={category} /></>} />
          <Route path="/internship/:id" element={<InternshipDetails />} />
          <Route path="/demos" element={<Demos />} />
          <Route path="/demo-examples" element={<DemoExamples />} />
          <Route path="/find-internships" element={<FindInternships />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} /> {/* Replaced Pages with About */}
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;