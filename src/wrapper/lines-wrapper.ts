export class LinesWrapper {

    constructor(
        private lines: string[],
        private maxCharactersInLine: number
    ) {
        this.wrapLines();
    }

    wrapLines(): string[] {
        const wrappedLines: string[] = [];
        this.lines.forEach((line) => {
            const words = line.split(" ");
            let currentLine = "";
            words.forEach((word) => {
                if (currentLine.length + word.length > this.maxCharactersInLine) {
                    wrappedLines.push(currentLine.trim());
                    currentLine = "";
                }
                currentLine += word + " ";
            });
            wrappedLines.push(currentLine.trim());
        });
        return wrappedLines;
    }
}
