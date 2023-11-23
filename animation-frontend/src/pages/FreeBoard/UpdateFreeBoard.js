import React, { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosAPI, { API_URL } from '../../axiosAPI';

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
    const fetchdata = async () => {
      const res = await axiosAPI.get(`/FreeBoard/Detail/${fbNum}`);
      setFormData(res.data[0]);
    };
    fetchdata();
  }, []);

  useEffect(() => {
    const image = new Image();
    image.src = `/file/${formData.photo}`;
    image.onload = () => {
      setImageDimensions({
        width: image.naturalWidth / 5,
        height: image.naturalHeight / 5,
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

  const Updategogos = async (e) => {
    e.preventDefault();

    const body = new FormData();
    body.append('fbTitle', formData.fbTitle);
    body.append('fbContent', TextContent.retextContent);
    body.append('photo', formData.photo);
    body.append('userid', formData.userid);
    try {
      const res = await axiosAPI.post(`/FreeBoard/Update/${fbNum}`, body);
      setFormData({
        fbTitle: '',
        fbContent: '',
        photo: '',
        userid: sessionStorage.getItem('loginID'),
      });
    } catch (error) {
      console.log('UpdateFrreBoard Axios error');
    }

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

            fetch(`${API_URL}/FreeBoard/ImgSave`, {
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

              setTextContent({ ...TextContent, retextContent: textContent });
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
