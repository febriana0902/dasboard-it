const CylinderGroup = ({ products }) => {
  if (products.length === 0) return null;

  const lowStockCount = products.filter(product => product.availabilityStatus === 'Low Stock').length;
  const inStockCount = products.filter(product => product.availabilityStatus === 'In Stock').length;
  const totalCount = lowStockCount + inStockCount;

  const lowStockPercentage = (lowStockCount / totalCount) * 100;
  const inStockPercentage = (inStockCount / totalCount) * 100;

  return (
    <div className="cylinder">
    <div className="cylinder-content">
      <div className="low-stock" style={{ height: `${lowStockPercentage}%` }}>
        <div className="stock-label">{lowStockCount} Low Stock</div>
      </div>
      <div className="in-stock" style={{ height: `${inStockPercentage}%` }}>
        <div className="stock-label">{inStockCount} In Stock</div>
      </div>
    </div>
  </div>
  
  );
};

export default CylinderGroup;
