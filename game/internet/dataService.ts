import * as rm from 'typed-rest-client/HttpClient';
import * as hm from 'typed-rest-client/Handlers';

export abstract class DataService<T> {
    private _base: string = null;
    private _auth: string = null;
    private http: rm.HttpClient;

    constructor(base: string, auth: string) {
        this._base = base;
        this._auth = auth;
        this.http = new rm.HttpClient('typed-rest-client-tests');
    }

    public getAll(endpoint?: string): Promise<T> {
        return (async () => {
            let body: string = await(await this.http.get(`${this._base}`)).readBody();
            let obj: T = JSON.parse(body);
            return obj;
        })();
    }

    public getSingleById(id: string | number, endpoint?: string): Promise<T> {
        return (async () => {
            let body: string = await(await this.http.get(`${this._base}/${endpoint}/${id}`)).readBody();
            let obj: T = JSON.parse(body);
            return obj;
        })();
    }

    public post(data: string, endpoint?: string): Promise<T> {
        return (async () => {
            let body: string = await(await this.http.post(`this._base/${endpoint}`, data)).readBody();
            let obj: T = JSON.parse(body);
            return obj;
        })();
    }
}