const ICONS = {
  web: `
############
#.#.#......#
############
#..........#
#.#####....#
#..........#
#.########.#
#..........#
#.######...#
#..........#
############`,
  app: `
############
#...#......#
#.#.#.####.#
#...#......#
#.#.#.#..#.#
#...#.#..#.#
#.#.#.####.#
#...#......#
############`,
  seo: `
..#####.....
.#.....#....
#...#...#...
#..###..#...
#...#...#...
.#.....#....
..#####.#...
.........#..
..........#.
...........#`,
  ai: `
..#.#.#.#..
.#########.
##.......##
.#.#####.#.
##.#...#.##
.#.#.#.#.#.
##.#...#.##
.#.#####.#.
##.......##
.#########.
..#.#.#.#..`,
  brief: `
#######...
#.....##..
#.....#.#.
#.....####
#........#
#.#####..#
#........#
#.######.#
#........#
#.####...#
#........#
##########`,
  quote: `
##########
#........#
#.######.#
#........#
#.####...#
#........#
#....###.#
#...#....#
#....##..#
#......#.#
#...###..#
##########`,
  plane: `
...........##
.........###.
.......##.#..
.....##..#...
...##...#....
.##....#.....
####..#......
....#.#......
.....##......
......#......`,
} as const;

export type PixelIconName = keyof typeof ICONS;

// Drawn as SVG dots rather than on a canvas so they stay sharp at any pixel
// density and need no script to appear.
export function PixelIcon({ name, size = 26 }: { name: PixelIconName; size?: number }) {
  const rows = ICONS[name].trim().split("\n");
  const width = Math.max(...rows.map((row) => row.length));
  const height = rows.length;
  const side = Math.max(width, height);
  const offsetX = (side - width) / 2;
  const offsetY = (side - height) / 2;

  return (
    <svg className="pix" width={size} height={size} viewBox={`0 0 ${side} ${side}`} aria-hidden="true">
      {rows.flatMap((row, y) =>
        [...row].map((cell, x) =>
          cell === "#" ? <circle key={`${x}-${y}`} cx={offsetX + x + 0.5} cy={offsetY + y + 0.5} r={0.36} /> : null,
        ),
      )}
    </svg>
  );
}
