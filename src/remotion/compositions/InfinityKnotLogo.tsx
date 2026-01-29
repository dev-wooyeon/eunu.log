import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

interface InfinityKnotLogoProps {
	titleText?: string;
	titleColor?: string;
}

export const InfinityKnotLogo: React.FC<InfinityKnotLogoProps> = ({
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
			damping: 80,
			stiffness: 42,
			mass: 1.4,
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

	// Continuous rotation
	const rotation = interpolate(frame, [0, 300], [0, 360], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'extend',
	});

	// Create infinity knot path (lemniscate with twist)
	const segments = 120;
	const knotPath = Array.from({length: segments}, (_, i) => {
		const t = (i / segments) * Math.PI * 2;
		const scale = 200;

		// Lemniscate (infinity symbol) parametric equations
		const a = 2;
		const denominator = 1 + Math.sin(t) ** 2;
		const baseX = (a * Math.cos(t)) / denominator;
		const baseY = (a * Math.sin(t) * Math.cos(t)) / denominator;

		// Add 3D twist
		const twistAmount = t * 2; // Multiple twists along the path
		const tubeRadius = 35;

		const x = baseX * scale * progress;
		const y = baseY * scale * progress;
		const z = Math.sin(twistAmount) * tubeRadius * progress;

		// Calculate tangent for proper orientation
		const tangentAngle = Math.atan2(baseY, baseX) * (180 / Math.PI);

		// Color: 70% dark blue
		const pathProgress = i / segments;
		let fillColor;

		if (pathProgress < 0.7) {
			// Dark blue 70%
			const darkProgress = pathProgress / 0.7;
			fillColor = `rgba(${31 + darkProgress * 18}, ${82 + darkProgress * 48}, ${154 + darkProgress * 92}, 0.95)`;
		} else {
			// Light blue 30%
			const lightProgress = (pathProgress - 0.7) / 0.3;
			fillColor = `rgba(${49 + lightProgress * 96}, ${130 + lightProgress * 83}, ${246 + lightProgress * 9}, 0.92)`;
		}

		// Tube diameter varies slightly for organic feel
		const diameter = 55 + Math.sin(t * 3) * 8;

		return {
			x,
			y,
			z,
			tangentAngle,
			twistAmount,
			fillColor,
			diameter,
			t,
			pathProgress,
		};
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#0a0e1a',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				perspective: '1400px',
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
						rotateX(${20 + rotation * 0.15}deg)
						rotateY(${rotation * 0.25}deg)
						scale(${0.95 + progress * 0.05})
					`,
				}}
			>
				{/* Knot segments */}
				{knotPath.map((segment, i) => {
					const depth = segment.z + 500;

					return (
						<div
							key={i}
							style={{
								position: 'absolute',
								left: '50%',
								top: '50%',
								width: `${segment.diameter}px`,
								height: `${segment.diameter}px`,
								borderRadius: '50%',
								background: `
									radial-gradient(
										circle at 35% 35%,
										${segment.fillColor} 0%,
										${segment.fillColor.replace(/[\d.]+\)$/, '0.9)')} 60%,
										${segment.fillColor.replace(/[\d.]+\)$/, '0.75)')} 100%
									)
								`,
								transform: `
									translate(-50%, -50%)
									translate3d(${segment.x}px, ${segment.y}px, ${segment.z}px)
									rotateZ(${segment.tangentAngle}deg)
								`,
								boxShadow: `
									0 ${Math.abs(segment.z) * 0.12}px ${Math.abs(segment.z) * 0.25}px rgba(31, 82, 154, ${0.45 * progress}),
									inset ${-segment.z * 0.08}px ${-segment.z * 0.08}px ${Math.abs(segment.z) * 0.15}px rgba(0, 0, 0, 0.4),
									inset ${segment.z * 0.08}px ${segment.z * 0.08}px ${Math.abs(segment.z) * 0.15}px rgba(255, 255, 255, ${segment.pathProgress < 0.7 ? 0.25 : 0.35})
								`,
								filter: 'blur(0.4px)',
								zIndex: Math.round(depth),
								opacity: progress,
							}}
						>
							{/* Glassy highlight sphere */}
							<div
								style={{
									position: 'absolute',
									top: '20%',
									left: '25%',
									width: '40%',
									height: '40%',
									borderRadius: '50%',
									background: `radial-gradient(circle at 40% 40%,
										rgba(255, 255, 255, ${segment.pathProgress < 0.7 ? 0.45 : 0.55}) 0%,
										rgba(255, 255, 255, 0) 70%
									)`,
									filter: 'blur(3px)',
								}}
							/>
						</div>
					);
				})}

				{/* Central glow */}
				<div
					style={{
						position: 'absolute',
						width: '400px',
						height: '300px',
						background: 'radial-gradient(ellipse, rgba(31, 82, 154, 0.4) 0%, rgba(31, 82, 154, 0) 70%)',
						filter: 'blur(70px)',
						opacity: progress * 0.7,
					}}
				/>

				{/* Top-right light source */}
				<div
					style={{
						position: 'absolute',
						right: '15%',
						top: '15%',
						width: '280px',
						height: '280px',
						background: 'radial-gradient(circle, rgba(145, 213, 255, 0.35) 0%, rgba(145, 213, 255, 0) 70%)',
						filter: 'blur(50px)',
						opacity: progress * 0.65,
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
				CONNECTION · 연결
			</div>
		</AbsoluteFill>
	);
};
