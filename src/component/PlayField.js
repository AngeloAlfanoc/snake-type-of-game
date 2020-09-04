import React, {useEffect, useRef, useState} from 'react';

import Blank from '../assets/field.png'
import Food from '../assets/point.png'
import Snake from '../assets/player.png'
import { useDispatch } from 'react-redux';

const PlayField = () => {
    const width = 50;
    const height = 50;
    let initialGrid = [];
    for (let i = 0; i < height; i++) {
        initialGrid.push([]);
        for (let k = 0; k < width; k++) {
            initialGrid[i].push('field');
        }
    }

    const randomPosition = () => {
        const position = {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height)
        };
        return position;
    }

    const [rows,setRows] = useState(initialGrid);
    const [player,setPlayer] = useState([{ x: 0,y: 0}, {x: 1,y: 0}]);
    const [direction, setDirection] = useState('right');
    const [food, setFood] = useState(randomPosition);
    const [point, setPoint] = useState(1)
  
    const KeyDirection = (e) => {
         let {keyCode} = e;
        switch (keyCode) {
            case 37:
                setDirection('left');
             
                break;
            case 38:
                setDirection('top');
              
                break;
            case 39:
                setDirection('right');
          
                break;
            case 40:
                setDirection('bottom');
          
                break;
            default:
       
                break;
        }
    }

    document.addEventListener("keydown", KeyDirection, false);
    const displaySnake = () => {
        const newRows = initialGrid;
        player.forEach(cell => {
            newRows[cell.x][cell.y] = 'player';
        })
        newRows[food.x][food.y] = 'point';
        setRows(newRows);
    }
   
    const movePlayer = () => {
        const newPlayer = [];
        switch (direction) {
            case 'right':
                newPlayer.push({
                    x: player[0].x,
                    y: (player[0].y + 1) % width
                });
                break;
            case 'left':
                newPlayer.push({
                    x: player[0].x,
                    y: (player[0].y - 1 + width) % width
                });
                break;
            case 'top':
                newPlayer.push({
                    x: (player[0].x - 1 + height) % height,
                    y: player[0].y
                });
                break;
            case 'bottom':
                newPlayer.push({
                    x: (player[0].x + 1) % height,
                    y: player[0].y
                });
        }
        player.forEach(cell => {
            newPlayer.push(cell);
        })
        if (player[0].x === food.x && player[0].y === food.y) {
            setPoint(point+1)
            setFood(randomPosition);
        }
         else {
            newPlayer.pop();
        }
        setPlayer(newPlayer);
        displaySnake();
    }

    useInterval(movePlayer, 70);
    
    function useInterval(callback, delay) {
        const savedCallback = useRef();
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        useEffect(() => {
            function tick() {
                savedCallback.current();
            }
            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }

    const displayRows = rows.map(row => <li>
        {row.map(e => {
            switch (e) {
                case 'field':
                    return <img src={Blank}/>
                case 'player':
                    return <img
                        style={{ opacity: "0"}}
                        src={Snake}/>
                case 'point':
                    return <img src={Food}/>
            }
        })}
    </li>);

    return (
        <div >
            <ul
                style={{
                width: '750px',
                padding: '0px'
            }}>
                {displayRows}
            </ul>
        </div>
    )
}

export default PlayField;