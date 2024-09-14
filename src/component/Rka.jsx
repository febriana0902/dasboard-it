import { useState } from 'react';
import { useContractData } from './DataContext';
import './css/Rka.css';
import menu from './asset/menu-sidebar.png';

const Rka = ({ toggleSidebar }) => {
    // Ambil data dari context
    const { comments } = useContractData();
    if (!comments) return <div>Loading...</div>;

    // Ambil semua unique likes dari data dan urutkan
    const uniqueLikes = [...new Set(comments.map(comment => comment.likes))].sort((a, b) => a - b);
    const [selectedLikes, setSelectedLikes] = useState('');

    // Filter data berdasarkan likes yang dipilih
    const filteredData = comments.filter(comment => 
        selectedLikes === '' || comment.likes === parseInt(selectedLikes)
    );

    // Determine if filtering is active
    const isFilteringActive = selectedLikes !== '';

    // Separate filtered items from unfiltered items
    const filteredItems = isFilteringActive ? filteredData : [];
    const unfilteredItems = isFilteringActive ? comments.filter(comment => !filteredData.includes(comment)) : comments;

    return (
        <div className="rka-content">
            <div className='rka-navbar'>
                <div className='rka-title'>
                    <img className="menu-sidebar" src={menu} alt="menu" onClick={toggleSidebar} />
                    <h2>RKA</h2>
                </div>

                <div className="r-filter-container">
                    <div className="r-filter-month">
                        <select
                            value={selectedLikes}
                            onChange={(e) => setSelectedLikes(e.target.value)}
                        >
                            <option value="">Select Likes</option>
                            {uniqueLikes.map((likes, index) => (
                                <option key={index} value={likes}>
                                    {likes}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="r-grid-group-container">
                <div className="r-grid-container">
                    {/* Render filtered items first */}
                    {filteredItems.map((comment, id) => (
                        <div 
                            key={id} 
                            className={`grid-ppi filtered`}
                        >
                            <label className='r-title'>{comment.user.fullName}</label>
                            <div className="r-progress-bar">
                                <div className="r-progress-bar-fill" style={{ width: `${comment.likes}%` }}></div>
                                <div className="r-progress-bar-label">{comment.likes}%</div>
                            </div>
                            <div className="r-catatan">
                                <label>{comment.user.username}: {comment.body}</label>
                            </div>
                        </div>
                    ))}

                    {/* Render remaining items */}
                    {unfilteredItems.map((comment, id) => (
                        <div 
                            key={id} 
                            className={`grid-ppi ${isFilteringActive && filteredData.includes(comment) ? 'filtered' : ''}`}
                        >
                            <label className='r-title'>{comment.user.fullName}</label>
                            <div className="r-progress-bar">
                                <div className="r-progress-bar-fill" style={{ width: `${comment.likes}%` }}></div>
                                <div className="r-progress-bar-label">{comment.likes}%</div>
                            </div>
                            <div className="r-catatan">
                                <label>{comment.user.username}: {comment.body}</label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Rka;
