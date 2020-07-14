import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import videoIcon from '../icons/video.svg';

export default class Video extends Plugin {
  init() {
    const editor = this.editor;

    editor.ui.componentFactory.add('insertVideo', (locale) => {
      const view = new ButtonView(locale);

      view.set({
        label: 'Insert Video',
        icon: videoIcon,
        tooltip: true,
      });

      // Callback executed once the image is clicked.
      view.on('execute', () => {
        const videoURL = prompt('Video URL');
      });

      return view;
    });
  }
}
