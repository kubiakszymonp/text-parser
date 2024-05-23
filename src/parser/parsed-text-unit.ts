import { ParsedTextUnitPart } from "./parsed-text-unit-part";

const NEWLINE_SPACE = "\n\n";

export class ParsedTextUnit {
    public rawText: string;
    public parsedTextUnitParts: ParsedTextUnitPart[] = [];

    constructor(text: string) {
        this.rawText = this.removeMultipleNewlines(text.trim());
        this.extractTextUnitParts();
    }

    getPartByIndexLabel(index: number) {
        return this.parsedTextUnitParts.find((part) => part.indexLabel === index);
    }

    private removeMultipleNewlines(text: string): string {
        return text.replace(/\n{2,}/g, NEWLINE_SPACE);
    }

    private extractTextUnitParts(): void {
        const splittedParts = this.rawText.split(NEWLINE_SPACE);
        this.parsedTextUnitParts = splittedParts.map((part, index) => new ParsedTextUnitPart(part, index + 1));
    }
}