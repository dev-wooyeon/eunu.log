'use client';

import React, {useState} from 'react';
import {Player} from '@remotion/player';
import {FlowPipelineLogo} from '@/remotion/compositions/FlowPipelineLogo';
import {GrowthSpiralLogo} from '@/remotion/compositions/GrowthSpiralLogo';
import {TransformSphereLogo} from '@/remotion/compositions/TransformSphereLogo';
import {MobiusLoopLogo} from '@/remotion/compositions/MobiusLoopLogo';
import {TwistedRibbonLogo} from '@/remotion/compositions/TwistedRibbonLogo';
import {FluidWaveLogo} from '@/remotion/compositions/FluidWaveLogo';
import {InfinityKnotLogo} from '@/remotion/compositions/InfinityKnotLogo';
import {TorusTwistLogo} from '@/remotion/compositions/TorusTwistLogo';
import {YDropsLogo} from '@/remotion/compositions/YDropsLogo';
import {ButterflyCrossLogo} from '@/remotion/compositions/ButterflyCrossLogo';
import {GlobeBeltLogo} from '@/remotion/compositions/GlobeBeltLogo';
import {CloverDropsLogo} from '@/remotion/compositions/CloverDropsLogo';

type LogoType =
	| 'ydrops'
	| 'butterfly'
	| 'globe'
	| 'clover'
	| 'mobius'
	| 'ribbon'
	| 'wave'
	| 'knot'
	| 'torus'
	| 'flow'
	| 'growth'
	| 'transform';

interface LogoConfig {
	id: LogoType;
	name: string;
	description: string;
	component: React.ComponentType<any>;
	durationInFrames: number;
	keyword: string;
	version: number;
	isMonolithic?: boolean;
	isTossSample?: boolean;
}

const logos: LogoConfig[] = [
	// Version 3 - Toss Sample Inspired
	{
		id: 'ydrops',
		name: 'Y-Drops',
		description: 'Y자 형태로 배치된 3개의 물방울',
		component: YDropsLogo,
		durationInFrames: 170,
		keyword: 'Harmony',
		version: 3,
		isTossSample: true,
	},
	{
		id: 'butterfly',
		name: 'Butterfly Cross',
		description: 'X자로 교차하는 나비 날개',
		component: ButterflyCrossLogo,
		durationInFrames: 170,
		keyword: 'Symmetry',
		version: 3,
		isTossSample: true,
	},
	{
		id: 'globe',
		name: 'Globe Belt',
		description: '구체에 대각선으로 감긴 띠',
		component: GlobeBeltLogo,
		durationInFrames: 180,
		keyword: 'Global',
		version: 3,
		isTossSample: true,
	},
	{
		id: 'clover',
		name: 'Clover Drops',
		description: '클로버처럼 모여있는 3개의 물방울',
		component: CloverDropsLogo,
		durationInFrames: 170,
		keyword: 'Unity',
		version: 3,
		isTossSample: true,
	},
	// Version 2 - Monolithic Structures (토스 스타일)
	{
		id: 'mobius',
		name: 'Möbius Loop',
		description: '끊임없이 연결된 뫼비우스의 띠',
		component: MobiusLoopLogo,
		durationInFrames: 180,
		keyword: 'Continuity',
		version: 2,
		isMonolithic: true,
	},
	{
		id: 'ribbon',
		name: 'Twisted Ribbon',
		description: 'S자로 비틀린 하나의 리본',
		component: TwistedRibbonLogo,
		durationInFrames: 180,
		keyword: 'Flexibility',
		version: 2,
		isMonolithic: true,
	},
	{
		id: 'wave',
		name: 'Fluid Wave',
		description: '흐르는 데이터 스트림의 파도',
		component: FluidWaveLogo,
		durationInFrames: 180,
		keyword: 'Flow',
		version: 2,
		isMonolithic: true,
	},
	{
		id: 'knot',
		name: 'Infinity Knot',
		description: '무한대 기호 형태의 매듭',
		component: InfinityKnotLogo,
		durationInFrames: 180,
		keyword: 'Connection',
		version: 2,
		isMonolithic: true,
	},
	{
		id: 'torus',
		name: 'Torus Twist',
		description: '비틀린 도넛 형태의 순환',
		component: TorusTwistLogo,
		durationInFrames: 200,
		keyword: 'Iteration',
		version: 2,
		isMonolithic: true,
	},
	// Version 1 - Initial Concepts
	{
		id: 'flow',
		name: 'Flow Pipeline',
		description: '데이터 파이프라인을 상징하는 흐르는 곡선',
		component: FlowPipelineLogo,
		durationInFrames: 150,
		keyword: 'Pipeline',
		version: 1,
	},
	{
		id: 'growth',
		name: 'Growth Spiral',
		description: '지속적인 성장을 상징하는 나선형 상승',
		component: GrowthSpiralLogo,
		durationInFrames: 150,
		keyword: 'Growth',
		version: 1,
	},
	{
		id: 'transform',
		name: 'Transform Sphere',
		description: '새로운 차원으로의 전환을 상징하는 3D 구체',
		component: TransformSphereLogo,
		durationInFrames: 180,
		keyword: 'Transform',
		version: 1,
	},
];

