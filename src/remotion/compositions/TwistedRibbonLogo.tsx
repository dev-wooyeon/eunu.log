import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

interface TwistedRibbonLogoProps {
	titleText?: string;
	titleColor?: string;
}

export const TwistedRibbonLogo: React.FC<TwistedRibbonLogoProps> = ({
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
			damping: 70,
			stiffness: 40,
			mass: 1.2,
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

	// Create twisted ribbon segments
	const segments = 80;
	const ribbonPath = Array.from({length: segments}, (_, i) => {
		const t = i / segments;
		const angle = t * Math.PI * 4; // 2 full twists

		// S-curve path
		const x = Math.sin(angle * 0.5) * 220 * progress;
		const y = (t - 0.5) * 400 * progress;
		const z = Math.cos(angle * 0.5) * 80 * progress;

		// Twist rotation
		const twist = angle * 180 / Math.PI;

		// Width variation for organic feel
		const width = 90 + Math.sin(angle) * 20;

		// Color: 70% dark blue base
		let fillColor;
		if (t < 0.7) {
			// Dark blue region (진한 파란색 70%)
			const darkProgress = t / 0.7;
			// From #1f529a to #3182f6
			fillColor = `rgba(${31 + darkProgress * 18}, ${82 + darkProgress * 48}, ${154 + darkProgress * 92}, 0.95)`;
		} else {
			// Light gradient (밝은 그라데이션 30%)
			const lightProgress = (t - 0.7) / 0.3;
			// From #3182f6 to #91d5ff
			fillColor = `rgba(${49 + lightProgress * 96}, ${130 + lightProgress * 83}, ${246 + lightProgress * 9}, 0.92)`;
		}

		return {x, y, z, twist, width, fillColor, t};
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#0a0e1a',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				perspective: '1500px',
			}}
		>
			{/* Main container */}
			<div
				style={{
					position: 'relative',
					width: '800px',
					height: '900px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					transformStyle: 'preserve-3d',
					transform: `
						rotateX(${10 + rotation * 0.08}deg)
						rotateY(${rotation * 0.2}deg)
						scale(${0.9 + progress * 0.1})
					`,
				}}
			>
				{/* Ribbon segments */}
				{ribbonPath.map((segment, i) => {
					if (i === ribbonPath.length - 1) return null;

					const nextSegment = ribbonPath[i + 1];
					const depth = segment.z + 500;

					return (
						<div
							key={i}
							style={{
								position: 'absolute',
								left: '50%',
								top: '50%',
								width: `${segment.width}px`,
								height: '12px',
								background: `
									linear-gradient(
										180deg,
										${segment.fillColor} 0%,
										${segment.fillColor.replace(/[\d.]+\)$/, '0.88)')} 100%
									)
								`,
								transform: `
									translate(-50%, -50%)
									translate3d(${segment.x}px, ${segment.y}px, ${segment.z}px)
									rotateX(${segment.twist}deg)
								`,
								borderRadius: '6px',
								boxShadow: `
									0 ${Math.abs(segment.z) * 0.15}px ${Math.abs(segment.z) * 0.3}px rgba(31, 82, 154, ${0.4 * progress}),
									inset 0 -3px 10px rgba(0, 0, 0, 0.35),
									inset 0 3px 10px rgba(255, 255, 255, ${segment.t < 0.7 ? 0.2 : 0.3})
								`,
								filter: 'blur(0.3px)',
								zIndex: Math.round(depth),
								opacity: progress,
								transformStyle: 'preserve-3d',
							}}
						>
							{/* Top glassy highlight */}
							<div
								style={{
									position: 'absolute',
									top: '1px',
									left: '8%',
									right: '8%',
									height: '4px',
									background: `linear-gradient(90deg,
										rgba(255,255,255,0) 0%,
										rgba(255,255,255,${segment.t < 0.7 ? 0.4 : 0.5}) 50%,
										rgba(255,255,255,0) 100%
									)`,
									borderRadius: '4px',
									filter: 'blur(1.5px)',
								}}
							/>
						</div>
					);
				})}

				{/* Ambient glow */}
				<div
					style={{
						position: 'absolute',
						width: '400px',
						height: '600px',
						background: 'radial-gradient(ellipse, rgba(31, 82, 154, 0.35) 0%, rgba(31, 82, 154, 0) 60%)',
						filter: 'blur(60px)',
						opacity: progress * 0.7,
					}}
				/>

				{/* Light source glow at top */}
				<div
					style={{
						position: 'absolute',
						top: '10%',
						width: '250px',
						height: '250px',
						background: 'radial-gradient(circle, rgba(145, 213, 255, 0.3) 0%, rgba(145, 213, 255, 0) 70%)',
						filter: 'blur(40px)',
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
				FLEXIBILITY · 유연성
			</div>
		</AbsoluteFill>
	);
};
