import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

interface ButterflyCrossLogoProps {
	titleText?: string;
	titleColor?: string;
}

export const ButterflyCrossLogo: React.FC<ButterflyCrossLogoProps> = ({
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
			stiffness: 42,
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

	// 4 petals in X formation (like butterfly wings)
	const petals = [
		{id: 'top-right', angle: 45, delay: 0},
		{id: 'bottom-right', angle: 135, delay: 6},
		{id: 'bottom-left', angle: 225, delay: 12},
		{id: 'top-left', angle: 315, delay: 18},
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
					width: '700px',
					height: '700px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					transformStyle: 'preserve-3d',
					transform: `
						rotateX(${15 + rotation * 0.12}deg)
						rotateY(${rotation * 0.22}deg)
						rotateZ(${rotation * 0.08}deg)
					`,
				}}
			>
				{petals.map((petal, i) => {
					const petalProgress = spring({
						fps,
						frame: frame - petal.delay,
						config: {
							damping: 80,
							stiffness: 45,
						},
					});

					const angleRad = (petal.angle * Math.PI) / 180;
					const distance = 100;
					const x = Math.cos(angleRad) * distance * petalProgress;
					const y = Math.sin(angleRad) * distance * petalProgress;

					return (
						<div
							key={petal.id}
							style={{
								position: 'absolute',
								width: '140px',
								height: '140px',
								left: '50%',
								top: '50%',
								transform: `
									translate(-50%, -50%)
									translate(${x}px, ${y}px)
									rotateZ(${petal.angle}deg)
									scale(${petalProgress})
								`,
								opacity: petalProgress,
							}}
						>
							{/* Petal shape (ellipse) */}
							<div
								style={{
									width: '100%',
									height: '100%',
									borderRadius: '50%',
									transform: 'scaleY(1.4)',
									background: `
										radial-gradient(
											ellipse at 40% 35%,
											rgba(145, 213, 255, 0.92) 0%,
											rgba(77, 171, 247, 0.90) 35%,
											rgba(49, 130, 246, 0.88) 65%,
											rgba(31, 82, 154, 0.82) 100%
										)
									`,
									boxShadow: `
										0 20px 40px rgba(31, 82, 154, 0.45),
										inset -12px -12px 24px rgba(0, 0, 0, 0.3),
										inset 12px 12px 24px rgba(255, 255, 255, 0.3)
									`,
									filter: 'blur(0.4px)',
									position: 'relative',
								}}
							>
								{/* Main glassy highlight */}
								<div
									style={{
										position: 'absolute',
										top: '20%',
										left: '28%',
										width: '42%',
										height: '38%',
										borderRadius: '50%',
										background: 'radial-gradient(ellipse at 45% 40%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0) 65%)',
										filter: 'blur(7px)',
										transform: 'scaleY(0.7)',
									}}
								/>

								{/* Secondary shimmer */}
								<div
									style={{
										position: 'absolute',
										top: '40%',
										left: '20%',
										width: '28%',
										height: '22%',
										borderRadius: '50%',
										background: 'radial-gradient(circle, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 60%)',
										filter: 'blur(5px)',
									}}
								/>

								{/* Bottom shadow */}
								<div
									style={{
										position: 'absolute',
										bottom: '18%',
										right: '22%',
										width: '45%',
										height: '38%',
										borderRadius: '50%',
										background: 'radial-gradient(ellipse, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0) 68%)',
										filter: 'blur(10px)',
									}}
								/>

								{/* Edge glow */}
								<div
									style={{
										position: 'absolute',
										left: '12%',
										top: '20%',
										width: '6px',
										height: '50%',
										borderRadius: '50%',
										background: 'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0) 100%)',
										filter: 'blur(2.5px)',
									}}
								/>
							</div>
						</div>
					);
				})}

				{/* Central core */}
				<div
					style={{
						position: 'absolute',
						width: '80px',
						height: '80px',
						borderRadius: '50%',
						background: `
							radial-gradient(
								circle at 38% 32%,
								rgba(145, 213, 255, 0.95) 0%,
								rgba(77, 171, 247, 0.92) 40%,
								rgba(49, 130, 246, 0.90) 70%,
								rgba(31, 82, 154, 0.85) 100%
							)
						`,
						boxShadow: `
							0 15px 30px rgba(31, 82, 154, 0.5),
							inset -8px -8px 16px rgba(0, 0, 0, 0.35),
							inset 8px 8px 16px rgba(255, 255, 255, 0.35)
						`,
						transform: `scale(${progress})`,
						opacity: progress,
					}}
				>
					<div
						style={{
							position: 'absolute',
							top: '25%',
							left: '30%',
							width: '40%',
							height: '35%',
							borderRadius: '50%',
							background: 'radial-gradient(circle at 45% 40%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
							filter: 'blur(5px)',
						}}
					/>
				</div>

				{/* Ambient glow */}
				<div
					style={{
						position: 'absolute',
						width: '400px',
						height: '400px',
						background: 'radial-gradient(circle, rgba(49, 130, 246, 0.3) 0%, rgba(49, 130, 246, 0) 65%)',
						filter: 'blur(70px)',
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
				SYMMETRY · 대칭
			</div>
		</AbsoluteFill>
	);
};
