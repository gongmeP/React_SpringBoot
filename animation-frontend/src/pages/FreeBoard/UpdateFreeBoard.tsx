import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosAPI, { API_URL } from '../../axiosAPI';
import { BoardFormDataTs } from 'src/model/Board';
import BoardUpdateForm from 'src/components/BoardComponents/BoardUpdateForm';

const UpdateFreeBoard = () => {
  const { fbNum } = useParams();
  const [formData, setFormData] = useState<BoardFormDataTs | null>(null);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [TextContent, setTextContent] = useState<{ retextContent: string }>({
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
    if (formData !== null) {
      const image = new Image();
      image.src = `/file/${formData.photo}`;
      image.onload = () => {
        setImageDimensions({
          width: image.naturalWidth / 5,
          height: image.naturalHeight / 5,
        });
      };
    }
  }, [formData?.photo]);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (formData !== null) {
      if (e.target.files !== null) {
        if (type === 'file') {
          setFormData({ ...formData, [name]: e.target.files[0] });
        }
      } else {
        setFormData({ ...formData, [name]: value });
      }
    }
  };

  const Updategogos = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = new FormData();
    if (formData !== null) {
      if (formData.userid !== null) {
        body.append('fbTitle', formData.fbTitle);
        body.append('fbContent', TextContent.retextContent);
        body.append('photo', formData.photo);
        body.append('userid', formData.userid);
      }
    }
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

  const customUploadAdapter = (loader: any) => {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file: any) => {
            body.append('file', file);

            fetch(`${API_URL}/FreeBoard/ImgSave`, {
              method: 'POST',
              body: body,
            })
              .then((res) => res.json())
              .then((res) => {
                setFormData(
                  (prevData) =>
                    ({
                      ...prevData,
                      photo: res[0],
                      fbTitle: prevData ? prevData.fbTitle || '' : '',
                    } as BoardFormDataTs | null),
                );

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

  function uploadPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (
      loader: any,
    ) => {
      return customUploadAdapter(loader);
    };
  }

  const addtext = formData?.fbContent || '';

  return (
    <>
      {formData !== null && (
        <>
          <BoardUpdateForm
            handelSubmit={Updategogos}
            TextContent={TextContent}
            setTextContent={setTextContent}
            handleChange={handleChange}
            uploadPlugin={uploadPlugin}
            fbTitle={formData.fbTitle}
            fbContent={formData.fbContent}
            buttonText="게시글 수정"
          ></BoardUpdateForm>
        </>
      )}
    </>
  );
};

export default UpdateFreeBoard;
