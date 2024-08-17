import React from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
// import { loadAll } from "@/tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
// import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

const ParticlesComponent = (props) => {
	const [init, setInit] = useState(false);
	useEffect(() => {
		initParticlesEngine(async (engine) => {
			//await loadAll(engine);
			await loadFull(engine);
			// await loadSlim(engine);
			//await loadBasic(engine);
		}).then(() => {
			setInit(true);
		});
	}, []);

	const particlesLoaded = (container) => {
		console.log(container);
	};

	const options = useMemo(
		() => ({
			background: {
				color: "#000",
				image: "",
				position: "50% 50%",
				repeat: "no-repeat",
				size: "cover",
			},
			fpsLimit: 120,
			interactivity: {
				events: {
					onClick: {
						enable: true,
						mode: "repulse",
					},
					onHover: {
						enable: true,
						mode: "grab",
					},
				},
				modes: {
					push: {
						distance: 200,
						duration: 15,
					},
					grab: {
						distance: 150,
					},
				},
			},
			particles: {
				color: {
					value: "#FFFFFF",
				},
				links: {
					color: "#FFFFFF",
					distance: 200,
					enable: true,
					opacity: 0.3,
					width: 1,
				},
				move: {
					direction: "none",
					enable: true,
					outModes: {
						default: "bounce",
					},
					random: true,
					speed: 2,
					straight: false,
				},
				number: {
					density: {
						enable: true,
					},
					value: 100,
				},
				opacity: {
					value: 1.0,
				},
				shape: {
					type: "circle",
				},
				size: {
					value: { min: 0, max: 3 },
				},
			},
			detectRetina: true,
		}),
		[]
	);

	return <Particles id={props.id} init={particlesLoaded} options={options} />;
};

export default ParticlesComponent;


