import StorageService from "./StorageService.js";
import Note from './Note.js';

export default class NoteItemController {

    /**
     * Controlls the view for a Note object.
     *  
     * @param {Note} note Note object instance that should be bound to the item controller
     */
    constructor(note = null) {
        this.note = note || new Note('');

        this.container = document.createElement('div');
        this.textArea = document.createElement('textarea');

        this.container.appendChild(this.textArea);

        this.textArea.value = this.note.content;
        this.textArea.readOnly = true;
    }
}
