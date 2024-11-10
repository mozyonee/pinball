"use client"

import { useState, useEffect } from 'react';

const Home = () => {
	const [tilePosition, setTilePosition] = useState(0);
	const [score, setScore] = useState(0);
	let ballSpeed = 75;
	let dx = Math.random() * 2 - 1;
	let dy = Math.random() * 2 - 1;
	let collidingTile = false;

	useEffect(() => {
		const ball = document.getElementById('ball');

		const containerWidth = ball.parentElement.offsetWidth;
		const containerHeight = ball.parentElement.offsetHeight;

		ball.style.top = `${containerHeight / 2}px`;
		ball.style.left = `${containerWidth / 2}px`;

		const moveBall = () => {
			const { top, left, right, bottom } = ball.getBoundingClientRect();
			const tile = document.getElementById('tile').getBoundingClientRect();

			if(top >= containerHeight - ball.offsetHeight && dy > 0) {
				dy = -dy;
				ballSpeed = 75;
				setScore(0);
			}
			if(top <= 0 && dy < 0) dy = -dy;
			if(left >= containerWidth - ball.offsetWidth && dx > 0) dx = -dx;
			if(left <= 0 && dx < 0) dx = -dx;	

			if(right >= tile.left && left <= tile.right && top <= tile.bottom && bottom >= tile.top) {
				if(!collidingTile) {
					dy = -dy;
                    ballSpeed *= 1.1;
                    setScore(prevScore => prevScore + 1);
					collidingTile = true;
				}
			} else {
				collidingTile = false;
			}

			ball.style.top = `${ball.offsetTop + dy * ballSpeed}px`;
			ball.style.left = `${ball.offsetLeft + dx * ballSpeed}px`;

			requestAnimationFrame(moveBall);
		};

		moveBall();

		return () => {
			cancelAnimationFrame(moveBall);
		};
	}, []);

	const handleMouseMove = (e) => {
        const containerWidth = e.currentTarget.offsetWidth;
        const newPosition = Math.min(containerWidth - 160, Math.max(0, e.clientX));
        setTilePosition(newPosition);
    };

	return (
		<main className="relative h-screen w-screen cursor-none	overflow-hidden" onMouseMove={handleMouseMove}>
			<p className="ml-10 mt-5 text-[64px]">{score}</p>
			<div id="ball" className="absolute h-10 w-10 bg-black rounded-full transition-all duration-100"></div>
			<div id="tile" style={{ left: tilePosition }} className="absolute bottom-20 h-10 w-40 bg-black rounded-full"></div>
		</main>
	);
};

export default Home;