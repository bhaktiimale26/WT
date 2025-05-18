// ContactsTable.jsx
import React from 'react';

const ContactsTable = ({ contacts }) => {
  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="px-6 py-3 border-b">Name</th>
            <th className="px-6 py-3 border-b">Email</th>
            <th className="px-6 py-3 border-b">Subject</th>
            <th className="px-6 py-3 border-b">Message</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-6">
                No contact submissions found.
              </td>
            </tr>
          ) : (
            contacts.map((c, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 border-b">{c.name}</td>
                <td className="px-6 py-4 border-b">{c.email}</td>
                <td className="px-6 py-4 border-b">{c.subject}</td>
                <td className="px-6 py-4 border-b">{c.message}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactsTable;
