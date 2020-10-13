export enum ServerErrorType {
    Unauthorized,
    InternalServerError,
    ServiceUnavailable,
    Unknown
}

export class ServerError {
    private error: ServerErrorType;

    private readonly mapping: { [index: number]: ServerErrorType } = {
        401: ServerErrorType.Unauthorized,
        500: ServerErrorType.InternalServerError,
        503: ServerErrorType.ServiceUnavailable
    };

    constructor(code: number) {
        if (code in this.mapping) {
            this.error = this.mapping[code]
        } else {
            this.error = ServerErrorType.Unknown
        }
    }
}
