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

        <li>
          <Link
            to="/e-learning"
            className={activeMenu === '/e-learning' ? 'active' : ''}
            onClick={() => handleMenuClick('/e-learning')}
          >
            E-Learning
          </Link>
        </li>

        <li>
          <Link
            to="/helpdesk"
            className={activeMenu === '/helpdesk' ? 'active' : ''}
            onClick={() => handleMenuClick('/helpdesk')}
          >
            Helpdesk
          </Link>
        </li>

        <li>
          <Link
            to="/kpi"
            className={activeMenu === '/kpi' ? 'active' : ''}
            onClick={() => handleMenuClick('/kpi')}
          >
            KPI
          </Link>
        </li>

        <li>
          <Link
            to="/finance"
            className={activeMenu === '/finance' ? 'active' : ''}
            onClick={() => handleMenuClick('/finance')}
          >
            Finance
          </Link>
        </li>

        <li>
          <Link
            to="/tata-kelola"
            className={activeMenu === '/tata-kelola' ? 'active' : ''}
            onClick={() => handleMenuClick('/tata-kelola')}
          >
            Tata Kelola
          </Link>
        </li>

        <li>
          <Link
            to="/rka"
            className={activeMenu === '/rka' ? 'active' : ''}
            onClick={() => handleMenuClick('/rka')}
          >
            RKA
          </Link>
        </li>

        <li>
          <Link
            to="/mpti"
            className={activeMenu === '/mpti' ? 'active' : ''}
            onClick={() => handleMenuClick('/mpti')}
          >
            MPTI
          </Link>
        </li>

        <li>
          <Link
            to="/work-order"
            className={activeMenu === '/work-order' ? 'active' : ''}
            onClick={() => handleMenuClick('/work-order')}
          >
            Work Order
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;