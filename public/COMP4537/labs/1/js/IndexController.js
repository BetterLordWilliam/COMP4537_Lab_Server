import User from '../lang/en/User.js';

class IndexController {
    constructor() {
        this.pageTitle = document.querySelector('#pageTitle');
        this.pageDesc = document.querySelector('#pageDesc');
        this.writePageLink = document.querySelector('#writePageLink');
        this.readPageLink = document.querySelector('#readPageLink');

        this.pageTitle.textContent = User.HEADER_LAB_TITLE;
        this.pageDesc.textContent = User.P_LAB_DESCRIPTION;
        this.writePageLink.textContent = User.A_LINK_TO_WRITE_PAGE;
        this.readPageLink.textContent = User.A_LINK_TO_READ_PAGE;
    }
}

new IndexController();