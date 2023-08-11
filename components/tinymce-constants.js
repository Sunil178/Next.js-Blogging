const filePickerCallback = (callback, value, meta) => {
    var input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('name', 'file');
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

        callback(blobInfo.blobUri(), { title: file.name });
        };
        reader.readAsDataURL(file);
    };

    input.click();
}

export const TinyOptions = {
    plugins: [ "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
        "anchor", "searchreplace", "visualblocks", "visualchars", "code", "fullscreen",
        "insertdatetime", "media", "table", "code", "help", "wordcount", "codesample",
        "autoresize", "autosave", "emoticons", "quickbars",
    ],
    toolbar1: "undo redo | blocks | " +
        "bold italic forecolor | alignleft aligncenter " +
        "alignright alignjustify | bullist numlist outdent indent | submit",
    toolbar2: "emoticons | removeformat | codesample | restoredraft | help | fullscreen | hr | image | table | searchreplace",
    codesample_languages: [
        {text: 'Text', value: 'text'},
        {text: 'JSON', value: 'json'},
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
    file_picker_callback: filePickerCallback,
}