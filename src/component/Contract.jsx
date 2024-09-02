import { useState } from 'react';
import './css/Contract.css';
import menu from './asset/menu-sidebar.png';
import ContractModal from './ContractModal';


const Contract = ({ toggleSidebar, isSidebarOpen }) => {
  const data = [
    {
      year: 2022,
      customer: ' - ',
      contractNo: ' - ',
      contractDate: '2022-12-31',
      contractValue: '91.680.134.920',
      revenueValue: '16.615.210.920',
      status: ' - '
    },
    {
      year: 2021,
      customer: 'Direktorat Jendral Pemasyarakatan',
      contractNo: '3900000001',
      contractDate: '2021-05-27',
      contractValue: '45.000.000.000',
      revenueValue: '45.000.000.000',
      status: 'Billing'
    },
  ];

  const currentYear = new Date().getFullYear();
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContract, setSelectedContract] = useState(null);

  const uniqueCustomers = [...new Set(data.map(item => item.customer))];

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const filteredData = data.filter(item => {
    const searchMatches = 
      item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.contractNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.contractDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.contractValue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.revenueValue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase());

    return (
      searchMatches &&
      (selectedCustomer === '' || item.customer === selectedCustomer) &&
      (selectedYear === '' || item.year === parseInt(selectedYear))
    );
  });

  const displayedData = filteredData.slice(0, entriesPerPage);
  const startIndex = filteredData.length > 0 ? 1 : 0;
  const endIndex = Math.min(entriesPerPage, filteredData.length);


    return (
        <div className="contract-content">
          <div className='contract-navbar'>
            <div className='title'>
              <img className="menu-sidebar" src={menu} alt="menu" onClick={toggleSidebar}/>
              <h2>Contract</h2>
            </div>

            
            <div className="filter-container">
              <div className="filter-customer">
                <select value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)}>
                  <option value="">Customer</option> 
                  {uniqueCustomers.map((customer, index) => (
                    <option key={index} value={customer}>
                      {customer}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-tahun">
                <select id="year" value={selectedYear} onChange={handleYearChange}>
                  <option value={currentYear}>{currentYear}</option>
                  <option value={currentYear - 1}>{currentYear - 1}</option>
                  <option value={currentYear - 2}>{currentYear - 2}</option>
                  <option value={currentYear - 3}>{currentYear - 3}</option>
                  <option value={currentYear - 4}>{currentYear - 4}</option>
                </select>
              </div>
            </div>

          </div>

          <div className="search-container">
            <input 
            type="text" 
            id="search-input" 
            placeholder="Search" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          
          <div className="table-container">
            <div className="dropdown-container">
              <label htmlFor="entries">Show </label>
              <select
                id="entries"
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
              </select>
              <label> entries</label>
            </div>

            <table className="table-auto">
              <thead>
                <tr>
                  <th>Tahun</th>
                  <th>Customer</th>
                  <th>No Kontrak (SAP)</th>
                  <th>Tanggal Kontrak</th>
                  <th>Nilai Kontrak</th>
                  <th>Nilai Revenue</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {displayedData.length > 0 ? (displayedData.map((item, index) => (
                    <tr key={index} onClick={() => setSelectedContract(item)}>
                      <td>{item.year}</td>
                      <td className="customer-link">{item.customer}</td>
                      <td>{item.contractNo}</td>
                      <td>{item.contractDate}</td>
                      <td>{item.contractValue}</td>
                      <td>{item.revenueValue}</td>
                      <td>{item.status}</td>
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

            <div className="info-container">
              <p>Showing {startIndex} to {endIndex} of {filteredData.length} entries</p>
            </div>
          </div>

          {selectedContract && (
            <ContractModal
              contract={selectedContract}
              onClose={() => setSelectedContract(null)}
            />
          )}
          
        </div>  
    )
  };
  
  export default Contract;