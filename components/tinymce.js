import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";
import { TinyOptions } from 'components/tinymce-constants';

export function TinyMCEEditor(props) {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const [text, setText] = useState('');
  return <>
      <Editor
        id="YOUR_FIXED_ID"
        textareaName="post_data"
        tinymceScriptSrc={"/assets/libs/tinymce/tinymce.min.js"}
        onInit={(evt, editor) => {
          editorRef.current = editor;
          document.querySelector('.tox-toolbar-overlord').firstChild.lastChild.firstChild.classList.add('submit-btn');
          document.querySelector('.tox-toolbar-overlord').firstChild.lastChild.classList.add('submit-btn-container');
        }}
        onKeyUp={(event, editor) => {
          const scrollEditor = editor.getContainer().scrollHeight;
          const scrollerHeight = window.innerHeight * (window.innerHeight / document.body.offsetHeight);
          const scrollPos = document.documentElement.scrollTop + scrollerHeight
          if (scrollPos > scrollEditor) {
            window.scrollTo({top: scrollEditor, behavior: 'smooth'});
          }
        }}
        init={{
          branding: false,
          forced_root_block: false,
          force_br_newlines : false,
          force_p_newlines : false,
          height: '90vh',
          menubar: true,
          promotion: false,
          toolbar_sticky: true,
          plugins: TinyOptions.plugins,
          toolbar1: TinyOptions.toolbar1,
          toolbar2: TinyOptions.toolbar2,
          codesample_languages: TinyOptions.codesample_languages,
          codesample_global_prismjs: true,
          text_patterns: TinyOptions.text_patterns,
          setup: (editor) => {
            editor.addShortcut('access+c', 'Open Codeblock', 'codesample');
            editor.ui.registry.addButton('submit', {
              text: 'Publish',
              tooltip: 'Publish',
              onAction: function () {
                document.getElementById('post-form').submit();
              },
            });
          },
          min_height: 650,
          autosave_interval: '1s',
          autosave_restore_when_empty: true,
          autosave_retention: '1440m',
          a11y_advanced_options: true,
          file_picker_types: 'file image media',
          automatic_uploads: true,
          images_upload_url: '/api/upload',
          image_caption: true,
          image_advtab: true,
          image_uploadtab: true,
          init_instance_callback: (editor) => editor.setContent(props.content),
          file_picker_callback: TinyOptions.file_picker_callback,
          content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; background-color: #fdfdfd;}",
        }}
        outputFormat='text'
        // onEditorChange={(newText) => { console.log(newText); setText(newText) }}
      />
  </>;
}