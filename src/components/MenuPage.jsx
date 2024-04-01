import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../firebase';

export default function MenuPage() {
  const { id } = useParams();
  const [menuName, setMenuName] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchMenuName = async () => {
      try {
        const menuDoc = await firestore.collection('menus').doc(id).get();
        if (menuDoc.exists) {
          setMenuName(menuDoc.data().name);
          fetchPosts(); // Fetch posts when menu name is set
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

  const handlePostSubmit = async () => {
    try {
      await firestore.collection('posts').add({
        menuId: id,
        content: newPostContent,
        createdAt: new Date(),
      });
      setNewPostContent('');
      fetchPosts(); // Fetch posts after submitting new post
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <div>
      <h2>{menuName} 페이지 입니다.</h2>
      <div>
        <h3>새로운 게시글 작성</h3>
        <textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        />
        <button onClick={handlePostSubmit}>게시</button>
      </div>
      <div>
        <h3>게시글 목록</h3>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.content}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
