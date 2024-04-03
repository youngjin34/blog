import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { firestore } from '../firebase';

import './PostDetail.css';

export default function PostDetail() {
  const { id } = useParams(); // URL 파라미터로부터 게시물의 ID 가져오기
  const [post, setPost] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postDoc = await firestore.collection('posts').doc(id).get();
        if (postDoc.exists) {
          setPost(postDoc.data());
        } else {
          console.log('Post not found');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]); // ID를 의존성 배열에 추가하여 ID가 변경될 때마다 useEffect가 실행되도록 함

  const handleDelete = async () => {
    try {
      await firestore.collection('posts').doc(id).delete();
      console.log('Post deleted successfully');
      // 게시물을 삭제한 후에 사용자를 다른 페이지로 리디렉션하거나 필요한 작업을 수행할 수 있습니다.
      navigate(-1); // 이전 페이지로 이동
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <div className="h">게시물 내용</div>
      {post ? (
        <div className="post">
          <div className="title">{post.title}</div>
          <hr className="hr-1" />
          <p>{post.content}</p>
          <button onClick={handleDelete}>삭제</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
