import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

interface TorusTwistLogoProps {
	titleText?: string;
	titleColor?: string;
}

export const TorusTwistLogo: React.FC<TorusTwistLogoProps> = ({
	titleText = 'eunu',
	titleColor = '#3182f6',
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	// Main animation
	const progress = spring({
		fps,
		frame,
		config: {
			damping: 75,
			stiffness: 38,
			mass: 1.6,
		},
	});

	// Text animation
	const textProgress = spring({
		fps,
		frame: frame - 55,
		config: {
			damping: 100,
			stiffness: 50,
		},
	});

	// Continuous rotation
	const rotation = interpolate(frame, [0, 300], [0, 360], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'extend',
	});

	// Create twisted torus
	const torusSegments = 80;
	const tubeSegments = 24;
	const torusRadius = 180;
	const tubeRadius = 50;

	const torusPoints = [];

	for (let i = 0; i < torusSegments; i++) {
		for (let j = 0; j < tubeSegments; j++) {
			const u = (i / torusSegments) * Math.PI * 2;
			const v = (j / tubeSegments) * Math.PI * 2;

			// Twisted torus parametric equations
			const twist = u * 1.5; // Twist amount
			const R = torusRadius;
			const r = tubeRadius;

			// Torus position
			const torusX = (R + r * Math.cos(v + twist)) * Math.cos(u);
			const torusY = (R + r * Math.cos(v + twist)) * Math.sin(u);
			const torusZ = r * Math.sin(v + twist);

			const x = torusX * progress;
			const y = torusY * progress;
			const z = torusZ * progress;

			// Color: 70% dark blue based on U parameter (around the main circle)
			const colorProgress = i / torusSegments;
			let fillColor;

			if (colorProgress < 0.7) {
				// Dark blue 70%
				const darkProg = colorProgress / 0.7;
				fillColor = `rgba(${31 + darkProg * 18}, ${82 + darkProg * 48}, ${154 + darkProg * 92}, 0.92)`;
			} else {
				// Light blue 30%
				const lightProg = (colorProgress - 0.7) / 0.3;
				fillColor = `rgba(${49 + lightProg * 96}, ${130 + lightProg * 83}, ${246 + lightProg * 9}, 0.9)`;
			}

			// Size variation for depth perception
			const size = 18 + Math.cos(v) * 3;

			torusPoints.push({
				x,
				y,
				z,
				fillColor,
				size,
				u,
				v,
				colorProgress,
			});
		}
	}

	// Sort by z-depth for proper layering
	const sortedPoints = [...torusPoints].sort((a, b) => a.z - b.z);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#0a0e1a',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				perspective: '1300px',
			}}
		>
			{/* Main container */}
			<div
				style={{
					position: 'relative',
					width: '900px',
					height: '900px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					transformStyle: 'preserve-3d',
					transform: `
						rotateX(${35 + rotation * 0.12}deg)
						rotateY(${rotation * 0.28}deg)
						rotateZ(${rotation * 0.06}deg)
						scale(${0.92 + progress * 0.08})
					`,
				}}
			>
				{/* Torus particles/segments */}
				{sortedPoints.map((point, i) => {
					const depth = point.z + 600;

					return (
						<div
							key={i}
							style={{
								position: 'absolute',
								left: '50%',
								top: '50%',
								width: `${point.size}px`,
								height: `${point.size}px`,
								borderRadius: '50%',
								background: `
									radial-gradient(
										circle at 38% 38%,
										${point.fillColor} 0%,
										${point.fillColor.replace(/[\d.]+\)$/, '0.88)')} 55%,
										${point.fillColor.replace(/[\d.]+\)$/, '0.72)')} 100%
									)
								`,
								transform: `
									translate(-50%, -50%)
									translate3d(${point.x}px, ${point.y}px, ${point.z}px)
								`,
								boxShadow: `
									0 ${Math.abs(point.z) * 0.08}px ${Math.abs(point.z) * 0.18}px rgba(31, 82, 154, ${0.42 * progress}),
									inset ${-point.z * 0.04}px ${-point.z * 0.04}px ${Math.abs(point.z) * 0.08}px rgba(0, 0, 0, 0.35),
									inset ${point.z * 0.04}px ${point.z * 0.04}px ${Math.abs(point.z) * 0.08}px rgba(255, 255, 255, ${point.colorProgress < 0.7 ? 0.28 : 0.38})
								`,
								filter: 'blur(0.3px)',
								zIndex: Math.round(depth),
								opacity: progress * (0.88 + Math.abs(point.z) * 0.002),
							}}
						>
							{/* Micro glassy highlight */}
							{point.z > -20 && (
								<div
									style={{
										position: 'absolute',
										top: '25%',
										left: '30%',
										width: '45%',
										height: '45%',
										borderRadius: '50%',
										background: `radial-gradient(circle at 45% 45%,
											rgba(255, 255, 255, ${point.colorProgress < 0.7 ? 0.48 : 0.58}) 0%,
											rgba(255, 255, 255, 0) 70%
										)`,
										filter: 'blur(2px)',
									}}
								/>
							)}
						</div>
					);
				})}

				{/* Central void glow */}
				<div
					style={{
						position: 'absolute',
						width: '280px',
						height: '280px',
						background: 'radial-gradient(circle, rgba(10, 14, 26, 0.8) 0%, rgba(31, 82, 154, 0.3) 50%, rgba(31, 82, 154, 0) 100%)',
						borderRadius: '50%',
						filter: 'blur(60px)',
						opacity: progress * 0.85,
					}}
				/>

				{/* Ambient glow */}
				<div
					style={{
						position: 'absolute',
						width: '500px',
						height: '500px',
						background: 'radial-gradient(circle, rgba(31, 82, 154, 0.35) 0%, rgba(31, 82, 154, 0) 65%)',
						filter: 'blur(90px)',
						opacity: progress * 0.75,
					}}
				/>

				{/* Top-right light accent */}
				<div
					style={{
						position: 'absolute',
						right: '12%',
						top: '18%',
						width: '320px',
						height: '320px',
						background: 'radial-gradient(circle, rgba(145, 213, 255, 0.32) 0%, rgba(145, 213, 255, 0) 68%)',
						filter: 'blur(55px)',
						opacity: progress * 0.68,
					}}
				/>
			</div>

			{/* Text */}
			<div
				style={{
					position: 'absolute',
					bottom: '100px',
					fontSize: '72px',
					fontWeight: 700,
					color: titleColor,
					opacity: textProgress,
					transform: `scale(${textProgress}) translateY(${interpolate(
						textProgress,
						[0, 1],
						[30, 0],
						{
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}
					)}px)`,
					textShadow: '0 4px 24px rgba(49, 130, 246, 0.5)',
					letterSpacing: '0.05em',
				}}
			>
				{titleText}
			</div>

			{/* Subtitle */}
			<div
				style={{
					position: 'absolute',
					bottom: '60px',
					fontSize: '18px',
					fontWeight: 600,
					color: '#8b95a1',
					opacity: textProgress * 0.8,
					letterSpacing: '0.1em',
				}}
			>
				ITERATION · 순환
			</div>
		</AbsoluteFill>
	);
};
