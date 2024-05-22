
const EXPLICIT_LABEL_REGEX = /\[(.*?)\]/;

export class ParsedTextUnitPart {

    public rawContent: string;
    public textContent: string;
    public explicitLabel: string | null;
    public defaultLabel: string;
    public indexLabel: number;
    public lines: string[];

    constructor(partText: string, index: number) {
        this.rawContent = partText;
        this.indexLabel = index;
        this.textContent = this.extractTextContent();
        this.explicitLabel = this.extractExplicitLabel();
        this.defaultLabel = this.extractDefaultLabel();
        this.lines = this.extractLines();
    }

    private extractExplicitLabel(): string | null {
        const label = this.rawContent.match(EXPLICIT_LABEL_REGEX)?.[0];
        return label ?? null;
    }

    private extractTextContent(): string {
        return this.rawContent.replace(EXPLICIT_LABEL_REGEX, "").trim();
    }

    private extractDefaultLabel(): string {
        return this.textContent.split("\n")[0].trim();
    }

    private extractLines(): string[] {
        return this.textContent.split("\n");
    }

    getLabel(): string {
        return this.explicitLabel ?? this.defaultLabel;
    }
}
