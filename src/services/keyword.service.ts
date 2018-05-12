import { Injectable } from '@angular/core';

import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class KeywordService {
    key: any = '21174440-55b3-11e8-9172-3ff24e827f76';

    public getHeaders() {
        let headers = new Headers();
        headers.append('api-key', this.key);

        return new RequestOptions({ headers: headers });
    }
}