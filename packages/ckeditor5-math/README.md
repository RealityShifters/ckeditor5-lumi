# CKEditor 5 mathematical feature

This is TeX-based mathematical plugin for CKEditor 5. You can use it to insert, edit and view mathematical equations and formulas. This plugin supports MathJax, KaTeX and custom typesetting engines.

## Table of contents
- [Features](#features)
- [Demos](#demos)
- [Screenshots](#screenshots)
- [Requirements](#requirements)
- [Examples](#examples)
- [Installation](#installation)
	* [Styles for Lark theme](#styles-for-lark-theme)
- [Configuration & Usage](#configuration--usage)
	* [Plugin options](#plugin-options)
	* [Available typesetting engines](#available-typesetting-engines)
	* [Supported input and output formats](#supported-input-and-output-formats)
- [Paste support](#paste-support)
	* [From plain text](#from-plain-text)
	* [From Microsoft Word](#from-microsoft-word)
- [Preview workaround](#preview-workaround)
- [Testing](#testing)
- [Todo](#todo)

## Features
- TeX syntax
- Inline and display equations
- Preview view
- Multiple typesetting engines
- Have multiple input and output format
- Paste support
	- from plain text
	- from Microsoft Word

# Demos
[Classic editor with MathJax](https://jsfiddle.net/isaul32/qktj9h7x/)

[Classic editor with KaTex](https://jsfiddle.net/isaul32/3wjrkLdv/)

## Screenshots
![Screenshot 1](/screenshots/1.png?raw=true "Screenshot 1")

![Screenshot 2](/screenshots/2.png?raw=true "Screenshot 2")

## Requirements

- With CKEditor 5 v19.0.0, use ckeditor5-math@19.0.0 version
- With CKEditor 5 v18.0.0, use ckeditor5-math@18.0.0 version
- With CKEditor 5 v17.0.0, use ckeditor5-math@17.0.1 version

If you get duplicated modules error, you have mismatching versions in your editor build package.json.

## Examples
[Link to examples repository](https://github.com/isaul32/ckeditor5-math-examples)

## Installation
Use official classic or inline build as a base:
- [CKEditor 5 classic editor build](https://github.com/ckeditor/ckeditor5-build-classic)
- [CKEditor 5 inline editor build](https://github.com/ckeditor/ckeditor5-build-inline)

Install plugin with NPM or Yarn

`npm install ckeditor5-math --save-dev`

Add import into ckeditor.js file

```js
import Mathematics from 'ckeditor5-math/src/math';
```

Add it to built-in plugins

```js
InlineEditor.builtinPlugins = [
	// ...
	Mathematics
];
```

__Add math button to toolbar__

```js
InlineEditor.defaultConfig = {
	toolbar: {
		items: [
			// ...
			'math'
		]
	}
};
```
### Styles for Lark theme
__Copy theme/ckeditor5-math folder__ from [https://github.com/isaul32/ckeditor5-theme-lark](https://github.com/isaul32/ckeditor5-theme-lark) to your lark theme repository or install

`npm install @ckeditor/ckeditor5-theme-lark@github:isaul32/ckeditor5-theme-lark#v19.0.0 --save-dev`

Styles requires PostCSS like official CKEditor 5 plugins. Use same tag version as the editor.

## Configuration & Usage

### Plugin options
```js
InlineEditor.defaultConfig = {
	// ...
	math: {
		engine: 'mathjax', // or katex or function. E.g. (equation, element, display) => { ... }
		outputType: 'script', // or span
		forceOutputType: false, // forces output to use outputType
		enablePreview: true // Enable preview view
	}
}
```

### Available typesetting engines
__MathJax__
- Tested by using __latest 2.7__
- Has experimental (__CHTML__, __SVG__) support for __3.0.0__ or newer version
- Use only __\\( \\)__ delimiters for inline and __\\[ \\]__ delimiters for display

[<img src="https://www.mathjax.org/badge/badge-square.svg" width="130" alt="KaTeX">](https://www.mathjax.org/)

__KaTeX__
- Tested by using version __0.11.0__

[<img src="https://katex.org/img/katex-logo-black.svg" width="130" alt="KaTeX">](https://katex.org/)

__Custom typesetting__

Custom typesetting is possible to implement with engine config. For example, custom typesetting feature can be used when use back end rendering.
```js
InlineEditor.defaultConfig = {
	// ...
	math: {
		engine: ( equation, element, display, preview ) => {
			// ...
		}
	}
}
```
- __equation__ is equation in TeX format without delimiters.
- __element__ is DOM element reserved for rendering.
- __display__ is boolean. Typesetting should be inline when false.
- __preview__ is boolean. Rendering in preview when true.


### Supported input and output formats
Supported input and output formats are:
```html
<!-- MathJax style http://docs.mathjax.org/en/v2.7-latest/advanced/model.html#how-mathematics-is-stored-in-the-page -->
<script type="math/tex">\sqrt{\frac{a}{b}}</script>
<script type="math/tex; mode=display">\sqrt{\frac{a}{b}}</script>

<!-- CKEditor 4 style https://ckeditor.com/docs/ckeditor4/latest/features/mathjax.html -->
<span class="math-tex">\( \sqrt{\frac{a}{b}} \)</span>
<span class="math-tex">\[ \sqrt{\frac{a}{b}} \]</span>
```

### Paste support

#### From plain text
Paste TeX equations with __delimiters__. For example:

__\\[__ x=\frac{-b\pm\sqrt{b^2-4ac}}{2a} __\\]__

or

__\\(__ x=\frac{-b\pm\sqrt{b^2-4ac}}{2a} __\\)__

#### From Microsoft Word
Use [__paste from office__](https://github.com/isaul32/ckeditor5-paste-from-office) fork instead of official. This feature is __experimental__ and might not work always (look source codes).

Install paste from office fork. Use same tag version as the editor.

`npm install @ckeditor/ckeditor5-paste-from-office@github:isaul32/ckeditor5-paste-from-office#v19.0.0 --save-dev`

```js
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Mathematics from 'ckeditor5-math/src/math';
// ...
InlineEditor.builtinPlugins = [
	// ...
	PasteFromOffice,
	Mathematics
];
```

## Preview workaround
__.ck-reset_all *__ css rules from ckeditor5-ui and ckeditor5-theme-lark break rendering in preview mode.

My solution for this is use rendering element outside of CKEditor DOM and place it right place by using absolute position. Alternative solution could be using iframe, but then we have to copy typesetting engine's scripts and styles to child document.

## Testing

Replace ckeditor5-core with git version

`rm -rf node_modules/@ckeditor/ckeditor5-core && git clone https://github.com/ckeditor/ckeditor5-core.git node_modules/@ckeditor/ckeditor5-core`

Run test suite

`npm run test`

## Todo
- MathML input and output when using MathJax version 3
- Support multiple equations when pasting as plain text
