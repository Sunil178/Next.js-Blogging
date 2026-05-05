import { useState, useMemo } from 'react';

import { markdownToDraft, draftToMarkdown } from 'markdown-draft-js';

import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from '@aloushek/react-draft-wysiwyg-next';
import { convertToNextClassName } from '@/libs/helpers';
import '@aloushek/react-draft-wysiwyg-next/dist/react-draft-wysiwyg.css';

import PrismHigLighter from './pkg-syntax-highlighter-simple'
import toolbar from 'components/Trials/draft-toolbar'
import { Center } from 'components/utils';

import styles from 'styles/draft.module.css';
const classes = convertToNextClassName.classes(styles);

function ReactDraft() {
	const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

	const onSetEditorState = (newState) => {
		setEditorState(newState)
	}

	const convertedContent = useMemo(() => {
		const rawContentState = convertToRaw(editorState.getCurrentContent());
		return draftToMarkdown(rawContentState, { preserveNewlines: true });
	}, [editorState]);

	return <>
		<Center>
			<div className={classes("ReactDraft")}>
				<header className={classes("ReactDraft-header")}>
					Write the blog
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
			{/* <PrismHigLighter markdownContent={convertedContent} className={classes("preview")} /> */}
		</Center>
	</>
}

export default ReactDraft;