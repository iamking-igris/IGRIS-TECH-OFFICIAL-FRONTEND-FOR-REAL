import { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";
import {
  WORLD_COASTLINES,
  PRECOMPUTED_LAND_DOTS,
  PRECOMPUTED_OCEAN_DOTS,
} from "@/components/hero/world-land-data";

// Intentional IGRIS Tech brand telemetry micro-labels
export const GLOBE_LABELS = {
  topLeft: "SYSTEM / IGRIS",
  topRight: "NETWORK / GLOBAL",
  bottomLeft: "BUILD / EVOLVE",
  bottomRight: "IDEAS → IMPACT",
} as const;

// Strategic Global Network Hubs
interface HubLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

const NETWORK_HUBS: HubLocation[] = [
  { id: "LHR", name: "London", lat: 51.5074, lng: -0.1278 },
  { id: "JFK", name: "New York", lat: 40.7128, lng: -74.006 },
  { id: "SFO", name: "San Francisco", lat: 37.7749, lng: -122.4194 },
  { id: "HND", name: "Tokyo", lat: 35.6762, lng: 139.6503 },
  { id: "SIN", name: "Singapore", lat: 1.3521, lng: 103.8198 },
  { id: "FRA", name: "Frankfurt", lat: 50.1109, lng: 8.6821 },
  { id: "DXB", name: "Dubai", lat: 25.2048, lng: 55.2708 },
  { id: "SYD", name: "Sydney", lat: -33.8688, lng: 151.2093 },
  { id: "GRU", name: "São Paulo", lat: -23.5505, lng: -46.6333 },
];

// Sparse, intentional routes connecting major regions
const CONNECTION_ROUTES: [string, string][] = [
  ["LHR", "JFK"],
  ["JFK", "SFO"],
  ["SFO", "HND"],
  ["HND", "SIN"],
  ["SIN", "DXB"],
  ["DXB", "FRA"],
  ["FRA", "LHR"],
  ["JFK", "GRU"],
  ["SIN", "SYD"],
];

// Helper: Convert Lat/Lng to 3D Sphere Coordinates
function lngLatToVector3(
  lng: number,
  lat: number,
  radius: number,
  out?: THREE.Vector3,
): THREE.Vector3 {
  const latRad = lat * (Math.PI / 180);
  const lngRad = lng * (Math.PI / 180);
  const x = radius * Math.cos(latRad) * Math.sin(lngRad);
  const y = radius * Math.sin(latRad);
  const z = radius * Math.cos(latRad) * Math.cos(lngRad);
  if (out) {
    out.set(x, y, z);
    return out;
  }
  return new THREE.Vector3(x, y, z);
}

// Helper: Create 3D Arc Curve between two 3D points
function createCurvedArc(
  p1: THREE.Vector3,
  p2: THREE.Vector3,
  radius: number,
  pointsCount = 48,
): { curve: THREE.QuadraticBezierCurve3; points: THREE.Vector3[] } {
  const distance = p1.distanceTo(p2);
  const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
  const midLength = mid.length();
  // Elevate mid-point proportionally to distance
  const elevation = radius + Math.min(distance * 0.22, radius * 0.32);
  if (midLength > 0.001) {
    mid.normalize().multiplyScalar(elevation);
  } else {
    mid.set(0, elevation, 0);
  }

  const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
  const points = curve.getPoints(pointsCount);
  return { curve, points };
}

// Shaders for True Spherical Projection with Smooth Limb Falloff & Backface Culling
const sphericalLineVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vNormal = normalize(normalMatrix * normalize(position));
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const sphericalLineFragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vec3 viewDir = normalize(vViewPosition);
    float dotNV = dot(vNormal, viewDir);
    if (dotNV <= 0.02) discard; // Cull back hemisphere cleanly
    
    // Smooth falloff toward the spherical limb (edges foreshorten & fade naturally)
    float alpha = uOpacity * smoothstep(0.02, 0.45, dotNV);
    gl_FragColor = vec4(uColor, alpha);
  }
`;

const sphericalPointVertexShader = `
  uniform float uSize;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vNormal = normalize(normalMatrix * normalize(position));
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_PointSize = uSize;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const sphericalPointFragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vec3 viewDir = normalize(vViewPosition);
    float dotNV = dot(vNormal, viewDir);
    if (dotNV <= 0.03) discard; // Cull back hemisphere

    // Circular point styling
    vec2 coord = gl_PointCoord - vec2(0.5);
    if (length(coord) > 0.5) discard;

    float alpha = uOpacity * smoothstep(0.03, 0.5, dotNV);
    gl_FragColor = vec4(uColor, alpha);
  }
