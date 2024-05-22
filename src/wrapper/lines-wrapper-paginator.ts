import { LinesPaginator } from "./lines-paginator";
import { LinesWrapper } from "./lines-wrapper";

export class LinesWrapperPaginator {

    private wrappedLines: string[];

    constructor(lines: string[], private maxCharactersInLine: number, private linesPerPage: number) {
        this.wrappedLines = new LinesWrapper(lines, maxCharactersInLine).wrapLines();
    }

    getPage(index: number): string[] {
        return new LinesPaginator(this.wrappedLines, this.linesPerPage).getPage(index);
    }

    getNumberOfPages(): number {
        return new LinesPaginator(this.wrappedLines, this.linesPerPage).getNumberOfPages();
    }
}

