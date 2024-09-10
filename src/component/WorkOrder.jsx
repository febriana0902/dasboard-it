import { useState, useEffect } from 'react';
import './css/WorkOrder.css';
import { useContractData } from './DataContext';
import menu from './asset/menu-sidebar.png';
import BarChart from './barChart/BarChartWorkOrder2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';

const WorkOrder = ({ toggleSidebar, isSidebarOpen }) => {
    // Mengambil data
    const { posts } = useContractData();
    if (!posts) return <div>Loading...</div>;

    const [selectedTag, setSelectedTag] = useState(""); // State for selected tag

    const uniqueTags = [...new Set(posts.flatMap(post => post.tags))]; // Extract unique tags


    const handleTagChange = (e) => {
        setSelectedTag(e.target.value);
    };

    useEffect(() => {
        console.log(`Menampilkan data tag ${selectedTag}`);
    }, [selectedTag]);

    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Initially, show all data; apply filters only when they are set
    const filteredData = posts.filter(item => {
        return (
            (selectedTag === "" || item.tags.includes(selectedTag)) &&
            (
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.tags.join(' ').toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.userId.toString().includes(searchTerm.toLowerCase())
            )
        );
    });

    useEffect(() => {
        if (filteredData.length === 0) {
          setCurrentPage(1);
        } else {
          const maxPage = Math.ceil(filteredData.length / entriesPerPage);
          if (currentPage > maxPage) {
            setCurrentPage(maxPage);
          }
        }
      }, [searchTerm, filteredData, entriesPerPage, currentPage]);

    // Paginate the filtered data
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const displayedData = filteredData.slice(startIndex, endIndex);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        const maxPage = Math.ceil(filteredData.length / entriesPerPage);
        if (currentPage < maxPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="wko-content">
            <div className='wko-navbar'>
                <div className='w-title'>
                    <img className="menu-sidebar" src={menu} alt="menu" onClick={toggleSidebar} />
                    <h2>WORK ORDER</h2>
                </div>

                <div className="w-filter-container">
                    <div className="w-filter-tag">
                        <select id="tag" value={selectedTag} onChange={handleTagChange}>
                            <option value="">All Tags</option>
                            {uniqueTags.map((tag, index) => (
                                <option key={index} value={tag}>{tag}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className='w-background-bar'>
                <BarChart posts={posts}/>
                    <div className="w-table-container">

                        <div className='w-group-search'>
                            <div className="w-dropdown-container">
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

                            <div className="w-search-container">
                                <input
                                    type="text"
                                    id="search-input"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <table className="w-table-auto">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>User Id</th>
                                    <th>Title</th>
                                    <th>Likes</th>
                                    <th>Dislikes</th>
                                    <th>Views</th>
                                    <th>Tags</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedData.length > 0 ? (
                                    displayedData.map((post) => (
                                        <tr key={post.id}>
                                            <td>{post.id}</td>
                                            <td>{post.userId}</td>
                                            <td>{post.title}</td>
                                            <td>{post.reactions.likes}</td>
                                            <td>{post.reactions.dislikes}</td>
                                            <td>{post.views}</td>
                                            <td>{post.tags.join(', ')}</td>
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
                        <div className="w-info-container">
                            <p>Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries</p>
                            <div className="w-pagination-container">
                                <FontAwesomeIcon icon={faAnglesLeft} onClick={handlePreviousPage} />
                                <span> {currentPage} </span>
                                <FontAwesomeIcon icon={faAnglesRight} onClick={handleNextPage} />
                            </div>
                        </div>
                        <div className='w-update'>
                            <p>Last Update</p>
                            <p>Tidak Ada</p>
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default WorkOrder;
