"use client"
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function Background() {
	const imageRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (imageRef.current) {
			gsap.fromTo(
				imageRef.current,
				{
					opacity: 0,
					scale: 1.2,
					blur: 10
				},
				{
					opacity: 1,
					scale: 1,
					duration: 3,
					blur: 0,
					ease: "power2.out"
				}
			);
		}
	}, []);

	return (
		<div
			className="h-screen w-full fixed top-0 left-0 pointer-events-none -z-10 overflow-hidden"
		>
			<div ref={imageRef} className="w-full h-full">
				<Image src="/bg2.png" alt="background" quality={100} fill />
			</div>
		</div>
	);
}
