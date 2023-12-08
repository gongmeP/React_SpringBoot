import React, { useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axiosAPI from '../../axiosAPI';
import { BannerTs } from 'src/model/Banner';

function SaveBanner() {
  const [BannerInsert, setBannerInsert] = useState<BannerTs>({
    title: '',
    mainimg_banner: '',
    testimg_banner: '',
    link_url: '',
    start_date: new Date(''),
    end_date: new Date(''),
    created_time: new Date(''),
  });

  const navigate = useNavigate();
  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBannerInsert({ ...BannerInsert, [e.target.name]: e.target.value });
    console.log(BannerInsert);
  };

  const changeValueDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const Redate = new Date(`${e.target.value}T00:00:00`);
    setBannerInsert({ ...BannerInsert, [e.target.name]: Redate });
  };

  //이미지 업로드 부분
  const MainImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const Imgfile = e.target.files[0];
      const formData = new FormData();
      formData.append('file', Imgfile);
      try {
        const res = await axiosAPI.post('/Ani/PhotoSave', formData);
        setBannerInsert({ ...BannerInsert, mainimg_banner: res.data[0] });
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
        const res = await axiosAPI.post('/Ani/PhotoSave', formData);
        setBannerInsert({ ...BannerInsert, testimg_banner: res.data[0] });
        console.log(res.data[0]);
      } catch (error) {
        console.log('Save BannerImg 에러');
      }
    }
  };

  //애니메이션 데이터 업로드 부분
  const submitAnisave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (window.confirm('애니메이션 목록에 업로드 하겠습니까?')) {
      if (BannerInsert.title === '') {
        alert('애니메이션 제목을 입력하세요.');
        return;
      }

      if (BannerInsert.mainimg_banner === '') {
        alert('애니메이션 썸네일 이미지를 첨부하세요.');
        return;
      }

      if (BannerInsert.link_url === '') {
        alert('방영요일 을 선택하거나 완결 선택을 해주세요.');
        return;
      }

      try {
        const res = await axiosAPI.post('/Ani', BannerInsert, {});

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
          <Form.Label>배너 / 애니메이션 제목</Form.Label>
          <Form.Control
            name="title"
            placeholder="배너 / 애니메이션 제목을 입력하세요"
            onChange={changeValue}
          />

          <br></br>

          <Form.Label>배너 URL</Form.Label>
          <Form.Control
            name="link_url"
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
                name="mainimg_banner"
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
                name="testimg_banner"
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
                name="start_date"
              ></Form.Control>
            </Col>
            <Col md={6}>
              <Form.Label className="mt-3">배너 개시 종료일</Form.Label>
              <Form.Control
                onChange={changeValueDate}
                style={{ width: '40%' }}
                type="date"
                name="end_date"
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
