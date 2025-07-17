const socket = io();
const chess = new Chess();
const boardElement = document.querySelector('.board');

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = '';
    board.forEach((row, rowindex) => {
        row.forEach((square, sqareindex) => {
            const squreElement = document.createElement('div');
            squreElement.classList.add(
                'square',
                (rowindex + sqareindex) % 2 === 0 ? 'light' : 'dark'
            );
            squreElement.dataset.row = rowindex;
            squreElement.dataset.col = sqareindex;

            if (square) {
                const pieceElement = document.createElement('div');
                pieceElement.classList.add(
                    'piece',
                    square.color === 'w' ? 'white' : 'black'
                );
                pieceElement.innerText = getPieceUnicode(square.type);
                pieceElement.draggable = playerRole === square.color;

                pieceElement.addEventListener("dragstart", (e) => {
                    if (pieceElement.draggable) {
                        draggedPiece = pieceElement;
                        sourceSquare = { row: rowindex, col: sqareindex };
                        e.dataTransfer.setData("text/plain", "");
                    }
                });

                pieceElement.addEventListener("dragend", () => {
                    draggedPiece = null;
                    sourceSquare = null;
                });

                squreElement.appendChild(pieceElement);
            }

            squreElement.addEventListener("dragover", function (e) {
                e.preventDefault();
            });

            squreElement.addEventListener("drop", function (e) {
                e.preventDefault();
                if (draggedPiece) {
                    const targetSource = {
                        row: parseInt(squreElement.dataset.row),
                        col: parseInt(squreElement.dataset.col)
                    };
                    handlemove(sourceSquare, targetSource);
                }
            });

            boardElement.appendChild(squreElement);
        });
    });
};

const handlemove = () => { };

// ✅ Fixed Unicode piece mapping logic
const getPieceUnicode = (piece) => {
    const pieceUnicode = {
        p: '♟',
        r: '♜',
        n: '♞',
        b: '♝',
        q: '♛',
        k: '♚',
        P: '♙',
        R: '♖',
        N: '♘',
        B: '♗',
        Q: '♕',
        K: '♔'
    };
    return pieceUnicode[piece] || '';
};

renderBoard();
