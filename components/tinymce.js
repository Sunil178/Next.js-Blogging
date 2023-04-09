import { Editor } from "@tinymce/tinymce-react";
import React, { useRef, useState } from "react";

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
      tinymceScriptSrc={"/assets/libs/tinymce/tinymce.min.js"}
      onInit={(evt, editor) => {
        editorRef.current = editor;
        document.querySelector('.tox-toolbar__primary').lastChild.firstChild.classList.add('submit-btn');
        document.querySelector('.tox-toolbar__primary').lastChild.classList.add('submit-btn-container');
      }}
      value={props.content}
      init={{
        branding: false,
        forced_root_block: false,
        force_br_newlines : false,
        force_p_newlines : false,
        height: '90vh',
        menubar: true,
        promotion: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "visualchars",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "code",
          "help",
          "wordcount",
          "codesample",
          "autoresize",
          "autosave",
          "emoticons",
          "quickbars",
        ],
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | emoticons | " +
          "removeformat | codesample | restoredraft | help | fullscreen | hr | image | table | searchreplace | submit",
        codesample_languages: [
          {text: 'HTML/XML', value: 'markup'},
          {text: 'JavaScript', value: 'javascript'},
          {text: 'CSS', value: 'css'},
          {text: 'PHP', value: 'php'},
          {text: 'Ruby', value: 'ruby'},
          {text: 'Python', value: 'python'},
          {text: 'Java', value: 'java'},
          {text: 'C', value: 'c'},
          {text: 'C#', value: 'csharp'},
          {text: 'C++', value: 'cpp'},
          {text: 'Bash', value: 'bash'},
          {text: 'Perl', value: 'perl'},
        ],
        codesample_global_prismjs: true,
        text_patterns: [
          {start: '*', end: '*', format: 'italic'},
          {start: '**', end: '**', format: 'bold'},
          {start: '#', format: 'h1'},
          {start: '##', format: 'h2'},
          {start: '###', format: 'h3'},
          {start: '####', format: 'h4'},
          {start: '#####', format: 'h5'},
          {start: '######', format: 'h6'},
          {start: '1. ', cmd: 'InsertOrderedList'},
          {start: '* ', cmd: 'InsertUnorderedList'},
          {start: '- ', cmd: 'InsertUnorderedList'},
          {start: '//brb', replacement: 'Be Right Back'}
        ],
        setup: (editor) => {
          editor.addShortcut('access+c', 'Open Codeblock', 'codesample');
          editor.ui.registry.addButton('submit', {
            text: 'Publish',
            tooltip: 'Publish',
            onAction: function () {
              log();
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
        file_picker_callback: function (cb, value, meta) {
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
        },
        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; background-color: #fdfdfd; }",
      }}
      outputFormat='text'
      // onEditorChange={(newText) => { console.log(newText); setText(newText) }}
    />
    </>;
}