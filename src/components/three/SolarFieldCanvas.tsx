import { useEffect, useRef, useState } from "react";

/**
 * Nền 3D cho hero: một cánh đồng tấm pin trải ra xa, có vệt nắng vàng quét
 * ngang qua và bụi sáng bay lơ lửng.
 *
 * Vài nguyên tắc để không làm nặng trang:
 * - three.js được nạp động (import ở trong effect) nên nằm ở chunk riêng,
 *   không cộng vào bundle chính.
 * - Chỉ chạy khi canvas nằm trong khung nhìn; cuộn qua là dừng vòng lặp.
 * - Bỏ qua hoàn toàn nếu máy không có WebGL, màn hình quá hẹp, hoặc người
 *   dùng bật "giảm chuyển động" — lúc đó chỉ còn lớp nền gradient bên dưới.
 */
export function SolarFieldCanvas({ className = "" }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 640) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const THREE = await import("three");
      if (disposed) return;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: window.devicePixelRatio < 2,
          powerPreference: "high-performance",
        });
      } catch {
        return; // không có WebGL -> giữ nguyên nền tĩnh
      }
      if (disposed) {
        renderer.dispose();
        return;
      }

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(host.clientWidth, host.clientHeight, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const NAVY_DEEP = new THREE.Color("#0b1130");
      scene.fog = new THREE.Fog(NAVY_DEEP, 30, 76);

      const camera = new THREE.PerspectiveCamera(
        42,
        host.clientWidth / Math.max(host.clientHeight, 1),
        0.1,
        160,
      );
      camera.position.set(0, 6.2, 22);
      camera.lookAt(0, 0.4, -6);

      // ── Ánh sáng ──
      scene.add(new THREE.AmbientLight(0x8ea3d8, 0.7));
      const key = new THREE.DirectionalLight(0xffffff, 0.85);
      key.position.set(-8, 14, 10);
      scene.add(key);
      const warm = new THREE.DirectionalLight(0xfbae17, 0.7);
      warm.position.set(10, 6, -4);
      scene.add(warm);

      // ── Cánh đồng tấm pin ──
      // Dùng InstancedMesh: hàng trăm tấm pin nhưng chỉ một lệnh vẽ.
      const COLS = 22;
      const ROWS = 14;
      const COUNT = COLS * ROWS;
      const GAP_X = 2.5;
      const GAP_Z = 3.1;

      const panelGeo = new THREE.BoxGeometry(1.9, 0.07, 1.15);
      const panelMat = new THREE.MeshStandardMaterial({
        color: 0x1b2a63,
        roughness: 0.34,
        metalness: 0.62,
      });
      const panels = new THREE.InstancedMesh(panelGeo, panelMat, COUNT);
      panels.instanceMatrix.setUsage(THREE.StaticDrawUsage);

      const dummy = new THREE.Object3D();
      // Toạ độ x/z của từng tấm, giữ lại để tính vệt nắng mỗi khung hình.
      const px = new Float32Array(COUNT);
      const pz = new Float32Array(COUNT);

      let i = 0;
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const x = (c - (COLS - 1) / 2) * GAP_X;
          const z = -r * GAP_Z + 8;
          px[i] = x;
          pz[i] = z;
          dummy.position.set(x, 0, z);
          dummy.rotation.set(-0.38, 0, 0);  // nghiêng như giàn pin thật
          dummy.updateMatrix();
          panels.setMatrixAt(i, dummy.matrix);
          i++;
        }
      }
      panels.instanceMatrix.needsUpdate = true;

      const baseColor = new THREE.Color("#22316e");
      const sweepColor = new THREE.Color("#fbae17");
      const tmpColor = new THREE.Color();
      for (let k = 0; k < COUNT; k++) panels.setColorAt(k, baseColor);
      scene.add(panels);

      // ── Chân giàn: một mặt phẳng mờ để cánh đồng không "trôi" giữa không trung ──
      const groundMat = new THREE.MeshStandardMaterial({
        color: 0x0d1533,
        roughness: 1,
        metalness: 0,
      });
      const ground = new THREE.Mesh(new THREE.PlaneGeometry(260, 260), groundMat);
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -0.55;
      scene.add(ground);

      // ── Bụi sáng lơ lửng ──
      const DUST = 170;
      const dustPos = new Float32Array(DUST * 3);
      for (let d = 0; d < DUST; d++) {
        dustPos[d * 3] = (Math.random() - 0.5) * 60;
        dustPos[d * 3 + 1] = Math.random() * 13 + 0.6;
        dustPos[d * 3 + 2] = -Math.random() * 46 + 8;
      }
      const dustGeo = new THREE.BufferGeometry();
      dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
      const dustMat = new THREE.PointsMaterial({
        color: 0xfbae17,
        size: 0.1,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
      });
      const dust = new THREE.Points(dustGeo, dustMat);
      scene.add(dust);

      // ── Vòng lặp ──
      const clock = new THREE.Clock();
      let raf = 0;
      let running = false;

      const frame = () => {
        raf = requestAnimationFrame(frame);
        const t = clock.getElapsedTime();

        // Vệt nắng quét chéo qua cánh đồng
        const sweep = ((t * 7) % 96) - 48;
        for (let k = 0; k < COUNT; k++) {
          const d = Math.abs(px[k] * 0.55 + pz[k] * 0.45 - sweep);
          const glow = Math.max(0, 1 - d / 11) ** 1.6;
          tmpColor.copy(baseColor).lerp(sweepColor, glow);
          panels.setColorAt(k, tmpColor);
        }
        if (panels.instanceColor) panels.instanceColor.needsUpdate = true;

        dust.rotation.y = t * 0.02;
        dust.position.y = Math.sin(t * 0.35) * 0.4;

        // Camera trôi rất nhẹ cho khung hình có sức sống
        camera.position.x = Math.sin(t * 0.12) * 1.5;
        camera.position.y = 6.2 + Math.sin(t * 0.18) * 0.28;
        camera.lookAt(0, 0.4, -6);

        renderer.render(scene, camera);
      };

      const start = () => {
        if (running) return;
        running = true;
        clock.start();
        frame();
      };
      const stop = () => {
        if (!running) return;
        running = false;
        cancelAnimationFrame(raf);
      };

      // Chỉ chạy khi hero còn trong khung nhìn
      const io = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? start() : stop()),
        { threshold: 0.01 },
      );
      io.observe(host);

      // Chuyển sang tab khác thì dừng hẳn, quay lại mới chạy tiếp.
      const onVisibility = () => {
        if (document.hidden) stop();
        else start();
      };
      document.addEventListener("visibilitychange", onVisibility);

      const ro = new ResizeObserver(() => {
        const w = host.clientWidth;
        const h = Math.max(host.clientHeight, 1);
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      });
      ro.observe(host);

      setReady(true);

      cleanup = () => {
        stop();
        io.disconnect();
        ro.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
        panelGeo.dispose();
        panelMat.dispose();
        groundMat.dispose();
        ground.geometry.dispose();
        dustGeo.dispose();
        dustMat.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ${
        ready ? "opacity-100" : "opacity-0"
      } ${className}`}
    />
  );
}
