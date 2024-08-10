import React, { useEffect, useState } from 'react'
import { Row, Col, Container, Button } from 'react-bootstrap'
import ScoreBoard from './ScoreBoard'
import Heading from './Heading'
import GameBlock from './GameBlock'
import { MdOutlineCircle } from "react-icons/md";
import { MdClose } from "react-icons/md";
import WelcomeScreen from './WelcomeScreen'

const Board = () => {
    const [startGame, setStartGame] = useState(false)
    const [gameEnd, setGameEnd] = useState(false)
    const [gameEndMessage, setGameEndMessage] = useState('')
    const [turn, setTurn] = useState(<MdClose />)
    const [blocks, setBlocks] = useState({
        playKey: Array(9).fill(''),
        player: '',
        playIndex: ''
    }) // An array to track the state of each block

    const [player1Plays, setPlayer1Plays] = useState([])
    const [player2Plays, setPlayer2Plays] = useState([])

    const [player1Score, setPlayer1Score] = useState(0)
    const [player2Score, setPlayer2Score] = useState(0)

    const [playerTurn, setPlayerTurn] = useState('P1')

    const [gameMode, setGameMode] = useState(null)

    const [numPlays, setNumPlays] = useState(0)

    const winningCombinations = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal from top-left to bottom-right
        [2, 4, 6]  // Diagonal from top-right to bottom-left
    ];

    const [plays, setPlays] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8])

    const handleGameStartClick = () =>{
        setStartGame(true)
    }

    const resetGame = () => {
        setGameEnd(false)
        setStartGame(true)
        setBlocks({
            playKey: Array(9).fill(''),
            player: '',
            playIndex: ''}) // Reset the game board
        setTurn(<MdClose />)

        setPlayer1Plays([])
        setPlayer2Plays([])
        setPlays([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        setNumPlays(0)
    }

    const fullReset = () => {
        resetGame()
        setGameMode(null)
    }

    const resetScoreBoard = () => {
        setPlayer1Score(0)
        setPlayer2Score(0)
    }

    const handleClickMultiplayer = (index) => {
        if (blocks.playKey[index] !== '' || gameEnd) return; // Prevent overriding already clicked blocks or if the game has ended
        
        const updatedPlayer1Plays = [...player1Plays, index];
        const updatedPlayer2Plays = [...player2Plays, index];
        
        const player = turn.type === MdClose ? 'P1' : 'P2'
        // Create a new copy of the blocks object
        const newBlocks = {
            ...blocks,
            playKey: [...blocks.playKey],  // Create a new array for playKey
            player: player,
            playIndex: index
        };
    
        // Update the specific block with the current turn
        newBlocks.playKey[index] = turn;
        turn.type === MdClose ? setPlayer1Plays(updatedPlayer1Plays) : setPlayer2Plays(updatedPlayer2Plays)

        setBlocks(newBlocks);  // Update the state with the new object
    
        // Toggle turn between X and O
        setTurn(turn.type === MdClose ? <MdOutlineCircle /> : <MdClose />);
        setPlayerTurn(player)

        const totalPlays = numPlays + 1
        setNumPlays(totalPlays)

    }

    const handleClick = (index) => {
        if (blocks.playKey[index] !== '' || gameEnd) return; // Prevent overriding already clicked blocks or if the game has ended
    
        // Mark the user's play
        const updatedPlayer1Plays = [...player1Plays, index];
        
        // Create a new copy of the blocks object
        const newBlocks = {
            ...blocks,
            playKey: [...blocks.playKey],  // Create a new array for playKey
        };
        
        // Update the specific block with the user's turn
        newBlocks.playKey[index] = <MdClose />;
    
        // Update the plays array by removing the user's play
        const availablePlays = plays.filter(play => play !== index);
        
    
        // Randomly select a play for the computer from the remaining available plays
        const computerPlayIndex = Math.floor(Math.random() * availablePlays.length);
        const computerPlay = availablePlays[computerPlayIndex];
    
        // Update the computer's play
        const updatedPlayer2Plays = [...player2Plays, computerPlay];
        
        // Mark the computer's play on the blocks
        newBlocks.playKey[computerPlay] = <MdOutlineCircle />;
    
        // Update the plays array by removing the computer's play
        const remainingPlays = availablePlays.filter(play => play !== computerPlay);
    
        // Update the state
        setPlayer1Plays(updatedPlayer1Plays);
        setPlayer2Plays(updatedPlayer2Plays);
        setBlocks(newBlocks);
        
        // Update the plays array with the remaining plays
        setPlays(remainingPlays);

        const totalPlays = numPlays + 1
        setNumPlays(totalPlays)
    
        // Optional: Log the state for debugging
        console.log('Available plays:', plays);
        console.log('Computer play:', computerPlay);
        console.log('User play:', index);

    };

    const handleGameMode = (mode) => {
        setGameMode(mode)
    }

    const handlePlay = (plays) => {
        const computerPlay = Math.floor(Math.random() * plays.length);
        return computerPlay
    }

    const checkForWinner = () => {
        winningCombinations.forEach((winningCombination) => {
            if ((areAllValuesPresent(winningCombination, player1Plays)) == true){
                console.log('Player 1 wins!')
                setGameEndMessage('Player 1 wins!')
                setGameEnd(true)
                setStartGame(false)
                
                var score = player1Score + 1
                setPlayer1Score(score)
            } else if ((areAllValuesPresent(winningCombination, player2Plays)) == true) {
                console.log('Player 2 wins!')

                setGameEndMessage(gameMode == 'single' ? 'Computer wins!' : 'Player 2 wins!')
                setGameEnd(true)
                setStartGame(false)

                var score = player2Score + 1
                setPlayer2Score(score)
            } else if (numPlays == 9){
                setGameEndMessage('It was a draw!')
                setGameEnd(true)
                setStartGame(false)
                
            }
        })  

        
    }

    const areAllValuesPresent = (array1, array2) => {
        // Check if every value in array1 is included in array2
        return array1.every(value => array2.includes(value));
    }

    useEffect(() => {
        checkForWinner()

        console.log(numPlays)

    }, [player1Plays, player2Plays])
    

    return (
        <>
            {gameMode == null && (
                <Container>
                    <Row className="justify-content-center align-items-center">
                        <Col className="col-auto text-center">
                            <h1>Welcome to Tic-Tac-Toe</h1>
                            <h6 className='mb-3'>Select game mode:</h6>

                            <Row className="justify-content-center">
                                <Col className="col-auto">
                                    <Button className='btn btn-dark game-button' onClick={() => handleGameMode('single')}>Single Player</Button>
                                </Col>

                                <Col className="col-auto">
                                    <Button className='btn btn-dark game-button' onClick={() => handleGameMode('multiplayer')}>Multiplayer</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            )}
            

            {!startGame && !gameEnd && gameMode !== null && (
                <Container>
                    <Row className="justify-content-center align-items-center">
                        <Col className="col-auto">
                            <Button className="btn btn-dark game-button" type="button" onClick={handleGameStartClick}>Start Game</Button>
                        </Col>
                    </Row>
                </Container>
            )}

            {startGame && !gameEnd && (
                <Container>
                    <Row className='justify-content-center align-items-center'>
                        <Col className='col-auto'>
                            <Heading />
                            <Row className="row top-row">
                                <GameBlock value={blocks.playKey[0]} onClick={() => gameMode == 'multiplayer' ? handleClickMultiplayer(0) : handleClick(0)} />
                                <GameBlock value={blocks.playKey[1]} onClick={() => gameMode == 'multiplayer' ? handleClickMultiplayer(1) : handleClick(1)} />
                                <GameBlock value={blocks.playKey[2]} onClick={() => gameMode == 'multiplayer' ? handleClickMultiplayer(2) : handleClick(2)} />
                            </Row>
                            <Row className="row middle-row">
                                <GameBlock value={blocks.playKey[3]} onClick={() => gameMode == 'multiplayer' ? handleClickMultiplayer(3) : handleClick(3)} />
                                <GameBlock value={blocks.playKey[4]} onClick={() => gameMode == 'multiplayer' ? handleClickMultiplayer(4) : handleClick(4)} />
                                <GameBlock value={blocks.playKey[5]} onClick={() => gameMode == 'multiplayer' ? handleClickMultiplayer(5) : handleClick(5)} />
                            </Row>
                            <Row className="row bottom-row mb-5">
                                <GameBlock value={blocks.playKey[6]} onClick={() => gameMode == 'multiplayer' ? handleClickMultiplayer(6) : handleClick(6)} />
                                <GameBlock value={blocks.playKey[7]} onClick={() => gameMode == 'multiplayer' ? handleClickMultiplayer(7) : handleClick(7)} />
                                <GameBlock value={blocks.playKey[8]} onClick={() => gameMode == 'multiplayer' ? handleClickMultiplayer(8) : handleClick(8)} />
                            </Row>
                            <ScoreBoard gameReset={fullReset} player1Score={player1Score} player2Score={player2Score} />
                        </Col>
                    </Row>
                </Container>
            )}


            { gameEnd && !startGame && (
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-auto text-center">
                            <p id="result-message" style={{textAlign: 'center'}}>{gameEndMessage}</p>
                            <Row>
                                <Col className='col-auto'>
                                    <button id="reset-button" className="btn btn-dark game-button" type="button" onClick={resetGame}>Play Again</button>
                                </Col>

                                <Col className='col-auto'>
                                    <button id="reset-button" className="btn btn-dark game-button" type="button" onClick={fullReset}>Exit</button>
                                </Col>
                            </Row>
                            
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Board
