import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

interface FlowPipelineLogoProps {
	titleText?: string;
	titleColor?: string;
}

export const FlowPipelineLogo: React.FC<FlowPipelineLogoProps> = ({
	titleText = 'eunu',
	titleColor = '#3182f6',
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	// Spring animations for each stream with different delays
	const stream1Progress = spring({
		fps,
		frame: frame - 0,
		config: {
			damping: 100,
			stiffness: 50,
			mass: 1,
		},
	});

	const stream2Progress = spring({
		fps,
		frame: frame - 10,
		config: {
			damping: 100,
			stiffness: 50,
			mass: 1,
		},
	});

	const stream3Progress = spring({
		fps,
		frame: frame - 20,
		config: {
			damping: 100,
			stiffness: 50,
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

	// Rotation animation for 3D effect
	const rotation = interpolate(frame, [0, 300], [0, 360], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'extend',
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
			{/* Main logo container */}
			<div
				style={{
					position: 'relative',
					width: '600px',
					height: '600px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					transform: `rotate(${rotation * 0.1}deg)`,
				}}
			>
				{/* Stream 1 - Top (Pipeline) */}
				<div
					style={{
						position: 'absolute',
						width: `${400 * stream1Progress}px`,
						height: '120px',
						background: 'linear-gradient(135deg, #3182f6 0%, #4dabf7 100%)',
						borderRadius: '60px',
						top: '80px',
						left: '100px',
						opacity: stream1Progress * 0.85,
						filter: 'blur(0.5px)',
						boxShadow: `
							0 8px 32px rgba(49, 130, 246, 0.4),
							inset 0 -8px 32px rgba(255, 255, 255, 0.2),
							inset 0 8px 16px rgba(0, 0, 0, 0.1)
						`,
						transform: `
							translateX(${interpolate(stream1Progress, [0, 1], [-100, 0], {
								extrapolateLeft: 'clamp',
								extrapolateRight: 'clamp',
							})}px)
							rotateZ(-15deg)
							scale(${stream1Progress})
						`,
					}}
				>
					{/* Inner highlight for glassy effect */}
					<div
						style={{
							position: 'absolute',
							top: '10px',
							left: '20px',
							right: '20px',
							height: '40px',
							background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)',
							borderRadius: '40px',
						}}
					/>
				</div>

				{/* Stream 2 - Middle (Growth) */}
				<div
					style={{
						position: 'absolute',
						width: `${380 * stream2Progress}px`,
						height: '100px',
						background: 'linear-gradient(135deg, #4dabf7 0%, #74c0fc 100%)',
						borderRadius: '50px',
						top: '250px',
						left: '110px',
						opacity: stream2Progress * 0.9,
						filter: 'blur(0.5px)',
						boxShadow: `
							0 8px 32px rgba(77, 171, 247, 0.4),
							inset 0 -8px 32px rgba(255, 255, 255, 0.25),
							inset 0 8px 16px rgba(0, 0, 0, 0.1)
						`,
						transform: `
							translateX(${interpolate(stream2Progress, [0, 1], [-100, 0], {
								extrapolateLeft: 'clamp',
								extrapolateRight: 'clamp',
							})}px)
							scale(${stream2Progress})
						`,
					}}
				>
					{/* Inner highlight */}
					<div
						style={{
							position: 'absolute',
							top: '8px',
							left: '20px',
							right: '20px',
							height: '35px',
							background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)',
							borderRadius: '35px',
						}}
					/>
				</div>

				{/* Stream 3 - Bottom (Transform) */}
				<div
					style={{
						position: 'absolute',
						width: `${360 * stream3Progress}px`,
						height: '90px',
						background: 'linear-gradient(135deg, #74c0fc 0%, #91d5ff 100%)',
						borderRadius: '45px',
						top: '410px',
						left: '120px',
						opacity: stream3Progress * 0.95,
						filter: 'blur(0.5px)',
						boxShadow: `
							0 8px 32px rgba(116, 192, 252, 0.4),
							inset 0 -8px 32px rgba(255, 255, 255, 0.3),
							inset 0 8px 16px rgba(0, 0, 0, 0.1)
						`,
						transform: `
							translateX(${interpolate(stream3Progress, [0, 1], [-100, 0], {
								extrapolateLeft: 'clamp',
								extrapolateRight: 'clamp',
							})}px)
							rotateZ(15deg)
							scale(${stream3Progress})
						`,
					}}
				>
					{/* Inner highlight */}
					<div
						style={{
							position: 'absolute',
							top: '8px',
							left: '20px',
							right: '20px',
							height: '30px',
							background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)',
							borderRadius: '30px',
						}}
					/>
				</div>

				{/* Central merge point with glow */}
				<div
					style={{
						position: 'absolute',
						width: `${140 * Math.max(stream1Progress, stream2Progress, stream3Progress)}px`,
						height: `${140 * Math.max(stream1Progress, stream2Progress, stream3Progress)}px`,
						background: 'radial-gradient(circle, rgba(49,130,246,0.6) 0%, rgba(49,130,246,0) 70%)',
						borderRadius: '50%',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						opacity: Math.min(stream1Progress, stream2Progress, stream3Progress),
						filter: 'blur(20px)',
					}}
				/>
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
