import StorageService from './StorageService.js';

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
                this.noteContainer.appendChild(note.container);
            }
        } catch (err) {
            console.error(err);
        }
    }
}
