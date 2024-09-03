import './CSS/ContractModal.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';

const ContractModal = ({ contract, onClose}) => {
  if (!contract) return null;

  // Menyusun data kontrak utama
  const mainContractData = {
    id: contract.id || 'N/A',
    firstName: contract.firstName || 'N/A',
    lastName: contract.lastName || 'N/A',
    age: contract.age || 'N/A',
    email: contract.email || 'N/A',
    phone: contract.phone || 'N/A',
    gender: contract.gender || 'N/A',
    role: contract.role || 'N/A',
    address: contract.address.address || 'N/A',
    country: contract.address.country || 'N/A',
    city: contract.address.city || 'N/A',
  };

  const combinedData = [mainContractData];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2 className="text-2xl font-semibold mb-4">Detail Kontrak</h2>
        
        <table className="c-table-auto w-full border-collapse border border-gray-200" style={{padding: '20px'}}>
            <thead>
              <tr>
              <th className="border border-gray-300 px-4 py-2">Id</th>
                <th className="border border-gray-300 px-4 py-2">Nama Depan</th>
                <th className="border border-gray-300 px-4 py-2">Nama Belakang</th>
                <th className="border border-gray-300 px-4 py-2">Usia</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Telepon</th>
                <th className="border border-gray-300 px-4 py-2">Jenis Kelamin</th>
                <th className="border border-gray-300 px-4 py-2">Jabatan</th>
                <th className="border border-gray-300 px-4 py-2">Alamat</th>
                <th className="border border-gray-300 px-4 py-2">Negara</th>
                <th className="border border-gray-300 px-4 py-2">Kota</th>
              </tr>
            </thead>
            <tbody>
              {combinedData.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.firstName}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.lastName}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.age}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.phone}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.gender}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.role}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.address}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.country}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.city}</td>
                </tr>
              ))}
            </tbody>
        </table>
        
      </div>
    </div>
  );
};

export default ContractModal;
