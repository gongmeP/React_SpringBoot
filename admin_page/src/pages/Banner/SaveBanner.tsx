import React, { useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axiosAPI from '../../axiosAPI';
import { BannerTs } from 'src/model/Banner';

function SaveBanner() {
  const [BannerInsert, setBannerInsert] = useState<BannerTs>({
    title: '',
    mainimgBanner: '',
    textimgBanner: '',
    linkUrl: '',
    startDate: new Date(''),
    endDate: new Date(''),
    createdTime: new Date(''),
  });

  const navigate = useNavigate();
  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBannerInsert({ ...BannerInsert, [e.target.name]: e.target.value });
    console.log(BannerInsert);
  };

  const changeValueDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const Redate = new Date(`${e.target.value}`);
    setBannerInsert({ ...BannerInsert, [e.target.name]: Redate });
  };
  console.log(BannerInsert);

  //이미지 업로드 부분
  const MainImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const Imgfile = e.target.files[0];
      const formData = new FormData();
      formData.append('file', Imgfile);
      try {
        const res = await axiosAPI.post('/Banner/PhotoSave', formData);
        setBannerInsert({ ...BannerInsert, mainimgBanner: res.data[0] });
        console.log(res.data[0]);
      } catch (error) {
        console.log('Save BannerImg 에러');
      }
    }
  };

  const TextImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const Imgfile = e.target.files[0];
      const formData = new FormData();
      formData.append('file', Imgfile);
      try {
        const res = await axiosAPI.post('/Banner/PhotoSave', formData);
        setBannerInsert({ ...BannerInsert, textimgBanner: res.data[0] });
        console.log(res.data[0]);
      } catch (error) {
        console.log('Save BannerImg 에러');
      }
    }
  };

  const submitAnisave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (window.confirm('배너를 업로드 하시겠습니까?')) {
      try {
        if (BannerInsert.title === '') {
          alert('배너 제목을 입력하세요.');
          return;
        }
        if (BannerInsert.linkUrl === '') {
          alert('배너 클릭시 이동할 링크를 입력하세요.');
          return;
        }
        if (BannerInsert.mainimgBanner === '') {
          alert('배너 메인 이미지를 추가하세요.');
          return;
        }
        if (isNaN(BannerInsert.startDate.getTime())) {
          alert('배너 개시 시작일을 추가하세요.');
          return;
        }
        if (isNaN(BannerInsert.endDate.getTime())) {
          alert('배너 개시 종료일을 추가하세요.');
          return;
        }
        if (BannerInsert.startDate.getTime() > BannerInsert.endDate.getTime()) {
          alert('배너 종료일은 시작일보다 이후여야 합니다.');
          return;
        }

        const res = await axiosAPI.post('/BannerAdd', BannerInsert);

        if (res.data === 'Banner 추가 완료') {
          alert('배너 업로드가 완료되었습니다.');
        } else {
          alert('배너 추가 실패');
        }
      } catch (error) {
        console.log('Banner save Error');
      }
    } else {
    }
  };

  return (
    <>
      <Form onSubmit={submitAnisave}>
        <Form.Group className="mb-3">
          <Form.Label>배너 / 애니메이션 제목</Form.Label>
          <Form.Control
            name="title"
            placeholder="배너 / 애니메이션 제목을 입력하세요"
            onChange={changeValue}
          />

          <br></br>

          <Form.Label>배너 URL</Form.Label>
          <Form.Control
            name="linkUrl"
            placeholder="배너 클릭시 이동될 URL 을 입력하세요"
            onChange={changeValue}
          />

          <Row>
            <Col md={6}>
              <Form.Label className="mt-3">
                배너 메인 이미지를 첨부하세요
              </Form.Label>
              <br></br>
              <Form.Control
                type="file"
                name="mainimgBanner"
                onChange={MainImg}
              />
            </Col>
            <Col md={6}>
              <Form.Label className="mt-3">
                배너 설명 이미지를 첨부하세요
              </Form.Label>
              <br></br>
              <Form.Control
                type="file"
                name="textimgBanner"
                onChange={TextImg}
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Label className="mt-3">배너 개시 시작일</Form.Label>
              <Form.Control
                onChange={changeValueDate}
                style={{ width: '40%' }}
                type="date"
                name="startDate"
              ></Form.Control>
            </Col>
            <Col md={6}>
              <Form.Label className="mt-3">배너 개시 종료일</Form.Label>
              <Form.Control
                onChange={changeValueDate}
                style={{ width: '40%' }}
                type="date"
                name="endDate"
              ></Form.Control>
            </Col>
          </Row>
        </Form.Group>
        <Button variant="primary" type="submit">
          업로드
        </Button>
      </Form>
    </>
  );
}

export default SaveBanner;
