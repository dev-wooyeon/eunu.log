import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

interface GlobeBeltLogoProps {
	titleText?: string;
	titleColor?: string;
}

export const GlobeBeltLogo: React.FC<GlobeBeltLogoProps> = ({
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
			stiffness: 38,
			mass: 1.4,
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

	// Rotation
	const rotation = interpolate(frame, [0, 300], [0, 360], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'extend',
	});

	// Belt animation
	const beltProgress = spring({
		fps,
		frame: frame - 15,
		config: {
			damping: 90,
			stiffness: 50,
		},
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
						rotateX(${20 + rotation * 0.15}deg)
						rotateY(${rotation * 0.3}deg)
						rotateZ(${5}deg)
					`,
				}}
			>
				{/* Main sphere */}
				<div
					style={{
						position: 'absolute',
						width: '320px',
						height: '320px',
						borderRadius: '50%',
						background: `
							radial-gradient(
								circle at 35% 30%,
								rgba(145, 213, 255, 0.95) 0%,
								rgba(77, 171, 247, 0.92) 35%,
								rgba(49, 130, 246, 0.90) 65%,
								rgba(31, 82, 154, 0.85) 100%
							)
						`,
						boxShadow: `
							0 30px 60px rgba(31, 82, 154, 0.5),
							inset -20px -20px 40px rgba(0, 0, 0, 0.35),
							inset 20px 20px 40px rgba(255, 255, 255, 0.3)
						`,
						filter: 'blur(0.5px)',
						transform: `scale(${progress})`,
						opacity: progress,
						overflow: 'hidden',
					}}
				>
					{/* Main glassy highlight */}
					<div
						style={{
							position: 'absolute',
							top: '15%',
							left: '20%',
							width: '50%',
							height: '45%',
							borderRadius: '50%',
							background: 'radial-gradient(ellipse at 40% 35%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0) 70%)',
							filter: 'blur(12px)',
						}}
					/>

					{/* Secondary highlight */}
					<div
						style={{
							position: 'absolute',
							top: '35%',
							left: '15%',
							width: '35%',
							height: '30%',
							borderRadius: '50%',
							background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 65%)',
							filter: 'blur(8px)',
						}}
					/>

					{/* Bottom shadow */}
					<div
						style={{
							position: 'absolute',
							bottom: '12%',
							right: '18%',
							width: '55%',
							height: '45%',
							borderRadius: '50%',
							background: 'radial-gradient(ellipse, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 70%)',
							filter: 'blur(15px)',
						}}
					/>

					{/* Edge glow */}
					<div
						style={{
							position: 'absolute',
							left: '8%',
							top: '20%',
							width: '10px',
							height: '55%',
							borderRadius: '50%',
							background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
							filter: 'blur(4px)',
						}}
					/>
				</div>

				{/* Diagonal belt */}
				<div
					style={{
						position: 'absolute',
						width: '400px',
						height: '110px',
						left: '50%',
						top: '50%',
						transform: `
							translate(-50%, -50%)
							rotateZ(${-35}deg)
							scaleX(${beltProgress})
						`,
						transformOrigin: 'center',
						opacity: beltProgress,
					}}
				>
					{/* Belt shape with perspective */}
					<div
						style={{
							width: '100%',
							height: '100%',
							borderRadius: '55px',
							background: `
								linear-gradient(
									180deg,
									rgba(31, 82, 154, 0) 0%,
									rgba(31, 82, 154, 0.75) 20%,
									rgba(31, 82, 154, 0.85) 50%,
									rgba(31, 82, 154, 0.75) 80%,
									rgba(31, 82, 154, 0) 100%
								)
							`,
							boxShadow: `
								0 8px 16px rgba(0, 0, 0, 0.3),
								inset 0 4px 12px rgba(255, 255, 255, 0.25),
								inset 0 -4px 12px rgba(0, 0, 0, 0.35)
							`,
							position: 'relative',
							overflow: 'hidden',
						}}
					>
						{/* Belt highlight */}
						<div
							style={{
								position: 'absolute',
								top: '20%',
								left: '10%',
								right: '10%',
								height: '25%',
								borderRadius: '50px',
								background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%)',
								filter: 'blur(6px)',
							}}
						/>

						{/* Belt shadow */}
						<div
							style={{
								position: 'absolute',
								bottom: '15%',
								left: '10%',
								right: '10%',
								height: '30%',
								borderRadius: '50px',
								background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)',
								filter: 'blur(8px)',
							}}
						/>
					</div>
				</div>

				{/* Ambient glow */}
				<div
					style={{
						position: 'absolute',
						width: '450px',
						height: '450px',
						background: 'radial-gradient(circle, rgba(49, 130, 246, 0.35) 0%, rgba(49, 130, 246, 0) 65%)',
						filter: 'blur(75px)',
						opacity: progress * 0.7,
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
				GLOBAL · 세계
			</div>
		</AbsoluteFill>
	);
};
