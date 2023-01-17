import React, { useEffect, useState } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import './style.scss';

export default function TextEditor({ name= '', value = '', onChange = () => {}, ...restProps  }) {
  const [editorState, setEditorState] = useState(
    () => {
      const html = value || '';
      const contentBlock = htmlToDraft(html);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        return EditorState.createWithContent(contentState);
      }
      return EditorState.createEmpty();
    }
  );

  useEffect(() => {
    let html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    onChange(html);
    // eslint-disable-next-line
  }, [editorState]);

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={setEditorState}
      wrapperClassName="text-editor__wrapper-class"
      editorClassName="text-editor__editor-class"
      toolbarClassName="text-editor__toolbar-class"
    />
  )
}
