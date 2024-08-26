import { Link, useLocation } from 'react-router-dom';
import logo from './asset/logo.png';
import { useState } from 'react';

const Sidebar = () => {
  const location = useLocation(); // Untuk mendapatkan URL saat ini
  const [activeMenu, setActiveMenu] = useState(location.pathname); // Set initial state berdasarkan URL

  const handleMenuClick = (path) => {
    setActiveMenu(path);
  };

  return (
    <div className="sidebar">
      <img src={logo} alt="logo" />
      <ul>
        <li>
          <Link
            to="/summary"
            className={activeMenu === '/summary' ? 'active' : ''}
            onClick={() => handleMenuClick('/summary')}
          >
            Summary
          </Link>
        </li>

        <li>
          <Link
            to="/contract"
            className={activeMenu === '/contract' ? 'active' : ''}
            onClick={() => handleMenuClick('/contract')}
          >
            Contract
          </Link>
        </li>

        <li>
          <Link
            to="/data-center"
            className={activeMenu === '/data-center' ? 'active' : ''}
            onClick={() => handleMenuClick('/data-center')}
          >
            Data Center
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;


// import { Link, useLocation } from 'react-router-dom';
// import logo from './asset/logo.png';
// import { useState } from 'react';

// const Sidebar = () => {
//   const location = useLocation(); 
//   const [activeMenu, setActiveMenu] = useState(location.pathname); 
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State untuk mengontrol sidebar

//   const handleMenuClick = (path) => {
//     setActiveMenu(path);
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar
//   };

//   return (
//     <div>
//       {/* Tombol untuk membuka/tutup sidebar */}
//       <button onClick={toggleSidebar}>
//         {isSidebarOpen ? '<' : '>'}
//       </button>

//       {/* Sidebar hanya akan ditampilkan jika isSidebarOpen true */}
//       {isSidebarOpen && (
//         <div className="sidebar">
//           <img src={logo} alt="logo" />
//           <ul>
//             <li>
//               <Link
//                 to="/summary"
//                 className={activeMenu === '/summary' ? 'active' : ''}
//                 onClick={() => handleMenuClick('/summary')}
//               >
//                 Summary
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/contract"
//                 className={activeMenu === '/contract' ? 'active' : ''}
//                 onClick={() => handleMenuClick('/contract')}
//               >
//                 Contract
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/data-center"
//                 className={activeMenu === '/data-center' ? 'active' : ''}
//                 onClick={() => handleMenuClick('/data-center')}
//               >
//                 Data Center
//               </Link>
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Sidebar;
