import React, { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // useParams 추가
import { firestore } from '../firebase';

export default function Write() {
  const { id } = useParams(); // useParams로부터 id를 받아옴
  const contentRef = useRef();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const navigate = useNavigate();

  const handlePostSubmit = async () => {
    try {
      await firestore.collection('posts').add({
        menuId: id, // menuId를 useParams로부터 받은 id로 설정
        title: title,
        content: content,
        createdAt: new Date(),
      });
      setTitle('');
      setContent('');
      navigate(`/menu/${id}`); // Redirect to the menu page after submitting post
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <div className="Write">
      <section>
        <h4>제목</h4>
        <textarea
          placeholder="제목을 입력해주세요"
          ref={contentRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </section>
      <section>
        <h4>내용</h4>
        <div>
          <textarea
            placeholder="내용을 입력해주세요"
            ref={contentRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </section>
      <section>
        <button onClick={handlePostSubmit}>작성하기</button>
        <button onClick={() => navigate(-1)}>취소하기</button>
      </section>
    </div>
  );
}
