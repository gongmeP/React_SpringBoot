import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link, useNavigate } from 'react-router-dom';

function SaveFreeBoard() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fbTitle: '',
    fbContent: '',
    photo: '',
    userid: sessionStorage.getItem('loginID'),
  });

  console.log(formData.fbTitle);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const API_URL = 'http://localhost:8080';
  const UPLOAD_ENDPOINT = 'FreeBoard/Save';
  const SaveFreeBoardGo = (e) => {
    if (formData.fbTitle === '') {
      alert('제목을 입력하세요');
      return;
    }
    if (formData.fbContent === '') {
      alert('내용을 입력하세요');
      return;
    }

    if (window.confirm('게시글을 등록 하시겠습니까?')) {
      e.preventDefault();

      const body = new FormData();
      body.append('fbTitle', formData.fbTitle);
      body.append('fbContent', formData.fbContent);
      body.append('photo', formData.photo);
      body.append('userid', formData.userid);

      fetch(`${API_URL}/${UPLOAD_ENDPOINT}`, {
        method: 'post',
        body: body,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log('등록된 게시판 글:', res);

          setFormData({
            fbTitle: '',
            fbContent: '',
            photo: '',
            userid: sessionStorage.getItem('loginID'),
          });
        })
        .catch((err) => {
          alert('게시판 글 등록 실패:', err);
        });
      alert('게시글이 등록되었습니다.');
      navigate('/freeBoard');
    } else {
    }
  };

  const customUploadAdapter = (loader) => {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append('file', file);

            fetch(`http://localhost:8080/FreeBoard/ImgSave`, {
              method: 'POST',
              body: body,
            })
              .then((res) => res.json())
              .then((res) => {
                //prevData : setFormData 의 이전상태 값 가져와서 복사 후 초기화 방지용 !!
                setFormData((prevData) => ({
                  ...prevData,
                  photo: res[0],
                }));
                setTimeout(() => {
                  resolve({
                    default: `${API_URL}/file/${res}`,
                  });
                });
              })

              .catch((err) => reject(err));
          });
        });
      },
    };
  };

  function uploadPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
    };
  }

  return (
    <div className="container">
      <Form onSubmit={SaveFreeBoardGo}>
        <Form.Group className="mb-3">
          <Form.Control
            placeholder="제목을 입력하세요"
            type="text"
            name="fbTitle"
            value={formData.fbTitle}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <CKEditor
            editor={ClassicEditor}
            config={{
              extraPlugins: [uploadPlugin],
              placeholder: '내용을 입력하세요',
            }}
            data=""
            onInit={(editor) => {}}
            onChange={(event, editor) => {
              const data = editor.getData();
              const parser = new DOMParser();
              const doc = parser.parseFromString(data, 'text/html');
              const textContent = doc.body.textContent;

              console.log({ event, editor, data });
              setFormData({ ...formData, fbContent: textContent });
            }}
            onBlur={(event, editor) => {
              // console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
              // console.log('Focus.', editor);
            }}
          />
        </Form.Group>
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Button
            variant="primary"
            type="submit"
            style={{ marginRight: '20px' }}
          >
            게시글 등록
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default SaveFreeBoard;
