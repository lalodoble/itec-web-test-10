import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AnimatedLogo({ shouldLoop = true }) {
	const circlesRef = useRef(null);
	const svgRef = useRef(null);
	const allRef = useRef(null);
	const containerRef = useRef(null);

	const circlesCount = 12; // Increased for smoother looping
	const circleHeight = 216;
	const finalDestination = (circlesCount - 1.5 + 0.15) * circleHeight;
	const initialWidth = 200;
	const finalWidth = 1443;
	const wordsOffset = 756; // Current offset of the words group
	const speedMultiplier = 0.5;
	const delayMultiplier = 4;

	useEffect(() => {
		const circles = circlesRef.current;
		const svg = svgRef.current;
		const all = allRef.current;
		const container = containerRef.current;
		if (!circles || !svg) return;

		const createAnimation = () => {
			const tl = gsap.timeline();

			// First animation: move circles
			tl.to(svg, {
				duration: 2 * speedMultiplier,
				pointerEvents: "none"
			})
				.to(circles, {
				y: -finalDestination,
				duration: 5 * speedMultiplier,
				ease: "power2.inOut"
			})
			.to(container, {
				scale: 0.2,
				top: "2.5rem",
				duration: 1 * speedMultiplier,
				ease: "power2.inOut"
			});

			// Add hover animations
			svg.addEventListener('mouseenter', () => {
				const hoverTl = gsap.timeline();
				hoverTl.to([svg], {
					width: finalWidth,
					duration: 0.5 * speedMultiplier,
					ease: "power2.inOut"
				})
				.to(all, {
					x: wordsOffset / 5.8,
					duration: 0.5 * speedMultiplier,
					ease: "power2.inOut"
				}, "<");
			});

			svg.addEventListener('mouseleave', () => {
				const leaveTl = gsap.timeline();
				leaveTl.to([svg], {
					width: initialWidth,
					duration: 0.5 * speedMultiplier,
					ease: "power2.inOut"
				})
				.to(all, {
					x: 0,
					duration: 0.5 * speedMultiplier,
					ease: "power2.inOut"
				}, "<");
			});

			if (shouldLoop) {
				// Add delay before expand animation
				tl
				.to(svg, {
					pointerEvents: "auto"
				})
				.to({}, { duration: 3 * delayMultiplier })
				.to([svg], {
					width: finalWidth,
					duration: 1 * speedMultiplier,
					ease: "power2.inOut"
				})
				.to(all, {
					x: wordsOffset / 5.8,
					duration: 1 * speedMultiplier,
					ease: "power2.inOut"
				}, "<")
				// Add delay before collapse animation
				.to({}, { duration: 3 * delayMultiplier })
				.to([svg], {
					width: initialWidth,
					duration: 1 * speedMultiplier,
					ease: "power2.inOut"
				})
				.to(all, {
					x: 0,
					duration: 1 * speedMultiplier,
					ease: "power2.inOut"
				}, "<")
				// Reset circles position instantly
				.to(circles, {
					y: -finalDestination + (circleHeight * 6),
					duration: 0
				})
				// Animate circles to final destination
				.to(circles, {
					y: -finalDestination,
					duration: 3 * speedMultiplier,
					ease: "power2.inOut"
				})
				// Reset circles position instantly
				.to(circles, {
					y: -finalDestination + (circleHeight * 6),
					duration: 0
				})
				// Set up the loop
				.eventCallback("onComplete", () => {
					if (shouldLoop) {
						createAnimation();
					}
				});
			}
		};

		createAnimation();

		// Cleanup function
		return () => {
			gsap.killTweensOf([circles, svg, all]);
		};
	}, [shouldLoop]); // Add shouldLoop to dependencies

	return (
		<div ref={containerRef} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
			<svg ref={svgRef} width={initialWidth} height="180" viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g ref={allRef}>
					<g ref={circlesRef}>
						{[...Array(circlesCount)].map((_, index) => (
							<g key={index} transform={`translate(0, ${(index * circleHeight) + circleHeight})`}>
								<path d="M100 0C155.228 0 200 44.7715 200 100C200 155.228 155.228 200 100 200C44.7715 200 0 155.228 0 100C0 44.7715 44.7715 0 100 0ZM100.086 44.0859C69.158 44.0859 44.0859 69.158 44.0859 100.086C44.0859 131.014 69.158 156.086 100.086 156.086C131.014 156.086 156.086 131.014 156.086 100.086C156.086 69.158 131.014 44.0859 100.086 44.0859Z" fill="#fff"/>
							</g>
						))}
					</g>

					<g key={'words'} transform={`translate(${-wordsOffset}, 0)`}>
						<path d="M47.0587 4.31091H6.84131V175.689H47.0587V4.31091Z" fill="white"/>
						<path d="M100.834 39.4034H153.927V175.689H194.372V39.4034H247.464V4.31091H100.834V39.4034Z" fill="white"/>
						<path d="M467.637 138.176C461.275 140.748 453.853 142.034 445.446 142.034C438.326 142.034 431.737 140.824 425.678 138.403C419.619 135.983 414.393 132.504 410.076 127.891C405.683 123.277 402.35 117.832 399.927 111.403C397.503 105.05 396.291 97.8655 396.291 90C396.291 82.0588 397.427 74.9496 399.775 68.5966C402.123 62.2437 405.531 56.7227 409.924 52.1092C414.393 47.4958 419.543 44.0168 425.527 41.5966C431.51 39.1765 438.099 37.9664 445.37 37.9664C453.626 37.9664 460.821 39.3277 467.031 41.9748C473.242 44.6218 478.544 48.4034 482.937 53.2437L509.824 26.1681C501.871 18.605 492.555 12.6303 481.725 8.2437C470.894 3.85715 458.776 1.7395 445.37 1.7395C432.57 1.7395 420.755 4.00841 409.773 8.54622C398.791 13.084 389.172 19.2857 381.068 27.1513C372.888 35.0924 366.526 44.395 361.906 55.1345C357.286 65.8739 355.014 77.521 355.014 90.0756C355.014 102.479 357.286 114.126 361.83 124.941C366.375 135.756 372.737 145.134 380.992 153.151C389.248 161.168 398.866 167.37 409.924 171.756C420.982 176.218 432.949 178.412 445.9 178.412C459.988 178.412 472.257 176.294 482.709 171.983C493.237 167.748 502.553 161.773 510.809 154.21L483.694 127.361C479.453 131.975 474.075 135.605 467.637 138.176Z" fill="white"/>
						<path d="M670.618 99.2269C679.479 95.0673 686.371 89.1681 691.37 81.6807C696.293 74.1933 698.792 65.3446 698.792 55.2101C698.792 45.3782 696.293 36.6807 691.37 29.0421C686.447 21.479 679.63 15.4286 670.996 11.0421C662.362 6.57987 652.289 4.3866 640.852 4.3866H610.102H601.165H569.885V175.765H610.102V105.58H613.435L662.892 175.765H709.926L655.924 104.067C661.226 102.933 666.149 101.345 670.618 99.2269ZM610.026 35.0925H635.702C643.124 35.0925 648.805 37.0589 652.819 40.916C656.757 44.7731 658.727 49.6891 658.727 55.6639C658.727 62.0925 656.757 67.2353 652.819 70.9412C648.88 74.6471 643.124 76.5378 635.702 76.5378H610.026V35.0925Z" fill="white"/>
						<path d="M1158.38 109.286L1127.4 4.31091H1095.59L1064.46 109.21L1033.1 4.31091H993.113L1048.1 175.689H1079.83L1111.34 70.0336L1142.85 175.689H1174.66L1229.42 4.31091H1190.11L1158.38 109.286Z" fill="white"/>
						<path d="M1430.2 55.5126C1425.66 45.0757 1419.3 36.0757 1411.04 28.437C1402.79 20.7984 1393.17 14.8236 1382.18 10.6639C1371.2 6.50424 1359.16 4.3866 1346.06 4.3866H1316.97H1302.2H1276.76V175.765H1303.87H1316.97H1346.51C1359.46 175.765 1371.35 173.723 1382.41 169.563C1393.39 165.479 1402.94 159.58 1411.12 151.866C1419.3 144.227 1425.58 135.151 1430.13 124.79C1434.67 114.353 1436.94 102.782 1436.94 90.0757C1436.94 77.4454 1434.67 65.9496 1430.2 55.5126ZM1389.61 117.227C1385.52 124.866 1379.69 130.765 1372.19 134.773C1364.69 138.782 1355.9 140.824 1345.91 140.824H1317.05V39.1765H1345.91C1355.9 39.1765 1364.69 41.2185 1372.19 45.3782C1379.69 49.4622 1385.52 55.2858 1389.61 62.6975C1393.7 70.1093 1395.82 79.1849 1395.82 89.7731C1395.82 100.361 1393.7 109.588 1389.61 117.227Z" fill="white"/>
						{/* <path opacity="0.2" d="M856.632 67.1596C897.456 67.1596 932.22 41.1428 945.323 4.91589H900.334C890.488 18.3781 874.582 27.0756 856.632 27.0756C838.682 27.0756 822.777 18.3024 812.931 4.91589H767.942C781.045 41.2184 815.809 67.1596 856.632 67.1596Z" fill="white"/>
						<path opacity="0.2" d="M856.632 81.5294C804.675 81.5294 762.337 123.807 762.337 175.689H802.479C802.479 145.891 826.791 121.613 856.632 121.613C886.474 121.613 910.786 145.891 910.786 175.689H950.927C950.927 123.731 908.589 81.5294 856.632 81.5294Z" fill="white"/> */}
					</g>
				</g>
			</svg>
		</div>
	);
}
