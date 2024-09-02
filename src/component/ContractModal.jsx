import './CSS/ContractModal.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';

const ContractModal = ({ contract, onClose, currentPage, totalPages, onPreviousPage, onNextPage }) => {
  if (!contract) return null;

  const mainContractData = {
    no: 1,
    contractNo: contract.contractNo || 'N/A',
    contractDate: contract.contractDate || 'N/A',
    customerCode: contract.customerCode || '100060',
    contractEndDate: contract.contractEndDate || '2021-12-13',
    salesOrderNo: contract.salesOrderNo || '4900000001',
    salesOrderDate: contract.salesOrderDate || '2021-06-24',
    orderDeliveryNo: contract.orderDeliveryNo || '5900000000',
    revenueBillingNo: contract.revenueBillingNo || '6900000002',
    revenueBillingDate: contract.revenueBillingDate || '2023-03-01',
    arBillingNo: contract.arBillingNo || '6900000001',
    arBillingDate: contract.arBillingDate || '2021-12-06',
  };

  if (contract.customerCode === '100060') {
    mainContractData.contractEndDate = '2022-12-13';
    mainContractData.salesOrderNo = '4900000002';
  } else if (contract.customerCode === '200070') {
    mainContractData.contractEndDate = '2023-12-13';
    mainContractData.salesOrderNo = '4900000003';
  }

  const combinedData = [mainContractData];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2 className="text-2xl font-semibold mb-4">Contract Details</h2>
        
        <div className="table-container-modal">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">No</th>
                <th className="border border-gray-300 px-4 py-2">No Kontrak (SAP)</th>
                <th className="border border-gray-300 px-4 py-2">Tanggal Kontrak</th>
                <th className="border border-gray-300 px-4 py-2">Kode Customer</th>
                <th className="border border-gray-300 px-4 py-2">Tanggal Berakhir Kontrak</th>
                <th className="border border-gray-300 px-4 py-2">No SO</th>
                <th className="border border-gray-300 px-4 py-2">Tanggal SO</th>
                <th className="border border-gray-300 px-4 py-2">No OD</th>
                <th className="border border-gray-300 px-4 py-2">No Billing Revenue</th>
                <th className="border border-gray-300 px-4 py-2">Tanggal Billing Revenue</th>
                <th className="border border-gray-300 px-4 py-2">No Billing AR</th>
                <th className="border border-gray-300 px-4 py-2">Tanggal Billing AR</th>
              </tr>
            </thead>
            <tbody>
              {combinedData.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{item.no}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.contractNo}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.contractDate}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.customerCode}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.contractEndDate}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.salesOrderNo}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.salesOrderDate}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.orderDeliveryNo}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.revenueBillingNo}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.revenueBillingDate}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.arBillingNo}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.arBillingDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="info-container">
            {/* <p>Showing {currentPage} of {totalPages} pages</p> */}
            <p>Showing 1 of 2 pages</p>
            <div className="pagination-container">
              <FontAwesomeIcon 
                icon={faAnglesLeft} 
                onClick={onPreviousPage} 
                className={`pagination-icon ${currentPage === 1 ? 'disabled' : ''}`} 
              />
              {/* <span className="pagination-info">{currentPage}</span> */}
              <span className="pagination-info">1</span>
              <FontAwesomeIcon 
                icon={faAnglesRight} 
                onClick={onNextPage} 
                className={`pagination-icon ${currentPage === totalPages ? 'disabled' : ''}`} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractModal;