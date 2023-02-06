import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
// import 'highlight.js/styles/darcula.css';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import ReactQuill, { Quill } from 'react-quill'

Quill.register('modules/imageResize', ImageResize);

const modules = {
	toolbar: {
		container: [
			[{ header: [1, 2, 3, 4, 5, 6] }],
			[{ font: [] }],
			[{ size: ['small', false, 'large', 'huge'] }],
			['bold', 'italic', 'underline', 'strike', 'blockquote'],
			[{ 'color': [] }, { 'background': [] }],
			[{ 'script': 'sub'}, { 'script': 'super' }],
			[
			  { list: 'ordered' },
			  { list: 'bullet' },
			  { indent: '-1' },
			  { indent: '+1' },
			],
			[{ 'direction': 'rtl' }],
			[{ 'align': [] }],
			['link', 'image', 'video'],
			['clean'],
			['code-block'],
			['select', { options: ['javascript', 'python', 'html', 'css'], default: 'javascript' }],
		  ],
		handlers: {
			image: imageHandler
		  }
	},
	clipboard: {
		matchVisual: false,
	},
	imageResize: {
		parchment: Quill.import('parchment'),
	},
	// syntax: true,
	syntax: {
		highlight: function(text, language) {
            if (language === 'javascript') {
                return hljs.highlight('javascript', text).value;
            } else if (language === 'python') {
                return hljs.highlight('python', text).value;
            } else if (language === 'html') {
                return hljs.highlight('html', text).value;
            } else if (language === 'css') {
                return hljs.highlight('css', text).value;
            } else {
                return hljs.highlightAuto(text).value;
            }
        },
	},
}

const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
    'code-block',
    'select',
  ];

function imageHandler() {
	const tooltip = this.quill.theme.tooltip;
	const originalSave = tooltip.save;
	const originalHide = tooltip.hide;
  
	tooltip.save = function () {
	  const range = this.quill.getSelection(true);
	  const value = this.textbox.value;
	  if (value) {
		this.quill.insertEmbed(range.index, 'image', value, 'user');
	  }
	};
	tooltip.hide = function () {
	  tooltip.save = originalSave;
	  tooltip.hide = originalHide;
	  tooltip.hide();
	};
	tooltip.edit('image');
	tooltip.textbox.placeholder = 'Embed Image URL';
}
  export default function Home() {
  const [content, setContent] = useState('');

  function onContentChange(content) {
    setContent(content);
	hljs.highlightAll();
  }

  return (
    <>
      <ReactQuill modules={modules} formats={formats} onChange={onContentChange} theme="snow" />
      <div>{content}</div>
    </>
  )
}
  