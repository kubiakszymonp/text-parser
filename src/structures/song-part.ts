import { InvalidPartTitleError } from "../exceptions/invalid-part-title.error";
import { NoNewlineBeforePartTitleError } from "../exceptions/no-newline-before-part-title.error";

export class SongPart {
  private rawSongPart: string;
  songPartName: string;
  songPartContent: string;
  songPartLines: string[];
  hasCustomName: boolean;

  constructor(songPart: string) {
    this.hasCustomName = false;
    this.rawSongPart = songPart.replace(/^\n/, "");
    this.songPartName = this.extractPartName();
    this.songPartLines = this.extractPartLines();
    this.songPartContent = this.extractPartContent();
  }

  private extractPartName(): string {
    const firstLine = this.rawSongPart.split("\n")[0];

    const customPartNameRegex = /\[.*\]/;
    if (firstLine.match(customPartNameRegex)) {
      this.hasCustomName = true;
      return firstLine.replace("[", "").replace("]", "").trim();
    } else {
      this.hasCustomName = false;
      // remove non-letter characters from the end of the string
      return firstLine.replace(/\W+$/, "");
    }
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

    if (this.hasCustomName) {
      splitted.shift();
    }

    return splitted
      .map((line) => line.trim());
  }
}
