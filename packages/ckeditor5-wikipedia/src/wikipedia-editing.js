import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import InsertWikipediaCommand from './insert-wikipedia-command';

export default class WikipediaEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    console.log('WikipediaEditing#init() got called');

    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add(
      'insertWikipedia',
      new InsertWikipediaCommand(this.editor)
    );
  }

  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register('wikipedia', {
      isObject: true,
      allowWhere: '$block',
    });

    schema.register('wikipediaFrame', {
      isLimit: true,
      allowWhere: '$block',
      allowIn: 'wikipedia',
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    conversion.for('upcast').elementToElement({
      model: 'wikipedia',
      view: {
        name: 'div',
        classes: 'wikipedia-wrapper',
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'wikipedia',
      view: {
        name: 'div',
        classes: 'wikipedia-wrapper',
      },
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'wikipedia',
      view: (modelElement, viewWriter) => {
        const div = viewWriter.createContainerElement('div', {
          class: 'wikipedia-wrapper',
        });
        return toWidget(div, viewWriter, { label: 'wikipedia widget' });
      },
    });

    conversion.for('upcast').elementToElement({
      model: 'wikipediaFrame',
      view: {
        name: 'iframe',
        classes: 'wikipedia-frame',
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'wikipediaFrame',
      view: {
        name: 'iframe',
        classes: 'wikipedia-frame',
      },
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'wikipediaFrame',
      view: (modelElement, viewWriter) => {
        const iframe = viewWriter.createContainerElement('iframe', {
          class: 'wikipedia-frame',
        });
        return toWidget(iframe, viewWriter, { label: 'wikipedia iframe' });
      },
    });
  }
}
