import { Editor } from "@tinymce/tinymce-react";
import React, { useRef, useState } from "react";
import { TinyOptions } from './tinymce-constants';

export function TinyMCEEditor(props) {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const filePickerCallback = (cb, value, meta) => {
    var input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');

    input.onchange = function () {
      var file = this.files[0];

      var reader = new FileReader();
      reader.onload = function () {
        var id = 'blobid' + (new Date()).getTime();
        var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
        var base64 = reader.result.split(',')[1];
        var blobInfo = blobCache.create(id, file, base64);
        blobCache.add(blobInfo);

        cb(blobInfo.blobUri(), { title: file.name });
      };
      reader.readAsDataURL(file);
    };

    input.click();
  }

  const [text, setText] = useState('');
  return <>
    <form action="/api/store-post" method="post" id="post-form">
      <Editor
        id="YOUR_FIXED_ID"
        textareaName="post_data"
        tinymceScriptSrc={"/assets/libs/tinymce/tinymce.min.js"}
        onInit={(evt, editor) => {
          editorRef.current = editor;
          document.querySelector('.tox-toolbar-overlord').firstChild.lastChild.firstChild.classList.add('submit-btn');
          document.querySelector('.tox-toolbar-overlord').firstChild.lastChild.classList.add('submit-btn-container');
        }}
        init={{
          branding: false,
          forced_root_block: false,
          force_br_newlines : false,
          force_p_newlines : false,
          height: '90vh',
          menubar: true,
          promotion: false,
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
          image_caption: true,
          image_advtab: true,
          image_uploadtab: true,
          init_instance_callback: (editor) => editor.setContent(props.content),
          file_picker_callback: filePickerCallback,
          content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; background-color: #fdfdfd; }",
        }}
        outputFormat='text'
        // onEditorChange={(newText) => { console.log(newText); setText(newText) }}
      />
    </form>
  </>;
}