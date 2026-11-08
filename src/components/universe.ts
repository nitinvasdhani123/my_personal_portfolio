import * as THREE from 'three';

/**
 * Deep-space backdrop: twinkling star field, spiral galaxies, a black hole with
 * an animated accretion disk, and soft nebula clouds. Everything lives in one
 * group that drifts upward as the page scrolls, so different objects come into
 * view behind different sections.
 */

const POINT_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uScale;
  uniform float uTwinkle;
  attribute float aSize;
  attribute float aPhase;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uScale / -mv.z;
    float tw = sin(uTime * (0.8 + aPhase * 2.2) + aPhase * 6.2831) * 0.5 + 0.5;
    vAlpha = mix(1.0, 0.35 + 0.65 * tw, uTwinkle);
    vColor = aColor;
  }
`;

const POINT_FRAG = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = pow(smoothstep(0.5, 0.0, d), 1.7);
    gl_FragColor = vec4(vColor, a * vAlpha * uOpacity);
  }
`;

const DISK_VERT = /* glsl */ `
  varying vec3 vPos;
  void main() {
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const DISK_FRAG = /* glsl */ `
  uniform float uTime;
  uniform float uInner;
  uniform float uOuter;
  uniform float uOpacity;
  varying vec3 vPos;
  void main() {
    float r = length(vPos.xy);
    float t = clamp((r - uInner) / (uOuter - uInner), 0.0, 1.0);
    float ang = atan(vPos.y, vPos.x);
    // spiralling streaks that rotate faster near the centre
    float speed = 2.2 / (0.35 + t);
    float s1 = sin(ang * 5.0 + r * 2.4 - uTime * speed) * 0.5 + 0.5;
    float s2 = sin(ang * 11.0 - r * 4.1 - uTime * speed * 1.3) * 0.5 + 0.5;
    float s3 = sin(ang * 23.0 + r * 7.0 - uTime * speed * 1.7) * 0.5 + 0.5;
    float band = 0.45 + 0.35 * s1 + 0.2 * s2 * s3;

    vec3 hot  = vec3(1.0, 0.96, 0.88);
    vec3 mid  = vec3(1.0, 0.64, 0.24);
    vec3 cool = vec3(0.78, 0.2, 0.08);
    vec3 col = t < 0.25 ? mix(hot, mid, t / 0.25) : mix(mid, cool, (t - 0.25) / 0.75);

    float alpha = smoothstep(0.0, 0.06, t) * (1.0 - smoothstep(0.45, 1.0, t)) * band;
    gl_FragColor = vec4(col * 1.35, alpha * uOpacity);
  }
