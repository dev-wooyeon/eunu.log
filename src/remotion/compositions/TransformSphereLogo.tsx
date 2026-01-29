import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

interface TransformSphereLogoProps {
	titleText?: string;
	titleColor?: string;
}

export const TransformSphereLogo: React.FC<TransformSphereLogoProps> = ({
	titleText = 'eunu',
	titleColor = '#3182f6',
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	// Main sphere animation
	const sphereProgress = spring({
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

	// Continuous 3D rotation
	const rotationX = interpolate(frame, [0, 300], [0, 360], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'extend',
	});

	const rotationY = interpolate(frame, [0, 300], [0, 360], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'extend',
	});

	// Morphing animation
	const morphProgress = interpolate(frame, [30, 90], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Create orbital elements
	const orbitalCount = 3;
	const orbitals = Array.from({length: orbitalCount}, (_, i) => {
		const delay = i * 8;
		const orbitalProgress = spring({
			fps,
			frame: frame - delay,
			config: {
				damping: 100,
				stiffness: 60,
			},
		});

		const angle = (i / orbitalCount) * Math.PI * 2 + rotationY * 0.01;
		const radius = 200 + i * 20;

		return {
			progress: orbitalProgress,
			angle,
			radius,
			size: 100 - i * 15,
		};
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#0a0e1a',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				perspective: '1000px',
			}}
		>
			{/* Main sphere container with 3D transform */}
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
						rotateX(${rotationX * 0.3}deg)
						rotateY(${rotationY * 0.2}deg)
						scale(${sphereProgress})
					`,
				}}
			>
				{/* Central transforming sphere */}
				<div
					style={{
						position: 'absolute',
						width: '300px',
						height: '300px',
						borderRadius: `
							${50 - morphProgress * 20}%
							${50 + morphProgress * 20}%
							${50 - morphProgress * 15}%
							${50 + morphProgress * 25}%
						`,
						background: `
							radial-gradient(
								circle at 35% 35%,
								rgba(145, 213, 255, 0.95) 0%,
								rgba(77, 171, 247, 0.9) 30%,
								rgba(49, 130, 246, 0.85) 60%,
								rgba(31, 82, 154, 0.8) 100%
							)
						`,
						boxShadow: `
							0 20px 60px rgba(49, 130, 246, 0.5),
							inset -20px -20px 40px rgba(0, 0, 0, 0.3),
							inset 20px 20px 40px rgba(255, 255, 255, 0.3)
						`,
						filter: 'blur(1px)',
						opacity: sphereProgress,
						transform: `
							rotateZ(${rotationY * 0.5}deg)
							scale(${1 + morphProgress * 0.1})
						`,
					}}
				>
					{/* Glassy highlight */}
					<div
						style={{
							position: 'absolute',
							top: '15%',
							left: '20%',
							width: '50%',
							height: '40%',
							background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)',
							borderRadius: '50%',
							filter: 'blur(10px)',
							transform: `rotate(${-rotationY * 0.2}deg)`,
						}}
					/>

					{/* Shadow spot */}
					<div
						style={{
							position: 'absolute',
							bottom: '10%',
							right: '15%',
							width: '45%',
							height: '35%',
							background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 70%)',
							borderRadius: '50%',
							filter: 'blur(12px)',
							transform: `rotate(${rotationY * 0.15}deg)`,
						}}
					/>
				</div>

				{/* Orbital rings */}
				{orbitals.map((orbital, i) => {
					const x = Math.cos(orbital.angle) * orbital.radius;
					const y = Math.sin(orbital.angle) * orbital.radius * 0.3; // Elliptical orbit

					return (
						<div
							key={i}
							style={{
								position: 'absolute',
								width: `${orbital.size}px`,
								height: `${orbital.size}px`,
								borderRadius: '50%',
								background: `
									radial-gradient(
										circle at 40% 40%,
										rgba(116, 192, 252, ${orbital.progress * 0.7}) 0%,
										rgba(49, 130, 246, ${orbital.progress * 0.5}) 50%,
										rgba(49, 130, 246, ${orbital.progress * 0.3}) 100%
									)
								`,
								left: '50%',
								top: '50%',
								transform: `
									translate(-50%, -50%)
									translate(${x * orbital.progress}px, ${y * orbital.progress}px)
									scale(${orbital.progress})
								`,
								boxShadow: `
									0 4px 20px rgba(49, 130, 246, ${orbital.progress * 0.4}),
									inset 0 -4px 12px rgba(255, 255, 255, ${orbital.progress * 0.2}),
									inset 0 4px 12px rgba(0, 0, 0, ${orbital.progress * 0.1})
								`,
								filter: 'blur(0.5px)',
							}}
						>
							{/* Mini highlight */}
							<div
								style={{
									position: 'absolute',
									top: '20%',
									left: '25%',
									width: '40%',
									height: '30%',
									background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%)',
									borderRadius: '50%',
									filter: 'blur(3px)',
								}}
							/>
						</div>
					);
				})}

				{/* Background glow effect */}
				<div
					style={{
						position: 'absolute',
						width: '500px',
						height: '500px',
						background: 'radial-gradient(circle, rgba(49,130,246,0.3) 0%, rgba(49,130,246,0) 60%)',
						borderRadius: '50%',
						filter: 'blur(40px)',
						opacity: sphereProgress * 0.8,
					}}
				/>

				{/* Transform particles */}
				{Array.from({length: 12}, (_, i) => {
					const particleAngle = (i / 12) * Math.PI * 2;
					const particleRadius = 250;
					const particleDelay = 20 + i * 2;

					const particleProgress = spring({
						fps,
						frame: frame - particleDelay,
						config: {
							damping: 120,
							stiffness: 80,
						},
					});

					const px = Math.cos(particleAngle + rotationY * 0.02) * particleRadius;
					const py = Math.sin(particleAngle + rotationY * 0.02) * particleRadius;

					return (
						<div
							key={`particle-${i}`}
							style={{
								position: 'absolute',
								width: '12px',
								height: '12px',
								borderRadius: '50%',
								background: 'rgba(145, 213, 255, 0.8)',
								left: '50%',
								top: '50%',
								transform: `
									translate(-50%, -50%)
									translate(${px * particleProgress}px, ${py * particleProgress}px)
								`,
								opacity: particleProgress * 0.8,
								boxShadow: '0 0 10px rgba(145, 213, 255, 0.8)',
							}}
						/>
					);
				})}
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
