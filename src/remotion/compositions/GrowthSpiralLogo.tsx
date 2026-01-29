import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

interface GrowthSpiralLogoProps {
	titleText?: string;
	titleColor?: string;
}

export const GrowthSpiralLogo: React.FC<GrowthSpiralLogoProps> = ({
	titleText = 'eunu',
	titleColor = '#3182f6',
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	// Main spiral animation
	const spiralProgress = spring({
		fps,
		frame,
		config: {
			damping: 80,
			stiffness: 40,
			mass: 1,
		},
	});

	// Text animation
	const textProgress = spring({
		fps,
		frame: frame - 40,
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

	// Generate spiral particles
	const particleCount = 8;
	const particles = Array.from({length: particleCount}, (_, i) => {
		const angle = (i / particleCount) * Math.PI * 4; // 2 full rotations
		const radius = 50 + i * 35; // Expanding radius
		const delay = i * 3;

		const particleProgress = spring({
			fps,
			frame: frame - delay,
			config: {
				damping: 100,
				stiffness: 50,
			},
		});

		const x = Math.cos(angle) * radius * particleProgress;
		const y = Math.sin(angle) * radius * particleProgress - (i * 20 * particleProgress);
		const size = 60 + i * 8;
		const opacity = 0.7 + (i / particleCount) * 0.3;

		return {x, y, size, opacity: opacity * particleProgress, angle, delay};
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#0a0e1a',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{/* Main spiral container */}
			<div
				style={{
					position: 'relative',
					width: '700px',
					height: '700px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					transform: `rotate(${rotation * 0.05}deg)`,
				}}
			>
				{/* Spiral particles */}
				{particles.map((particle, i) => {
					// Color gradient from dark blue to light blue
					const colorProgress = i / particleCount;
					const startColor = {r: 49, g: 130, b: 246}; // #3182f6
					const endColor = {r: 145, g: 213, b: 255}; // #91d5ff

					const r = Math.round(startColor.r + (endColor.r - startColor.r) * colorProgress);
					const g = Math.round(startColor.g + (endColor.g - startColor.g) * colorProgress);
					const b = Math.round(startColor.b + (endColor.b - startColor.b) * colorProgress);

					return (
						<div
							key={i}
							style={{
								position: 'absolute',
								width: `${particle.size}px`,
								height: `${particle.size}px`,
								borderRadius: '50%',
								background: `radial-gradient(circle at 30% 30%,
									rgba(${r}, ${g}, ${b}, ${particle.opacity}) 0%,
									rgba(${r}, ${g}, ${b}, ${particle.opacity * 0.7}) 50%,
									rgba(${r}, ${g}, ${b}, ${particle.opacity * 0.4}) 100%
								)`,
								left: '50%',
								top: '50%',
								transform: `
									translate(-50%, -50%)
									translate(${particle.x}px, ${particle.y}px)
									scale(${particle.opacity})
								`,
								filter: 'blur(0.5px)',
								boxShadow: `
									0 8px 32px rgba(${r}, ${g}, ${b}, ${particle.opacity * 0.6}),
									inset 0 -8px 24px rgba(255, 255, 255, ${particle.opacity * 0.3}),
									inset 0 8px 16px rgba(0, 0, 0, ${particle.opacity * 0.15})
								`,
							}}
						>
							{/* Glassy highlight */}
							<div
								style={{
									position: 'absolute',
									top: '15%',
									left: '20%',
									width: '40%',
									height: '30%',
									background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%)',
									borderRadius: '50%',
									filter: 'blur(4px)',
								}}
							/>
						</div>
					);
				})}

				{/* Central glow */}
				<div
					style={{
						position: 'absolute',
						width: `${200 * spiralProgress}px`,
						height: `${200 * spiralProgress}px`,
						background: 'radial-gradient(circle, rgba(49,130,246,0.4) 0%, rgba(49,130,246,0) 70%)',
						borderRadius: '50%',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						filter: 'blur(30px)',
					}}
				/>

				{/* Upward arrow indicator (growth symbol) */}
				<div
					style={{
						position: 'absolute',
						top: `${interpolate(spiralProgress, [0, 1], [60, 20], {
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						})}%`,
						left: '50%',
						transform: 'translateX(-50%)',
						opacity: spiralProgress * 0.8,
					}}
				>
					<svg
						width="60"
						height="80"
						viewBox="0 0 60 80"
						style={{
							filter: 'drop-shadow(0 4px 16px rgba(49, 130, 246, 0.6))',
						}}
					>
						<defs>
							<linearGradient id="arrowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
								<stop offset="0%" stopColor="#91d5ff" stopOpacity="0.9" />
								<stop offset="100%" stopColor="#3182f6" stopOpacity="0.9" />
							</linearGradient>
						</defs>
						<path
							d="M30 10 L50 30 L38 30 L38 70 L22 70 L22 30 L10 30 Z"
							fill="url(#arrowGradient)"
							stroke="rgba(255,255,255,0.3)"
							strokeWidth="2"
						/>
					</svg>
				</div>
			</div>

			{/* Text */}
			<div
				style={{
					position: 'absolute',
					bottom: '120px',
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
		</AbsoluteFill>
	);
};
