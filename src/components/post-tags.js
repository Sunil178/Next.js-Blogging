'use client'
import { useEffect, useState } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import { SEPARATORS } from 'react-tag-input';

// TODO: Need to change this defaults - start
const COUNTRIES = [ 'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua & Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia & Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Cape Verde' ]

const suggestions = COUNTRIES.map(country => {
  return {
    id: country,
    text: country
  };
});
// TODO: Need to change this defaults - end

const separators = [SEPARATORS.COMMA, SEPARATORS.ENTER, SEPARATORS.TAB, SEPARATORS.SPACE, SEPARATORS.SEMICOLON];

export const PostTag = () => {
  const [tags, setTags] = useState([]);
  const [inputTags, setInputTags] = useState([]);

  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = tag => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = index => {
    console.log('The tag at index ' + index + ' was clicked');
  };

  useEffect(() => {
    setInputTags( tags.map(obj => obj.id) );
  }, [tags]);

  return (
      <div className='postTags'>
        <input type="hidden" name='tags' value={inputTags} />
        <ReactTags
          tags={tags}
          suggestions={suggestions}
          separators={separators}
          placeholder="Tags..."
          inputFieldPosition='inline'
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          handleTagClick={handleTagClick}
          autoFocus={false}
        />
      </div>
  );
};