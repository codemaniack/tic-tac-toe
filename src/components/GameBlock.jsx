import React from 'react'

const GameBlock = ({value, onClick }) => {
    return (
        <>
            <div className="col-auto square-block" onClick={onClick}>
                <div className="box">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-auto">
                            <span className="play-key">{value}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GameBlock
