import StorageService from "./StorageService.js";
import Note from './Note.js';

export default class NoteItemController {
    constructor(note = null) {
        this.note = note || new Note(StorageService.id(), '');

        this.container = document.createElement('div');
        this.textArea = document.createElement('textarea');

        this.container.appendChild(this.textArea);

        this.textArea.value = this.note.content;
        this.textArea.readOnly = true;
    }
}
