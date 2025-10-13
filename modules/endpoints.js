export default class ApiLibrary {
    constructor() {
        this.GET = [];
        this.POST = [];
    }

    addEndpoint(endpoint) {
        switch (endpoint.method) {
            case 'GET':
                this.GET.push(endpoint);
                break;
            case 'POST':
                this.POST.push(endpoint);
                break;
        }
        return this;
    }

    addGetEndpoint(endpoint) {
        this.GET.push(endpoint)
        return this;
    }

    addPostEndpoint() {
        this.POST.push(endpoint);
        return this;
    }
}
