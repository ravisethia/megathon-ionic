import { Injectable } from '@angular/core';

@Injectable()
export class RankingService {
	private _confidence(ups, downs) {
		let n = ups + downs;

        if (n === 0) {
            return 0;
        }

        let z = 1.281551565545;
        let p = parseFloat(ups) / n;
        let left = p + 1 / (2 * n) * z * z;
        let right = z * Math.sqrt(p * (1 - p) / n + z * z / (4 * n * n));
        let under = 1 + 1 / n * z * z;

        return (left - right) / under;
    }

    public confidence(ups, downs) {
        if (ups + downs === 0) {
            return 0;
        } else {
            return this._confidence(ups, downs);
        }
    }

    public timeConfidence(ups, comments, createTime) {
        let num = ups + 0.05 * comments + 0.75;
        let den = 1 + (0.1 * Math.pow(createTime, 2));

        return num / den;
    }
}