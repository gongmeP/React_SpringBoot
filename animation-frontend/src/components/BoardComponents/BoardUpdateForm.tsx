import { CKEditor } from '@ckeditor/ckeditor5-react';
import React from 'react';
import { Form } from 'react-bootstrap';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import BoardSaveButton from './BoardSaveButton';

interface BoardSaveFormProps {
  handelSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  TextContent: { retextContent: string };
  uploadPlugin: (editor: any) => void;
  fbTitle: string;
  fbContent: string | null;
  setTextContent: React.Dispatch<
    React.SetStateAction<{ retextContent: string }>
  >;
  buttonText: string;
}

const BoardUpdateForm = ({
  handelSubmit,
  TextContent,
  handleChange,
  uploadPlugin,
  fbTitle,
  fbContent,
  setTextContent,
  buttonText,
}: BoardSaveFormProps) => {
  return (
    <Form onSubmit={handelSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          placeholder="제목을 입력하세요"
          type="text"
          name="fbTitle"
          value={fbTitle}
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
          data={fbContent}
          onReady={(editor) => {}}
          onChange={(event, editor) => {
            const data = editor.getData();
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const textContent = doc.body.textContent;

            setTextContent({
              ...TextContent,
              retextContent: textContent || '',
            });
          }}
          onBlur={(event, editor) => {
            // console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            // console.log('Focus.', editor);
          }}
        />
      </Form.Group>
      <BoardSaveButton text={buttonText}></BoardSaveButton>
    </Form>
  );
};

export default BoardUpdateForm;
