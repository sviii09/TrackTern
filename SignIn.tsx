import React, { useState } from 'react';

interface UserData {
  username: string;
  phoneNumber: string;
  email: string;
}

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState<UserData>({
    username: '',
    phoneNumber: '',
    email: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!formData.username || !formData.phoneNumber || !formData.email) {
      setError('All fields are required.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    // Store data in localStorage
    localStorage.setItem('userData', JSON.stringify(formData));
    setIsLoggedIn(true);
    setError(null);
    alert('Login successful! Details stored.');
    // Optionally redirect or update app state
    window.history.back();
  };

  if (isLoggedIn) {
    return <p className="p-10 text-center text-green-600">You are logged in! <button onClick={() => window.history.back()} className="text-blue-700 underline">Back to Home</button></p>;
  }

  return (
    <section className="p-10 bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-4 text-center">Sign In</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your phone number (10 digits)"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
          >
            Sign In
          </button>
        </form>
        <button
          className="w-full mt-4 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
          onClick={() => window.history.back()}
        >
          Back to Home
        </button>
      </div>
    </section>
  );
};

export default SignIn;