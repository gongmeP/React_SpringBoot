import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosAPI, { API_URL } from '../../axiosAPI';
import { BoardFormDataTs, BoardTs } from 'src/model/Board';
import BoardSaveForm from 'src/components/BoardComponents/BoardSaveForm';

function SaveFreeBoard() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<BoardFormDataTs>({
    fbTitle: '',
    fbContent: '',
    photo: '',
    userid: sessionStorage.getItem('loginID') || null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      if (e.target.files !== null) {
        setFormData({ ...formData, [name]: e.target.files[0] });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const SaveFreeBoardGo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.fbTitle === '') {
      alert('제목을 입력하세요');
      return;
    }
    if (formData.fbContent === '') {
      alert('내용을 입력하세요');
      return;
    }

    if (window.confirm('게시글을 등록 하시겠습니까?')) {
      const body = new FormData();
      if (formData.userid !== null && formData.fbContent !== null) {
        body.append('fbTitle', formData.fbTitle);
        body.append('fbContent', formData.fbContent);
        body.append('photo', formData.photo);
        body.append('userid', formData.userid);
      }

      try {
        const res = await axiosAPI.post(`/FreeBoard/Save`, body);
        setFormData({
          fbTitle: '',
          fbContent: '',
          photo: '',
          userid: sessionStorage.getItem('loginID'),
        });
      } catch (error) {
        console.log('SaveFreeNoard Axiox error');
      }
      alert('게시글이 등록되었습니다.');
      navigate('/freeBoard');
    } else {
    }
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

  function uploadPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (
      loader: any,
    ) => {
      return customUploadAdapter(loader);
    };
  }

  return (
    <>
      <BoardSaveForm
        handelSubmit={SaveFreeBoardGo}
        formData={formData}
        handleChange={handleChange}
        uploadPlugin={uploadPlugin}
        setFormData={setFormData}
        fbTitle=""
        fbContent=""
        buttonText="게시글 등록"
      ></BoardSaveForm>
    </>
  );
}

export default SaveFreeBoard;
