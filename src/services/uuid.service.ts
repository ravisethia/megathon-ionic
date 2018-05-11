import { Injectable } from '@angular/core';

@Injectable()
export class UUIDService {

    private s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }
    
    private _guid(){
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + 
        '-' + this.s4() + this.s4() + this.s4();
    }

    public getUUID() {
        return this._guid();
    }
}