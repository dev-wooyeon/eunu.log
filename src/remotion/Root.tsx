import React from 'react';
import {Composition} from 'remotion';
import {FlowPipelineLogo} from './compositions/FlowPipelineLogo';
import {GrowthSpiralLogo} from './compositions/GrowthSpiralLogo';
import {TransformSphereLogo} from './compositions/TransformSphereLogo';
import {MobiusLoopLogo} from './compositions/MobiusLoopLogo';
import {TwistedRibbonLogo} from './compositions/TwistedRibbonLogo';
import {FluidWaveLogo} from './compositions/FluidWaveLogo';
import {InfinityKnotLogo} from './compositions/InfinityKnotLogo';
import {TorusTwistLogo} from './compositions/TorusTwistLogo';
import {YDropsLogo} from './compositions/YDropsLogo';
import {ButterflyCrossLogo} from './compositions/ButterflyCrossLogo';
import {GlobeBeltLogo} from './compositions/GlobeBeltLogo';
import {CloverDropsLogo} from './compositions/CloverDropsLogo';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			{/* Version 1 Logos */}
			<Composition
				id="FlowPipelineLogo"
				component={FlowPipelineLogo}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					titleText: 'eunu',
					titleColor: '#3182f6',
				}}
			/>
			<Composition
				id="GrowthSpiralLogo"
				component={GrowthSpiralLogo}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					titleText: 'eunu',
					titleColor: '#3182f6',
				}}
			/>
			<Composition
				id="TransformSphereLogo"
				component={TransformSphereLogo}
				durationInFrames={180}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					titleText: 'eunu',
					titleColor: '#3182f6',
				}}
			/>

			{/* Version 2 Logos - Monolithic Structures */}
			<Composition
				id="MobiusLoopLogo"
				component={MobiusLoopLogo}
				durationInFrames={180}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					titleText: 'eunu',
					titleColor: '#3182f6',
				}}
			/>
			<Composition
				id="TwistedRibbonLogo"
				component={TwistedRibbonLogo}
				durationInFrames={180}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					titleText: 'eunu',
					titleColor: '#3182f6',
				}}
			/>
			<Composition
				id="FluidWaveLogo"
				component={FluidWaveLogo}
				durationInFrames={180}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					titleText: 'eunu',
					titleColor: '#3182f6',
				}}
			/>
			<Composition
				id="InfinityKnotLogo"
				component={InfinityKnotLogo}
				durationInFrames={180}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					titleText: 'eunu',
					titleColor: '#3182f6',
				}}
			/>
			<Composition
				id="TorusTwistLogo"
				component={TorusTwistLogo}
				durationInFrames={200}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					titleText: 'eunu',
					titleColor: '#3182f6',
				}}
			/>

			{/* Version 3 Logos - Toss Sample Inspired */}
			<Composition
				id="YDropsLogo"
				component={YDropsLogo}
				durationInFrames={170}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					titleText: 'eunu',
					titleColor: '#3182f6',
				}}
			/>
			<Composition
				id="ButterflyCrossLogo"
				component={ButterflyCrossLogo}
				durationInFrames={170}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					titleText: 'eunu',
					titleColor: '#3182f6',
				}}
			/>
			<Composition
				id="GlobeBeltLogo"
				component={GlobeBeltLogo}
				durationInFrames={180}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					titleText: 'eunu',
					titleColor: '#3182f6',
				}}
			/>
			<Composition
				id="CloverDropsLogo"
				component={CloverDropsLogo}
				durationInFrames={170}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					titleText: 'eunu',
					titleColor: '#3182f6',
				}}
			/>
		</>
	);
};
