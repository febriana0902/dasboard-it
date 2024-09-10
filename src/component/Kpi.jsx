
import { useState } from "react";
import { useContractData } from './DataContext';
import menu from './asset/menu-sidebar.png';
import './css/Kpi.css';

const Kpi = ({ toggleSidebar, isSidebarOpen }) => {
  // Mengambil data
  const { recipes } = useContractData();
  if (!recipes) return <div>Loading...</div>;

  // Mendapatkan 4 nama recipe dengan rating tertinggi
  const topRatedRecipes = recipes
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  const [selectedRecipe, setSelectedRecipe] = useState(topRatedRecipes[0]?.name || "");

  const handleRecipeChange = (e) => {
      setSelectedRecipe(e.target.value);
  };

  const selectedRecipeData = topRatedRecipes.find(recipe => recipe.name === selectedRecipe);

  return (
    <div className="kpi-content">
      <div className='k-navbar'>
        <div className="k-title">
          <img className="k-menu-sidebar" src={menu} alt="menu" onClick={toggleSidebar} />
          <h2>KPI</h2>
        </div>

        <div className="k-filter">
          <div className="k-filter-recipe">
            <select id="recipe" value={selectedRecipe} onChange={handleRecipeChange}>
              {topRatedRecipes.map((recipe) => (
                <option key={recipe.id} value={recipe.name}>
                  {recipe.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="k-container">
        {selectedRecipeData && (
          <div className="recipe-container">
            <h3>{selectedRecipeData.name}</h3>

            <div className="k-content">
              {/* Ring color will change based on difficulty */}
              <div className={`ring-${selectedRecipeData.difficulty.toLowerCase()}`}>
                <p>{selectedRecipeData.difficulty}</p>
              </div>

              <div className="label-warna">
                <div className="row">
                  <div className="green"></div>
                  <p>Easy</p>
                </div>

                <div className="row">
                  <div className="blue"></div>
                  <p>Medium</p>
                </div>

                <div className="row">
                  <div className="red"></div>
                  <p>Hard</p>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Kpi;