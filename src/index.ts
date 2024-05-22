import { readFile } from "./utils";
import { Song } from "./structures/text";
import { SongDivider } from "./song-divider";

// export { Song } from "./structures/text";
// export { SongDivider } from "./song-divider";

// const song = new Song(readFile("src/examples/song_format.txt"));

// const songDivider = new SongDivider(20, 5, song);

// const parts = songDivider.getNumberOfParts();
// const pages = songDivider.getPagesForPart(0);
// const a = songDivider.getDisplayPageForPart(0, 0);

export { ParsedTextUnit } from "./parser/parsed-text-unit";
export { ParsedTextUnitPart } from "./parser/parsed-text-unit-part";

export { LinesWrapper } from "./wrapper/lines-wrapper";
export { LinesWrapperPaginator } from "./wrapper/lines-wrapper-paginator";
export { LinesPaginator } from "./wrapper/lines-paginator";