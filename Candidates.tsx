import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Candidate {
  id: string;
  name: string;
  location: string;
  education: string;
  internship: string;
  companyPlaced: string;
  placementDate: string;
}

const Candidates: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated data inspired by Internshala and other internship platforms
    const sampleCandidates: Candidate[] = [
      {
        id: '1',
        name: 'Priya Sharma',
        location: 'Mumbai, India',
        education: 'B.Tech in Computer Science, Mumbai University',
        internship: 'Digital Marketing Intern at Nykaa',
        companyPlaced: 'Amazon',
        placementDate: 'March 2025',
      },
      {
        id: '2',
        name: 'Rahul Verma',
        location: 'Delhi, India',
        education: 'MBA, IIM Ahmedabad',
        internship: 'Sales Intern at PepsiCo',
        companyPlaced: 'Flipkart',
        placementDate: 'February 2025',
      },
      {
        id: '3',
        name: 'Emily Johnson',
        location: 'New York, USA',
        education: 'B.Sc. in Data Science, NYU',
        internship: 'Data Analyst Intern at Google',
        companyPlaced: 'Microsoft',
        placementDate: 'January 2025',
      },
      {
        id: '4',
        name: 'Lucas Müller',
        location: 'Berlin, Germany',
        education: 'M.Eng. in Software Engineering, TU Berlin',
        internship: 'Software Development Intern at SAP',
        companyPlaced: 'Siemens',
        placementDate: 'December 2024',
      },
      {
        id: '5',
        name: 'Aiko Tanaka',
        location: 'Tokyo, Japan',
        education: 'B.A. in Marketing, Waseda University',
        internship: 'Content Writer Intern at Sony',
        companyPlaced: 'Toyota',
        placementDate: 'November 2024',
      },
      {
        id: '6',
        name: 'Sophia Mendes',
        location: 'São Paulo, Brazil',
        education: 'B.B.A. in Finance, USP',
        internship: 'Finance Intern at Itaú Unibanco',
        companyPlaced: 'Nestlé',
        placementDate: 'October 2024',
      },
    ];
    setCandidates(sampleCandidates);
    setLoading(false);
  }, []);

  if (loading) return <p className="p-10 text-center">Loading...</p>;

  return (
    <section className="p-10 bg-gray-100">
      <h2 className="text-3xl font-bold mb-4">Success Stories of Candidates</h2>
      <p className="text-gray-700 mb-6">Explore how candidates worldwide secured internships and landed jobs at top companies.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {candidates.map((candidate) => (
          <div key={candidate.id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">{candidate.name}</h3>
            <p className="text-gray-600">Location: {candidate.location}</p>
            <p className="text-gray-600">Education: {candidate.education}</p>
            <p className="text-gray-600">Internship: {candidate.internship}</p>
            <p className="text-gray-600">Placed at: {candidate.companyPlaced}</p>
            <p className="text-gray-600">Placement Date: {candidate.placementDate}</p>
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

export default Candidates;