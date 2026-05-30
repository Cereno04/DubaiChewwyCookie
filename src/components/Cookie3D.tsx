import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

export default function Cookie3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState(0); // 0 to 1 ratio to trigger subtle hints
  
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // SCENE SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0503, 0.08);

    // CAMERA
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.5);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // THE COOKIE GROUP
    const cookieGroup = new THREE.Group();
    scene.add(cookieGroup);

    // 1. ORGANIC COOKIE BASE (Hewwy Cocoa Shell)
    // We create a flattened, perturbed, delicious-looking chocolate base.
    const cookieGeo = new THREE.IcosahedronGeometry(1.8, 4);
    
    // Perturb vertices to create an organic, hand-crafted, bumpy cookie surface
    const positionAttribute = cookieGeo.attributes.position;
    const vertex = new THREE.Vector3();
    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i);
      
      // Scale vertically to flatten into a cookie disk
      vertex.y *= 0.65;
      
      // Calculate noise based on coordinates to perturb
      const noiseX = Math.sin(vertex.y * 3) * Math.cos(vertex.z * 3) * 0.12;
      const noiseY = Math.cos(vertex.x * 2.5) * Math.sin(vertex.z * 2.5) * 0.08;
      const noiseZ = Math.sin(vertex.x * 3) * Math.sin(vertex.y * 3) * 0.12;
      
      vertex.x += noiseX;
      vertex.y += noiseY;
      vertex.z += noiseZ;
      
      positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    cookieGeo.computeVertexNormals();

    const cookieMat = new THREE.MeshStandardMaterial({
      color: 0x3d2012, // Rich dark brown chocolate
      roughness: 0.95,
      metalness: 0.05,
      bumpScale: 0.15,
      flatShading: false,
    });

    const cookieBase = new THREE.Mesh(cookieGeo, cookieMat);
    cookieBase.castShadow = true;
    cookieBase.receiveShadow = true;
    cookieGroup.add(cookieBase);

    // 2. THE FLOATING FILLING/SPLIT
    // To represent the bite showing pistachio paste & kunafa (kataifi),
    // we carve out/place a glowing green textured wedge on the front.
    const splitGroup = new THREE.Group();
    // Position it slightly forward toward the cameras' viewing angle
    splitGroup.position.set(0.1, 0, 0.4);
    cookieGroup.add(splitGroup);

    // Inner green cream sphere representing the rich pistachio filling overflowing from a crack
    const pistachioGeo = new THREE.SphereGeometry(1.2, 32, 16);
    // Flat side scaling to make it fit inside
    pistachioGeo.scale(1.1, 0.45, 0.6);
    const pistachioMat = new THREE.MeshStandardMaterial({
      color: 0x8faf3f, // Vivid premium pistachio green
      emissive: 0x4d6320, // Glowing core
      roughness: 0.2, // Satin/creamy shine
      metalness: 0.15,
    });
    const pistachioFills = new THREE.Mesh(pistachioGeo, pistachioMat);
    splitGroup.add(pistachioFills);

    // To represent KATAIFI (crunchy kunafa pastry threads), we add multiple golden wire-like curves/rings
    const kataifiGroup = new THREE.Group();
    const fiberCount = 45;
    const kataifiMat = new THREE.MeshStandardMaterial({
      color: 0xe0b943, // Golden toasted pastry color
      roughness: 0.4,
      metalness: 0.6,
      emissive: 0x5a4208,
    });

    for (let i = 0; i < fiberCount; i++) {
      // Seeded random golden curly threads
      const radius = 0.5 + Math.random() * 0.7;
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;

      // Small toruses or rings that represent golden curly kataifi threads
      const threadGeo = new THREE.TorusGeometry(
        radius * 0.4, 
        0.02 + Math.random() * 0.02, 
        4, 
        8, 
        Math.PI * (0.5 + Math.random() * 1.5)
      );
      const thread = new THREE.Mesh(threadGeo, kataifiMat);
      
      // Position them packed around the green core
      thread.position.set(
        (Math.random() - 0.5) * 1.6,
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.6
      );
      thread.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      kataifiGroup.add(thread);
    }
    splitGroup.add(kataifiGroup);

    // 3. SPECIAL DECALS - EDIBLE GOLD LEAF FLAKES & CHOCOLATE CHIPS on surface
    const chipsGroup = new THREE.Group();
    cookieGroup.add(chipsGroup);

    // Darker premium chocolate chunks
    const chunkGeo = new THREE.IcosahedronGeometry(0.18, 1);
    const darkChunkMat = new THREE.MeshStandardMaterial({
      color: 0x1d0b04, // Deep near-black cocoa praline
      roughness: 0.3,
      metalness: 0.1,
    });

    // Edible premium gold flakes
    const flakeGeo = new THREE.BoxGeometry(0.12, 0.01, 0.12);
    const goldFlakeMat = new THREE.MeshStandardMaterial({
      color: 0xf5d061, // Rich Dubai gold
      roughness: 0.1,
      metalness: 0.95,
      emissive: 0x765a10,
    });

    // Scattered chunks & gold leaf across the outer cookie boundary
    const toppingsCount = 20;
    for (let i = 0; i < toppingsCount; i++) {
      const angle = (i / toppingsCount) * Math.PI * 2 + Math.random() * 0.5;
      const r = 1.0 + Math.random() * 0.7;
      
      if (Math.random() > 0.4) {
        // Dark chocolate chunk
        const chunk = new THREE.Mesh(chunkGeo, darkChunkMat);
        const yCoord = (Math.random() - 0.5) * 0.45;
        chunk.position.set(
          Math.cos(angle) * r,
          yCoord,
          Math.sin(angle) * r
        );
        chunk.scale.set(
          0.6 + Math.random() * 0.8,
          0.6 + Math.random() * 0.8,
          0.6 + Math.random() * 0.8
        );
        chunk.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );
        chipsGroup.add(chunk);
      } else {
        // Luxury gold flake
        const flake = new THREE.Mesh(flakeGeo, goldFlakeMat);
        const yCoord = (Math.random() - 0.5) * 0.5;
        flake.position.set(
          Math.cos(angle) * r * 1.05,
          yCoord,
          Math.sin(angle) * r * 1.05
        );
        flake.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );
        chipsGroup.add(flake);
      }
    }

    // 4. FLOATING LUXURY ORBITING GOLD PARTICLES (Ambient Sparkles)
    const particleCount = 80;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds: number[] = [];
    const radiuses: number[] = [];
    const angles: number[] = [];
    const yOffsets: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      const r = 2.2 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 3;
      
      positions[i * 3] = Math.cos(theta) * r;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(theta) * r;

      radiuses.push(r);
      speeds.push(0.015 + Math.random() * 0.02);
      angles.push(theta);
      yOffsets.push(y);
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Glowing golden star-particles material
    const particleMat = new THREE.PointsMaterial({
      color: 0xebd382,
      size: 0.08,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const sparkleParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(sparkleParticles);


    // LIGHTING
    // Warm ambient light of high-end bakery
    const ambientLight = new THREE.AmbientLight(0x2d1b11, 1.2);
    scene.add(ambientLight);

    // Strong luxury golden soft spotlight from the top-left to illuminate the gold/pistachio highlights
    const goldSpot = new THREE.SpotLight(0xffdf80, 15);
    goldSpot.position.set(4, 5, 4);
    goldSpot.angle = Math.PI / 4;
    goldSpot.penumbra = 0.8;
    goldSpot.castShadow = true;
    goldSpot.shadow.mapSize.width = 1024;
    goldSpot.shadow.mapSize.height = 1024;
    scene.add(goldSpot);

    // Warm rim light from the back
    const rimLight = new THREE.DirectionalLight(0xffaa44, 4);
    rimLight.position.set(-6, 2, -4);
    scene.add(rimLight);

    // Gentle fill light to soften dark shadows
    const whiteFill = new THREE.DirectionalLight(0xffffff, 1.5);
    whiteFill.position.set(-3, -2, 4);
    scene.add(whiteFill);

    // SCROLL INTERACTION & PARALLAX TRACKING
    let targetX = 0;
    let targetY = 0;
    let targetScrollY = 0;
    let spinVelocity = 0;
    let activeRotationY = 0.5; // Starting rot
    let activeRotationX = 0.2;

    const handleMouseMove = (event: MouseEvent) => {
      // Calculate normal mouse coordinate [-1 to 1]
      targetX = (event.clientX / window.innerWidth) * 2 - 1;
      targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      // Rotate cookie faster/differently based on page scroll
      const scrolled = window.scrollY;
      targetScrollY = scrolled * 0.0035;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    // RESIZE LISTENER
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // DRAG VARIABLES
    let lastMouseX = 0;
    let lastMouseY = 0;
    let localRotationY = 0;
    let localRotationX = 0;
    let isClicking = false;

    const onMouseDown = (e: MouseEvent) => {
      isClicking = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      setIsDragging(true);
    };

    const onTouchStart = (e: TouchEvent) => {
      isClicking = true;
      if (e.touches.length > 0) {
        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;
      }
      setIsDragging(true);
    };

    const onMouseMoveCanvas = (e: MouseEvent) => {
      if (!isClicking) return;
      const deltaX = e.clientX - lastMouseX;
      const deltaY = e.clientY - lastMouseY;
      
      spinVelocity = deltaX * 0.01;
      localRotationY += deltaX * 0.012;
      localRotationX += deltaY * 0.012;

      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const onTouchMoveCanvas = (e: TouchEvent) => {
      if (!isClicking || e.touches.length === 0) return;
      const deltaX = e.touches[0].clientX - lastMouseX;
      const deltaY = e.touches[0].clientY - lastMouseY;
      
      spinVelocity = deltaX * 0.01;
      localRotationY += deltaX * 0.015;
      localRotationX += deltaY * 0.015;

      lastMouseX = e.touches[0].clientX;
      lastMouseY = e.touches[0].clientY;
    };

    const onMouseUpOrLeave = () => {
      isClicking = false;
      setIsDragging(false);
    };

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMoveCanvas);
    canvas.addEventListener("mouseup", onMouseUpOrLeave);
    canvas.addEventListener("mouseleave", onMouseUpOrLeave);

    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove", onTouchMoveCanvas, { passive: true });
    canvas.addEventListener("touchend", onMouseUpOrLeave);

    // ANIMATION LOOP
    let animationId = 0;
    let time = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.015;

      // Slowly rot automatically if user is not physically dragging
      if (!isClicking) {
        // Slow damp spin velocity to gentle float
        spinVelocity *= 0.95;
        localRotationY += 0.006 + spinVelocity;
        
        // Dynamic floating bobbing
        cookieGroup.position.y = Math.sin(time) * 0.15;
        cookieGroup.position.x = Math.cos(time * 0.5) * 0.08;
      } else {
        // Maintain position during manual dragging
        cookieGroup.position.y += (0 - cookieGroup.position.y) * 0.1;
        cookieGroup.position.x += (0 - cookieGroup.position.x) * 0.1;
      }

      // Smooth blend together mouse parallax tilt + manual drags + scroll rotation
      activeRotationY += (localRotationY + targetX * 0.25 - activeRotationY) * 0.08;
      activeRotationX += (localRotationX + targetY * 0.25 - activeRotationX) * 0.08;

      // Apply to cookie matrix
      cookieGroup.rotation.y = activeRotationY + targetScrollY;
      cookieGroup.rotation.x = activeRotationX;
      cookieGroup.rotation.z = Math.sin(time * 0.25) * 0.05 + targetScrollY * 0.2;

      // Keep kataifi parts rotating/shaking slightly for crisp glistening feel
      kataifiGroup.rotation.y = Math.sin(time) * 0.04;
      kataifiGroup.rotation.x = Math.cos(time * 0.8) * 0.03;

      // Animate floating gold particles in 3D orbit
      const pPosition = sparkleParticles.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        angles[i] += speeds[i] * (0.8 + Math.sin(time + i) * 0.3);
        const r = radiuses[i];
        
        // Rise slowly and wrap around
        yOffsets[i] += 0.005;
        if (yOffsets[i] > 2.5) {
          yOffsets[i] = -2.5;
        }

        pPosition.setX(i, Math.cos(angles[i]) * r);
        pPosition.setY(i, yOffsets[i] + Math.sin(time + i * 0.1) * 0.1);
        pPosition.setZ(i, Math.sin(angles[i]) * r);
      }
      pPosition.needsUpdate = true;
      sparkleParticles.rotation.y = time * 0.015;

      // Render scene
      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mousemove", onMouseMoveCanvas);
      canvas.removeEventListener("mouseup", onMouseUpOrLeave);
      canvas.removeEventListener("mouseleave", onMouseUpOrLeave);

      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMoveCanvas);
      canvas.removeEventListener("touchend", onMouseUpOrLeave);

      // Dispose buffer meshes to prevent GPU memory leak
      cookieGeo.dispose();
      cookieMat.dispose();
      pistachioGeo.dispose();
      pistachioMat.dispose();
      kataifiMat.dispose();
      darkChunkMat.dispose();
      goldFlakeMat.dispose();
      chunkGeo.dispose();
      flakeGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      id="3d-cookie-container"
      ref={containerRef} 
      className="relative w-full h-[380px] md:h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
    >
      {/* GLOW BACKGROUND ORBIT */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[200px] h-[200px] md:w-[320px] md:h-[320px] rounded-full bg-gradient-to-tr from-[#8faf3f]/25 to-[#EE74AA]/25 blur-3xl animate-pulse" />
      </div>

      <canvas 
        id="cookie-threejs-canvas"
        ref={canvasRef} 
        className="w-full h-full block z-10 drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)]"
      />

      {/* USER INTERACTIVE INDICATOR */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
        <span className="text-[10px] font-mono tracking-[4px] uppercase text-pink-100/60 flex items-center gap-1.5 backdrop-blur-md bg-black/45 py-1.5 px-3 rounded-full border border-[#EE74AA]/20">
          <span className={`inline-block w-1.5 h-1.5 rounded-full bg-lime-500 ${isDragging ? 'animate-ping' : 'animate-pulse'}`} />
          {isDragging ? "Spinning 360°" : "Click & Drag Cookie"}
        </span>
      </div>
    </div>
  );
}
