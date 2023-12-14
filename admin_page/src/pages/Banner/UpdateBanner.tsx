import React, { useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axiosAPI from '../../axiosAPI';
import { BannerTs } from 'src/model/Banner';
import LoadingSpinner from 'src/components/MainComponents/LodingSpinner';

function UpdateBanner() {
  const propsParam = useParams();
  const bannerId = propsParam.bannerId;
  const [loding, setLoding] = useState<boolean>(true);
  const [BannerUpdate, setBannerUpdate] = useState<BannerTs>({
    title: '',
    mainimgBanner: '',
    textimgBanner: '',
    linkUrl: '',
    startDate: new Date(''),
    endDate: new Date(''),
    createdTime: new Date(''),
  });

  useEffect(() => {
    const getbannerdata = async () => {
      try {
        const res = await axiosAPI.get(`/BannerUpdate/${bannerId}`);
        setBannerUpdate(res.data);
        const startOldDate = new Date(res.data.startDate);
        const endOldDate = new Date(res.data.endDate);

        setBannerUpdate((BannerUpdate) => ({
          ...BannerUpdate,
          startDate: startOldDate,
          endDate: endOldDate,
        }));
      } finally {
        setLoding(false);
      }
    };
    getbannerdata();
  }, []);

  const navigate = useNavigate();

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBannerUpdate({ ...BannerUpdate, [e.target.name]: e.target.value });
  };

  const changeValueDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const Redate = new Date(`${e.target.value}`);
    setBannerUpdate({ ...BannerUpdate, [e.target.name]: Redate });
  };

  //이미지 업로드 부분
  const MainImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const Imgfile = e.target.files[0];
      const formData = new FormData();
      formData.append('file', Imgfile);
      try {
        const res = await axiosAPI.post('/Banner/PhotoSave', formData);
        setBannerUpdate({ ...BannerUpdate, mainimgBanner: res.data[0] });
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
        setBannerUpdate({ ...BannerUpdate, textimgBanner: res.data[0] });
      } catch (error) {
        console.log('Save BannerImg 에러');
      }
    }
  };

  const submitAnisave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (window.confirm('배너를 수정 하시겠습니까?')) {
      try {
        if (BannerUpdate.title === '') {
          alert('배너 제목을 입력하세요.');
          return;
        }
        if (BannerUpdate.linkUrl === '') {
          alert('배너 클릭시 이동할 링크를 입력하세요.');
          return;
        }
        if (BannerUpdate.mainimgBanner === '') {
          alert('배너 메인 이미지를 추가하세요.');
          return;
        }
        if (isNaN(BannerUpdate.startDate.getTime())) {
          alert('배너 개시 시작일을 추가하세요.');
          return;
        }
        if (isNaN(BannerUpdate.endDate.getTime())) {
          alert('배너 개시 종료일을 추가하세요.');
          return;
        }
        if (BannerUpdate.startDate.getTime() > BannerUpdate.endDate.getTime()) {
          alert('배너 종료일은 시작일보다 이후여야 합니다.');
          return;
        }

        const res = await axiosAPI.post(
          `/BannerUpdate/${bannerId}`,
          BannerUpdate,
        );

        if (res.data === 'Banner 수정 완료') {
          alert('배너 수정이 완료되었습니다.');
          navigate('/bannerlist');
        } else {
          alert('배너 수정 실패');
        }
      } catch (error) {
        console.log(error, 'Banner Update Error');
      }
    } else {
    }
  };
  const [date, setDate] = useState(new Date());
  const offset = date.getTimezoneOffset() * 60000;
  return (
    <>
      {!loding ? (
        <Form onSubmit={submitAnisave}>
          <Form.Group className="mb-3">
            <Form.Label>배너 / 애니메이션 제목</Form.Label>
            <Form.Control
              name="title"
              placeholder="배너 / 애니메이션 제목을 입력하세요"
              onChange={changeValue}
              value={BannerUpdate.title}
            />

            <br></br>

            <Form.Label>배너 URL</Form.Label>
            <Form.Control
              name="linkUrl"
              placeholder="배너 클릭시 이동될 URL 을 입력하세요"
              onChange={changeValue}
              value={BannerUpdate.linkUrl}
            />

            <Row>
              <Col md={6}>
                <Form.Label className="mt-3">
                  배너 메인 이미지를 첨부하세요
                </Form.Label>
                <br></br>
                <Form.Label className="mt-0">
                  * 미첨부시 기존 이미지 사용!! *
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
                <Form.Label className="mt-0">
                  * 미첨부시 기존 이미지 사용!! *
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
                  value={new Date(BannerUpdate.startDate.getTime() - offset)
                    .toISOString()
                    .substring(0, 10)}
                ></Form.Control>
              </Col>
              <Col md={6}>
                <Form.Label className="mt-3">배너 개시 종료일</Form.Label>
                <Form.Control
                  onChange={changeValueDate}
                  style={{ width: '40%' }}
                  type="date"
                  name="endDate"
                  value={new Date(BannerUpdate.endDate.getTime() - offset)
                    .toISOString()
                    .substring(0, 10)}
                ></Form.Control>
              </Col>
            </Row>
          </Form.Group>
          <Button variant="primary" type="submit">
            배너 수정
          </Button>
        </Form>
      ) : (
        <LoadingSpinner></LoadingSpinner>
      )}
    </>
  );
}

export default UpdateBanner;
