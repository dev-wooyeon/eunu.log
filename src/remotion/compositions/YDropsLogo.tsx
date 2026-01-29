import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

interface YDropsLogoProps {
	titleText?: string;
	titleColor?: string;
}

export const YDropsLogo: React.FC<YDropsLogoProps> = ({
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

	// Rotation
	const rotation = interpolate(frame, [0, 300], [0, 360], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'extend',
	});

	// 3 drops in Y formation
	const drops = [
		{
			id: 'top',
			x: 0,
			y: -120,
			delay: 0,
			rotation: 0,
		},
		{
			id: 'bottom-left',
			x: -90,
			y: 80,
			delay: 8,
			rotation: -120,
		},
		{
			id: 'bottom-right',
			x: 90,
			y: 80,
			delay: 16,
			rotation: 120,
		},
	];

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
			<div
				style={{
					position: 'relative',
					width: '600px',
					height: '600px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					transformStyle: 'preserve-3d',
					transform: `
						rotateX(${rotation * 0.15}deg)
						rotateY(${rotation * 0.25}deg)
					`,
				}}
			>
				{drops.map((drop) => {
					const dropProgress = spring({
						fps,
						frame: frame - drop.delay,
						config: {
							damping: 80,
							stiffness: 45,
						},
					});

					return (
						<div
							key={drop.id}
							style={{
								position: 'absolute',
								width: '160px',
								height: '180px',
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
							{/* Main drop shape */}
							<div
								style={{
									width: '100%',
									height: '100%',
									borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
									background: `
										radial-gradient(
											ellipse at 35% 30%,
											rgba(145, 213, 255, 0.95) 0%,
											rgba(77, 171, 247, 0.92) 30%,
											rgba(49, 130, 246, 0.9) 60%,
											rgba(31, 82, 154, 0.85) 100%
										)
									`,
									boxShadow: `
										0 25px 50px rgba(31, 82, 154, 0.5),
										inset -15px -15px 30px rgba(0, 0, 0, 0.3),
										inset 15px 15px 30px rgba(255, 255, 255, 0.25)
									`,
									filter: 'blur(0.5px)',
									position: 'relative',
								}}
							>
								{/* Top glassy highlight */}
								<div
									style={{
										position: 'absolute',
										top: '18%',
										left: '25%',
										width: '45%',
										height: '35%',
										borderRadius: '50%',
										background: 'radial-gradient(ellipse at 40% 35%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%)',
										filter: 'blur(8px)',
									}}
								/>

								{/* Secondary highlight */}
								<div
									style={{
										position: 'absolute',
										top: '35%',
										left: '15%',
										width: '30%',
										height: '25%',
										borderRadius: '50%',
										background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)',
										filter: 'blur(6px)',
									}}
								/>

								{/* Bottom shadow */}
								<div
									style={{
										position: 'absolute',
										bottom: '15%',
										right: '20%',
										width: '50%',
										height: '40%',
										borderRadius: '50%',
										background: 'radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 70%)',
										filter: 'blur(12px)',
									}}
								/>

								{/* Edge light */}
								<div
									style={{
										position: 'absolute',
										left: '10%',
										top: '25%',
										width: '8px',
										height: '45%',
										borderRadius: '50%',
										background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)',
										filter: 'blur(3px)',
									}}
								/>
							</div>
						</div>
					);
				})}

				{/* Central glow */}
				<div
					style={{
						position: 'absolute',
						width: '300px',
						height: '300px',
						background: 'radial-gradient(circle, rgba(49, 130, 246, 0.35) 0%, rgba(49, 130, 246, 0) 70%)',
						filter: 'blur(60px)',
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
				HARMONY · 조화
			</div>
		</AbsoluteFill>
	);
};
