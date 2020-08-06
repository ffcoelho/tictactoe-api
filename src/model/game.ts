export class Game {

  lines: number[][];
  lineNames = [
    "hA", "hB", "hC", "vA", "vB", "vC", "dA", "dB" 
  ];

  constructor(board: number[]) {
    this.lines = [
      [ board[0], board[1], board[2] ],
      [ board[3], board[4], board[5] ],
      [ board[6], board[7], board[8] ],
      [ board[0], board[3], board[6] ],
      [ board[1], board[4], board[7] ],
      [ board[2], board[5], board[8] ],
      [ board[0], board[4], board[8] ],
      [ board[6], board[4], board[2] ]
    ]
  }

  state(): any {
    let closed = 0;
    let state = "play";
    let winLine = "none";
    this.lines.forEach((line: number[], idx: number) => {
      const result = this.checkLine(line);
      if (result === "closed") {
        closed++;
      }
      if (result === "winner") {
        state = "end";
        winLine = this.lineNames[idx];
      }
    });
    return { state, winLine };
  }

  checkLine(line: number[]): string {
    let empty = 0;
    let sum = line[0] + line[1] + line[2];
    for (const pos of line) {
      if (pos === 0) {
        empty++;
      }
    }
    if (empty > 1 || (empty === 1 && sum !== 3)) {
      return "open";
    }
    if (empty === 1 && sum === 3) {
      return "closed";
    }
    if (empty === 0 && (sum === 4 || sum === 5)) {
      return "closed";
    }
    return "winner";
  }
}
