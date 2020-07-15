import WikipediaEditing from './wikipedia-editing';
import WikipediaUI from './wikipedia-ui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class Wikipedia extends Plugin {
  static get requires() {
    return [WikipediaEditing, WikipediaUI];
  }
}
