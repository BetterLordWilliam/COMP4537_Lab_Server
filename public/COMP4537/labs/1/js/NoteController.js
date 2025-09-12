import User from '../lang/en/User.js';
import StorageService from './StorageService.js';
import NoteItemController from './NoteItemController.js';

export default class NoteController {
    constructor () {
        this.pageHeader = document.querySelector('#pageHeader');
        this.pageDescription = document.querySelector('#pageDesc');
        this.noteContainer = document.querySelector('#noteContainer');
        this.listUpdated = document.querySelector('#listUpdated');

        // Use a custom event to track when notes are added
        // Storage events are not fired for the same document where they are initiated
        // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
        this.handleNotesUpdatedB = this.handleNotesUpdated.bind(this);

        window.addEventListener('notesUpdated', this.handleNotesUpdatedB);
    }

    reset() {
        this.listUpdated.textContent = ''
            .concat(User.NOTE_LIST_UPDATED)
            .concat(new Date().toLocaleString());

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

    handleNotesUpdated() {
        this.reset();
    }
}
