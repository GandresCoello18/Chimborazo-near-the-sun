<script lang="ts">
  import { onMount } from 'svelte';
  import { CHIMBORAZO, EVEREST, EARTH_RADIUS_EQUATORIAL } from '../utils/constants';

  let earthElement: HTMLDivElement;
  let rotationX = 0;
  let rotationY = 0;
  let isDragging = false;
  let lastMouseX = 0;
  let lastMouseY = 0;
  let showRadialLines = false;
  let autoDemoMode = true;

  // Convert lat/lon to CSS 3D position on an oblate spheroid
  function latLonToCSS3D(
    lat: number,
    lon: number,
    baseRadius: number = 100
  ): { x: number; y: number; z: number } {
    // Calculate radius at this latitude (accounting for Earth's oblateness)
    const latRad = lat * (Math.PI / 180);
    const flattening = 0.00335; // Earth's actual flattening
    const radiusAtLat = baseRadius * (1 - flattening * Math.sin(latRad) * Math.sin(latRad));

    // Convert to spherical coordinates
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    // Calculate 3D position with adjusted radius
    const x = radiusAtLat * Math.sin(phi) * Math.cos(theta);
    const y = radiusAtLat * Math.cos(phi);
    const z = radiusAtLat * Math.sin(phi) * Math.sin(theta);

    return { x, y, z };
  }

  // Calculate distance from Earth center (including height)
  function getDistanceFromCenter(lat: number, heightMeters: number): number {
    const latRad = lat * (Math.PI / 180);
    const earthRadiusKm =
      EARTH_RADIUS_EQUATORIAL * (1 - 0.00335 * Math.sin(latRad) * Math.sin(latRad));
    const heightKm = heightMeters / 1000;
    return earthRadiusKm + heightKm;
  }

  const chimborazoDistance = getDistanceFromCenter(CHIMBORAZO.lat, CHIMBORAZO.height);
  const everestDistance = getDistanceFromCenter(EVEREST.lat, EVEREST.height);

  // Scale factor for visualization
  const scaleFactor = 100 / EARTH_RADIUS_EQUATORIAL;
  const earthRadiusPx = 100;
  const chimborazoRadiusPx = chimborazoDistance * scaleFactor;
  const everestRadiusPx = everestDistance * scaleFactor;

  // Positions on Earth surface
  const chimborazoPos = latLonToCSS3D(CHIMBORAZO.lat, CHIMBORAZO.lon, earthRadiusPx);
  const everestPos = latLonToCSS3D(EVEREST.lat, EVEREST.lon, earthRadiusPx);

  // Heights in pixels (more exaggerated for visibility)
  const heightScale = 1.5; // Make volcanoes more visible
  const chimborazoHeightPx = (CHIMBORAZO.height / 1000) * heightScale;
  const everestHeightPx = (EVEREST.height / 1000) * heightScale;

  function handleMouseDown(e: MouseEvent) {
    isDragging = true;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    autoDemoMode = false; // Stop auto demo when user interacts
  }

  function handleMouseMove(e: MouseEvent) {
    if (!isDragging) return;

    const deltaX = e.clientX - lastMouseX;
    const deltaY = e.clientY - lastMouseY;

    rotationY += deltaX * 0.5;
    rotationX -= deltaY * 0.5;

    lastMouseX = e.clientX;
    lastMouseY = e.clientY;

    updateRotation();
    updateLabelOrientation();
  }

  function handleMouseUp() {
    isDragging = false;
  }

  function updateRotation() {
    if (earthElement) {
      earthElement.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

      // Actualizar orientación de etiquetas basado en la rotación
      updateLabelOrientation();
    }
  }

  function updateLabelOrientation() {
    // Calcular la posición 3D después de la rotación para determinar si está en el lado opuesto
    const everestContainer = document.querySelector('.everest') as HTMLElement;

    if (everestContainer) {
      // Calcular la rotación en radianes
      const rotationYRad = (rotationY * Math.PI) / 180;

      // Calcular la posición después de la rotación Y
      // La rotación Y gira alrededor del eje vertical (eje Y)
      const cosY = Math.cos(rotationYRad);
      const sinY = Math.sin(rotationYRad);

      // Rotar la posición original de Everest alrededor del eje Y
      // Para rotación Y: x' = x*cos(θ) - z*sin(θ), z' = x*sin(θ) + z*cos(θ)
      const rotatedZ = everestPos.x * sinY + everestPos.z * cosY;

      const everestLabel = everestContainer.querySelector('.volcano-label') as HTMLElement;
      const everestBadge = everestContainer.querySelector('.distance-badge') as HTMLElement;

      if (everestLabel && everestBadge) {
        // En CSS 3D, cuando un elemento está en el lado opuesto (z negativo después de rotación),
        // se ve al revés. Necesitamos invertir el texto para corregirlo.
        // La posición inicial de Everest tiene z negativo, así que probamos ambas condiciones
        // Si z rotado es negativo, está detrás, puede necesitar inversión
        // Si z rotado es positivo, está al frente, normal
        // Probamos invirtiendo la lógica: si z > 0, invertir (porque CSS ya lo muestra al revés)
        const shouldInvert = rotatedZ > 0;

        if (shouldInvert) {
          everestLabel.style.transform = 'translateX(-50%) scaleX(-1)';
          everestBadge.style.transform = 'translateX(-50%) scaleX(-1)';
        } else {
          everestLabel.style.transform = 'translateX(-50%) scaleX(1)';
          everestBadge.style.transform = 'translateX(-50%) scaleX(1)';
        }
      }
    }
  }

  function handleWheel(e: WheelEvent) {
    e.preventDefault();
    const currentTransform = earthElement?.style.transform || '';
    const scaleMatch = currentTransform.match(/scale\(([^)]+)\)/);
    const scale = scaleMatch ? parseFloat(scaleMatch[1]) : 1;
    const newScale = scale + (e.deltaY > 0 ? -0.1 : 0.1);
    const clampedScale = Math.max(0.5, Math.min(2, newScale));

    if (earthElement) {
      const baseTransform = currentTransform.replace(/scale\([^)]+\)/, '').trim();
      earthElement.style.transform = `${baseTransform} scale(${clampedScale})`.trim();
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      rotationY -= 5;
      updateRotation();
      updateLabelOrientation();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      rotationY += 5;
      updateRotation();
      updateLabelOrientation();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      rotationX -= 5;
      updateRotation();
      updateLabelOrientation();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      rotationX += 5;
      updateRotation();
      updateLabelOrientation();
    }
  }

  function selectMountain(_mountain: 'chimborazo' | 'everest') {
    showRadialLines = !showRadialLines;
  }

  // Auto demo sequence
  onMount(() => {
    updateRotation();
    window.addEventListener('keydown', handleKeyDown);

    // Auto-rotate
    const rotateInterval = setInterval(() => {
      if (!isDragging && autoDemoMode) {
        rotationY += 0.5;
        updateRotation();
      }
    }, 50);

    // Actualizar orientación de etiquetas periódicamente
    const labelUpdateInterval = setInterval(() => {
      updateLabelOrientation();
    }, 100);

    return () => {
      clearInterval(rotateInterval);
      clearInterval(labelUpdateInterval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
</script>

<div
  class="css-3d-container"
  role="application"
  aria-label="Visualización 3D interactiva de la Tierra mostrando Chimborazo y Everest"
  tabindex="0"
  on:mousedown={handleMouseDown}
  on:mousemove={handleMouseMove}
  on:mouseup={handleMouseUp}
  on:mouseleave={handleMouseUp}
  on:wheel={handleWheel}
  on:keydown={handleKeyDown}
>
  <!-- Main Earth Scene -->
  <div class="scene-3d">
    <!-- Sun -->
    <div class="sun">
      <div class="sun-core"></div>
      <div class="sun-glow"></div>
      <div class="sun-label">☀️ Sol</div>
    </div>

    <div class="earth" bind:this={earthElement}>
      <!-- Earth sphere with realistic texture -->
      <div class="earth-sphere">
        <!-- Continents simulation with gradients -->
        <div class="continent americas"></div>
        <div class="continent africa"></div>
        <div class="continent asia"></div>
        <div class="continent europe"></div>
        <div class="continent oceania"></div>
        <!-- Equator line -->
        <div class="equator-line"></div>
        <!-- Grid lines for better 3D perception -->
        <div class="grid-line horizontal-1"></div>
        <div class="grid-line horizontal-2"></div>
        <div class="grid-line vertical-1"></div>
        <div class="grid-line vertical-2"></div>
      </div>

      <!-- Earth center point -->
      <div class="earth-center"></div>

      <!-- Chimborazo Volcano (larger and more visible) -->
      <div
        class="volcano-container chimborazo"
        style="transform: translate3d({chimborazoPos.x}px, {chimborazoPos.y}px, {chimborazoPos.z}px);"
        on:click={() => selectMountain('chimborazo')}
        on:keydown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selectMountain('chimborazo');
          }
        }}
        role="button"
        aria-label="Chimborazo - Click para más información"
        tabindex="0"
      >
        {#if showRadialLines}
          <div class="radial-line chimborazo-line" style="height: {chimborazoRadiusPx}px;"></div>
        {/if}
        <!-- Larger volcano cone -->
        <div
          class="volcano-cone chimborazo-cone"
          style="height: {chimborazoHeightPx}px; width: {chimborazoHeightPx * 0.4}px;"
        >
          <div class="volcano-base"></div>
          <div class="volcano-middle"></div>
          <div class="volcano-peak"></div>
          <div class="volcano-smoke"></div>
        </div>
        <div class="volcano-label">🌋 Chimborazo</div>
        {#if showRadialLines}
          <div class="distance-badge chimborazo-badge">
            {chimborazoDistance.toFixed(1)} km
          </div>
        {/if}
      </div>

      <!-- Mount Everest (larger and more visible) -->
      <div
        class="volcano-container everest"
        style="transform: translate3d({everestPos.x}px, {everestPos.y}px, {everestPos.z}px);"
        on:click={() => selectMountain('everest')}
        on:keydown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selectMountain('everest');
          }
        }}
        role="button"
        aria-label="Mount Everest - Click para más información"
        tabindex="0"
      >
        {#if showRadialLines}
          <div class="radial-line everest-line" style="height: {everestRadiusPx}px;"></div>
        {/if}
        <!-- Larger mountain cone -->
        <div
          class="volcano-cone everest-cone"
          style="height: {everestHeightPx}px; width: {everestHeightPx * 0.4}px;"
        >
          <div class="volcano-base"></div>
          <div class="volcano-middle"></div>
          <div class="volcano-peak"></div>
          <div class="mountain-snow"></div>
        </div>
        <div class="volcano-label">🏔️ Everest</div>
        {#if showRadialLines}
          <div class="distance-badge everest-badge">
            {everestDistance.toFixed(1)} km
          </div>
        {/if}
      </div>
    </div>
  </div>

  <div class="instructions">
    <p>🖱️ Arrastra para rotar • 🔍 Rueda del mouse para zoom • 👆 Click en los volcanes</p>
  </div>
</div>

<style>
  .css-3d-container {
    width: 100%;
    height: 100vh;
    background: radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 50%, #0f0f1e 100%);
    position: relative;
    overflow: hidden;
    cursor: grab;
    user-select: none;
  }

  .css-3d-container:active {
    cursor: grabbing;
  }

  /* Main Scene */
  .scene-3d {
    width: 100%;
    height: 100%;
    perspective: 1500px;
    perspective-origin: center center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transform-style: preserve-3d;
  }

  /* Sun */
  .sun {
    position: absolute;
    width: 120px;
    height: 120px;
    left: 50%;
    top: 50%;
    margin-left: -60px;
    margin-top: -60px;
    transform: translate3d(350px, -150px, -200px);
    transform-style: preserve-3d;
    z-index: 1;
  }

  .sun-core {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: radial-gradient(
      circle at 30% 30%,
      #ffeb3b 0%,
      #ffc107 30%,
      #ff9800 60%,
      #ff5722 100%
    );
    box-shadow:
      0 0 60px rgba(255, 235, 59, 0.9),
      0 0 120px rgba(255, 193, 7, 0.7),
      0 0 180px rgba(255, 152, 0, 0.5),
      inset -20px -20px 40px rgba(255, 87, 34, 0.3);
    position: relative;
    animation:
      sunRotate 20s linear infinite,
      sunPulse 3s ease-in-out infinite;
  }

  .sun-glow {
    position: absolute;
    width: 150%;
    height: 150%;
    left: -25%;
    top: -25%;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(255, 235, 59, 0.3) 0%,
      rgba(255, 193, 7, 0.2) 40%,
      transparent 70%
    );
    animation: sunGlow 4s ease-in-out infinite;
    pointer-events: none;
  }

  .sun-label {
    position: absolute;
    top: -35px;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    white-space: nowrap;
    background: rgba(0, 0, 0, 0.85);
    padding: 6px 12px;
    border-radius: 6px;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    pointer-events: none;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  @keyframes sunRotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes sunPulse {
    0%,
    100% {
      transform: scale(1);
      box-shadow:
        0 0 60px rgba(255, 235, 59, 0.9),
        0 0 120px rgba(255, 193, 7, 0.7),
        0 0 180px rgba(255, 152, 0, 0.5),
        inset -20px -20px 40px rgba(255, 87, 34, 0.3);
    }
    50% {
      transform: scale(1.05);
      box-shadow:
        0 0 80px rgba(255, 235, 59, 1),
        0 0 150px rgba(255, 193, 7, 0.8),
        0 0 220px rgba(255, 152, 0, 0.6),
        inset -20px -20px 40px rgba(255, 87, 34, 0.4);
    }
  }

  @keyframes sunGlow {
    0%,
    100% {
      opacity: 0.6;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.1);
    }
  }

  .earth {
    width: 400px;
    height: 400px;
    position: relative;
    transform-style: preserve-3d;
    transform: rotateX(0deg) rotateY(0deg);
    transition: transform 0.1s ease-out;
  }

  .earth-sphere {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: radial-gradient(
      circle at 30% 30%,
      #8bb8ff 0%,
      #6bb3ff 20%,
      #4a90e2 50%,
      #2d5aa0 80%,
      #1a3d6b 100%
    );
    box-shadow:
      inset -40px -40px 80px rgba(0, 0, 0, 0.7),
      0 0 100px rgba(74, 144, 226, 0.5),
      inset 30px 30px 60px rgba(255, 255, 255, 0.15);
    position: absolute;
    /* Esferoide oblato: más ancho en el ecuador (scaleX) y más achatado en los polos (scaleY) */
    /* El aplanamiento real de la Tierra es ~0.00335, pero lo exageramos para visualización educativa */
    /* scaleX > 1 hace el ecuador más ancho, scaleY < 1 hace los polos más achatados */
    /* Aumentamos la exageración para que sea más visible al rotar */
    /* Aumentamos significativamente el abultamiento para que sea visible al rotar */
    transform: scaleX(1.15) scaleY(0.85);
    animation: earthRotate 20s linear infinite;
  }

  @keyframes earthRotate {
    from {
      background-position: 0% 0%;
    }
    to {
      background-position: 100% 0%;
    }
  }

  /* Continent simulation with CSS */
  .continent {
    position: absolute;
    border-radius: 50%;
    opacity: 0.3;
    background: linear-gradient(135deg, rgba(34, 139, 34, 0.4) 0%, rgba(85, 107, 47, 0.3) 100%);
  }

  .continent.americas {
    width: 60%;
    height: 40%;
    top: 25%;
    left: 15%;
    clip-path: polygon(20% 0%, 80% 10%, 70% 60%, 30% 80%, 10% 50%);
  }

  .continent.africa {
    width: 35%;
    height: 50%;
    top: 30%;
    left: 50%;
    clip-path: polygon(40% 0%, 80% 20%, 70% 80%, 30% 100%, 20% 60%);
  }

  .continent.asia {
    width: 50%;
    height: 45%;
    top: 20%;
    left: 60%;
    clip-path: polygon(10% 10%, 90% 5%, 80% 70%, 40% 90%, 5% 60%);
  }

  .continent.europe {
    width: 25%;
    height: 20%;
    top: 15%;
    left: 45%;
    clip-path: polygon(30% 0%, 80% 10%, 70% 60%, 20% 80%, 10% 40%);
  }

  .continent.oceania {
    width: 20%;
    height: 15%;
    top: 65%;
    left: 70%;
    clip-path: polygon(20% 20%, 80% 10%, 70% 70%, 30% 80%, 10% 50%);
  }

  .equator-line {
    position: absolute;
    width: 115%; /* Más ancho para coincidir con el esferoide oblato exagerado */
    height: 5px;
    top: 50%;
    left: -7.5%; /* Centrar la línea más ancha */
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 200, 0, 0.8) 15%,
      rgba(255, 200, 0, 0.9) 50%,
      rgba(255, 200, 0, 0.8) 85%,
      transparent 100%
    );
    transform: translateY(-50%);
    box-shadow:
      0 0 20px rgba(255, 200, 0, 0.8),
      0 0 40px rgba(255, 200, 0, 0.4);
    animation: equatorPulse 3s ease-in-out infinite;
    z-index: 5;
  }

  @keyframes equatorPulse {
    0%,
    100% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
  }

  .grid-line {
    position: absolute;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
  }

  .grid-line.horizontal-1 {
    width: 100%;
    height: 1px;
    top: 25%;
    left: 0;
  }

  .grid-line.horizontal-2 {
    width: 100%;
    height: 1px;
    top: 75%;
    left: 0;
  }

  .grid-line.vertical-1 {
    width: 1px;
    height: 100%;
    top: 0;
    left: 25%;
  }

  .grid-line.vertical-2 {
    width: 1px;
    height: 100%;
    top: 0;
    left: 75%;
  }

  .earth-center {
    position: absolute;
    width: 6px;
    height: 6px;
    left: 50%;
    top: 50%;
    margin-left: -3px;
    margin-top: -3px;
    background: #ffd700;
    border-radius: 50%;
    box-shadow:
      0 0 15px rgba(255, 215, 0, 1),
      0 0 30px rgba(255, 215, 0, 0.5);
    animation: centerPulse 2s ease-in-out infinite;
  }

  @keyframes centerPulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.3);
    }
  }

  .volcano-container {
    position: absolute;
    left: 50%;
    top: 50%;
    cursor: pointer;
    transform-style: preserve-3d;
    transition: transform 0.3s;
  }

  .volcano-container:hover {
    transform: scale(1.3);
    z-index: 10;
  }

  .radial-line {
    position: absolute;
    width: 3px;
    left: 50%;
    top: 0;
    margin-left: -1.5px;
    background: linear-gradient(
      to bottom,
      rgba(255, 215, 0, 1) 0%,
      rgba(255, 200, 0, 0.8) 50%,
      rgba(255, 107, 107, 0.6) 100%
    );
    transform-origin: top center;
    animation:
      lineAppear 1s ease-out,
      linePulse 2s ease-in-out infinite 1s;
    box-shadow: 0 0 15px rgba(255, 107, 107, 0.7);
  }

  .everest-line {
    background: linear-gradient(
      to bottom,
      rgba(255, 215, 0, 1) 0%,
      rgba(100, 150, 255, 0.8) 50%,
      rgba(74, 144, 226, 0.6) 100%
    );
    box-shadow: 0 0 15px rgba(74, 144, 226, 0.7);
  }

  @keyframes lineAppear {
    from {
      height: 0;
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes linePulse {
    0%,
    100% {
      opacity: 0.7;
    }
    50% {
      opacity: 1;
    }
  }

  .volcano-cone {
    position: relative;
    margin: 0 auto;
    transform-style: preserve-3d;
    filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.5));
  }

  .volcano-base {
    width: 100%;
    height: 50%;
    background: linear-gradient(135deg, #8b4513 0%, #654321 50%, #4a3728 100%);
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    border-radius: 0 0 8px 8px;
    position: relative;
  }

  .volcano-base::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(139, 69, 19, 0.3) 0%, transparent 50%);
    border-radius: 0 0 8px 8px;
  }

  .volcano-middle {
    position: absolute;
    top: 30%;
    left: 20%;
    width: 60%;
    height: 30%;
    background: linear-gradient(135deg, #a0522d 0%, #8b4513 100%);
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    border-radius: 0 0 5px 5px;
  }

  .volcano-peak {
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 12px;
    height: 12px;
    background: radial-gradient(circle, #ff4444 0%, #cc0000 100%);
    border-radius: 50%;
    box-shadow:
      0 0 20px rgba(255, 68, 68, 1),
      0 0 40px rgba(255, 68, 68, 0.6);
    animation: peakGlow 2s ease-in-out infinite;
  }

  @keyframes peakGlow {
    0%,
    100% {
      transform: translateX(-50%) scale(1);
      opacity: 1;
    }
    50% {
      transform: translateX(-50%) scale(1.4);
      opacity: 0.9;
    }
  }

  .volcano-smoke {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 8px;
    height: 20px;
    background: linear-gradient(to top, rgba(100, 100, 100, 0.8) 0%, transparent 100%);
    border-radius: 50% 50% 0 0;
    animation: smokeRise 3s ease-in-out infinite;
  }

  @keyframes smokeRise {
    0% {
      transform: translateX(-50%) translateY(0) scale(1);
      opacity: 0.8;
    }
    100% {
      transform: translateX(-50%) translateY(-30px) scale(1.5);
      opacity: 0;
    }
  }

  .mountain-snow {
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 20%;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.9) 0%,
      rgba(200, 220, 255, 0.6) 100%
    );
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    border-radius: 0 0 5px 5px;
  }

  .chimborazo-cone {
    filter: drop-shadow(0 0 15px rgba(255, 200, 0, 0.8));
  }

  .everest-cone {
    filter: drop-shadow(0 0 15px rgba(100, 150, 255, 0.8));
  }

  .volcano-label {
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    white-space: nowrap;
    background: rgba(0, 0, 0, 0.85);
    padding: 6px 12px;
    border-radius: 6px;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    pointer-events: none;
    border: 1px solid rgba(255, 255, 255, 0.3);
    transition: transform 0.1s ease-out;
  }

  .distance-badge {
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    font-size: 11px;
    font-weight: bold;
    background: rgba(74, 144, 226, 0.95);
    padding: 6px 12px;
    border-radius: 15px;
    white-space: nowrap;
    animation: badgeSlide 0.6s ease-out;
    pointer-events: none;
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.3);
    transition: transform 0.1s ease-out;
  }

  .chimborazo-badge {
    background: rgba(255, 200, 0, 0.95);
    color: #000;
  }

  @keyframes badgeSlide {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(-15px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  .instructions {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    color: rgba(255, 255, 255, 0.8);
    font-size: 14px;
    text-align: center;
    background: rgba(0, 0, 0, 0.7);
    padding: 12px 24px;
    border-radius: 25px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 768px) {
    .earth {
      width: 300px;
      height: 300px;
    }

    .instructions {
      font-size: 12px;
      padding: 10px 20px;
      bottom: 10px;
    }

    .volcano-cone {
      width: 25px !important;
    }
  }
</style>
