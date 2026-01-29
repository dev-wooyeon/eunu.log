import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

interface FluidWaveLogoProps {
	titleText?: string;
	titleColor?: string;
}

export const FluidWaveLogo: React.FC<FluidWaveLogoProps> = ({
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
			stiffness: 45,
			mass: 1.3,
		},
	});

	// Text animation
	const textProgress = spring({
		fps,
		frame: frame - 50,
		config: {
			damping: 100,
			stiffness: 50,
		},
	});

	// Wave animation offset
	const waveOffset = (frame * 0.05) % (Math.PI * 2);

	// Create flowing wave surface
	const rows = 25;
	const cols = 40;
	const waveGrid = [];

	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			const u = col / cols; // 0 to 1
			const v = row / rows; // 0 to 1

			// Wave function with multiple frequencies
			const wave1 = Math.sin(u * Math.PI * 3 + waveOffset) * 40;
			const wave2 = Math.sin(u * Math.PI * 5 - waveOffset * 1.5) * 20;
			const wave3 = Math.cos(v * Math.PI * 2 + waveOffset * 0.5) * 15;

			const x = (u - 0.5) * 600 * progress;
			const y = (v - 0.5) * 500 * progress;
			const z = (wave1 + wave2 + wave3) * progress;

			// Color: 70% dark blue
			let fillColor;
			let colorIntensity = u; // Left to right gradient

			if (colorIntensity < 0.7) {
				// Dark blue 70%
				const darkProgress = colorIntensity / 0.7;
				fillColor = `rgba(${31 + darkProgress * 18}, ${82 + darkProgress * 48}, ${154 + darkProgress * 92}, ${0.85 + z * 0.001})`;
			} else {
				// Light blue 30%
				const lightProgress = (colorIntensity - 0.7) / 0.3;
				fillColor = `rgba(${49 + lightProgress * 96}, ${130 + lightProgress * 83}, ${246 + lightProgress * 9}, ${0.82 + z * 0.001})`;
			}

			waveGrid.push({
				x,
				y,
				z,
				fillColor,
				u,
				v,
				row,
				col,
			});
		}
	}

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#0a0e1a',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				perspective: '1200px',
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
						rotateX(${50}deg)
						rotateZ(${-15}deg)
						scale(${progress})
					`,
				}}
			>
				{/* Wave grid tiles */}
				{waveGrid.map((point, i) => {
					const {row, col} = point;

					// Only render if not at edge
					if (row >= rows - 1 || col >= cols - 1) return null;

					const tileSize = 16;
					const depth = point.z + 300;

					return (
						<div
							key={i}
							style={{
								position: 'absolute',
								left: '50%',
								top: '50%',
								width: `${tileSize}px`,
								height: `${tileSize}px`,
								background: point.fillColor,
								transform: `
									translate(-50%, -50%)
									translate3d(${point.x}px, ${point.y}px, ${point.z}px)
								`,
								borderRadius: '2px',
								boxShadow: `
									0 ${Math.max(0, point.z * 0.1)}px ${Math.max(0, point.z * 0.2)}px rgba(31, 82, 154, ${0.4 * progress}),
									inset 0 -2px 6px rgba(0, 0, 0, 0.3),
									inset 0 2px 6px rgba(255, 255, 255, ${point.u < 0.7 ? 0.15 : 0.25})
								`,
								filter: 'blur(0.2px)',
								zIndex: Math.round(depth),
								opacity: progress * (0.9 + point.z * 0.002),
							}}
						>
							{/* Micro highlight for glassy effect */}
							{point.z > 0 && (
								<div
									style={{
										position: 'absolute',
										top: '2px',
										left: '2px',
										right: '2px',
										height: '6px',
										background: `rgba(255, 255, 255, ${point.u < 0.7 ? 0.3 : 0.4})`,
										borderRadius: '2px',
										filter: 'blur(1px)',
									}}
								/>
							)}
						</div>
					);
				})}

				{/* Ambient glow */}
				<div
					style={{
						position: 'absolute',
						width: '500px',
						height: '500px',
						background: 'radial-gradient(ellipse, rgba(31, 82, 154, 0.4) 0%, rgba(31, 82, 154, 0) 65%)',
						filter: 'blur(80px)',
						opacity: progress * 0.8,
						transform: 'translateZ(-100px)',
					}}
				/>

				{/* Top light glow */}
				<div
					style={{
						position: 'absolute',
						right: '10%',
						top: '10%',
						width: '300px',
						height: '300px',
						background: 'radial-gradient(circle, rgba(145, 213, 255, 0.35) 0%, rgba(145, 213, 255, 0) 70%)',
						filter: 'blur(50px)',
						opacity: progress * 0.7,
						transform: 'translateZ(100px)',
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
				FLOW · 흐름
			</div>
		</AbsoluteFill>
	);
};
