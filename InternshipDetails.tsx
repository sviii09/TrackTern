import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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

const InternshipDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [internship, setInternship] = React.useState<Internship | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setLoading(true);
    axios
      .get<Internship>(`http://localhost:5000/api/internships/${id}`)
      .then((response) => {
        setInternship(response.data);
      })
      .catch((error: Error) => {
        setError('Failed to fetch internship details');
        console.error('Error:', error);
      })
      .then(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-10 text-center">Loading...</p>;
  if (error) return <p className="p-10 text-center text-red-500">{error}</p>;
  if (!internship) return <p className="p-10 text-center">Internship not found</p>;

  return (
    <section className="p-10 bg-gray-50">
      <h2 className="text-3xl font-bold mb-4">{internship.title}</h2>
      <p className="text-gray-600 mb-2"><strong>Location:</strong> {internship.location}</p>
      <p className="text-gray-600 mb-2"><strong>Type:</strong> {internship.type}</p>
      <p className="text-gray-600 mb-2"><strong>Company:</strong> {internship.company}</p>
      <p className="text-gray-600 mb-2"><strong>Date:</strong> {internship.date}</p>
      <p className="text-gray-600 mb-2"><strong>Open Positions:</strong> {internship.openPositions}</p>
      <p className="text-gray-700 mb-6"><strong>Description:</strong> {internship.description}</p>
      <button
        className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
        onClick={() => window.history.back()}
      >
        Back to Listings
      </button>
    </section>
  );
};

export default InternshipDetails;