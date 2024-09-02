import { Link, useLocation } from 'react-router-dom';
import logo from './asset/logo.png';
import { useState } from 'react';

const Sidebar = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(location.pathname);

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
            to="/mpti"
            className={activeMenu === '/mpti' ? 'active' : ''}
            onClick={() => handleMenuClick('/mpti')}
          >
            MPTI
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
            to="/upload"
            className={activeMenu === '/upload' ? 'active' : ''}
            onClick={() => handleMenuClick('/upload')}
          >
            Upload
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
      </ul>
    </div>
  );
}

export default Sidebar;
