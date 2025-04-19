import React from 'react';

const Pages: React.FC = () => {
  return (
    <section className="p-10 bg-gray-100">
      <h2 className="text-3xl font-bold mb-4">Pages Page</h2>
      <p className="text-gray-700">Additional pages content here.</p>
      <button
        className="bg-blue-700 text-white px-4 py-2 rounded mt-6 hover:bg-blue-800 transition"
        onClick={() => window.history.back()}
      >
        Back to Home
      </button>
    </section>
  );
};

export default Pages;