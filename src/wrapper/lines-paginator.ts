
export class LinesPaginator {

    constructor(
        private lines: string[],
        private linesPerPage: number
    ) {
    }

    private paginate(): string[][] {
        const pages: string[][] = [];
        let currentPage: string[] = [];
        this.lines.forEach((line) => {
            if (currentPage.length < this.linesPerPage) {
                currentPage.push(line);
            } else {
                pages.push(currentPage);
                currentPage = [line];
            }
        });
        pages.push(currentPage);
        return pages;
    }

    getPage(index: number): string[] {
        return this.paginate()[index];
    }

    getNumberOfPages(): number {
        return this.paginate().length;
    }
}
