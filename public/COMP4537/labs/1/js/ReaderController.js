import User from '../lang/en/User.js';
import NoteController from './NoteController.js';
import NoteItemControllerReadonly from './NoteItemControllerReadonly.js';

class ReaderController extends NoteController {

    /**
     * Constructs a ReaderController instance of the NoteController class.
     */
    constructor() {
        super();

        this.handleStorageUpdatedB = this.handleStorageUpdated.bind(this);

        this.pageHeader.textContent = User.HEADER_READ_PAGE;
        this.pageDescription.textContent = User.P_READ_PAGE_DESC;

        // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
        window.addEventListener('storage', this.handleStorageUpdatedB);

        this.reset();
    }

    /**
     * Adds notes to the container element attaching controllers. Override to attach readonly controllers.
     * 
     * @param {Array<Note>} notes Array of Note objects
     */
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

    /**
     * Event handler for the window storage event (triggered when another window of same origin update localStorage).
     */
    handleStorageUpdated() {
        this.reset();
    }
}

new ReaderController();
