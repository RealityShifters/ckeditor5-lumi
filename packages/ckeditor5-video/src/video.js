import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';

import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

export default class Video extends Plugin {
    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add( 'insertImage', locale => {
            const view = new ButtonView( locale );

            view.set( {
                label: 'Insert image',
                icon: imageIcon,
                tooltip: true
            } );

            // Callback executed once the image is clicked.
            view.on( 'execute', () => {
                const imageURL = prompt( 'Image URL' );
            } );

            return view;
        } );
    }
}