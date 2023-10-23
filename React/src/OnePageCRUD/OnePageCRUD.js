import React, { useState } from "react";
import styled from "styled-components";

function ListPage() {
  const [post, setPost] = useState([
    {
      id: "",
      title: "",
      content: "",
    },
  ]);

  const [posts, setPosts] = useState([
    { id: 1, title: "제목1", content: "내용1" },
    { id: 2, title: "제목2", content: "내용2" },
    { id: 3, title: "제목3", content: "내용3" },
    { id: 4, title: "제목4", content: "내용4" },
    { id: 5, title: "제목5", content: "내용5" },
  ]);

  const [editingPost, setEditingPost] = useState(null);

  const [buttonText, setButtonText] = useState("글쓰기");

  const handleWrite = () => {
    if (editingPost) {
      // 수정 모드일 때, 게시물을 업데이트합니다.
      const updatedPosts = posts.map((p) =>
        p.id === editingPost.id
          ? { ...p, title: post.title, content: post.content }
          : p
      );
      setPosts(updatedPosts);
      setEditingPost(null);
      setButtonText("글쓰기");
    } else {
      const newPost = {
        id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1,
        title: post.title,
        content: post.content,
      };
      setPosts([...posts, newPost]);
    }

    // 입력 폼 초기화
    setPost({
      title: "",
      content: "",
    });
  };

  const handdelForm = (e) => {
    //computed property names 키값 동적할당
    setPost({ ...post, [e.target.name]: e.target.value });
    console.log(post.title);
    console.log(post.content);
  };

  const handleDelete = (id) => {
    const updatePosts = posts.filter((post) => post.id !== id);
    setPosts(updatePosts);
  };

  const handleEdit = (id) => {
    const postToEdit = posts.find((post) => post.id === id);
    setEditingPost(postToEdit);
    setPost({ title: postToEdit.title, content: postToEdit.content });
    setButtonText("수정");
  };

  return (
    <>
      <form>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={post.title}
          onChange={handdelForm}
          name="title"
        ></input>
        <input
          type="text"
          placeholder="내용을 입력하세요"
          value={post.content}
          onChange={handdelForm}
          name="content"
        ></input>
        <button type="button" onClick={handleWrite}>
          {buttonText}
        </button>
      </form>
      <hr></hr>
      {posts.map((post) => (
        <StyledItemBoxDiv>
          <div>
            번호 : {post.id} 제목 : {post.title} 내용 : {post.content}
          </div>
          <button onClick={() => handleEdit(post.id)}>수정</button>
          <button onClick={() => handleDelete(post.id)}>삭제</button>
        </StyledItemBoxDiv>
      ))}
    </>
  );
}

const StyledItemBoxDiv = styled.div`
  border: 1px solid black;
  padding: 10px;
  height: 100px;
  margin: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default ListPage;
