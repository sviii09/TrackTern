import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import local logo images (place these files in src/assets)
import NykaaLogo from './assets/nykaa.jpeg';
import PepsiCoLogo from './assets/pepsi.jpeg';
import AmazonLogo from './assets/amazon.jpeg';
import FlipkartLogo from './assets/flipkart.jpeg';

interface Company {
  id: string;
  name: string;
  logoUrl: string;
  internships: Internship[];
}

interface Internship {
  title: string;
  type: string;
  location: string;
  stipend: string;
  duration: string;
}

const Companies: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated data with local and external logo URLs
    const sampleCompanies: Company[] = [
      {
        id: '1',
        name: 'Nykaa',
        logoUrl: NykaaLogo, // Local image import
        internships: [
          { title: 'Digital Marketing Intern', type: 'Work from Home', location: 'India', stipend: '₹15,000/month', duration: '2 months' },
          { title: 'Content Writer Intern', type: 'In-Office', location: 'Mumbai', stipend: '₹12,000/month', duration: '3 months' },
        ],
      },
      {
        id: '2',
        name: 'PepsiCo',
        logoUrl: PepsiCoLogo, // Local image import
        internships: [
          { title: 'Sales Intern', type: 'In-Office', location: 'Delhi', stipend: '₹18,000/month', duration: '2 months' },
          { title: 'Supply Chain Intern', type: 'Hybrid', location: 'Gurgaon', stipend: '₹20,000/month', duration: '3 months' },
        ],
      },
      {
        id: '3',
        name: 'Amazon',
        logoUrl: 'https://logocreator.io/blog/amazon-logo/', // External URL (SVG example)
        internships: [
          { title: 'Software Development Intern', type: 'Work from Home', location: 'India', stipend: '₹25,000/month', duration: '6 months' },
          { title: 'Data Analyst Intern', type: 'In-Office', location: 'Bangalore', stipend: '₹22,000/month', duration: '4 months' },
        ],
      },
      {
        id: '4',
        name: 'Flipkart',
        logoUrl: 'https://www.vecteezy.com/png/54650802-flipkart-logo-rounded-flipkart-logo-free-download-flipkart-logo', // Local image import
        internships: [
          { title: 'Product Management Intern', type: 'Hybrid', location: 'Hyderabad', stipend: '₹20,000/month', duration: '3 months' },
          { title: 'UI/UX Design Intern', type: 'In-Office', location: 'Bangalore', stipend: '₹18,000/month', duration: '2 months' },
        ],
      },
    ];
    setCompanies(sampleCompanies);
    setLoading(false);
  }, []);

  if (loading) return <p className="p-10 text-center">Loading...</p>;

  return (
    <section className="p-10 bg-gray-100">
      <h2 className="text-3xl font-bold mb-4">Featured Companies</h2>
      <p className="text-gray-700 mb-6">Explore top companies offering internships on our platform.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {companies.map((company) => (
          <div key={company.id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <img src={company.logoUrl} alt={`${company.name} logo`} className="w-20 h-20 mb-2 rounded" />
            <h3 className="text-xl font-semibold">{company.name}</h3>
            <div className="mt-2">
              {company.internships.map((internship, index) => (
                <div key={index} className="mb-2">
                  <h4 className="text-md font-medium">{internship.title}</h4>
                  <p className="text-gray-600">Type: {internship.type}</p>
                  <p className="text-gray-600">Location: {internship.location}</p>
                  <p className="text-gray-600">Stipend: {internship.stipend}</p>
                  <p className="text-gray-600">Duration: {internship.duration}</p>
                </div>
              ))}
            </div>
            <Link to={`/internship-search?company=${company.name}`} className="text-blue-700 mt-2 inline-block hover:underline">
              View More Internships
            </Link>
          </div>
        ))}
      </div>

      <button
        className="bg-blue-700 text-white px-4 py-2 rounded mt-6 hover:bg-blue-800 transition"
        onClick={() => window.history.back()}
      >
        Back to Home
      </button>
    </section>
  );
};

export default Companies;