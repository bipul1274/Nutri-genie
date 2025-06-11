
import React, { useState } from 'react';
import IngredientUpload from './IngredientUpload';

function App() {
  const [ingredients, setIngredients] = useState([]);

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">AI Recipe Ingredient Detector</h1>
      <IngredientUpload onDetect={setIngredients} />
      {ingredients.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Detected Ingredients:</h3>
          <ul className="list-disc ml-5">
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
