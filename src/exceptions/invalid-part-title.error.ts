import { SongPart } from "../structures/song-part";

export class InvalidPartTitleError extends Error {
    constructor(public songPart: SongPart) {
        super(`Invalid part name. Part name must be in the format [part name]`)
        this.name = "InvalidPartTitleError";
    }
}