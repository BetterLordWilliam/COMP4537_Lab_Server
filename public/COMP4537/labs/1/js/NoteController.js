import StorageService from './StorageService.js';
import NoteItemController from './NoteItemController.js';

export default class NoteController {
    constructor () {
        this.noteContainer = document.querySelector('#noteContainer');
    }

    reset() {
        this.clearNotes();
        this.appendNotes(StorageService.getAllNotes());
    }

    clearNotes() {
        while(this.noteContainer.firstChild) {
            this.noteContainer.removeChild(this.noteContainer.firstChild);
        }
    }

    appendNotes(notes) {
        try {
            for (const note of notes) {
                const noteController = new NoteItemController(note);
                this.noteContainer.appendChild(noteController.container);
            }
        } catch (err) {
            console.error(err);
        }
    }
}
