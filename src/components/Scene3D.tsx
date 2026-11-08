import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { createUniverse } from './universe';

/**
 * Fixed full-page WebGL background.
 * A floating "database stack" (three glossy disks) wrapped in orbit rings with
 * travelling request nodes, in front of a deep-space backdrop (see universe.ts).
 * Reacts to the mouse (parallax) and to scroll (rotates and drifts away).
 */
export default function Scene3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      return; // WebGL not available: the CSS gradient background still shows
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 250);
    camera.position.set(0, 0, 9);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    const gold = new THREE.PointLight(0xffb547, 220, 40, 1.6);
    gold.position.set(4, 4, 5);
    scene.add(gold);
    const aqua = new THREE.PointLight(0x5ee7ff, 160, 40, 1.6);
    aqua.position.set(-5, -3, 4);
    scene.add(aqua);
    const rim = new THREE.DirectionalLight(0xffffff, 0.6);
    rim.position.set(0, 6, -4);
    scene.add(rim);

    // ---------- Database stack ----------
    const hero = new THREE.Group();
    scene.add(hero);
    const stack = new THREE.Group();
    stack.rotation.x = 0.35;
    hero.add(stack);

    const diskGeo = new THREE.CylinderGeometry(1.35, 1.35, 0.52, 96, 1);
    const diskMat = new THREE.MeshPhysicalMaterial({
      color: 0x2a2f48,
      metalness: 0.85,
      roughness: 0.28,
      envMapIntensity: 0.9,
      emissive: 0x0a0c18,
      clearcoat: 1,
      clearcoatRoughness: 0.15,
    });
    const edgeGeo = new THREE.TorusGeometry(1.35, 0.022, 12, 128);
    const edgeGold = new THREE.MeshBasicMaterial({ color: 0xffb547 });
    const edgeAqua = new THREE.MeshBasicMaterial({ color: 0x5ee7ff });
    const ledGeo = new THREE.SphereGeometry(0.055, 16, 16);

    const disks: THREE.Group[] = [];
    for (let i = 0; i < 3; i++) {
      const d = new THREE.Group();
      d.add(new THREE.Mesh(diskGeo, diskMat));
      const top = new THREE.Mesh(edgeGeo, i === 1 ? edgeAqua : edgeGold);
      top.rotation.x = Math.PI / 2;
      top.position.y = 0.26;
      const bottom = top.clone();
      bottom.position.y = -0.26;
      d.add(top, bottom);
      for (let k = 0; k < 3; k++) {
        const led = new THREE.Mesh(ledGeo, k === 0 ? edgeAqua : edgeGold);
        const a = Math.PI / 2 + (k - 1) * 0.22;
        led.position.set(Math.cos(a) * 1.36, 0, Math.sin(a) * 1.36);
        d.add(led);
      }
      d.position.y = (i - 1) * 0.72;
      stack.add(d);
      disks.push(d);
    }

    // Orbit rings with travelling "request" nodes
    const orbits: { ring: THREE.Group; node: THREE.Mesh; r: number; speed: number; phase: number }[] = [];
    const ringDefs = [
      { r: 2.35, tilt: [1.25, 0.2], color: 0xffb547, speed: 0.7 },
      { r: 2.75, tilt: [1.75, -0.45], color: 0x5ee7ff, speed: -0.5 },
      { r: 3.0, tilt: [1.1, 0.7], color: 0xffffff, speed: 0.35 },
    ];
    for (const def of ringDefs) {
      const g = new THREE.Group();
      g.rotation.set(def.tilt[0], def.tilt[1], 0);
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(def.r, 0.006, 8, 200),
        new THREE.MeshBasicMaterial({ color: def.color, transparent: true, opacity: 0.35 }),
      );
      g.add(ring);
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 20, 20),
        new THREE.MeshBasicMaterial({ color: def.color }),
      );
      const halo = new THREE.Mesh(
        new THREE.SphereGeometry(0.16, 20, 20),
        new THREE.MeshBasicMaterial({ color: def.color, transparent: true, opacity: 0.18 }),
      );
      node.add(halo);
      g.add(node);
      hero.add(g);
      orbits.push({ ring: g, node, r: def.r, speed: def.speed, phase: Math.random() * Math.PI * 2 });
    }

    // Faint geodesic shell
    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(3.8, 1),
      new THREE.MeshBasicMaterial({ color: 0xffb547, wireframe: true, transparent: true, opacity: 0.05 }),
    );
    hero.add(shell);

    // ---------- Universe backdrop ----------
    const universe = createUniverse(renderer.getPixelRatio(), window.innerWidth < 1024);
    scene.add(universe.group);

    // ---------- Layout / input ----------
    let base = { x: 2.7, y: 0, s: 1 };
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      if (w < 1024) {
        // stacked hero: object sits in the upper part of the screen
        base = { x: 0, y: 1.75, s: Math.min(0.62, (w / h) * 0.95) };
      } else {
        base = { x: 2.9, y: 0, s: 1 };
      }
      universe.setLayout(w < 1024);
    };
    resize();
    window.addEventListener('resize', resize);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove);

    let scrollY = window.scrollY;
    let smoothScroll = scrollY;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // ---------- Loop ----------
    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      const t = clock.getElapsedTime();
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      smoothScroll += (scrollY - smoothScroll) * 0.08;
      const vh = window.innerHeight;
      const p = smoothScroll / vh; // 0 at top, 1 after one screen

      // hero object: drift up + back as you scroll past the hero
      hero.position.set(base.x + p * 0.8, base.y + p * 6.5, -p * 2);
      hero.scale.setScalar(base.s * Math.max(0.4, 1 - p * 0.35));
      hero.visible = p < 1.4;
      hero.rotation.y = t * 0.18 + mouse.x * 0.35 + p * 1.6;
      hero.rotation.x = mouse.y * 0.18;

      disks.forEach((d, i) => {
        d.position.y = (i - 1) * 0.72 + Math.sin(t * 1.4 + i * 1.1) * 0.06;
        d.rotation.y = Math.sin(t * 0.5 + i) * 0.15;
      });
      orbits.forEach((o) => {
        const a = o.phase + t * o.speed;
        o.node.position.set(Math.cos(a) * o.r, Math.sin(a) * o.r, 0);
      });
      shell.rotation.y = -t * 0.05;
      shell.rotation.x = t * 0.03;

      // travel through space: backdrop drifts up slower than the page
      universe.update(t);
      universe.group.position.y = p * 11;
      universe.group.rotation.y = mouse.x * 0.04;

      camera.position.x = mouse.x * 0.4;
      camera.position.y = -mouse.y * 0.3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      if (!reduceMotion) raf = requestAnimationFrame(tick);
    };
    tick();

    // with reduced motion, still re-render on scroll/resize (no continuous loop)
    const staticRender = () => {
      if (reduceMotion) {
        smoothScroll = scrollY;
        tick();
      }
    };
    window.addEventListener('scroll', staticRender, { passive: true });
    window.addEventListener('resize', staticRender);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', staticRender);
      window.removeEventListener('resize', staticRender);
      scene.traverse((obj) => {
        const m = obj as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose();
      });
      universe.dispose();
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="scene-canvas" aria-hidden="true" />;
}
