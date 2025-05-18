import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch contacts with token
  const fetchContacts = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Not authorized');
      window.location.href = '/admin/login';
      return;
    }

    try {
      const res = await axios.get('http://localhost:5000/api/contacts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(res.data);
    } catch (err) {
      console.error('Failed to fetch contacts:', err.response?.data || err.message);
      if (err.response?.status === 401) {
        alert('Session expired, please login again');
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/admin/login'; // or use your router redirect
  };

  if (loading) return <p>Loading contacts...</p>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Panel - Contacts</h1>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Message</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No contacts found.
              </td>
            </tr>
          ) : (
            contacts.map((contact) => (
              <tr key={contact._id}>
                <td className="border border-gray-300 px-4 py-2">{contact.name}</td>
                <td className="border border-gray-300 px-4 py-2">{contact.email}</td>
                <td className="border border-gray-300 px-4 py-2">{contact.message}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(contact.createdAt).toLocaleString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
