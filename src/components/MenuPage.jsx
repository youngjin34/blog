import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { firestore } from '../firebase';
import './MenuPage.css';

const ITEMS_PER_PAGE = 4; // 페이지당 아이템 개수

export default function MenuPage() {
  const { id } = useParams();
  const [menuName, setMenuName] = useState('');
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMenuName = async () => {
      try {
        const menuDoc = await firestore.collection('menus').doc(id).get();
        if (menuDoc.exists) {
          setMenuName(menuDoc.data().name);
          fetchPosts();
        } else {
          console.log('Menu not found');
        }
      } catch (error) {
        console.error('Error fetching menu name:', error);
      }
    };

    fetchMenuName();
  }, [id]);

  const fetchPosts = async () => {
    try {
      const postsSnapshot = await firestore
        .collection('posts')
        .where('menuId', '==', id)
        .get();
      const fetchedPosts = postsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const getCurrentPagePosts = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return posts
      .filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset current page when search term changes
  };

  const getRandomImage = () => {
    const images = [
      '1.jpg',
      '2.jpg',
      '3.jpg',
      '4.jpg',
      '5.jpg',
      '6.jpg',
      '7.jpg',
      '8.jpg',
      '9.jpg',
      '10.jpg',
      '11.jpg',
      '12.jpg',
      '13.jpg',
      '14.jpg',
      '15.jpg',
      '16.jpg',
      '17.jpg',
      '18.jpg',
      '19.jpg',
      '20.jpg',
    ];
    const randomIndex = Math.floor(Math.random() * images.length + 1);
    return `/images/${images[randomIndex]}`;
  };

  return (
    <div>
      <div className="h">{menuName}</div>
      <div>
        <input
          className="search"
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </div>
      <Link className="write_post" to={`/write/${id}`}>
        글쓰기
      </Link>
      <div className="AllPosts">
        {getCurrentPagePosts().map((post) => (
          <div key={post.id} className="cards__item">
            <Link className="postTitle" to={`/post/${post.id}`}>
              <div className="card">
                <div
                  className={`card__image card__image--${post.imageCategory}`}
                  style={{ backgroundImage: `url(${getRandomImage()})` }}
                ></div>
                <div className="card__content">
                  <div className="card__title">{post.title}</div>
                  <div className="card__text">{post.content}</div>
                  <div className="postDate">
                    {new Date(post.createdAt.seconds * 1000).toLocaleString()}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={posts.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        이전
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </button>
        )
      )}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        다음
      </button>
    </div>
  );
};
