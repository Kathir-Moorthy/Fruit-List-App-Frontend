import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/RecycleBin.css";

function RecycleBin() {
  const [recycleBin, setRecycleBin] = useState([]);

  useEffect(() => {
    fetchRecycleBin();
  }, []);

  const fetchRecycleBin = async () => {
    try {
      const { data } = await axios.get("https://fruit-list-app-backend.onrender.com/data");
      setRecycleBin(data.recycleBin); // recycleBin contains objects
    } catch (error) {
      toast.error("Failed to fetch recycle bin data!");
    }
  };

  const restoreItem = async (index) => {
    const itemName = recycleBin[index].fruit; // Extract fruit name
    try {
      await axios.post("http://localhost:5000/recyclebin/restore", { index });
      fetchRecycleBin();
      toast.success(`"${itemName}" restored to the fruit list!`);
    } catch (error) {
      toast.error("Failed to restore item!");
    }
  };

  const deleteItemPermanently = async (index) => {
    const itemName = recycleBin[index].fruit; // Extract fruit name
    try {
      await axios.delete("http://localhost:5000/recyclebin", { data: { index } });
      fetchRecycleBin();
      toast.success(`"${itemName}" permanently deleted!`);
    } catch (error) {
      toast.error("Failed to delete item!");
    }
  };

  const emptyRecycleBin = async () => {
    try {
      await axios.delete("http://localhost:5000/recyclebin/empty");
      fetchRecycleBin();
      toast.success("Recycle bin emptied!");
    } catch (error) {
      toast.error("Failed to empty recycle bin!");
    }
  };

  return (
    <div className="recyclebin-container">
      <h2>Recycle Bin</h2>
      {recycleBin.length === 0 ? (
        <p>Your recycle bin is empty.</p>
      ) : (
        <>
          <ul>
            {recycleBin.map((item, index) => (
              <li key={index}>
                {item.fruit} {/* Render the fruit name */}
                <div>
                  <button onClick={() => restoreItem(index)}>Restore</button>
                  <button onClick={() => deleteItemPermanently(index)}>Delete Permanently</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="recyclebin-actions">
            <button onClick={emptyRecycleBin}>Empty Recycle Bin</button>
          </div>
        </>
      )}
    </div>
  );
}

export default RecycleBin;