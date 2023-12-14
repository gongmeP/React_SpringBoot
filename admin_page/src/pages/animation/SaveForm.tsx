import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axiosAPI from '../../axiosAPI';
import { AnidataTs, SaveAnidataTs } from 'src/model/Animation';

function SaveForm() {
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

  // 영상 업로드 지정 부분
  const uploaded = (e: React.ChangeEvent<HTMLInputElement>) => {
    let uploaded = e.target.value;
    if (uploaded === '예') {
      uploaded = 'y';
    } else {
      uploaded = 'n';
    }

    setAniInsert({ ...AniInsert, uploaded: uploaded });
  };

  //이미지 업로드 부분
  const Imgname = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const Imgfile = e.target.files[0];
      const formData = new FormData();
      formData.append('file', Imgfile);
      try {
        const res = await axiosAPI.post('/Ani/PhotoSave', formData);
        setAniInsert({ ...AniInsert, photo: res.data[0] });
      } catch (error) {
        console.error('SaveFormAxiosError:', error);
      }
    }
  };

  //애니메이션 데이터 업로드 부분
  const submitAnisave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (window.confirm('애니메이션 목록에 업로드 하겠습니까?')) {
      if (AniInsert.title === '') {
        alert('애니메이션 제목을 입력하세요.');
        return;
      }
      if (AniInsert.content === '') {
        alert('애니메이션 줄거리를 입력하세요.');
        return;
      }
      if (AniInsert.photo === '') {
        alert('애니메이션 썸네일 이미지를 첨부하세요.');
        return;
      }
      if (AniInsert.genre === '') {
        alert('장르를 선택하세요.');
        return;
      }
      if (AniInsert.dayOfWeek === '') {
        alert('방영요일 을 선택하거나 완결 선택을 해주세요.');
        return;
      }
      if (AniInsert.uploaded === '') {
        alert('영상 목록에 즉시 업로드 할건지 여부를 선택하세요.');
        return;
      }
      try {
        const res = await axiosAPI.post('/Ani', AniInsert, {});

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
          <Form.Control type="file" name="photo" onChange={Imgname} />
          {/* <input type="file" name="photo" onChange={Imgname}></input> */}

          <Form.Label className="mt-3">장르</Form.Label>
          <Form.Select onChange={genre} style={{ width: '50%' }}>
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
            애니메이션 목록에 즉시 업로드 하시나요?
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
          업로드
        </Button>
      </Form>
    </>
  );
}

export default SaveForm;
