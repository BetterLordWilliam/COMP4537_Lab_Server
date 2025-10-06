import Lab3GetDateEndpoint      from './endpoints/lab3/getDateEndpoint.js';
import Lab3ReadFileEndpoint     from './endpoints/lab3/fileReadEndpoint.js';
import Lab3WriteFileEndpoint    from './endpoints/lab3/fileWriteEndpoint.js';

import GetDefinition            from './endpoints/lab4/getDefinition.js';
import PostDefinition from './endpoints/lab4/postDefinition.js';

/**
 * TODO:
 * - apiSuccess helper
 * - apiError helper
 * - apiNotFound helper
 * - apiBadRequest helper
 * - apiTemplatedEndpoint helper (path parameters)
 */

/**
 * API Endpoint library. I don't know if this is a term that is used.
 * a
 */
class ApiLibrary {
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

export const API_LIBRARY = new ApiLibrary()
    .addEndpoint(new Lab3GetDateEndpoint())
    .addEndpoint(new Lab3WriteFileEndpoint())
    .addEndpoint(new Lab3ReadFileEndpoint())
    .addEndpoint(new GetDefinition())
    .addEndpoint(new PostDefinition());
