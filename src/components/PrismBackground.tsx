import React, { useEffect, useRef } from 'react';

// For PrismBackground
interface PrismBackgroundProps {
  glow?: number;
  noise?: number;
  hueShift?: number;
}

export const PrismBackground: React.FC<PrismBackgroundProps> = ({ glow = 0.5, noise = 0.5, hueShift = 0.0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamic import to avoid SSR issues if used in frameworks like Next.js mapped to Vite
    let isTerminated = false;
    let renderer: any, gl: any, scene: any, camera: any, mesh: any, program: any;

    const initOGL = async () => {
      try {
        const { Renderer, Camera, Geometry, Program, Mesh } = await import('ogl');

        if (isTerminated) return;

        renderer = new Renderer({ alpha: true, width: window.innerWidth, height: window.innerHeight });
        gl = renderer.gl;
        if (containerRef.current) {
          containerRef.current.appendChild(gl.canvas);
        }

        camera = new Camera(gl, { fov: 45 });
        camera.position.z = 2;

        const vertex = `
          attribute vec2 position;
          varying vec2 vUv;
          void main() {
              vUv = position * 0.5 + 0.5;
              gl_Position = vec4(position, 0.0, 1.0);
          }
        `;

        const fragment = `
          precision highp float;
          uniform float uTime;
          uniform float uGlow;
          uniform float uNoise;
          uniform float uHueShift;
          varying vec2 vUv;
          
          float random(vec2 st) {
              return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
          }
          
          void main() {
              vec2 uv = vUv;
              
              // Base colors
              vec3 color1 = vec3(0.04, 0.04, 0.1); 
              vec3 color2 = vec3(0.1, 0.02, 0.15); // purple/pink influence
              vec3 color3 = vec3(0.02, 0.1, 0.15); // blue/teal influence
              
              float dist = length(uv - 0.5);
              
              vec3 col = mix(color1, color2, sin(uTime * 0.2 + uv.x * 3.0) * 0.5 + 0.5);
              col = mix(col, color3, cos(uTime * 0.3 + uv.y * 3.0) * 0.5 + 0.5);
              
              col *= uGlow * (1.0 - dist);
              
              col += (random(uv * uTime) - 0.5) * uNoise * 0.05;

              gl_FragColor = vec4(col, 1.0);
          }
        `;

        const geometry = new Geometry(gl, {
          position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) } // A single triangle covering the screen
        });

        program = new Program(gl, {
          vertex,
          fragment,
          uniforms: {
            uTime: { value: 0 },
            uGlow: { value: glow },
            uNoise: { value: noise },
            uHueShift: { value: hueShift }
          }
        });

        mesh = new Mesh(gl, { geometry, program });

        const resize = () => {
          renderer.setSize(window.innerWidth, window.innerHeight);
          camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
        };
        window.addEventListener('resize', resize);
        resize();

        const update = (t: number) => {
          if (isTerminated) return;
          requestAnimationFrame(update);
          program.uniforms.uTime.value = t * 0.001;
          renderer.render({ scene: mesh, camera }); // mesh acts as scene here for a simple triangle
        };
        requestAnimationFrame(update);

        return () => {
          window.removeEventListener('resize', resize);
        };
      } catch (e) {
        console.error("Failed to inject Prism Background OGL", e);
      }
    };

    initOGL();

    return () => {
      isTerminated = true;
      if (containerRef.current && gl && gl.canvas) {
        containerRef.current.removeChild(gl.canvas);
      }
    };
  }, [glow, hueShift, noise]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[-1] pointer-events-none bg-black overflow-hidden"
    />
  );
};

export default PrismBackground;
