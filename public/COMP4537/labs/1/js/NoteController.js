import User from '../lang/en/User.js';
import StorageService from './StorageService.js';
import NoteItemController from './NoteItemController.js';

export default class NoteController {

    /**
     * Initializes a NoteController instance.
     * 
     * Root class of WriterController and ReaderController, common note list management functions.
     */
    constructor () {
        this.pageHeader = document.querySelector('#pageHeader');
        this.pageDescription = document.querySelector('#pageDesc');
        this.noteContainer = document.querySelector('#noteContainer');
        this.listUpdated = document.querySelector('#listUpdated');
    }

    /**
     * Resets the container.
     */
    reset() {
        this.clearNotes();
        this.appendNotes(StorageService.getAllNotes());

        this.listUpdated.textContent = ''
            .concat(User.NOTE_LIST_UPDATED)
            .concat(StorageService.getUpdateTime());
    }

    /**
     * Removes all note from the container.
     */
    clearNotes() {
        while(this.noteContainer.firstChild) {
            this.noteContainer.removeChild(this.noteContainer.firstChild);
        }
    }

    /**
     * Adds Note objects to the page with mutable NoteItemController.
     * 
     * @param {Array<Note>} notes Array of Note objects
     */
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
