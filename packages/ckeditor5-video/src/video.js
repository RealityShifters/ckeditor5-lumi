import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import videoIcon from '../icons/video.svg';

export default class Video extends Plugin {
  static get pluginName() {
    return 'Video';
  }

  init() {
    const editor = this.editor;

    this._defineSchema();
    this._defineConverters();

    editor.ui.componentFactory.add('insertVideo', (locale) => {
      const view = new ButtonView(locale);

      view.set({
        label: 'Insert Video',
        icon: videoIcon,
        tooltip: true,
      });

      view.on('execute', () => {
        const videoURL = prompt('Video URL');
        editor.model.change((writer) => {
          const iframe = writer.createElement('iframe', {
            src: videoURL,
          });
          editor.model.insertContent(iframe, editor.model.document.selection);
        });
      });

      return view;
    });
  }

  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register('iframe', {
      isObject: true,
      isInline: true,
      allowWhere: '$block',
      allowAttributes: ['src'],
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    conversion.for('upcast').elementToElement({
      view: {
        name: 'iframe',
      },
      model: (viewElement, modelWriter) => {
        const src = viewElement.getChild(0).data.trim();
        return modelWriter.createElement('iframe', {
          src,
        });
      },
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'iframe',
      view: (modelElement, writer) => {
        const div = writer.createUIElement(
          'div',
          { class: 'wikipedia-wrapper' },
          function (domDocument) {
            const domElement = this.toDomElement(domDocument);
            const url = modelElement.getAttribute('src');
            domElement.innerHTML = `<iframe src=${url}></iframe>`;
            return domElement;
          }
        );
        return div;
      },
    });
  }
}
