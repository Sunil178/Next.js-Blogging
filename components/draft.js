import { useState, useEffect } from 'react';

import { stateToMarkdown } from 'draft-js-export-markdown';
import { mdToDraftjs, draftjsToMd } from 'draftjs-md-converter';
import { markdownToDraft, draftToMarkdown } from 'markdown-draft-js';

import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import DOMPurify from 'dompurify';
import convertToNextClassName from '../libs/helpers';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import PrismHigLighter from './pkg-syntax-highlighter-simple'
import toolbar from './draft-toolbar'

import styles from '../styles/draft.module.css';
const classes = convertToNextClassName.classes(styles);

function ReactDraft() {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  const onSetEditorState = (newState) => {
		setEditorState(newState)
	}


  const [convertedContent, setConvertedContent] = useState(null);

  useEffect(() => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    // const markup = draftjsToMd(rawContentState);
    const markup = draftToMarkdown(rawContentState, { preserveNewlines: true });
		// const markup = stateToMarkdown(editorState.getCurrentContent());
		console.log(markup);
    setConvertedContent(markup);
	}, [editorState]);
	
  return <>
			<div className={classes("ReactDraft")}>
				<header className={classes("ReactDraft-header")}>
					Rich Text Editor Example
				</header>

				<Editor
					editorState={editorState}
					onEditorStateChange={onSetEditorState}
					wrapperClassName={classes("wrapper-class")}
					editorClassName={classes("editor-class")}
					toolbarClassName={classes("toolbar-class")}
					toolbar={toolbar}
				/>
			</div>
			<PrismHigLighter markdownContent={convertedContent} />
		</>
}

export default ReactDraft;