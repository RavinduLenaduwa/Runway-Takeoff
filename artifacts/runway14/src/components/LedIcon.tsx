const PATTERNS = {
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

export type LedIconName = keyof typeof PATTERNS;

function grow(rows: string[], factor: number) {
  if (factor === 1) return rows;
  return rows.flatMap((row) => {
    const wide = [...row].map((cell) => cell.repeat(factor)).join("");
    return Array.from({ length: factor }, () => wide);
  });
}

interface LedIconProps {
  name: LedIconName;
  size?: number;
  /** Unlit cells kept around the drawing, like the border of an LED panel. */
  pad?: number;
  /** Draw each source pixel as a factor-by-factor block. */
  factor?: number;
  className?: string;
}

// An LED matrix: every cell is drawn, unlit ones in near-black, so the grid
// itself reads as hardware rather than as an icon on a blank background.
export function LedIcon({ name, size = 168, pad = 2, factor = 1, className }: LedIconProps) {
  const rows = grow(PATTERNS[name].trim().split("\n"), factor);
  const width = Math.max(...rows.map((row) => row.length));
  const height = rows.length;
  const side = Math.max(width, height) + pad * 2;
  const offsetX = Math.floor((side - width) / 2);
  const offsetY = Math.floor((side - height) / 2);

  const cells = [];
  for (let y = 0; y < side; y++) {
    for (let x = 0; x < side; x++) {
      const lit = rows[y - offsetY]?.[x - offsetX] === "#";
      cells.push(
        <rect key={`${x}-${y}`} className={lit ? "on" : "off"} x={x + 0.12} y={y + 0.12} width={0.76} height={0.76} />,
      );
    }
  }

  return (
    <svg
      className={className ? `led ${className}` : "led"}
      width={size}
      height={size}
      viewBox={`0 0 ${side} ${side}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {cells}
    </svg>
  );
}
