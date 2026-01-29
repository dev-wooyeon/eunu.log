'use client';

import React, {useState} from 'react';

type Logo2DType =
	| 'y-drops'
	| 'butterfly'
	| 'spiral'
	| 'globe-belt'
	| 'clover'
	| 'sphere'
	| 'triple-wing'
	| 'double-ellipse';

interface Logo2DConfig {
	id: Logo2DType;
	name: string;
	description: string;
}

const logos: Logo2DConfig[] = [
	{
		id: 'y-drops',
		name: 'Y-Drops',
		description: 'Y자 형태 3개 물방울',
	},
	{
		id: 'butterfly',
		name: 'Butterfly Cross',
		description: 'X자 4개 날개',
	},
	{
		id: 'spiral',
		name: 'Spiral Ring',
		description: '나선형 링',
	},
	{
		id: 'globe-belt',
		name: 'Globe Belt',
		description: '구체 + 대각선 띠',
	},
	{
		id: 'clover',
		name: 'Clover',
		description: '클로버 3개 물방울',
	},
	{
		id: 'sphere',
		name: 'Glass Sphere',
		description: '투명 구체',
	},
	{
		id: 'triple-wing',
		name: 'Triple Wing',
		description: '3개 교차 날개',
	},
	{
		id: 'double-ellipse',
		name: 'Double Ellipse',
		description: '2개 교차 타원',
	},
];

