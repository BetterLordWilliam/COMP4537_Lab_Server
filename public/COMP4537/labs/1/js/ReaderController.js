import User from '../lang/en/User.js';
import NoteController from './NoteController.js';
import NoteItemControllerReadonly from './NoteItemControllerReadonly.js';

class ReaderController extends NoteController {
    constructor() {
        super();

        this.handleStorageUpdatedB = this.handleStorageUpdated.bind(this);

        this.pageHeader.textContent = User.HEADER_READ_PAGE;
        this.pageDescription.textContent = User.P_READ_PAGE_DESC;

        window.addEventListener('storage', this.handleNotesUpdatedB);

        this.reset();
    }

    appendNotes(notes) {
        try {
            for (const note of notes) {
                const noteController = new NoteItemControllerReadonly(note);
                this.noteContainer.appendChild(noteController.container);
            }
        } catch (err) {
            console.error(err);
        }
    }

    handleStorageUpdated() {
        this.reset();
    }
}

new ReaderController();
