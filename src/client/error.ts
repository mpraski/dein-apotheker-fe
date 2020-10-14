export class HTTPError {
    public code: number;

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
