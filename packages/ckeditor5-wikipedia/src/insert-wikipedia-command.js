import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertWikipediaCommand extends Command {
  execute() {
    this.editor.model.change((writer) => {
      this.editor.model.insertContent(createWikipedia(writer));
    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'wikipedia'
    );

    this.isEnabled = allowedIn !== null;
  }
}

function createWikipedia(writer) {
  const wikipedia = writer.createElement('wikipedia');
  return wikipedia;
}
