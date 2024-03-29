export class HTTPError {
    public readonly code: number;

    constructor(code: number) {
        this.code = code
    }

    public static is(e: any, code: number): boolean {
        if (e instanceof HTTPError) {
            return e.code === code
        }

        return false
    }
}

export class APIError {
    public readonly message: string;

    constructor(message: string) {
        this.message = message
    }
}
