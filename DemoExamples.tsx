import React, { useState } from 'react';

const DemoExamples: React.FC = () => {
  const [counter, setCounter] = useState(0);

  const sampleInternships = [
    { title: 'Web Developer Intern', company: 'TechCorp', location: 'Remote' },
    { title: 'Marketing Intern', company: 'AdAgency', location: 'New York' },
    { title: 'Data Analyst Intern', company: 'DataInsight', location: 'San Francisco' },
  ];

  return (
    <section className="p-10 bg-gray-100">
      <h2 className="text-3xl font-bold mb-4">Demo Examples</h2>
      <p className="text-gray-700 mb-6">Explore interactive examples showcasing platform features.</p>

      {/* Counter Demo */}
      <div className="mb-8 p-4 bg-white rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-2">Interactive Counter</h3>
        <p className="mb-2">Click the buttons to increment or decrement the counter.</p>
        <div className="flex items-center space-x-4">
          <button
            className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-800 transition"
            onClick={() => setCounter(counter - 1)}
          >
            -
          </button>
          <span className="text-2xl">{counter}</span>
          <button
            className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-800 transition"
            onClick={() => setCounter(counter + 1)}
          >
            +
          </button>
        </div>
      </div>

      {/* Internship Cards Demo */}
      <div className="mb-8 p-4 bg-white rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-2">Internship Card Layout</h3>
        <p className="mb-2">Sample internship listings with a card design.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sampleInternships.map((internship, index) => (
            <div key={index} className="p-4 bg-blue-50 rounded-lg shadow hover:shadow-lg transition">
              <h4 className="text-lg font-medium">{internship.title}</h4>
              <p className="text-gray-600">{internship.company}</p>
              <p className="text-gray-500 text-sm">{internship.location}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Demo (Simulated) */}
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-2">Application Statistics (Simulated Chart)</h3>
        <p className="mb-2">A visual representation of internship applications.</p>
        <div className="w-full h-64 bg-gradient-to-r from-blue-100 to-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-700">50% Web Dev</p>
            <div className="w-1/2 bg-blue-500 h-8 rounded mt-2"></div>
            <p className="text-gray-700 mt-2">30% Marketing</p>
            <div className="w-1/3 bg-green-500 h-8 rounded mt-2"></div>
            <p className="text-gray-700 mt-2">20% Data Analysis</p>
            <div className="w-1/5 bg-yellow-500 h-8 rounded mt-2"></div>
          </div>
        </div>
      </div>

      <button
        className="bg-blue-700 text-white px-4 py-2 rounded mt-6 hover:bg-blue-800 transition"
        onClick={() => window.history.back()}
      >
        Back to Demos
      </button>
    </section>
  );
};

export default DemoExamples;