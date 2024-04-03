import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { firestore } from '../firebase';
import './MenuBar.css';

export default function Menubar() {
  const [menuInputVisible, setMenuInputVisible] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [newMenuItem, setNewMenuItem] = useState('');
  const [selectedMenu, setSelectedMenu] = useState(null); // 추가된 상태

  useEffect(() => {
    const unsubscribe = firestore
      .collection('menus')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMenuItems(items.reverse()); // Reverse the array to display items in the order they were created
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
        createdAt: new Date(), // Add createdAt field to record the creation time
      });
      setNewMenuItem('');
      setMenuInputVisible(false);
    }
  };

  const handleCancelAddMenuItem = () => {
    setMenuInputVisible(false);
    setNewMenuItem('');
  };

  const handleMenuClick = (menuId) => {
    setSelectedMenu(menuId);
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
      <Link className="menu_item" to="/allposts">
        <span className={selectedMenu === null ? 'selected' : ''}>
          전체보기
        </span>
      </Link>
      {menuItems.map((item, index) => (
        <div key={index}>
          <Link
            className="menu_item"
            to={`/menu/${item.id}`}
            onClick={() => handleMenuClick(item.id)}
          >
            <span className={selectedMenu === item.id ? 'selected' : ''}>
              {item.name}
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
}
