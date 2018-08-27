import * as rm from 'typed-rest-client/HttpClient';
import * as hm from 'typed-rest-client/Handlers';

export abstract class DataService<T> {
    private _base: string = null;
    private _auth: string = null;

    constructor(base: string, auth: string) {
        debugger;
        this._base = base;
        this._auth = auth;
    }

    getAll(endpoint?: string): Promise<T> {
        let http: rm.HttpClient = new rm.HttpClient('typed-rest-client-tests');

        return (async () => {
            let body: string = await(await http.get(this._base)).readBody();
            let obj = JSON.parse(body);
            return obj;
        })()


        // http.get(this._base).then(res => {
        //     debugger;
        //     //assert(res.message.statusCode == 200, "status code should be 200");
        //     let body = res.readBody().then(body => {
        //         let obj: T = JSON.parse(body);
        //     });
        // });
    }
}