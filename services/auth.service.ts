import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	endpoint: string = 'http://localhost:4000/api'
	headers = new HttpHeaders().set('Content-Type', 'application/json')
	currentUser = {}

	constructor(private http: HttpClient, public router: Router) {

	}

	signUp = (user: User): Observable => {
		let api = `${this.endpoint}/register-user`

		return this.http.post(api, user)
			.pipe(catchError(this.handleError))
	}

	signIn = (user: User) => {
		return this.http.post<any>(`${this.endpoint}/signin`, user)
			.subscribe((res: any) => {
				localStorage.setItem('access_token', res.token)
			})
	}

	getToken = () => {
		return localStorage.getItem('access_token');
	}

	logout = () => {
		let removeToken = localStorage.removeItem('access_token')

		if (removeToken === null) {
			this.router.navigate(['log-in'])
		}
	}

	isLoggedIn = (): boolean => {
		let authToken = localStorage.getItem('access_token')
		return (authToken !== null) ? true : false
	}

	getUserProfile = (id): Observable<any> => {
		let api = `${this.endpoint}/user-profile/${id}`

		return this.http.get(api, { headers: this.headers })
			.pipe(map((res: Response) => {
				return res || {}
			})),
			catchError(this.handleError)
	}

	handleError = (error: HttpErrorResponse) => {
		let msg = ''

		if (error.error instanceof ErrorEvent) {
			msg = error.error.message
		} else {
			msg = `Error Code: ${error.status}"\nMessage: ${error.message}`
		}

		return throwError(msg)
	}
}