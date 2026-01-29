'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, Float, PresentationControls } from '@react-three/drei';

function Scene() {
    return (
        <>
            <Environment preset="city" />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

            <PresentationControls
                snap
                global
                zoom={0.8}
                rotation={[0, -Math.PI / 4, 0]}
                polar={[0, Math.PI / 4]}
                azimuth={[-Math.PI / 4, Math.PI / 4]}
            >
                <group position-y={-0.75} dispose={null}>
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                        {/* Glass Object - Torus Knot */}
                        <mesh position={[0, 1.5, 0]} castShadow>
                            <torusKnotGeometry args={[0.6, 0.25, 128, 32]} />
                            <meshPhysicalMaterial
                                transmission={0.95}
                                roughness={0.05}
                                thickness={3}
                                ior={1.5}
                                chromaticAberration={0.05}
                                color="#ffffff"
                            />
                        </mesh>

                        {/* Clay Object - Rounded Box */}
                        <mesh position={[0, -1, 0]} castShadow receiveShadow>
                            <boxGeometry args={[2.5, 1, 2.5]} />
                            <meshStandardMaterial
                                color="#e3f2fd" // Light Blue
                                roughness={0.7}
                                metalness={0.1}
                            />
                        </mesh>

                        {/* Another Clay Object - Sphere */}
                        <mesh position={[1.2, 0.5, 1.2]} castShadow receiveShadow>
                            <sphereGeometry args={[0.5, 32, 32]} />
                            <meshStandardMaterial
                                color="#ffcdd2" // Light Red
                                roughness={0.8}
                                metalness={0}
                            />
                        </mesh>
                    </Float>
                </group>
            </PresentationControls>

            <ContactShadows position={[0, -2, 0]} opacity={0.6} scale={10} blur={2.5} far={4} color="#000000" />
        </>
    );
}

export default function ThreeGlassyClayLogo() {
    return (
        <div className="w-full h-[500px] bg-grey-100 rounded-2xl overflow-hidden border border-[var(--color-grey-100)]">
            <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
                <Scene />
            </Canvas>
        </div>
    );
}
