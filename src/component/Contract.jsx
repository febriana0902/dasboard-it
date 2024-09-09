import { useState} from 'react';
import { useContractData } from './DataContext';
import './css/Contract.css';
import menu from './asset/menu-sidebar.png';
import ContractModal from './ContractModal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

const Contract = ({ toggleSidebar, isSidebarOpen }) => {
  // Mengambil data
  const { users } = useContractData();
  if (!users) return <div>Loading...</div>;

  // State
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContract, setSelectedContract] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRole, setSelectedRole] = useState('');

  // Mendapatkan pelanggan unik dan peran unik dari data
  const uniqueCustomers = [...new Set(users.map(user => user.firstName))];
  const uniqueRoles = [...new Set(users.map(user => user.role))];

  // Filter data berdasarkan search dan role
  const filteredData = users.filter(user => {
    const searchMatches =
      user.id.toString().includes(searchTerm.toLowerCase()) ||
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase());

    return (
      searchMatches &&
      (selectedCustomer === '' || user.firstName === selectedCustomer) &&
      (selectedRole === '' || user.role === selectedRole)
    );
  });

  // Perhitungan paginasi
  const maxPage = Math.ceil(filteredData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = Math.min(startIndex + entriesPerPage, filteredData.length);
  const displayedData = filteredData.slice(startIndex, endIndex);

  // Handle Previous Page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle Next Page
  const handleNextPage = () => {
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="contract-content">
      <div className="contract-navbar">
        <div className="c-title">
          <img className="menu-sidebar" src={menu} alt="menu" onClick={toggleSidebar} />
          <h2>CONTRACT</h2>
        </div>

        <div className="c-filter-container">
          <div className="c-filter-customer">
            <select
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
            >
              <option value="">Customer</option>
              {uniqueCustomers.map((customer, index) => (
                <option key={index} value={customer}>
                  {customer}
                </option>
              ))}
            </select>
          </div>

          <div className="c-filter-role">
            <select
              id="role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="">Role</option>
              {uniqueRoles.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="c-search-container">
        <input
          type="text"
          id="search-input"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="c-table-container">
        <div className="c-dropdown-container">
          <label htmlFor="entries">Show </label>
          <select
            id="entries"
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
          <label> entries</label>
        </div>

        <table className="c-table-auto">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nama</th>
              <th>Usia</th>
              <th>Jenis Kelamin</th>
              <th>Email</th>
              <th>Telepon</th>
              <th>Jabatan</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.length > 0 ? (
              displayedData.map((user, id) => (
                <tr key={id} onClick={() => setSelectedContract(user)}>
                  <td>{user.id}</td>
                  <td className="customer-link">{user.firstName}</td>
                  <td>{user.age}</td>
                  <td>{user.gender}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="c-info-container">
          <p>
            Showing {startIndex + 1} to {endIndex} of {filteredData.length} entries
          </p>
          <div className="c-pagination-container">
            <FontAwesomeIcon
              icon={faAnglesLeft}
              onClick={handlePreviousPage}
              style={{ cursor: currentPage > 1 ? 'pointer' : 'not-allowed' }}
            />
            <span>{currentPage}</span>
            <FontAwesomeIcon
              icon={faAnglesRight}
              onClick={handleNextPage}
              style={{ cursor: currentPage < maxPage ? 'pointer' : 'not-allowed' }}
            />
          </div>
        </div>
      </div>
      {/* Modal untuk detail contract */}
      {selectedContract && (
        <ContractModal
          contract={selectedContract}
          onClose={() => setSelectedContract(null)}
        />
      )}
    </div>
  );
};

export default Contract;
