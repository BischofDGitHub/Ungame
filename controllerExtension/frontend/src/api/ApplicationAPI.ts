import type { API } from "./API";

export class ApplicationAPI implements API {
    public postBannedApplications(): Promise<any> {

        return fetch('/myserver.endpoint', {
            method: 'POST',
            body: JSON.stringify({

            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // Handle data
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    public putNewBannedApplication(): Promise<any> {

        return fetch('/applications', {
            method: 'PUT',
            body: JSON.stringify({

            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // Handle data
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    public deleteBannedApplications(): Promise<any> {

        return fetch('/myserver.endpoint', {
            method: 'DELETE',
            body: JSON.stringify({

            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // Handle data
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    public getBannedApplications(): Promise<any> {

        return fetch('/myserver.endpoint', {
            method: 'GET',
            body: JSON.stringify({

            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // Handle data
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
}

