import React from 'react'
import { Button } from 'react-bootstrap'

const ScoreBoard = ({gameReset, player1Score, player2Score}) => {
    return (
        <>
            <div className="row scoreboard">
                <div className="col text-center">
                    <div className="row" style={{height: 'auto'}}>
                    <div className="col">
                        <h1>Scoreboard</h1>
                        <hr />
                    </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h2>P1 :&nbsp;<span id="score-count-p1" className="score-count">&nbsp;{player1Score}</span></h2>
                        </div>
                        <div className='col-auto'>
                            <Button className="btn btn-dark game-button" onClick={gameReset}>Reset </Button>
                        </div>
                        <div className="col">
                            <h2>P2 :&nbsp;<span id="score-count-p2" className="score-count">&nbsp;{player2Score}</span></h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ScoreBoard
