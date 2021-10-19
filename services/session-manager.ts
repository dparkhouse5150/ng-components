import { Injectable } from '@angular/core'
import { GlobalService } from './globals.service'
import { NotifyService } from './notify.service'
import { Socket } from 'ngx-socket-io'

@Injectable()
export class SessionManagerService {
	constructor(public globals: GlobalService,
				private notify: NotifyService,
				private socket: Socket) {}

	checkSession = () => {}

	updateSession = (row: string, data: any) => {

	}

	updateCurrentSession
}