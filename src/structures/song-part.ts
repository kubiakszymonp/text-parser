import { InvalidPartTitleError } from "../exceptions/invalid-part-title.error";
import { NoNewlineBeforePartTitleError } from "../exceptions/no-newline-before-part-title.error";

export class SongPart {
  private rawSongPart: string;
  songPartName: string;
  songPartContent: string;
  songPartLines: string[];

  constructor(songPart: string) {
    this.rawSongPart = songPart;
    this.songPartName = this.extractPartName();
    this.songPartLines = this.extractPartLines();
    this.songPartContent = this.extractPartContent();
  }

  private extractPartName(): string {
    const firstLine = this.rawSongPart.split("\n")[0];

    this.throwErrorIfPartNameIsInvalid(firstLine);

    const partName = firstLine.replace("[", "").replace("]", "").trim();
    return partName;
  }

  private extractPartContent(): string {
    return this.songPartLines.join("\n");
  }

  /**
   * Extracts the lines of a song part from the raw song part string.
   *
   * @returns An array of strings representing the lines of the song part.
   */
  private extractPartLines(): string[] {
    const splitted = this.rawSongPart.split("\n");

    splitted.shift();
    return splitted
      .map((line) => line.trim())
      .map((line) => {
        this.throwErrorIfNoNewlineBeforePartTitle(line);
        return line;
      });
  }

  /**
   * Throws an InvalidPartTitleError if the part name in the first line is invalid.
   * @param partFirstLine - The first line of the part.
   * @throws {InvalidPartTitleError} - If the part name is invalid.
   */
  private throwErrorIfPartNameIsInvalid(partFirstLine: string): void {
    const partNameRegex = /\[(.*)\]/;
    if (!partNameRegex.test(partFirstLine)) {
      throw new InvalidPartTitleError(this);
    }
  }

  /**
   * Throws an error if there is no newline before the part title.
   * @param partLine - The line containing the part title.
   * @throws {NoNewlineBeforePartTitleError} - If there is no newline before the part title.
   */
  private throwErrorIfNoNewlineBeforePartTitle(partLine: string): void {
    const partNameRegex = /\[(.*)\]/;
    if (partNameRegex.test(partLine)) {
      throw new NoNewlineBeforePartTitleError(partLine);
    }
  }
}
