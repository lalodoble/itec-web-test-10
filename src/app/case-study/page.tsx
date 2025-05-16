'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

export default function CaseStudy() {
	const containerRef = useRef(null);
	const heroRef = useRef(null);
	const challengeRef = useRef(null);
	const processRef = useRef(null);
	const outcomeRef = useRef(null);

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		// Hero section animation
		gsap.from(heroRef.current, {
			opacity: 0,
			y: 100,
			duration: 1,
			ease: 'power3.out',
		});

		// Challenge section animation
		gsap.from(challengeRef.current, {
			scrollTrigger: {
				trigger: challengeRef.current,
				start: 'top 80%',
				toggleActions: 'play none none reverse',
			},
			opacity: 0,
			y: 50,
			duration: 1,
			ease: 'power2.out',
		});

		// Process section animation
		gsap.from(processRef.current, {
			scrollTrigger: {
				trigger: processRef.current,
				start: 'top 80%',
				toggleActions: 'play none none reverse',
			},
			opacity: 0,
			y: 50,
			duration: 1,
			ease: 'power2.out',
		});

		// Outcome section animation
		gsap.from(outcomeRef.current, {
			scrollTrigger: {
				trigger: outcomeRef.current,
				start: 'top 80%',
				toggleActions: 'play none none reverse',
			},
			opacity: 0,
			y: 50,
			duration: 1,
			ease: 'power2.out',
		});

		return () => {
			ScrollTrigger.getAll().forEach(trigger => trigger.kill());
		};
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
			{/* Hero Section */}
			<section ref={heroRef} className="h-screen flex items-center justify-center relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-50" />
				<div className="container mx-auto px-4 z-10">
					<h1 className="text-6xl md:text-8xl font-light mb-6">Project Name</h1>
					<p className="text-xl md:text-2xl text-gray-300 max-w-2xl">
						A brief, compelling description of the project and its impact.
					</p>
				</div>
			</section>

			{/* Challenge Section */}
			<section ref={challengeRef} className="py-20 relative">
				<div className="container mx-auto px-4">
					<h2 className="text-4xl md:text-5xl font-light mb-8">The Challenge</h2>
					<div className="grid md:grid-cols-2 gap-12 items-center">
						<div className="space-y-6">
							<p className="text-lg text-gray-300">
								Describe the client's challenges and problems that needed solving.
							</p>
							<ul className="space-y-4">
								<li className="flex items-start">
									<span className="text-blue-400 mr-2">•</span>
									<span>Key challenge point 1</span>
								</li>
								<li className="flex items-start">
									<span className="text-blue-400 mr-2">•</span>
									<span>Key challenge point 2</span>
								</li>
								<li className="flex items-start">
									<span className="text-blue-400 mr-2">•</span>
									<span>Key challenge point 3</span>
								</li>
							</ul>
						</div>
						<div className="relative h-[400px] bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg">
							{/* Placeholder for challenge visualization */}
						</div>
					</div>
				</div>
			</section>

			{/* Process Section */}
			<section ref={processRef} className="py-20 relative">
				<div className="container mx-auto px-4">
					<h2 className="text-4xl md:text-5xl font-light mb-12">Our Approach</h2>
					<div className="grid md:grid-cols-3 gap-8">
						{[1, 2, 3].map((step) => (
							<div key={step} className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg">
								<div className="text-2xl font-light mb-4">Step {step}</div>
								<p className="text-gray-300">
									Description of the process step and methodology.
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Outcome Section */}
			<section ref={outcomeRef} className="py-20 relative">
				<div className="container mx-auto px-4">
					<h2 className="text-4xl md:text-5xl font-light mb-8">The Results</h2>
					<div className="grid md:grid-cols-2 gap-12 items-center">
						<div className="space-y-6">
							<div className="p-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg">
								<h3 className="text-2xl font-light mb-4">Key Metrics</h3>
								<ul className="space-y-4">
									<li className="flex items-center justify-between">
										<span>Metric 1</span>
										<span className="text-blue-400">+XX%</span>
									</li>
									<li className="flex items-center justify-between">
										<span>Metric 2</span>
										<span className="text-blue-400">+XX%</span>
									</li>
									<li className="flex items-center justify-between">
										<span>Metric 3</span>
										<span className="text-blue-400">+XX%</span>
									</li>
								</ul>
							</div>
						</div>
						<div className="relative h-[400px] bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg">
							{/* Placeholder for results visualization */}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
} 