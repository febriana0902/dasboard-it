const Summary = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <div>
      <div className="summary-content">
        <div className="summary-navbar">
          <button onClick={toggleSidebar}>
            {isSidebarOpen ? '<' : '>'}
          </button>

          <h2>Summary</h2>
        </div>

        
      </div>
    </div>
  );
};

export default Summary;
