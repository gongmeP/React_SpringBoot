import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SaveForm(props) {
  const [AniInsert, setAniInsert] = useState({
    title: '',
    content: '',
    photo: '',
    genre: '',
    dayOfWeek: '',
    averageRating: 0,
    uploaded: 'n',
    viewCount: 0,
    viewed: 'n',
    viewedTime: null,
    favorite: 'n',
  });

  const navigate = useNavigate();

  const changeValue = (e) => {
    setAniInsert({ ...AniInsert, [e.target.name]: e.target.value });
  };

  const genre = (e) => {
    const genre = e.target.value;
    setAniInsert({ ...AniInsert, genre: genre });
  };

  const dayOfWeek = (e) => {
    const dayOfWeek = e.target.value;
    setAniInsert({ ...AniInsert, dayOfWeek: dayOfWeek });
  };

  const uploaded = (e) => {
    let uploaded = e.target.value;

    if (uploaded === '예') {
      uploaded = 'y';
    } else {
      uploaded = 'n';
    }
    console.log(uploaded);

    setAniInsert({ ...AniInsert, uploaded: uploaded });
  };

  const Imgname = (e) => {
    const Imgname = e.target.files[0].name;
    const Imgfile = e.target.files[0];

    const formData = new FormData();
    formData.append('file', Imgfile);

    fetch('http://localhost:8080/Ani/PhotoSave', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res[0]);
        setAniInsert({ ...AniInsert, photo: res[0] });
      });
  };

  const submitAnisave = (e) => {
    e.preventDefault();

    if (window.confirm('애니메이션 목록에 업로드 하겠습니까?')) {
      const formData = new FormData();
      formData.append('file', AniInsert.photoFile);

      fetch('http://localhost:8080/Ani', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          // 'Content-Type': 'multipart/form-data',
        },
        body: JSON.stringify(AniInsert),
      })
        .then((res) => {
          if (res.status === 201) {
            return res.json();
          } else {
            return null;
          }
        })
        .then((res) => {
          alert('업로드 완료되었습니다.');
          navigate('/');
        });
    } else {
    }
  };

  return (
    <>
      <Form onSubmit={submitAnisave}>
        <Form.Group className="mb-3">
          <Form.Label>애니메이션 제목</Form.Label>
          <Form.Control
            name="title"
            placeholder="제목을 입력하세요"
            onChange={changeValue}
          />

          <Form.Label className="mt-3">애니메이션 줄거리</Form.Label>
          <Form.Control
            as="textarea"
            name="content"
            placeholder="줄거리를 입력하세요"
            onChange={changeValue}
            style={{ height: '200px', resize: 'none' }}
          />
          <Form.Label className="mt-3">
            애니메이션 썸네일 이미지를 첨부하세요
          </Form.Label>
          <br></br>
          <input type="file" name="photo" onChange={Imgname}></input>
          <br></br>

          <Form.Label className="mt-3">장르</Form.Label>
          <Form.Select onChange={genre} style={{ width: '50%' }}>
            <option>선택</option>
            <option>액션</option>
            <option>개그</option>
            <option>미스터리</option>
            <option>로맨스</option>
            <option>모험</option>
            <option>SF</option>
          </Form.Select>
          <Form.Label className="mt-3">방영요일</Form.Label>
          <Form.Select onChange={dayOfWeek} style={{ width: '50%' }}>
            <option>선택</option>
            <option>완결</option>
            <option>월</option>
            <option>화</option>
            <option>수</option>
            <option>목</option>
            <option>금</option>
            <option>토</option>
            <option>일</option>
          </Form.Select>
          <Form.Label className="mt-3">
            영상 목록에 바로 업로드 하시나요?
          </Form.Label>
          <div>
            <Form.Check
              type="radio"
              label="예"
              value="예"
              onClick={uploaded}
              name="optionGroup"
            />
            <Form.Check
              type="radio"
              label="아니오"
              value="아니오"
              onClick={uploaded}
              name="optionGroup"
            />
          </div>
        </Form.Group>
        <Button variant="primary" type="submit">
          업로드
        </Button>
      </Form>
    </>
  );
}

export default SaveForm;