export default function LogoPreviewPage() {
	const [selectedLogo, setSelectedLogo] = useState<LogoType>('ydrops');
	const [isPlaying, setIsPlaying] = useState(true);

	const currentLogo = logos.find((logo) => logo.id === selectedLogo)!;
	const version3Logos = logos.filter((l) => l.version === 3);
	const version2Logos = logos.filter((l) => l.version === 2);
	const version1Logos = logos.filter((l) => l.version === 1);

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
					eunu.log 브랜드 로고
				</h1>
				<p
					style={{
						fontSize: '18px',
						color: '#8b95a1',
						marginBottom: '8px',
					}}
				>
					토스 디자인 철학을 바탕으로 한 glassy, clay, soft한 느낌의 3D 로고
				</p>
				<p
					style={{
						fontSize: '16px',
						color: '#6b7684',
						marginBottom: '4px',
					}}
				>
					<strong style={{color: '#3182f6'}}>Version 3</strong>: 토스 샘플 이미지 기반 Glassy 스타일
				</p>
				<p
					style={{
						fontSize: '14px',
						color: '#6b7684',
					}}
				>
					매우 투명한 하이라이트 + 깊은 그림자 + 부드러운 곡선
				</p>
			</div>

			<div
				style={{
					maxWidth: '1400px',
					margin: '0 auto',
					display: 'grid',
					gridTemplateColumns: '1fr 340px',
					gap: '32px',
				}}
			>
				{/* Player */}
				<div>
					<div
						style={{
							backgroundColor: '#151923',
							borderRadius: '16px',
							padding: '24px',
							boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
						}}
					>
						<div
							style={{
								marginBottom: '24px',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'flex-start',
							}}
						>
							<div>
								<div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
									<h2
										style={{
											fontSize: '28px',
											fontWeight: 700,
											marginBottom: '0',
										}}
									>
										{currentLogo.name}
									</h2>
									{currentLogo.isTossSample && (
										<span
											style={{
												fontSize: '11px',
												fontWeight: 700,
												color: '#91d5ff',
												backgroundColor: 'rgba(145, 213, 255, 0.15)',
												padding: '4px 10px',
												borderRadius: '6px',
												border: '1px solid rgba(145, 213, 255, 0.3)',
											}}
										>
											TOSS SAMPLE
										</span>
									)}
									{currentLogo.isMonolithic && (
										<span
											style={{
												fontSize: '11px',
												fontWeight: 700,
												color: '#74c0fc',
												backgroundColor: 'rgba(116, 192, 252, 0.15)',
												padding: '4px 10px',
												borderRadius: '6px',
												border: '1px solid rgba(116, 192, 252, 0.3)',
											}}
										>
											MONOLITHIC
										</span>
									)}
								</div>
								<p
									style={{
										fontSize: '15px',
										color: '#8b95a1',
										marginTop: '8px',
										marginBottom: '6px',
									}}
								>
									{currentLogo.description}
								</p>
								<p
									style={{
										fontSize: '14px',
										color: '#3182f6',
										fontWeight: 600,
									}}
								>
									키워드: {currentLogo.keyword}
								</p>
							</div>
							<button
								onClick={() => setIsPlaying(!isPlaying)}
								style={{
									padding: '12px 24px',
									backgroundColor: '#3182f6',
									color: 'white',
									border: 'none',
									borderRadius: '8px',
									fontSize: '16px',
									fontWeight: 600,
									cursor: 'pointer',
									transition: 'all 0.2s',
									flexShrink: 0,
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.backgroundColor = '#2563eb';
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.backgroundColor = '#3182f6';
								}}
							>
								{isPlaying ? '일시정지' : '재생'}
							</button>
						</div>

						<div
							style={{
								borderRadius: '12px',
								overflow: 'hidden',
								backgroundColor: '#0a0e1a',
								boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.5)',
							}}
						>
							<Player
								component={currentLogo.component}
								durationInFrames={currentLogo.durationInFrames}
								compositionWidth={1920}
								compositionHeight={1080}
								fps={30}
								style={{
									width: '100%',
									aspectRatio: '16/9',
								}}
								controls
								loop
								autoPlay={isPlaying}
								inputProps={{
									titleText: 'eunu',
									titleColor: '#3182f6',
								}}
							/>
						</div>
					</div>

					{/* Design Details */}
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
							{currentLogo.isTossSample
								? '토스 샘플 스타일 특징'
								: currentLogo.isMonolithic
								? '토스 디자인 철학 반영'
								: '디자인 특징'}
						</h3>
						{currentLogo.isTossSample ? (
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
									<strong style={{color: '#91d5ff'}}>
										Ultra Glassy:
									</strong>{' '}
									매우 투명한 하이라이트로 유리같은 질감 극대화
								</li>
								<li
									style={{
										padding: '12px 0',
										borderBottom: '1px solid #2a2f3a',
										fontSize: '15px',
										color: '#b4b9c1',
									}}
								>
									<strong style={{color: '#3182f6'}}>Deep Shadow:</strong>{' '}
									깊은 내부 그림자로 입체감과 깊이감 강조
								</li>
								<li
									style={{
										padding: '12px 0',
										borderBottom: '1px solid #2a2f3a',
										fontSize: '15px',
										color: '#b4b9c1',
									}}
								>
									<strong style={{color: '#4dabf7'}}>Soft Shape:</strong>{' '}
									부드러운 물방울/곡선 형태로 유기적 느낌
								</li>
								<li
									style={{
										padding: '12px 0',
										fontSize: '15px',
										color: '#b4b9c1',
									}}
								>
									<strong style={{color: '#74c0fc'}}>Rich Gradient:</strong>{' '}
									다층 그라데이션으로 깊이와 볼륨감 표현
								</li>
							</ul>
						) : currentLogo.isMonolithic ? (
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
									<strong style={{color: '#1f529a'}}>
										Monolithic Structure:
									</strong>{' '}
									해체하면 의미가 없는 하나의 통합된 형태
								</li>
								<li
									style={{
										padding: '12px 0',
										borderBottom: '1px solid #2a2f3a',
										fontSize: '15px',
										color: '#b4b9c1',
									}}
								>
									<strong style={{color: '#3182f6'}}>Color Balance:</strong>{' '}
									진한 파란색(#1f529a~#3182f6) 70% + 밝은 그라데이션 30%
								</li>
								<li
									style={{
										padding: '12px 0',
										borderBottom: '1px solid #2a2f3a',
										fontSize: '15px',
										color: '#b4b9c1',
									}}
								>
									<strong style={{color: '#4dabf7'}}>Glassy Effect:</strong>{' '}
									투명한 하이라이트와 깊이감 있는 그림자
								</li>
								<li
									style={{
										padding: '12px 0',
										fontSize: '15px',
										color: '#b4b9c1',
									}}
								>
									<strong style={{color: '#91d5ff'}}>3D Rotation:</strong>{' '}
									부드러운 3D 회전으로 입체감 극대화
								</li>
							</ul>
						) : (
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
									<strong style={{color: '#3182f6'}}>Glassy Effect:</strong>{' '}
									backdrop-filter와 그라데이션으로 투명한 유리 질감 표현
								</li>
								<li
									style={{
										padding: '12px 0',
										borderBottom: '1px solid #2a2f3a',
										fontSize: '15px',
										color: '#b4b9c1',
									}}
								>
									<strong style={{color: '#4dabf7'}}>Clay Texture:</strong>{' '}
									부드러운 그림자와 매트 마감으로 점토 느낌 구현
								</li>
								<li
									style={{
										padding: '12px 0',
										fontSize: '15px',
										color: '#b4b9c1',
									}}
								>
									<strong style={{color: '#74c0fc'}}>Soft Animation:</strong>{' '}
									Spring 기반 부드러운 애니메이션과 둥근 모서리
								</li>
							</ul>
						)}
					</div>
				</div>

				{/* Sidebar - Logo Selection */}
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
						{/* Version 3 Section */}
						<div style={{marginBottom: '28px'}}>
							<h3
								style={{
									fontSize: '16px',
									fontWeight: 700,
									marginBottom: '12px',
									color: '#91d5ff',
									display: 'flex',
									alignItems: 'center',
									gap: '8px',
								}}
							>
								<span
									style={{
										width: '6px',
										height: '6px',
										borderRadius: '50%',
										backgroundColor: '#91d5ff',
									}}
								/>
								V3 - Toss Sample
							</h3>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: '8px',
								}}
							>
								{version3Logos.map((logo) => (
									<button
										key={logo.id}
										onClick={() => setSelectedLogo(logo.id)}
										style={{
											padding: '14px',
											backgroundColor:
												selectedLogo === logo.id ? '#3182f6' : '#1f2937',
											color: 'white',
											border: 'none',
											borderRadius: '10px',
											fontSize: '14px',
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
												fontSize: '15px',
												marginBottom: '3px',
											}}
										>
											{logo.name}
										</div>
										<div
											style={{
												fontSize: '12px',
												opacity: 0.75,
											}}
										>
											{logo.keyword}
										</div>
									</button>
								))}
							</div>
						</div>

						{/* Version 2 Section */}
						<div style={{marginBottom: '28px'}}>
							<h3
								style={{
									fontSize: '16px',
									fontWeight: 700,
									marginBottom: '12px',
									color: '#91d5ff',
									display: 'flex',
									alignItems: 'center',
									gap: '8px',
								}}
							>
								<span
									style={{
										width: '6px',
										height: '6px',
										borderRadius: '50%',
										backgroundColor: '#91d5ff',
									}}
								/>
								V2 - Monolithic
							</h3>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: '8px',
								}}
							>
								{version2Logos.map((logo) => (
									<button
										key={logo.id}
										onClick={() => setSelectedLogo(logo.id)}
										style={{
											padding: '14px',
											backgroundColor:
												selectedLogo === logo.id ? '#3182f6' : '#1f2937',
											color: 'white',
											border: 'none',
											borderRadius: '10px',
											fontSize: '14px',
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
												fontSize: '15px',
												marginBottom: '3px',
											}}
										>
											{logo.name}
										</div>
										<div
											style={{
												fontSize: '12px',
												opacity: 0.75,
											}}
										>
											{logo.keyword}
										</div>
									</button>
								))}
							</div>
						</div>

						{/* Version 1 Section */}
						<div>
							<h3
								style={{
									fontSize: '16px',
									fontWeight: 700,
									marginBottom: '12px',
									color: '#6b7684',
									display: 'flex',
									alignItems: 'center',
									gap: '8px',
								}}
							>
								<span
									style={{
										width: '6px',
										height: '6px',
										borderRadius: '50%',
										backgroundColor: '#6b7684',
									}}
								/>
								V1 - Initial
							</h3>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: '8px',
								}}
							>
								{version1Logos.map((logo) => (
									<button
										key={logo.id}
										onClick={() => setSelectedLogo(logo.id)}
										style={{
											padding: '14px',
											backgroundColor:
												selectedLogo === logo.id ? '#3182f6' : '#1f2937',
											color: 'white',
											border: 'none',
											borderRadius: '10px',
											fontSize: '14px',
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
												fontSize: '15px',
												marginBottom: '3px',
											}}
										>
											{logo.name}
										</div>
										<div
											style={{
												fontSize: '12px',
												opacity: 0.75,
											}}
										>
											{logo.keyword}
										</div>
									</button>
								))}
							</div>
						</div>

						{/* Export Info */}
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
								렌더링 방법
							</h4>
							<p
								style={{
									fontSize: '13px',
									color: '#8b95a1',
									lineHeight: '1.6',
									margin: 0,
								}}
							>
								터미널에서 다음 명령어로 영상 렌더링:
							</p>
							<code
								style={{
									display: 'block',
									marginTop: '12px',
									padding: '12px',
									backgroundColor: '#0a0e1a',
									borderRadius: '6px',
									fontSize: '12px',
									fontFamily: 'monospace',
									color: '#4dabf7',
								}}
							>
								npx remotion render {currentLogo.name.replace(' ', '')}
							</code>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
