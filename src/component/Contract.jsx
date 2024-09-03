import { useState} from 'react';
import { useContractData } from './DataContext';
import './css/Contract.css';
import menu from './asset/menu-sidebar.png';
import ContractModal from './ContractModal';

const Contract = ({ toggleSidebar, isSidebarOpen}) => {
  //mengambil data 
  const { users } = useContractData();
  if (!users) return <div>Loading...</div>;
  
  // State dan variabel lainnya
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContract, setSelectedContract] = useState(null);
  

  // Mendapatkan pelanggan unik dari data
  const uniqueCustomers = [...new Set(users.map(user => user.firstName))];

  // Filter data berdasarkan search 
  const filteredData = users.filter(user => {
    const searchMatches =
      user.id.toString().includes(searchTerm.toLowerCase()) ||
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase());
      // user.age.toString().includes(searchTerm.toLowerCase()) ||
      // user.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // user.role.toLowerCase().includes(searchTerm.toLowerCase());

    return (
      searchMatches &&
      (selectedCustomer === '' || user.firstName === selectedCustomer)
    );
  });

  // Menampilkan data yang telah difilter
  const displayedData = filteredData.slice(0, entriesPerPage);
  const startIndex = filteredData.length > 0 ? 1 : 0;
  const endIndex = Math.min(entriesPerPage, filteredData.length);

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

          <div className="c-filter-tahun">
            <select id="year" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
              <option value="">Year</option>
              <option value={currentYear}>{currentYear}</option>
              <option value={currentYear - 1}>{currentYear - 1}</option>
              <option value={currentYear - 2}>{currentYear - 2}</option>
              <option value={currentYear - 3}>{currentYear - 3}</option>
              <option value={currentYear - 4}>{currentYear - 4}</option>
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

      {selectedYear === currentYear.toString() && (
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
              Showing {startIndex} to {endIndex} of {filteredData.length} entries
            </p>
          </div>
        </div>
      )}

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