export default function Logo2DPage() {
	const [selectedLogo, setSelectedLogo] = useState<Logo2DType>('y-drops');

	const renderLogo = (logoId: Logo2DType) => {
		switch (logoId) {
			case 'y-drops':
				return (
					<svg width="400" height="400" viewBox="0 0 400 400">
						<defs>
							<radialGradient id="drop-gradient-1" cx="35%" cy="30%">
								<stop offset="0%" stopColor="#91d5ff" stopOpacity="0.95" />
								<stop offset="35%" stopColor="#4dabf7" stopOpacity="0.92" />
								<stop offset="65%" stopColor="#3182f6" stopOpacity="0.90" />
								<stop offset="100%" stopColor="#1f529a" stopOpacity="0.85" />
							</radialGradient>
						</defs>

						{/* Top drop */}
						<ellipse
							cx="200"
							cy="120"
							rx="55"
							ry="70"
							fill="url(#drop-gradient-1)"
							filter="drop-shadow(0px 10px 20px rgba(31, 82, 154, 0.5))"
						/>

						{/* Bottom left drop */}
						<ellipse
							cx="130"
							cy="280"
							rx="55"
							ry="70"
							fill="url(#drop-gradient-1)"
							filter="drop-shadow(0px 10px 20px rgba(31, 82, 154, 0.5))"
						/>

						{/* Bottom right drop */}
						<ellipse
							cx="270"
							cy="280"
							rx="55"
							ry="70"
							fill="url(#drop-gradient-1)"
							filter="drop-shadow(0px 10px 20px rgba(31, 82, 154, 0.5))"
						/>
					</svg>
				);

			case 'butterfly':
				return (
					<svg width="400" height="400" viewBox="0 0 400 400">
						<defs>
							<radialGradient id="petal-gradient" cx="40%" cy="35%">
								<stop offset="0%" stopColor="#91d5ff" stopOpacity="0.92" />
								<stop offset="35%" stopColor="#4dabf7" stopOpacity="0.90" />
								<stop offset="65%" stopColor="#3182f6" stopOpacity="0.88" />
								<stop offset="100%" stopColor="#1f529a" stopOpacity="0.82" />
							</radialGradient>
						</defs>

						{/* Top-right petal */}
						<ellipse
							cx="270"
							cy="130"
							rx="50"
							ry="70"
							fill="url(#petal-gradient)"
							transform="rotate(45 270 130)"
							filter="drop-shadow(0px 8px 16px rgba(31, 82, 154, 0.45))"
						/>

						{/* Bottom-right petal */}
						<ellipse
							cx="270"
							cy="270"
							rx="50"
							ry="70"
							fill="url(#petal-gradient)"
							transform="rotate(135 270 270)"
							filter="drop-shadow(0px 8px 16px rgba(31, 82, 154, 0.45))"
						/>

						{/* Bottom-left petal */}
						<ellipse
							cx="130"
							cy="270"
							rx="50"
							ry="70"
							fill="url(#petal-gradient)"
							transform="rotate(225 130 270)"
							filter="drop-shadow(0px 8px 16px rgba(31, 82, 154, 0.45))"
						/>

						{/* Top-left petal */}
						<ellipse
							cx="130"
							cy="130"
							rx="50"
							ry="70"
							fill="url(#petal-gradient)"
							transform="rotate(315 130 130)"
							filter="drop-shadow(0px 8px 16px rgba(31, 82, 154, 0.45))"
						/>

						{/* Center */}
						<circle
							cx="200"
							cy="200"
							r="30"
							fill="url(#petal-gradient)"
							filter="drop-shadow(0px 6px 12px rgba(31, 82, 154, 0.5))"
						/>
					</svg>
				);

			case 'spiral':
				return (
					<svg width="400" height="400" viewBox="0 0 400 400">
						<defs>
							<linearGradient id="spiral-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
								<stop offset="0%" stopColor="#1f529a" stopOpacity="0.85" />
								<stop offset="30%" stopColor="#3182f6" stopOpacity="0.90" />
								<stop offset="70%" stopColor="#4dabf7" stopOpacity="0.92" />
								<stop offset="100%" stopColor="#91d5ff" stopOpacity="0.95" />
							</linearGradient>
						</defs>

						{/* Spiral ring using path */}
						<path
							d="M 200,80
							   A 120,120 0 0,1 320,200
							   A 120,120 0 0,1 200,320
							   A 120,120 0 0,1 80,200
							   A 120,120 0 0,1 200,80
							   M 200,120
							   A 80,80 0 0,0 120,200
							   A 80,80 0 0,0 200,280
							   A 80,80 0 0,0 280,200
							   A 80,80 0 0,0 200,120
							   Z"
							fill="url(#spiral-gradient)"
							filter="drop-shadow(0px 12px 24px rgba(31, 82, 154, 0.5))"
						/>
					</svg>
				);

			case 'globe-belt':
				return (
					<svg width="400" height="400" viewBox="0 0 400 400">
						<defs>
							<radialGradient id="globe-gradient" cx="35%" cy="30%">
								<stop offset="0%" stopColor="#91d5ff" stopOpacity="0.95" />
								<stop offset="35%" stopColor="#4dabf7" stopOpacity="0.92" />
								<stop offset="65%" stopColor="#3182f6" stopOpacity="0.90" />
								<stop offset="100%" stopColor="#1f529a" stopOpacity="0.85" />
							</radialGradient>
							<linearGradient id="belt-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
								<stop offset="0%" stopColor="#1f529a" stopOpacity="0" />
								<stop offset="20%" stopColor="#1f529a" stopOpacity="0.75" />
								<stop offset="50%" stopColor="#1f529a" stopOpacity="0.85" />
								<stop offset="80%" stopColor="#1f529a" stopOpacity="0.75" />
								<stop offset="100%" stopColor="#1f529a" stopOpacity="0" />
							</linearGradient>
						</defs>

						{/* Belt (behind) */}
						<ellipse
							cx="200"
							cy="200"
							rx="160"
							ry="40"
							fill="url(#belt-gradient)"
							transform="rotate(-35 200 200)"
							filter="drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.3))"
						/>

						{/* Globe */}
						<circle
							cx="200"
							cy="200"
							r="100"
							fill="url(#globe-gradient)"
							filter="drop-shadow(0px 15px 30px rgba(31, 82, 154, 0.5))"
						/>
					</svg>
				);

			case 'clover':
				return (
					<svg width="400" height="400" viewBox="0 0 400 400">
						<defs>
							<radialGradient id="clover-gradient" cx="36%" cy="28%">
								<stop offset="0%" stopColor="#91d5ff" stopOpacity="0.95" />
								<stop offset="32%" stopColor="#4dabf7" stopOpacity="0.93" />
								<stop offset="62%" stopColor="#3182f6" stopOpacity="0.91" />
								<stop offset="100%" stopColor="#1f529a" stopOpacity="0.86" />
							</radialGradient>
						</defs>

						{/* Top drop */}
						<ellipse
							cx="200"
							cy="130"
							rx="65"
							ry="80"
							fill="url(#clover-gradient)"
							filter="drop-shadow(0px 14px 28px rgba(31, 82, 154, 0.5))"
						/>

						{/* Bottom left drop */}
						<ellipse
							cx="140"
							cy="250"
							rx="65"
							ry="80"
							fill="url(#clover-gradient)"
							filter="drop-shadow(0px 14px 28px rgba(31, 82, 154, 0.5))"
						/>

						{/* Bottom right drop */}
						<ellipse
							cx="260"
							cy="250"
							rx="65"
							ry="80"
							fill="url(#clover-gradient)"
							filter="drop-shadow(0px 14px 28px rgba(31, 82, 154, 0.5))"
						/>
					</svg>
				);

			case 'sphere':
				return (
					<svg width="400" height="400" viewBox="0 0 400 400">
						<defs>
							<radialGradient id="sphere-gradient" cx="38%" cy="32%">
								<stop offset="0%" stopColor="#91d5ff" stopOpacity="0.95" />
								<stop offset="40%" stopColor="#4dabf7" stopOpacity="0.92" />
								<stop offset="70%" stopColor="#3182f6" stopOpacity="0.90" />
								<stop offset="100%" stopColor="#1f529a" stopOpacity="0.85" />
							</radialGradient>
						</defs>

						<circle
							cx="200"
							cy="200"
							r="110"
							fill="url(#sphere-gradient)"
							filter="drop-shadow(0px 15px 30px rgba(31, 82, 154, 0.5))"
						/>
					</svg>
				);

			case 'triple-wing':
				return (
					<svg width="400" height="400" viewBox="0 0 400 400">
						<defs>
							<radialGradient id="wing-gradient" cx="40%" cy="35%">
								<stop offset="0%" stopColor="#91d5ff" stopOpacity="0.92" />
								<stop offset="35%" stopColor="#4dabf7" stopOpacity="0.90" />
								<stop offset="65%" stopColor="#3182f6" stopOpacity="0.88" />
								<stop offset="100%" stopColor="#1f529a" stopOpacity="0.82" />
							</radialGradient>
						</defs>

						{/* Wing 1 */}
						<ellipse
							cx="200"
							cy="120"
							rx="45"
							ry="75"
							fill="url(#wing-gradient)"
							transform="rotate(15 200 120)"
							filter="drop-shadow(0px 10px 20px rgba(31, 82, 154, 0.45))"
						/>

						{/* Wing 2 */}
						<ellipse
							cx="130"
							cy="250"
							rx="45"
							ry="75"
							fill="url(#wing-gradient)"
							transform="rotate(-105 130 250)"
							filter="drop-shadow(0px 10px 20px rgba(31, 82, 154, 0.45))"
						/>

						{/* Wing 3 */}
						<ellipse
							cx="270"
							cy="250"
							rx="45"
							ry="75"
							fill="url(#wing-gradient)"
							transform="rotate(135 270 250)"
							filter="drop-shadow(0px 10px 20px rgba(31, 82, 154, 0.45))"
						/>
					</svg>
				);

			case 'double-ellipse':
				return (
					<svg width="400" height="400" viewBox="0 0 400 400">
						<defs>
							<radialGradient id="ellipse-gradient" cx="40%" cy="35%">
								<stop offset="0%" stopColor="#91d5ff" stopOpacity="0.92" />
								<stop offset="35%" stopColor="#4dabf7" stopOpacity="0.90" />
								<stop offset="65%" stopColor="#3182f6" stopOpacity="0.88" />
								<stop offset="100%" stopColor="#1f529a" stopOpacity="0.82" />
							</radialGradient>
						</defs>

						{/* Left ellipse */}
						<ellipse
							cx="140"
							cy="200"
							rx="50"
							ry="90"
							fill="url(#ellipse-gradient)"
							transform="rotate(-25 140 200)"
							filter="drop-shadow(0px 10px 20px rgba(31, 82, 154, 0.45))"
						/>

						{/* Right ellipse */}
						<ellipse
							cx="260"
							cy="200"
							rx="50"
							ry="90"
							fill="url(#ellipse-gradient)"
							transform="rotate(25 260 200)"
							filter="drop-shadow(0px 10px 20px rgba(31, 82, 154, 0.45))"
						/>
					</svg>
				);

			default:
				return null;
		}
	};

	return (
		<div
			style={{
				minHeight: '100vh',
				backgroundColor: '#0a0e1a',
				color: 'white',
				padding: '32px',
			}}
		>
			{/* Header */}
			<div
				style={{
					maxWidth: '1400px',
					margin: '0 auto',
					marginBottom: '48px',
				}}
			>
				<h1
					style={{
						fontSize: '48px',
						fontWeight: 700,
						marginBottom: '16px',
						background: 'linear-gradient(135deg, #3182f6 0%, #91d5ff 100%)',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						backgroundClip: 'text',
					}}
				>
					2D SVG 로고 스케치
				</h1>
				<p
					style={{
						fontSize: '18px',
						color: '#8b95a1',
						marginBottom: '8px',
					}}
				>
					3D 구현 전 형태 분석 - 토스 샘플 이미지 기반
				</p>
				<p
					style={{
						fontSize: '14px',
						color: '#6b7684',
					}}
				>
					SVG path와 radial gradient로 단순화한 2D 버전
				</p>
			</div>

			<div
				style={{
					maxWidth: '1400px',
					margin: '0 auto',
					display: 'grid',
					gridTemplateColumns: '1fr 300px',
					gap: '32px',
				}}
			>
				{/* Main viewer */}
				<div>
					<div
						style={{
							backgroundColor: '#151923',
							borderRadius: '16px',
							padding: '48px',
							boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							minHeight: '600px',
						}}
					>
						{renderLogo(selectedLogo)}
					</div>

					{/* Info */}
					<div
						style={{
							marginTop: '32px',
							backgroundColor: '#151923',
							borderRadius: '16px',
							padding: '24px',
						}}
					>
						<h3
							style={{
								fontSize: '20px',
								fontWeight: 700,
								marginBottom: '16px',
							}}
						>
							2D 형태 분석
						</h3>
						<ul
							style={{
								listStyle: 'none',
								padding: 0,
								margin: 0,
							}}
						>
							<li
								style={{
									padding: '12px 0',
									borderBottom: '1px solid #2a2f3a',
									fontSize: '15px',
									color: '#b4b9c1',
								}}
							>
								<strong style={{color: '#3182f6'}}>Radial Gradient:</strong> 중심에서
								바깥으로 4단계 색상 전환
							</li>
							<li
								style={{
									padding: '12px 0',
									borderBottom: '1px solid #2a2f3a',
									fontSize: '15px',
									color: '#b4b9c1',
								}}
							>
								<strong style={{color: '#4dabf7'}}>Ellipse Shape:</strong> 타원을 회전시켜
								유기적인 형태 구현
							</li>
							<li
								style={{
									padding: '12px 0',
									borderBottom: '1px solid #2a2f3a',
									fontSize: '15px',
									color: '#b4b9c1',
								}}
							>
								<strong style={{color: '#74c0fc'}}>Drop Shadow:</strong> SVG filter로
								부드러운 그림자 효과
							</li>
							<li
								style={{
									padding: '12px 0',
									fontSize: '15px',
									color: '#b4b9c1',
								}}
							>
								<strong style={{color: '#91d5ff'}}>Color Stops:</strong> 밝은색(30%) →
								중간색(65%) → 진한색(100%)
							</li>
						</ul>
					</div>
				</div>

				{/* Sidebar */}
				<div>
					<div
						style={{
							backgroundColor: '#151923',
							borderRadius: '16px',
							padding: '24px',
							position: 'sticky',
							top: '32px',
						}}
					>
						<h3
							style={{
								fontSize: '18px',
								fontWeight: 700,
								marginBottom: '20px',
								color: '#91d5ff',
							}}
						>
							토스 샘플 8개
						</h3>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: '10px',
							}}
						>
							{logos.map((logo) => (
								<button
									key={logo.id}
									onClick={() => setSelectedLogo(logo.id)}
									style={{
										padding: '16px',
										backgroundColor:
											selectedLogo === logo.id ? '#3182f6' : '#1f2937',
										color: 'white',
										border: 'none',
										borderRadius: '12px',
										fontSize: '15px',
										fontWeight: 600,
										cursor: 'pointer',
										textAlign: 'left',
										transition: 'all 0.2s',
										boxShadow:
											selectedLogo === logo.id
												? '0 4px 12px rgba(49, 130, 246, 0.4)'
												: 'none',
									}}
									onMouseEnter={(e) => {
										if (selectedLogo !== logo.id) {
											e.currentTarget.style.backgroundColor = '#374151';
										}
									}}
									onMouseLeave={(e) => {
										if (selectedLogo !== logo.id) {
											e.currentTarget.style.backgroundColor = '#1f2937';
										}
									}}
								>
									<div
										style={{
											fontSize: '16px',
											marginBottom: '4px',
										}}
									>
										{logo.name}
									</div>
									<div
										style={{
											fontSize: '13px',
											opacity: 0.75,
										}}
									>
										{logo.description}
									</div>
								</button>
							))}
						</div>

						{/* Note */}
						<div
							style={{
								marginTop: '28px',
								padding: '16px',
								backgroundColor: '#1f2937',
								borderRadius: '8px',
							}}
						>
							<h4
								style={{
									fontSize: '14px',
									fontWeight: 700,
									marginBottom: '8px',
									color: '#91d5ff',
								}}
							>
								다음 단계
							</h4>
							<p
								style={{
									fontSize: '13px',
									color: '#8b95a1',
									lineHeight: '1.6',
									margin: 0,
								}}
							>
								이 2D 형태를 기반으로 Remotion에서 3D 효과 추가:
								<br />• 내부 하이라이트 (glassy)
								<br />• 깊은 그림자 (depth)
								<br />• 회전 애니메이션
								<br />• 레이어링 효과
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
