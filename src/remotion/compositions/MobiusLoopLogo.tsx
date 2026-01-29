import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

interface MobiusLoopLogoProps {
	titleText?: string;
	titleColor?: string;
}

export const MobiusLoopLogo: React.FC<MobiusLoopLogoProps> = ({
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
			stiffness: 40,
			mass: 1.5,
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

	// Create möbius strip path segments
	const segments = 60;
	const pathPoints = Array.from({length: segments}, (_, i) => {
		const t = (i / segments) * Math.PI * 2;
		const radius = 180;
		const width = 80;

		// Möbius strip parametric equations
		const x = (radius + width * Math.cos(t / 2) * Math.cos(t)) * progress;
		const y = (radius + width * Math.cos(t / 2) * Math.sin(t)) * progress;
		const z = width * Math.sin(t / 2) * progress;

		// Color gradient based on position (70% dark blue)
		const colorT = i / segments;
		const isDark = colorT < 0.7;

		return {x, y, z, t, colorT, isDark};
	});

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
			{/* Main container with 3D transform */}
			<div
				style={{
					position: 'relative',
					width: '800px',
					height: '800px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					transformStyle: 'preserve-3d',
					transform: `
						rotateX(${-20 + rotation * 0.1}deg)
						rotateY(${rotation * 0.3}deg)
						rotateZ(${rotation * 0.05}deg)
					`,
				}}
			>
				{/* Möbius strip segments */}
				{pathPoints.map((point, i) => {
					const nextPoint = pathPoints[(i + 1) % segments];
					const segmentWidth = 70 + Math.abs(Math.sin(point.t / 2)) * 30;

					// Calculate color (70% dark blue, 30% light blue gradient)
					let fillColor;
					if (point.colorT < 0.7) {
						// Dark blue region (진한 파란색)
						const darkProgress = point.colorT / 0.7;
						fillColor = `rgba(${31 + darkProgress * 18}, ${82 + darkProgress * 48}, ${154 + darkProgress * 92}, 0.95)`;
					} else {
						// Light blue gradient region (밝은 파란색 그라데이션)
						const lightProgress = (point.colorT - 0.7) / 0.3;
						fillColor = `rgba(${77 + lightProgress * 68}, ${171 + lightProgress * 42}, ${247 + lightProgress * 8}, 0.9)`;
					}

					// Calculate depth for layering
					const depth = point.z + 300;

					return (
						<div
							key={i}
							style={{
								position: 'absolute',
								left: '50%',
								top: '50%',
								width: `${segmentWidth}px`,
								height: '25px',
								background: `
									linear-gradient(
										180deg,
										${fillColor} 0%,
										${fillColor.replace(/[\d.]+\)$/, '0.85)')} 100%
									)
								`,
								transform: `
									translate(-50%, -50%)
									translate3d(${point.x}px, ${point.y}px, ${point.z}px)
									rotateZ(${(point.t * 180) / Math.PI}deg)
									rotateY(${(point.t * 90) / Math.PI}deg)
								`,
								borderRadius: '12px',
								boxShadow: `
									0 ${depth * 0.02}px ${depth * 0.08}px rgba(49, 130, 246, ${0.3 * progress}),
									inset 0 -4px 12px rgba(0, 0, 0, 0.3),
									inset 0 4px 12px rgba(255, 255, 255, 0.25)
								`,
								filter: 'blur(0.3px)',
								zIndex: Math.round(depth),
								opacity: progress,
							}}
						>
							{/* Glassy highlight */}
							<div
								style={{
									position: 'absolute',
									top: '3px',
									left: '10%',
									right: '10%',
									height: '8px',
									background: 'linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.5) 100%)',
									borderRadius: '8px',
									filter: 'blur(2px)',
								}}
							/>
						</div>
					);
				})}

				{/* Central glow */}
				<div
					style={{
						position: 'absolute',
						width: '300px',
						height: '300px',
						background: 'radial-gradient(circle, rgba(31, 82, 154, 0.4) 0%, rgba(31, 82, 154, 0) 70%)',
						borderRadius: '50%',
						filter: 'blur(50px)',
						opacity: progress * 0.6,
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
				CONTINUITY · 연속성
			</div>
		</AbsoluteFill>
	);
};
