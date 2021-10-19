import {Injectable} from '@angular/core'
import {Router} from '@angular/router'
import {HttpClient} from '@angular/common/http'
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../../models/auth"
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public env = environment
    // @ts-ignore
    private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>()
    // @ts-ignore
    public user: Observable<User>

    constructor(private router: Router, private http: HttpClient) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(<string>localStorage.getItem('user')))
        this.user = this.userSubject.asObservable()
    }

    public get userValue () {
        return this.userSubject.value
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${this.env.apiUrl}/user/authenticate`,
            { username, password })
            .pipe(map(user => {
                localStorage.setItem('user', JSON.stringify(user))
                this.userSubject.next(user)

                return user
            }))
    }

    logout(user: User) {
        // remove the user from localstorage
        localStorage.removeItem('user')

        this.userSubject.next(user)
        this.router.navigate(['/']).then().catch()
    }
}
