import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateForm(props) {
  const propsParam = useParams();
  const id = propsParam.id;

  const [book, setBook] = useState({
    title: '',
    author: '',
  });

  useEffect(() => {
    fetch(`http://localhost:8080/book/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setBook(res);
      });
  }, []);

  const navigate = useNavigate();

  const changeValue = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const submitBook = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/book/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(book),
    })
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        } else {
          return null;
        }
      })
      .then((res) => {
        if (res !== null) {
          navigate(`/book/${id}`);
          console.log(2, res);
        } else {
          alert('책 등록에 실패하였습니다.');
        }
      });
  };

  return (
    <>
      <Form onSubmit={submitBook}>
        <Form.Group className="mb-3">
          <Form.Label>제목</Form.Label>
          <Form.Control
            name="title"
            placeholder="수정 할 제목을 입력하세요"
            onChange={changeValue}
            value={book.title}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>내용</Form.Label>
          <Form.Control
            name="author"
            placeholder="수정 할 내용을 입력하세요"
            onChange={changeValue}
            value={book.author}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default UpdateForm;
