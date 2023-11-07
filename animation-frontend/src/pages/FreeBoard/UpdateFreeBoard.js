import React, { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link, useNavigate, useParams } from 'react-router-dom';

function UpdateFreeBoard() {
  const { fbNum } = useParams();
  const [formData, setFormData] = useState({});
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [TextContent, setTextContent] = useState({
    retextContent: '',
  });
  useEffect(() => {
    fetch(`http://localhost:8080/FreeBoard/Detail/${fbNum}`)
      .then((res) => res.json())
      .then((res) => {
        setFormData(res[0]);
      });
  }, []);

  useEffect(() => {
    const image = new Image();
    image.src = `http://localhost:8080/file/${formData.photo}`;
    image.onload = () => {
      setImageDimensions({
        width: image.naturalWidth / 10,
        height: image.naturalHeight / 10,
      });
    };
  }, [formData.photo]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const API_URL = 'http://localhost:8080';

  const Updategogos = (e) => {
    e.preventDefault();

    const body = new FormData();
    body.append('fbTitle', formData.fbTitle);
    body.append('fbContent', TextContent.retextContent);
    body.append('photo', formData.photo);
    body.append('userid', formData.userid);

    fetch(`http://localhost:8080/FreeBoard/Update/${fbNum}`, {
      method: 'post',
      body: body,
    })
      .then((res) => res.json())
      .then((res) => {
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
    alert('게시글이 수정되었습니다.');
    navigate('/freeBoard');
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

  const addtext = formData.fbContent;

  return (
    <div className="container">
      <Form onSubmit={Updategogos}>
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
            data={addtext}
            onInit={(editor) => {}}
            onChange={(event, editor) => {
              const data = editor.getData();
              const parser = new DOMParser();
              const doc = parser.parseFromString(data, 'text/html');
              const textContent = doc.body.textContent;

              console.log({ event, editor, data });
              setTextContent({ ...TextContent, retextContent: textContent });
              console.log(TextContent.retextContent);
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
            수정 저장
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default UpdateFreeBoard;
