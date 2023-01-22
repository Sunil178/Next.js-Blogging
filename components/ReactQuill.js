import dynamic from 'next/dynamic';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import ReactQuill, { Quill } from 'react-quill'

Quill.register('modules/imageResize', ImageResize);

const modules = {
  toolbar: {
		container: [
			[{ header: '1' }, { header: '2' }, { header: '3' }, { font: [] }],
			[{ size: [] }],
			['bold', 'italic', 'underline', 'strike', 'blockquote'],
			[
			  { list: 'ordered' },
			  { list: 'bullet' },
			  { indent: '-1' },
			  { indent: '+1' },
			],
			['link', 'image', 'video'],
			['clean'],
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
  }	
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
  }
  return (
    <>
      <ReactQuill modules={modules} formats={formats} onChange={onContentChange} theme="snow" />
      <div>{content}</div>
    </>
  )
}
  