import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { firestore } from '../firebase';

import './AllPosts.css';

const ITEMS_PER_PAGE = 6; // 페이지당 아이템 개수

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsSnapshot = await firestore
          .collection('posts')
          .orderBy('createdAt', 'desc')
          .get(); // createdAt 필드를 기준으로 내림차순으로 정렬
        const fetchedPosts = postsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  // 현재 페이지의 게시물만 반환하는 함수
  const getCurrentPagePosts = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return posts.slice(startIndex, endIndex);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 검색어 입력 핸들러
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // 랜덤 이미지 가져오기
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

  // 페이지네이션 컴포넌트
  const Pagination = () => {
    const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);

    const handlePageClick = (pageNumber) => {
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
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

  return (
    <div>
      <div className="h">모든 게시물 목록</div>
      <div>
        <input
          className="search"
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </div>
      <div className="AllPosts">
        {getCurrentPagePosts()
          .filter((post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((post) => (
            <div key={post.id} className="cards__item">
              <Link className="postTitle" to={`/post/${post.id}`}>
                <div className="card">
                  <div
                    className={`card__image card__image--${post.imageCategory}`}
                    style={{ backgroundImage: `url(${getRandomImage()})` }} // 랜덤 이미지 설정
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
      <Pagination />
    </div>
  );
}
