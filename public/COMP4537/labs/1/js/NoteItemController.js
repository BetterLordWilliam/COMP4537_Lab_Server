import User from '../lang/en/User.js';
import StorageService from "./StorageService.js";
import Note from './Note.js';

export default class NoteItemController {
    constructor(note = null) {
        this.note = note || new Note(StorageService.id(), '');

        this.container = document.createElement('div');
        this.textArea = document.createElement('textarea');
        this.removeButton = document.createElement('button');

        this.handleButtonRemoveB = this.handleButtonRemove.bind(this);
        this.handleTextContentChangedB = this.handleTextContentChanged.bind(this);

        this.container.appendChild(this.textArea);
        this.container.appendChild(document.createElement('br'));
        this.container.appendChild(this.removeButton);

        this.textArea.value = this.note.content;
        this.textArea.addEventListener('change', this.handleTextContentChangedB);

        this.removeButton.textContent = User.BUTTON_REMOVE_NOTE;
        this.removeButton.addEventListener('click', this.handleButtonRemoveB);
    }

    dispatchNoteUpdate() {
        const noteUpdated = new Event('notesUpdated');

        document.dispatchEvent(noteUpdated);
    }

    handleButtonRemove() {
        StorageService.removeNote(this.note);

        this.container.remove();

        this.dispatchNoteUpdate();
    }    

    handleTextContentChanged() {
        this.note.content = this.textArea.value;

        StorageService.addNote(this.note);

        this.dispatchNoteUpdate();
    }
}