`;

const sphereCoreVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const sphereCoreFragmentShader = `
  uniform vec3 uBaseColor;
  uniform vec3 uRimColor;
  uniform float uRimStrength;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vec3 viewDir = normalize(vViewPosition);
    float dotNV = dot(vNormal, viewDir);
    if (dotNV <= 0.0) discard;

    // Atmospheric rim shading: highlights the 3D spherical boundary without a harsh ring
    float rim = pow(1.0 - dotNV, 3.2) * uRimStrength;
    vec3 color = mix(uBaseColor, uRimColor, rim);
    float alpha = 0.94 + rim * 0.06;
    gl_FragColor = vec4(color, alpha);
  }
`;

export function GlobalNetworkGlobe({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Dimensions & DPR
    let width = container.clientWidth || 400;
    let height = container.clientHeight || 400;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1500);
    // Position camera with comfortable breathing room around the sphere
    camera.position.z = 270;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);

    // Reduced scale: GLOBE_RADIUS = 76 gives ample negative space on all 4 sides
    const GLOBE_RADIUS = 76;
    const globeGroup = new THREE.Group();
    // Default initial angle displaying Europe, Atlantic, Africa and Americas
    globeGroup.rotation.x = 0.22;
    globeGroup.rotation.y = 0.38;
    scene.add(globeGroup);

    // 1. Dark Atmospheric Spherical Core (Provides true occlusion & subtle rim definition)
    const coreGeometry = new THREE.SphereGeometry(GLOBE_RADIUS * 0.996, 48, 48);
    const coreMaterial = new THREE.ShaderMaterial({
      vertexShader: sphereCoreVertexShader,
      fragmentShader: sphereCoreFragmentShader,
      uniforms: {
        uBaseColor: { value: new THREE.Color(0x070709) },
        uRimColor: { value: new THREE.Color(0xf3f3f0) },
        uRimStrength: { value: 0.16 }, // Delicate atmospheric rim
      },
      transparent: true,
      depthWrite: true,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    globeGroup.add(coreMesh);

    // 2. Faint Latitude & Longitude Technical Wireframe Grids
    const gridGroup = new THREE.Group();
    globeGroup.add(gridGroup);

    const gridMaterial = new THREE.ShaderMaterial({
      vertexShader: sphericalLineVertexShader,
      fragmentShader: sphericalLineFragmentShader,
      uniforms: {
        uColor: { value: new THREE.Color(0x5c5c58) }, // Faint grey
        uOpacity: { value: 0.2 }, // Very subtle background weight
      },
      transparent: true,
      depthTest: true,
    });

    const equatorMaterial = new THREE.ShaderMaterial({
      vertexShader: sphericalLineVertexShader,
      fragmentShader: sphericalLineFragmentShader,
      uniforms: {
        uColor: { value: new THREE.Color(0x8d8d88) },
        uOpacity: { value: 0.3 },
      },
      transparent: true,
      depthTest: true,
    });

    const latAngles = [-60, -40, -20, 0, 20, 40, 60];
    latAngles.forEach((lat) => {
      const latRad = lat * (Math.PI / 180);
      const r = GLOBE_RADIUS * Math.cos(latRad);
      const y = GLOBE_RADIUS * Math.sin(latRad);
      const ringPts: THREE.Vector3[] = [];
      const segments = 64;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        ringPts.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r));
      }
      const geom = new THREE.BufferGeometry().setFromPoints(ringPts);
      const isEquator = lat === 0;
      gridGroup.add(new THREE.Line(geom, isEquator ? equatorMaterial : gridMaterial));
    });

    const lonAngles = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
    lonAngles.forEach((lon) => {
      const meridianPts: THREE.Vector3[] = [];
      const segments = 64;
      for (let i = 0; i <= segments; i++) {
        const lat = -90 + (i / segments) * 180;
        meridianPts.push(lngLatToVector3(lon, lat, GLOBE_RADIUS));
      }
      const geom = new THREE.BufferGeometry().setFromPoints(meridianPts);
      const isPrime = lon === 0;
      gridGroup.add(new THREE.Line(geom, isPrime ? equatorMaterial : gridMaterial));
    });

    // 3. Simplified, Geographically Recognizable Coastlines
    // Subdued visual hierarchy (Tertiary - NOT shouting white)
    const coastGroup = new THREE.Group();
    globeGroup.add(coastGroup);

    const coastMaterial = new THREE.ShaderMaterial({
      vertexShader: sphericalLineVertexShader,
      fragmentShader: sphericalLineFragmentShader,
      uniforms: {
        uColor: { value: new THREE.Color(0x8d8d88) }, // Restrained muted grey
        uOpacity: { value: 0.42 }, // Subtle technical weight
      },
      transparent: true,
      depthTest: true,
    });

    WORLD_COASTLINES.forEach((ring) => {
      if (ring.length < 3) return;
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i < ring.length; i++) {
        const [lng, lat] = ring[i];
        pts.push(lngLatToVector3(lng, lat, GLOBE_RADIUS * 1.002));
      }
      const geom = new THREE.BufferGeometry().setFromPoints(pts);
      coastGroup.add(new THREE.Line(geom, coastMaterial));
    });

    // 4. Precomputed Land & Ocean Dot Matrix (Spherical Particle Field)
    const landPositions: number[] = [];
    PRECOMPUTED_LAND_DOTS.forEach(([x, y, z]) => {
      const r = GLOBE_RADIUS * 1.004;
      landPositions.push(x * r, y * r, z * r);
    });

    const landGeom = new THREE.BufferGeometry();
    landGeom.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(landPositions, 3),
    );
    const landPointMaterial = new THREE.ShaderMaterial({
      vertexShader: sphericalPointVertexShader,
      fragmentShader: sphericalPointFragmentShader,
      uniforms: {
        uColor: { value: new THREE.Color(0xbebeb8) }, // Soft off-white
        uOpacity: { value: 0.48 },
        uSize: { value: 2.0 },
      },
      transparent: true,
      depthTest: true,
    });
    const landPoints = new THREE.Points(landGeom, landPointMaterial);
    globeGroup.add(landPoints);

    const oceanPositions: number[] = [];
    PRECOMPUTED_OCEAN_DOTS.forEach(([x, y, z]) => {
      const r = GLOBE_RADIUS * 1.004;
      oceanPositions.push(x * r, y * r, z * r);
    });

    const oceanGeom = new THREE.BufferGeometry();
    oceanGeom.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(oceanPositions, 3),
    );
    const oceanPointMaterial = new THREE.ShaderMaterial({
      vertexShader: sphericalPointVertexShader,
      fragmentShader: sphericalPointFragmentShader,
      uniforms: {
        uColor: { value: new THREE.Color(0x5c5c58) }, // Faint graphite
        uOpacity: { value: 0.14 },
        uSize: { value: 1.2 },
      },
      transparent: true,
      depthTest: true,
    });
    const oceanPoints = new THREE.Points(oceanGeom, oceanPointMaterial);
    globeGroup.add(oceanPoints);

    // 5. Global Network Hub Nodes (Secondary Visual Anchor)
    const hubMap = new Map<string, { hub: HubLocation; position: THREE.Vector3 }>();
    const hubGroup = new THREE.Group();
    globeGroup.add(hubGroup);

    const hubPositions: number[] = [];
    const pulseRings: { mesh: THREE.Line; baseScale: number; phase: number }[] = [];

    NETWORK_HUBS.forEach((hub, idx) => {
      const pos = lngLatToVector3(hub.lng, hub.lat, GLOBE_RADIUS * 1.008);
      hubMap.set(hub.id, { hub, position: pos });
      hubPositions.push(pos.x, pos.y, pos.z);

      // Delicate expanding pulse ring for selected hubs
      const ringPts: THREE.Vector3[] = [];
      const ringSegs = 20;
      const ringR = 2.2;
      for (let i = 0; i <= ringSegs; i++) {
        const th = (i / ringSegs) * Math.PI * 2;
        ringPts.push(new THREE.Vector3(Math.cos(th) * ringR, Math.sin(th) * ringR, 0));
      }
      const ringGeom = new THREE.BufferGeometry().setFromPoints(ringPts);
      const ringMat = new THREE.LineBasicMaterial({
        color: 0xf3f3f0,
        transparent: true,
        opacity: 0.4,
      });
      const ringMesh = new THREE.Line(ringGeom, ringMat);
      ringMesh.position.copy(pos);
      ringMesh.lookAt(new THREE.Vector3(0, 0, 0));
      hubGroup.add(ringMesh);

      pulseRings.push({
        mesh: ringMesh,
        baseScale: 1,
        phase: (idx * 0.6) % Math.PI,
      });
    });

    // Hub node core points
    const hubGeom = new THREE.BufferGeometry();
    hubGeom.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(hubPositions, 3),
    );
    const hubPointMaterial = new THREE.ShaderMaterial({
      vertexShader: sphericalPointVertexShader,
      fragmentShader: sphericalPointFragmentShader,
      uniforms: {
        uColor: { value: new THREE.Color(0xf3f3f0) }, // Crisp white
        uOpacity: { value: 0.95 },
        uSize: { value: 3.8 },
      },
      transparent: true,
      depthTest: true,
    });
    const hubPoints = new THREE.Points(hubGeom, hubPointMaterial);
    globeGroup.add(hubPoints);

    // 6. Global Connection Paths (3D Elevated Geodesic Arcs)
    const arcGroup = new THREE.Group();
    globeGroup.add(arcGroup);

    interface ActiveArc {
      curve: THREE.QuadraticBezierCurve3;
      line: THREE.Line;
      material: THREE.LineBasicMaterial;
      from: HubLocation;
      to: HubLocation;
    }

    const activeArcs: ActiveArc[] = [];
    CONNECTION_ROUTES.forEach(([fromId, toId]) => {
      const fromObj = hubMap.get(fromId);
      const toObj = hubMap.get(toId);
      if (!fromObj || !toObj) return;

      const { curve, points } = createCurvedArc(
        fromObj.position,
        toObj.position,
        GLOBE_RADIUS,
        40,
      );

      const geom = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({
        color: 0xf3f3f0,
        transparent: true,
        opacity: 0.32,
      });
      const line = new THREE.Line(geom, mat);
      arcGroup.add(line);

      activeArcs.push({
        curve,
        line,
        material: mat,
        from: fromObj.hub,
        to: toObj.hub,
      });
    });

    // Traveling Data Packets (Rare, precise signals)
    interface DataPacket {
      arcIndex: number;
      progress: number;
      speed: number;
      mesh: THREE.Mesh;
      active: boolean;
      delay: number;
    }

    const packetCount = 4;
    const packets: DataPacket[] = [];
    const packetGeom = new THREE.SphereGeometry(1.3, 8, 8);
    const packetMat = new THREE.MeshBasicMaterial({
      color: 0xf3f3f0,
      transparent: true,
      opacity: 0.95,
    });

    for (let i = 0; i < packetCount; i++) {
      const mesh = new THREE.Mesh(packetGeom, packetMat.clone());
      globeGroup.add(mesh);
      mesh.visible = false;
      packets.push({
        arcIndex: i % activeArcs.length,
        progress: 0,
        speed: 0.003 + (i % 2) * 0.0015,
        mesh,
        active: true,
        delay: i * 90,
      });
    }

    // 7. Interaction & Motion Physics State
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;
    let targetRotationX = 0.22;
    let targetRotationY = 0.38;
    let rotationVelocityX = 0;
    let rotationVelocityY = 0.001; // Ultra-slow autonomous drift
    let parallaxX = 0;
    let parallaxY = 0;
    let targetParallaxX = 0;
    let targetParallaxY = 0;

    let isVisible = true;
    let rafId = 0;
    let frame = 0;

    // Render loop
    function animate() {
      if (!isVisible) return;

      frame++;
      const time = frame * 0.018;

      if (!reducedMotion) {
        // Autonomous slow drift or smooth drag decay
        if (!isDragging) {
          rotationVelocityY += (0.001 - rotationVelocityY) * 0.03;
          rotationVelocityX += (0 - rotationVelocityX) * 0.05;

          targetRotationY += rotationVelocityY;
          targetRotationX += rotationVelocityX;

          targetRotationX = Math.max(-0.5, Math.min(0.5, targetRotationX));
        }

        // Smooth rotation interpolation
        globeGroup.rotation.y += (targetRotationY - globeGroup.rotation.y) * 0.08;
        globeGroup.rotation.x += (targetRotationX - globeGroup.rotation.x) * 0.08;

        // Subtle parallax response
        parallaxX += (targetParallaxX - parallaxX) * 0.05;
        parallaxY += (targetParallaxY - parallaxY) * 0.05;
        camera.position.x = parallaxX * 18;
        camera.position.y = -parallaxY * 18;
        camera.lookAt(0, 0, 0);

        // Animate Hub Pulse Rings
        pulseRings.forEach((ring) => {
          const scale = 1 + ((Math.sin(time * 1.5 + ring.phase) + 1) * 0.5) * 1.4;
          const alpha = Math.max(0, 0.4 * (1 - (scale - 1) / 1.4));
          ring.mesh.scale.set(scale, scale, scale);
          (ring.mesh.material as THREE.LineBasicMaterial).opacity = alpha;
        });

        // Animate Data Packets
        packets.forEach((packet) => {
          if (packet.delay > 0) {
            packet.delay--;
            return;
          }

          const arc = activeArcs[packet.arcIndex];
          if (!arc) return;

          packet.progress += packet.speed;
          if (packet.progress >= 1) {
            packet.progress = 0;
            packet.delay = Math.floor(70 + Math.random() * 140);
            packet.arcIndex = Math.floor(Math.random() * activeArcs.length);
            packet.mesh.visible = false;
          } else {
            packet.mesh.visible = true;
            const pt = arc.curve.getPoint(packet.progress);
            packet.mesh.position.copy(pt);
            const fade = Math.sin(packet.progress * Math.PI);
            (packet.mesh.material as THREE.MeshBasicMaterial).opacity =
              0.3 + 0.65 * fade;
          }
        });
      }

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    }

    // Pointer / Mouse Interactivity
    function onPointerDown(e: PointerEvent) {
      isDragging = true;
      previousPointerX = e.clientX;
      previousPointerY = e.clientY;
      rotationVelocityX = 0;
      rotationVelocityY = 0;
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetParallaxX = Math.max(-1, Math.min(1, nx)) * 0.2;
      targetParallaxY = Math.max(-1, Math.min(1, ny)) * 0.2;

      if (isDragging) {
        const deltaX = e.clientX - previousPointerX;
        const deltaY = e.clientY - previousPointerY;

        rotationVelocityY = deltaX * 0.005;
        rotationVelocityX = deltaY * 0.005;

        targetRotationY += rotationVelocityY;
        targetRotationX += rotationVelocityX;

        previousPointerX = e.clientX;
        previousPointerY = e.clientY;
      }
    }

    function onPointerUp() {
      isDragging = false;
    }

    function onResize() {
      if (!container || !renderer) return;
      width = container.clientWidth || 400;
      height = container.clientHeight || 400;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    // Event Listeners
    canvas.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = Boolean(entry?.isIntersecting);
      if (isVisible) {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(rafId);
      }
    });
    intersectionObserver.observe(container);

    // Initial render
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);

      // Clean disposal
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Line || obj instanceof THREE.Points) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative flex h-full w-full select-none items-center justify-center overflow-hidden p-3 sm:p-4",
        className,
      )}
      aria-label="Interactive 3D IGRIS Global Network Globe"
    >
      {/* Subtle Atmospheric Radial Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(243,243,240,0.03)_0%,transparent_65%)]" />

      {/* WebGL 3D Globe Canvas */}
      <canvas
        ref={canvasRef}
        className="relative z-10 block h-full w-full cursor-grab touch-pan-y active:cursor-grabbing"
      />

      {/* Subtle Minimalist HUD Telemetry Annotations */}
      <div className="pointer-events-none absolute inset-x-4 top-3 sm:inset-x-5 sm:top-4 flex items-center justify-between z-20 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.14em] sm:tracking-[0.18em] text-faint">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-1 w-1 bg-ink/60 rounded-full animate-pulse" />
          {GLOBE_LABELS.topLeft}
        </span>
        <span className="text-faint/70">
          {GLOBE_LABELS.topRight}
        </span>
      </div>

      <div className="pointer-events-none absolute inset-x-4 bottom-3 sm:inset-x-5 sm:bottom-4 flex items-center justify-between z-20 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.14em] sm:tracking-[0.18em] text-faint">
        <span className="text-faint/80">
          {GLOBE_LABELS.bottomLeft}
        </span>
        <span className="text-faint/70">
          {GLOBE_LABELS.bottomRight}
        </span>
      </div>
    </div>
  );
}
