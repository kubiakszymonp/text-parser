import { SongPart } from "./song-part";

const MULTIPLE_NEWLINES = /\n{2,}/g;
const VERTICAL_SPACE = "\n\n";

export class Song {
  rawSong: string;
  songParts: SongPart[] = [];

  constructor(song: string) {
    this.rawSong = song;
    this.songParts = this.extractSongParts().map((part) => new SongPart(part));
  }

  private extractSongParts(): string[] {
    const removeCarraigeReturn = this.rawSong.replace(/\r/g, "");
    const addedNewLineBeforePartTitle = removeCarraigeReturn.replace(/\[/g, "\n[");
    const replacedMultipleNewlines = addedNewLineBeforePartTitle.replace(MULTIPLE_NEWLINES, VERTICAL_SPACE);
    const splitted = replacedMultipleNewlines.split(VERTICAL_SPACE);
    return splitted;
  }

  getPartByIndex(index: number) {
    return this.songParts[index];
  }

  getPartByName(name: string) {
    return this.songParts.find((part) => part.songPartName === name);
  }
}
