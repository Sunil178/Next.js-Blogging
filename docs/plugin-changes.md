1. styles\prism.js\prism-tomorrow-night.css
   - Removing these css for extra dots
   ```css
   .token.crlf:before {
        content: '\240D\240A';
    }
    .token.lf:before {
        content: '\240A';
    }

    .token.space:before {
        content: '\00B7';
    }
   ```

2. public\assets\libs\tinymce\plugins\codesample\plugin.js
   - Added `.line-numbers` class in `<pre>` tag
   - From
   ```javascript
   editor.insertContent('<pre id="__new" class="language-' + language + '">' + code + '</pre>');
   ```
   - To
   ```javascript
   editor.insertContent('<pre id="__new" class="language-' + language + ' line-numbers">' + code + '</pre>');
   ```

3. public\assets\libs\tinymce\plugins\codesample\plugin.min.js
   - Added `.line-numbers` class in `<pre>` tag
   - From
   ```javascript
   e.insertContent('<pre id="__new" class="language-'+t+'">'+n+"</pre>");
   ```
   - To
   ```javascript
   e.insertContent('<pre id="__new" class="language-'+t+' line-numbers">'+n+"</pre>");
   ```
