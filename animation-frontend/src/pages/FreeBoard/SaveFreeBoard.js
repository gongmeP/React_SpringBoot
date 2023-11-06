import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function SaveFreeBoard() {
  const [formData, setFormData] = useState({
    fbTitle: '',
    fbContent: '',
    photo: '',
    userid: sessionStorage.getItem('loginID'),
  });

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
  const handleFormSubmit = (e) => {
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
        console.error('게시판 글 등록 실패:', err);
      });
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
                setFormData({ ...formData, photo: res[0] });
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
      <h2>게시판 글 등록</h2>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            name="fbTitle"
            value={formData.fbTitle}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>내용</Form.Label>
          <CKEditor
            editor={ClassicEditor}
            config={{
              extraPlugins: [uploadPlugin],
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
