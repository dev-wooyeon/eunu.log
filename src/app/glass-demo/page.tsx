import ThreeGlassyClayLogo from '@/components/ui/ThreeGlassyClayLogo';

export default function GlassDemoPage() {
    return (
        <div className="min-h-screen bg-[var(--color-grey-50)] p-8 flex flex-col items-center justify-center gap-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-[var(--color-grey-900)] mb-2">3D Glassy Clay Demo</h1>
                <p className="text-[var(--color-grey-700)]">Physical glass material + Soft clay material</p>
            </div>

            <div className="max-w-2xl w-full">
                <ThreeGlassyClayLogo />
            </div>

            <div className="bg-white p-6 rounded-2xl max-w-2xl w-full border border-[var(--color-grey-100)]">
                <h3 className="text-lg font-bold mb-4">Implementation Details</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-[var(--color-grey-700)]">
                    <li><strong>Glass:</strong> <code>MeshPhysicalMaterial</code> with <code>transmission=0.95</code>, <code>roughness=0.05</code></li>
                    <li><strong>Clay:</strong> <code>MeshStandardMaterial</code> with <code>roughness=0.7</code> (matte finish)</li>
                    <li><strong>Lighting:</strong> <code>Environment (City)</code> + Soft directional light</li>
                    <li><strong>Shadows:</strong> <code>ContactShadows</code> for ground ambient occlusion</li>
                </ul>
            </div>
        </div>
    );
}
