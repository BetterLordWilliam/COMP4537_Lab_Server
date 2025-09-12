import User from '../lang/en/User.js';
import NoteController from './NoteController.js';
import NoteItemController from './NoteItemController.js';

class WriterController extends NoteController {

    /**
     * Initializes a new instance of the WriterController subclass of NoteController.
     */
    constructor() {
        super();

        this.noteAddButton = document.querySelector('#noteAddButton');
        this.writeGoBack = document.querySelector('#goBack');

        this.handleNoteAddB = this.handleNoteAdd.bind(this);
        this.handleNoteUpdatedB = this.handleNoteUpdated.bind(this); 

        this.pageHeader.textContent = User.HEADER_WRITE_PAGE;
        this.pageDescription.textContent = User.P_WRITE_PAGE_DESC;

        this.noteAddButton.textContent = User.BUTTON_ADD_NOTE;
        this.noteAddButton.addEventListener('click', this.handleNoteAddB);

        this.writeGoBack.textContent = User.BUTTON_GO_BACK;

        // Use a custom event to track when notes are added
        // Storage events are not fired for the same document where they are initiated
        // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
        document.addEventListener('notesUpdated', this.handleNoteUpdatedB);

        this.reset();
    }
    
    /**
     * Handles the note add button. Creates a NoteItemController (mutable).
     */
    handleNoteAdd() {
        const newNote = new NoteItemController();

        this.noteContainer.appendChild(newNote.container);
    }

    /**
     * Event handler for the notesUpdated event,
     * triggered when a mutable note controller removed button is pressed
     * or when the user finishes modifying the textArea element.
     */
    handleNoteUpdated() {
        this.reset();
    }
}

new WriterController();
