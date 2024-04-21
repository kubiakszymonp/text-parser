import { Song } from "./structures/song";

export class SongDivider {
  constructor(
    private numberOfCharactersInLine: number,
    private numberOfLinesPerPage: number,
    private song: Song
  ) {}

  getNumberOfParts() {
    return this.song.songParts.length;
  }

  public getDisplayPageForPart(partIndex: number, pageIndex: number) {
    const partLines = this.getPagesForPart(partIndex);

    if (pageIndex < 0 || pageIndex >= partLines.length) {
      throw new Error("Page with this index does not exist");
    }

    return partLines[pageIndex];
  }

  public getNumberOfPagesForPart(partIndex: number) {
    const partLines = this.getPagesForPart(partIndex);
    return partLines.length;
  }

  public getPagesForPart(partIndex: number): Page[] {
    if (partIndex < 0 || partIndex >= this.getNumberOfParts()) {
      throw new Error("Part with this index does not exist");
    }

    const parts: Page[] = [];

    const adjustedLinesForPages = this.breakLinesForNumberOfCharacters(
      this.song.songParts[partIndex].songPartLines
    );

    let currentPage: Page = { lines: [] };

    // divide the lines into batches of lines that fit on a page
    adjustedLinesForPages.forEach((line) => {
      if (currentPage.lines.length < this.numberOfLinesPerPage) {
        currentPage.lines.push(line);
      } else {
        parts.push(currentPage);
        currentPage = { lines: [line] };
      }
    });

    // add the last page
    parts.push(currentPage);

    return parts;
  }

  private breakLinesForNumberOfCharacters(lines: string[]): string[] {
    const linesAdjustedForCharactersInLine: string[] = [];
    lines.forEach((line) => {
      const adjustedLines = this.breakLine(line);
      linesAdjustedForCharactersInLine.push(...adjustedLines);
    });

    return linesAdjustedForCharactersInLine;
  }

  private breakLine(line: string) {
    const words = line.split(" ");
    let currentLine = "";
    const wrappedLines: string[] = [];

    words.forEach((word, index) => {
      // Check if adding the next word exceeds the max length
      if ((currentLine + word).length < this.numberOfCharactersInLine) {
        // Add word to current line if it fits
        currentLine += (currentLine.length > 0 ? " " : "") + word;
      } else {
        // If the current line is not empty, add it to wrapped text
        if (currentLine.length > 0) {
          wrappedLines.push(currentLine);
        }
        // Start a new line with the current word
        currentLine = word;
      }

      // If this is the last word, add the current line to wrapped text
      if (index === words.length - 1 && currentLine.length > 0) {
        wrappedLines.push(currentLine);
      }
    });

    return wrappedLines;
  }
}

export interface Page {
  lines: string[];
}