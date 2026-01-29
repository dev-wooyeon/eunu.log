import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

interface CloverDropsLogoProps {
	titleText?: string;
	titleColor?: string;
}

export const CloverDropsLogo: React.FC<CloverDropsLogoProps> = ({
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
			stiffness: 40,
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

	// Rotation
	const rotation = interpolate(frame, [0, 300], [0, 360], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'extend',
	});

	// 3 large drops in clover formation
	const drops = [
		{
			id: 'top',
			x: 0,
			y: -65,
			rotation: 0,
			delay: 0,
		},
		{
			id: 'bottom-left',
			x: -56,
			y: 38,
			rotation: -120,
			delay: 8,
		},
		{
			id: 'bottom-right',
			x: 56,
			y: 38,
			rotation: 120,
			delay: 16,
		},
	];

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
			<div
				style={{
					position: 'relative',
					width: '700px',
					height: '700px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					transformStyle: 'preserve-3d',
					transform: `
						rotateX(${18 + rotation * 0.13}deg)
						rotateY(${rotation * 0.25}deg)
					`,
				}}
			>
				{drops.map((drop) => {
					const dropProgress = spring({
						fps,
						frame: frame - drop.delay,
						config: {
							damping: 78,
							stiffness: 43,
						},
					});

					return (
						<div
							key={drop.id}
							style={{
								position: 'absolute',
								width: '220px',
								height: '240px',
								left: '50%',
								top: '50%',
								transform: `
									translate(-50%, -50%)
									translate(${drop.x * dropProgress}px, ${drop.y * dropProgress}px)
									scale(${dropProgress})
								`,
								opacity: dropProgress,
							}}
						>
							{/* Large drop shape */}
							<div
								style={{
									width: '100%',
									height: '100%',
									borderRadius: '50% 50% 50% 50% / 58% 58% 42% 42%',
									background: `
										radial-gradient(
											ellipse at 36% 28%,
											rgba(145, 213, 255, 0.95) 0%,
											rgba(77, 171, 247, 0.93) 32%,
											rgba(49, 130, 246, 0.91) 62%,
											rgba(31, 82, 154, 0.86) 100%
										)
									`,
									boxShadow: `
										0 28px 56px rgba(31, 82, 154, 0.5),
										inset -18px -18px 36px rgba(0, 0, 0, 0.32),
										inset 18px 18px 36px rgba(255, 255, 255, 0.28)
									`,
									filter: 'blur(0.5px)',
									position: 'relative',
								}}
							>
								{/* Primary glassy highlight */}
								<div
									style={{
										position: 'absolute',
										top: '16%',
										left: '24%',
										width: '48%',
										height: '38%',
										borderRadius: '50%',
										background: 'radial-gradient(ellipse at 42% 36%, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0) 68%)',
										filter: 'blur(9px)',
									}}
								/>

								{/* Secondary highlight */}
								<div
									style={{
										position: 'absolute',
										top: '36%',
										left: '18%',
										width: '32%',
										height: '26%',
										borderRadius: '50%',
										background: 'radial-gradient(circle, rgba(255,255,255,0.48) 0%, rgba(255,255,255,0) 62%)',
										filter: 'blur(7px)',
									}}
								/>

								{/* Bottom shadow */}
								<div
									style={{
										position: 'absolute',
										bottom: '14%',
										right: '22%',
										width: '52%',
										height: '42%',
										borderRadius: '50%',
										background: 'radial-gradient(ellipse, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0) 72%)',
										filter: 'blur(14px)',
									}}
								/>

								{/* Edge light */}
								<div
									style={{
										position: 'absolute',
										left: '11%',
										top: '23%',
										width: '9px',
										height: '48%',
										borderRadius: '50%',
										background: 'linear-gradient(180deg, rgba(255,255,255,0.58) 0%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0) 100%)',
										filter: 'blur(3.5px)',
									}}
								/>

								{/* Inner sparkle */}
								<div
									style={{
										position: 'absolute',
										top: '26%',
										left: '36%',
										width: '16px',
										height: '16px',
										borderRadius: '50%',
										background: 'radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 60%)',
										filter: 'blur(2px)',
									}}
								/>
							</div>
						</div>
					);
				})}

				{/* Central glow effect */}
				<div
					style={{
						position: 'absolute',
						width: '180px',
						height: '180px',
						background: 'radial-gradient(circle, rgba(49, 130, 246, 0.4) 0%, rgba(49, 130, 246, 0) 70%)',
						filter: 'blur(50px)',
						opacity: progress * 0.7,
					}}
				/>

				{/* Ambient glow */}
				<div
					style={{
						position: 'absolute',
						width: '420px',
						height: '420px',
						background: 'radial-gradient(circle, rgba(49, 130, 246, 0.32) 0%, rgba(49, 130, 246, 0) 68%)',
						filter: 'blur(80px)',
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
				UNITY · 통합
			</div>
		</AbsoluteFill>
	);
};
