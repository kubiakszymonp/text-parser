export class NoNewlineBeforePartTitleError extends Error {

    constructor(public partLine: string) {
        super(`No newline before part title. Part title must be in the format [part name]`)
        this.name = "NoNewlineBeforePartTitleError";
    }
}
