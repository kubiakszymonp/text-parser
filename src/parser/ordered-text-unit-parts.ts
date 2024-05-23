import { ParsedTextUnit } from './parsed-text-unit';
import { ParsedTextUnitPart } from './parsed-text-unit-part';

export class OrderedParsedTextUnit extends ParsedTextUnit {

    public orderedTextUnitParts: ParsedTextUnitPart[];
    public order: number[];

    constructor(text: string, order: number[]) {
        super(text);
        this.order = this.correctPartsOrder(order);
        this.orderedTextUnitParts = this.orderTextUnitParts();
    }

    public getPartByOrder(order: number): ParsedTextUnitPart | null {
        const part = this.orderedTextUnitParts[order];
        return part ?? null;
    }

    private orderTextUnitParts(): ParsedTextUnitPart[] {
        return this.order
            .map((index) => this.getPartByIndexLabel(index))
            .filter((p): p is ParsedTextUnitPart => p !== undefined);
    }

    private correctPartsOrder(order: number[]) {
        const correctedOrder = order.filter(indexLabel => {
            return this.parsedTextUnitParts.some(part => part.indexLabel === indexLabel);
        });

        if (correctedOrder.length < 1) {
            return this.parsedTextUnitParts.map(part => part.indexLabel);
        }

        return correctedOrder;
    }
}