`;

type Stop = [number, string];

function radialTexture(stops: Stop[], size = 256) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  stops.forEach(([o, col]) => g.addColorStop(o, col));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createUniverse(pixelRatio: number, isSmall: boolean) {
  const group = new THREE.Group();
  const textures: THREE.Texture[] = [];
  const pointMaterials: THREE.ShaderMaterial[] = [];
  const spinners: { obj: THREE.Object3D; speed: number }[] = [];
  const placed: { obj: THREE.Object3D; x: number }[] = [];
  const diskMaterials: THREE.ShaderMaterial[] = [];

  const pointMaterial = (twinkle: number, opacity = 1) => {
    const m = new THREE.ShaderMaterial({
      vertexShader: POINT_VERT,
      fragmentShader: POINT_FRAG,
      uniforms: {
        uTime: { value: 0 },
        uScale: { value: 110 * pixelRatio },
        uTwinkle: { value: twinkle },
        uOpacity: { value: opacity },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    pointMaterials.push(m);
    return m;
  };

  const place = (obj: THREE.Object3D, x: number, y: number, z: number) => {
    obj.position.set(x, y, z);
    placed.push({ obj, x });
    group.add(obj);
  };

  const softGlow = textures[textures.push(
    radialTexture([
      [0, 'rgba(255,255,255,1)'],
      [0.2, 'rgba(255,255,255,0.55)'],
      [0.5, 'rgba(255,255,255,0.12)'],
      [1, 'rgba(255,255,255,0)'],
    ]),
  ) - 1];

  // ---------- Stars ----------
  {
    const COUNT = isSmall ? 2600 : 5200;
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const size = new Float32Array(COUNT);
    const phase = new Float32Array(COUNT);
    const palette = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#cfe3ff'),
      new THREE.Color('#9ec5ff'),
      new THREE.Color('#ffe2b0'),
      new THREE.Color('#ffc27a'),
    ];
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 110;
      pos[i * 3 + 1] = 30 - Math.random() * 170;
      pos[i * 3 + 2] = -12 - Math.random() * 60;
      const c = palette[Math.random() < 0.6 ? 0 : Math.floor(Math.random() * palette.length)];
      col.set([c.r, c.g, c.b], i * 3);
      const big = Math.random() < 0.025;
      size[i] = big ? 4 + Math.random() * 3 : 0.8 + Math.pow(Math.random(), 2.5) * 2.4;
      phase[i] = Math.random();
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
    geo.setAttribute('aPhase', new THREE.BufferAttribute(phase, 1));
    const stars = new THREE.Points(geo, pointMaterial(1));
    stars.frustumCulled = false;
    group.add(stars);
  }

  // ---------- Nebulae ----------
  const nebula = (x: number, y: number, z: number, colors: string[], spread: number, scale: number, opacity: number) => {
    const g = new THREE.Group();
    colors.forEach((c, i) => {
      for (let k = 0; k < 3; k++) {
        const mat = new THREE.SpriteMaterial({
          map: softGlow,
          color: new THREE.Color(c),
          transparent: true,
          opacity: opacity * (0.6 + Math.random() * 0.4),
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const s = new THREE.Sprite(mat);
        const sc = scale * (0.6 + Math.random() * 0.7);
        s.scale.set(sc * (1 + Math.random() * 0.6), sc, 1);
        s.position.set((Math.random() - 0.5) * spread, (Math.random() - 0.5) * spread * 0.6, -i * 2 - k);
        mat.rotation = Math.random() * Math.PI;
        g.add(s);
      }
    });
    place(g, x, y, z);
    return g;
  };

  nebula(10, 7, -55, ['#3b2a8f', '#1f4fa8', '#7a2f8f'], 18, 22, 0.088);
  nebula(-14, -22, -58, ['#14506b', '#2a3a9a'], 20, 24, 0.077);
  nebula(13, -36, -50, ['#8a3a12', '#5a1f6b'], 16, 20, 0.066);
  nebula(-6, -78, -55, ['#0f5f6b', '#6b1f5a', '#2a2f8f'], 22, 24, 0.083);
  nebula(10, -112, -55, ['#3b2a8f', '#8a3a12'], 18, 22, 0.072);

  // ---------- Spiral galaxies ----------
  const galaxy = (opts: {
    x: number; y: number; z: number; radius: number; count: number; branches: number;
    spin: number; inside: string; outside: string; tilt: [number, number, number]; speed: number;
  }) => {
    const { radius, count, branches, spin } = opts;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const size = new Float32Array(count);
    const phase = new Float32Array(count);
    const cin = new THREE.Color(opts.inside);
    const cout = new THREE.Color(opts.outside);
    const tmp = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const r = Math.pow(Math.random(), 1.4) * radius;
      const branch = ((i % branches) / branches) * Math.PI * 2;
      const angle = branch + r * spin;
      const rnd = () => Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.35 * (r + 0.6);
      pos[i * 3] = Math.cos(angle) * r + rnd();
      pos[i * 3 + 1] = rnd() * 0.35;
      pos[i * 3 + 2] = Math.sin(angle) * r + rnd();
      tmp.copy(cin).lerp(cout, Math.min(1, r / radius * 1.15));
      col.set([tmp.r, tmp.g, tmp.b], i * 3);
      size[i] = 0.5 + Math.random() * 1.1;
      phase[i] = Math.random();
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
    geo.setAttribute('aPhase', new THREE.BufferAttribute(phase, 1));
    const pts = new THREE.Points(geo, pointMaterial(0.25, 0.7));
    pts.frustumCulled = false;

    const holder = new THREE.Group();
    holder.rotation.set(...opts.tilt);
    holder.add(pts);

    // bright core
    const core = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: softGlow,
        color: new THREE.Color(opts.inside),
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    core.scale.setScalar(radius * 0.55);
    const halo = core.clone();
    halo.material = (core.material as THREE.SpriteMaterial).clone();
    (halo.material as THREE.SpriteMaterial).opacity = 0.14;
    halo.scale.setScalar(radius * 1.6);

    const g = new THREE.Group();
    g.add(holder, core, halo);
    place(g, opts.x, opts.y, opts.z);
    spinners.push({ obj: pts, speed: opts.speed });
  };

  const gScale = isSmall ? 0.45 : 1;
  galaxy({
    x: 17, y: -14, z: -40, radius: 11, count: Math.round(26000 * gScale), branches: 4, spin: 0.55,
    inside: '#ffd9a0', outside: '#4f63ff', tilt: [1.05, 0, 0.35], speed: 0.03,
  });
  galaxy({
    x: -15, y: -62, z: -44, radius: 9, count: Math.round(18000 * gScale), branches: 3, spin: 0.7,
    inside: '#ffe6f0', outside: '#9b4dff', tilt: [1.35, 0, -0.5], speed: -0.025,
  });
  galaxy({
    x: 12, y: -96, z: -52, radius: 6, count: Math.round(9000 * gScale), branches: 2, spin: 0.9,
    inside: '#fff1c9', outside: '#2ec4d6', tilt: [0.5, 0, 0.8], speed: 0.04,
  });

  // ---------- Black hole ----------
  {
    const R = 1.7;
    const inner = R * 1.45;
    const outer = R * 4.6;
    const bh = new THREE.Group();

    const horizon = new THREE.Mesh(
      new THREE.SphereGeometry(R, 64, 64),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
    );
    horizon.renderOrder = 0;
    bh.add(horizon);

    const diskMat = () => {
      const m = new THREE.ShaderMaterial({
        vertexShader: DISK_VERT,
        fragmentShader: DISK_FRAG,
        uniforms: {
          uTime: { value: 0 },
          uInner: { value: inner },
          uOuter: { value: outer },
          uOpacity: { value: 1 },
        },
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      });
      diskMaterials.push(m);
      return m;
    };

    // main accretion disk, seen almost edge-on
    const disk = new THREE.Mesh(new THREE.RingGeometry(inner, outer, 192, 8), diskMat());
    disk.rotation.x = -Math.PI / 2 + 0.2;
    disk.renderOrder = 1;
    bh.add(disk);

    // light bent over the top/bottom of the hole (gravitational lensing look)
    const lensed = new THREE.Mesh(new THREE.RingGeometry(inner * 0.95, outer * 0.62, 192, 6), diskMat());
    (lensed.material as THREE.ShaderMaterial).uniforms.uInner.value = inner * 0.95;
    (lensed.material as THREE.ShaderMaterial).uniforms.uOuter.value = outer * 0.62;
    (lensed.material as THREE.ShaderMaterial).uniforms.uOpacity.value = 0.75;
    lensed.position.z = -0.4;
    lensed.renderOrder = 1;
    bh.add(lensed);

    // photon ring
    const ringTex = radialTexture([
      [0, 'rgba(255,200,140,0)'],
      [0.36, 'rgba(255,200,140,0)'],
      [0.42, 'rgba(255,236,200,1)'],
      [0.5, 'rgba(255,170,90,0.35)'],
      [0.75, 'rgba(255,120,40,0.08)'],
      [1, 'rgba(255,120,40,0)'],
    ]);
    textures.push(ringTex);
    const photon = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: ringTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    photon.scale.setScalar(R * 5);
    photon.renderOrder = 2;
    bh.add(photon);

    const glow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: softGlow,
        color: new THREE.Color('#ff8a3a'),
        transparent: true,
        opacity: 0.12,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    glow.scale.setScalar(outer * 3.2);
    bh.add(glow);

    bh.rotation.z = -0.28;
    place(bh, 12, -31, -26);
  }

  const setLayout = (small: boolean) => {
    const f = small ? 0.42 : 1;
    placed.forEach(({ obj, x }) => (obj.position.x = x * f));
  };
  setLayout(isSmall);

  const update = (t: number) => {
    pointMaterials.forEach((m) => (m.uniforms.uTime.value = t));
    diskMaterials.forEach((m) => (m.uniforms.uTime.value = t));
    spinners.forEach(({ obj, speed }) => (obj.rotation.y = t * speed));
  };

  const setPixelRatio = (pr: number) => pointMaterials.forEach((m) => (m.uniforms.uScale.value = 110 * pr));

  const dispose = () => textures.forEach((t) => t.dispose());

  return { group, update, setLayout, setPixelRatio, dispose };
}
