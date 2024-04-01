import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { firestore } from '../firebase';
import './MenuBar.css';

export default function Menubar() {
  const [menuInputVisible, setMenuInputVisible] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [newMenuItem, setNewMenuItem] = useState('');

  useEffect(() => {
    const unsubscribe = firestore.collection('menus').onSnapshot((snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMenuItems(items);
    });
    return () => unsubscribe();
  }, []);

  const toggleMenuInput = () => {
    setMenuInputVisible(!menuInputVisible);
  };

  const handleInputChange = (e) => {
    setNewMenuItem(e.target.value);
  };

  const handleAddMenuItem = async () => {
    if (newMenuItem.trim() !== '') {
      await firestore.collection('menus').add({
        name: newMenuItem,
      });
      setNewMenuItem('');
      setMenuInputVisible(false);
    }
  };

  const handleCancelAddMenuItem = () => {
    setMenuInputVisible(false);
    setNewMenuItem('');
  };

  return (
    <div className="Menubar">
      <div className="menu">
        메뉴 목록
        <button className="addBtn" onClick={toggleMenuInput}>
          +
        </button>
      </div>
      {menuInputVisible && (
        <div>
          <input
            type="text"
            value={newMenuItem}
            onChange={handleInputChange}
            placeholder="새로운 메뉴"
          />
          <button className="Btn" onClick={handleAddMenuItem}>
            추가
          </button>
          <button className="Btn" onClick={handleCancelAddMenuItem}>
            취소
          </button>
        </div>
      )}
      {menuItems.map((item, index) => (
        <div key={index}>
          <Link className="menu_item" to={`/menu/${item.id}`}>
            {item.name}
          </Link>
        </div>
      ))}
    </div>
  );
}
