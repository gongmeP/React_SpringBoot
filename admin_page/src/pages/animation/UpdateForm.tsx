import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axiosAPI from '../../axiosAPI';
import { SaveAnidataTs } from 'src/model/Animation';

function UpdateForm() {
  const propsParam = useParams();
  const id = propsParam.id;

  const [AniInsert, setAniInsert] = useState<SaveAnidataTs>({
    title: '',
    content: '',
    photo: '',
    genre: '',
    dayOfWeek: '',
    averageRating: 0,
    uploaded: 'n',
    viewCount: 0,
    viewed: 'n',
    viewedTime: new Date(),
    favorite: 'n',
  });

  useEffect(() => {
    const fetchdata = async () => {
      const res = await axiosAPI.get(`/Ani/${id}`);
      setAniInsert(res.data);
    };
    fetchdata();
  }, []);

  const submitBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axiosAPI.put(`/Ani/${id}`, AniInsert);
  };

  const navigate = useNavigate();

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAniInsert({ ...AniInsert, [e.target.name]: e.target.value });
  };

  const genre = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const genre = e.target.value;
    setAniInsert({ ...AniInsert, genre: genre });
  };

  const dayOfWeek = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dayOfWeek = e.target.value;
    setAniInsert({ ...AniInsert, dayOfWeek: dayOfWeek });
  };

  const uploaded = (e: React.ChangeEvent<HTMLInputElement>) => {
    let uploaded = e.target.value;

    if (uploaded === '예') {
      uploaded = 'y';
    } else {
      uploaded = 'n';
    }

    setAniInsert({ ...AniInsert, uploaded: uploaded });
  };

  const Imgname = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const Imgname = e.target.files[0].name;
      const Imgfile = e.target.files[0];

      const formData = new FormData();
      formData.append('file', Imgfile);

      try {
        const res = await axiosAPI.post('/Ani/PhotoSave', formData);
        setAniInsert({ ...AniInsert, photo: res.data[0] });
      } catch (error) {
        console.log('SaveFormAxiosError');
      }
    }
  };

  const submitAnisave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (window.confirm('애니메이션 목록에 업로드 하겠습니까?')) {
      try {
        const formData = new FormData();
        formData.append('file', AniInsert.photo);

        const res = await axiosAPI.post('/Ani', AniInsert, {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        });

        alert('업로드 완료되었습니다.');
        navigate('/allList');
      } catch (error) {
        console.log('SaveForm Error');
      }
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
            value={AniInsert.title}
          />

          <Form.Label className="mt-3">애니메이션 줄거리</Form.Label>
          <Form.Control
            as="textarea"
            name="content"
            placeholder="줄거리를 입력하세요"
            onChange={changeValue}
            style={{ height: '200px', resize: 'none' }}
            value={AniInsert.content}
          />
          <Form.Label className="mt-3">
            애니메이션 썸네일 이미지를 첨부하세요
          </Form.Label>
          <br></br>
          <Form.Label className="mt-0">
            * 미첨부시 기존 이미지 사용!! *
          </Form.Label>
          <br></br>
          <Form.Control type="file" name="photo" onChange={Imgname} />
          {/* <input type="file" name="photo" onChange={Imgname}></input> */}

          <Form.Label className="mt-3">장르</Form.Label>
          <Form.Select
            onChange={genre}
            style={{ width: '50%' }}
            value={AniInsert.genre}
          >
            <option>선택</option>
            <option>판타지</option>
            <option>액션</option>
            <option>개그</option>
            <option>미스터리</option>
            <option>로맨스</option>
            <option>모험</option>
            <option>SF</option>
            <option>스포츠</option>
            <option>아이돌</option>
            <option>드라마</option>
          </Form.Select>
          <Form.Label className="mt-3">방영요일</Form.Label>
          <Form.Select
            onChange={dayOfWeek}
            style={{ width: '50%' }}
            value={AniInsert.dayOfWeek}
          >
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
              onChange={uploaded}
              name="optionGroup"
            />
            <Form.Check
              type="radio"
              label="아니오"
              value="아니오"
              onChange={uploaded}
              name="optionGroup"
            />
          </div>
        </Form.Group>
        <Button variant="primary" type="submit">
          수정하기
        </Button>
      </Form>
    </>
  );
}

export default UpdateForm;
