// // // AdminDashboard.jsx
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';

// // const AdminDashboard = () => {
// //   const [contacts, setContacts] = useState([]);

// //   useEffect(() => {
// //     const fetchContacts = async () => {
// //       const token = localStorage.getItem('token');
// //       const res = await axios.get('http://localhost:5000/api/contact/all', {
// //         headers: { Authorization: `Bearer ${token}` }
// //       });
// //       setContacts(res.data);
// //     };

// //     fetchContacts();
// //   }, []);

// //   return (
// //     <div>
// //       <h2>Contact Submissions</h2>
// //       <ul>
// //         {contacts.map((c, i) => (
// //           <li key={i}>
// //             <strong>{c.name}</strong>: {c.subject} — {c.message}
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default AdminDashboard;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AdminDashboard = () => {
//   const [contacts, setContacts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchContacts = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get('http://localhost:5000/api/contact/all', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setContacts(res.data);
//       } catch (error) {
//         console.error('Error fetching contacts:', error);
//       }
//     };

//     fetchContacts();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/admin/login');
//   };

//   return (
//     <div className="flex mt-[100px] min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
//         <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        
//         <nav className="flex flex-col gap-4">
//           <button
//             onClick={() => navigate('/admin/dashboard')}
//             className="text-left px-3 py-2 rounded hover:bg-blue-100"
//           >
//             Contacts
//           </button>

//           {/* Add more sidebar links here */}
//           {/* <button ...>Another Section</button> */}
//         </nav>

//         <div className="mt-auto">
//           <button
//             onClick={handleLogout}
//             className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
//           >
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-grow p-8">
//         <h2 className="text-3xl font-semibold mb-6">Contact Submissions</h2>

//         <div className="overflow-x-auto bg-white rounded shadow">
//           <table className="min-w-full table-auto">
//             <thead className="bg-gray-200 text-gray-700">
//               <tr>
//                 <th className="px-6 py-3 border-b">Name</th>
//                 <th className="px-6 py-3 border-b">Email</th>
//                 <th className="px-6 py-3 border-b">Subject</th>
//                 <th className="px-6 py-3 border-b">Message</th>
//               </tr>
//             </thead>
//             <tbody>
//               {contacts.length === 0 ? (
//                 <tr>
//                   <td colSpan="4" className="text-center py-6">
//                     No contact submissions found.
//                   </td>
//                 </tr>
//               ) : (
//                 contacts.map((c, i) => (
//                   <tr
//                     key={i}
//                     className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
//                   >
//                     <td className="px-6 py-4 border-b">{c.name}</td>
//                     <td className="px-6 py-4 border-b">{c.email}</td>
//                     <td className="px-6 py-4 border-b">{c.subject}</td>
//                     <td className="px-6 py-4 border-b">{c.message}</td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ContactsTable from './ContactTable';  // Import it here

const AdminDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [activeSection, setActiveSection] = useState('contacts');  // default active
  const navigate = useNavigate();

  useEffect(() => {
    if (activeSection === 'contacts') {
      const fetchContacts = async () => {
        try {
          const token = localStorage.getItem('token');
          const res = await axios.get('http://localhost:5000/api/contact/all', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setContacts(res.data);
        } catch (error) {
          console.error('Error fetching contacts:', error);
        }
      };
      fetchContacts();
    }
  }, [activeSection]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div className="flex mt-[100px] min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        
        <nav className="flex flex-col gap-4">
          <button
            onClick={() => setActiveSection('contacts')}
            className={`text-left px-3 py-2 rounded hover:bg-blue-100 ${
              activeSection === 'contacts' ? 'bg-blue-200 font-semibold' : ''
            }`}
          >
            Contacts
          </button>
          


        </nav>

        <div className="mt-[500px]">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8">
        {activeSection === 'contacts' && (
          <>
            <h2 className="text-3xl font-semibold mb-6">Contact Submissions</h2>
            <ContactsTable contacts={contacts} />
          </>
        )}

        {/* Render other sections conditionally here */}
      </main>
    </div>
  );
};

export default AdminDashboard;
