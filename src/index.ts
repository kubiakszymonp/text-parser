import { readFile } from "./utils";
import { Song } from "./structures/song";
import { SongDivider } from "./song-divider";

export { Song } from "./structures/song";
export { SongDivider } from "./song-divider";

// const song = new Song(readFile("src/examples/song_format.txt"));

// const songDivider = new SongDivider(20, 5, song);

// const parts = songDivider.getNumberOfParts();
// const pages = songDivider.getPagesForPart(0);
// const a = songDivider.getDisplayPageForPart(0, 0);
