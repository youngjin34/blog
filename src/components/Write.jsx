import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { firestore, storage } from '../firebase';

import './Write.css';

const Write = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [attachment, setAttachment] = useState(null); // 이미지 미리보기 URL을 저장하는 상태 추가
  const [file, setFile] = useState('');
  const navigate = useNavigate();

  const onFileChange = async (evt) => {
    try {
      const {
        target: { files, value },
      } = evt;
      const theFile = files[0];
      const reader = new FileReader();
      setFile(value);
      reader.onloadend = (finishedEvent) => {
        const {
          currentTarget: { result },
        } = finishedEvent;
        setAttachment(result);
      };
      reader.readAsDataURL(theFile);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  const onClearAttachment = () => {
    setAttachment(null);
    setFile('');
  };

  const onSubmit = async (evt) => {
    evt.preventDefault();
    try {
      let imageURL = '';

      if (attachment) {
        imageURL = attachment;
      }

      await firestore.collection('posts').add({
        menuId: id,
        title: title,
        content: content,
        imageURL: imageURL,
        createdAt: new Date(),
      });

      setTitle('');
      setContent('');
      setAttachment(null);
      navigate(`/menu/${id}`);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <div className="Write">
      <form onSubmit={onSubmit}>
        <section>
          <h4>제목</h4>
          <input
            className="write_title"
            type="text"
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </section>
        <section>
          <h4>내용</h4>
          <textarea
            className="write_content"
            placeholder="내용을 입력해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </section>
        <section>
          <input type="file" accept="image/*" onChange={onFileChange} />
          {attachment && (
            <div>
              <img src={attachment} width="150px" height="150px" alt="" />
              <button onClick={onClearAttachment}>이미지 삭제</button>
            </div>
          )}
        </section>
        <section>
          <button type="submit">작성하기</button>
          <button onClick={() => navigate(-1)}>취소하기</button>
        </section>
      </form>
    </div>
  );
};

export default Write;
