import {Injectable} from '@angular/core'
import {HttpClient} from "@angular/common/http"

import {User} from '../../models/auth'
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    public env = environment
    constructor(private http: HttpClient) {}

    getAll() {
        return this.http.get<User[]>(`${this.env.apiUrl}/users`)
    }

    getById(id: number) {
        return this.http.get<User>(`${this.env}/users/${id}`)
    }
}
