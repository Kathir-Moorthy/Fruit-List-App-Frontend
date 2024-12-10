import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/FruitList.css";

function FruitList() {
  const [fruitList, setFruitList] = useState([]);
  const [fruit, setFruit] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("https://fruit-list-app-backend.onrender.com/data");
      setFruitList(data.fruitList); // fruitList contains objects
    } catch (error) {
      toast.error("Failed to fetch data!");
    }
  };

  const addFruit = async () => {
    if (!fruit) {
      toast.error("Please enter a fruit name!");
      return;
    }
    try {
      await axios.post("http://localhost:5000/fruits", { fruit });
      setFruit("");
      fetchData();
      toast.success(`"${fruit}" added to the list!`);
    } catch (error) {
      toast.error("Failed to add fruit!");
    }
  };

  const deleteFruit = async (index) => {
    const fruitName = fruitList[index].fruit; // Extract fruit name
    try {
      await axios.delete("http://localhost:5000/fruits", { data: { index } });
      fetchData();
      toast.success(`"${fruitName}" moved to the recycle bin!`);
    } catch (error) {
      toast.error("Failed to delete fruit!");
    }
  };

  return (
    <div className="fruitlist-container">
      <h2>Fruit List</h2>
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter fruit"
          value={fruit}
          onChange={(e) => setFruit(e.target.value)}
        />
        <button onClick={addFruit}>Add</button>
      </div>
      <ul>
        {fruitList.length === 0 ? (
          <p>Your fruit list is empty.</p>
        ) : (
          fruitList.map((item, index) => (
            <li key={index} className="litem">
              {item.fruit} {/* Render the fruit name */}
              <button onClick={() => deleteFruit(index)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default FruitList;