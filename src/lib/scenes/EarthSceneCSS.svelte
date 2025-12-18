<script lang="ts">
  import { onMount } from 'svelte';
  import { CHIMBORAZO, EVEREST, EARTH_RADIUS_EQUATORIAL } from '../utils/constants';
  
  let earthElement: HTMLDivElement;
  let rotationX = 0;
  let rotationY = 0;
  let isDragging = false;
  let lastMouseX = 0;
  let lastMouseY = 0;
  let selectedMountain: 'chimborazo' | 'everest' | null = null;
  let showRadialLines = false;
  let showComparison = false;
  let showSunScene = false;
  let autoDemoMode = true;
  let demoStep = 0;
  
  // Convert lat/lon to CSS 3D position
  function latLonToCSS3D(lat: number, lon: number, radius: number = 100): { x: number; y: number; z: number } {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    
    return { x, y, z };
  }
  
  // Calculate distance from Earth center (including height)
  function getDistanceFromCenter(lat: number, heightMeters: number): number {
    const latRad = lat * (Math.PI / 180);
    const earthRadiusKm = EARTH_RADIUS_EQUATORIAL * (1 - 0.00335 * Math.sin(latRad) * Math.sin(latRad));
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
  }
  
  function handleMouseUp() {
    isDragging = false;
  }
  
  function updateRotation() {
    if (earthElement) {
      earthElement.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
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
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      rotationY += 5;
      updateRotation();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      rotationX -= 5;
      updateRotation();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      rotationX += 5;
      updateRotation();
    }
  }
  
  function selectMountain(mountain: 'chimborazo' | 'everest') {
    selectedMountain = selectedMountain === mountain ? null : mountain;
    if (selectedMountain) {
      showRadialLines = true;
      showComparison = true;
      showSunScene = true;
    } else {
      showRadialLines = false;
      showComparison = false;
      showSunScene = false;
    }
  }
  
  function showSunComparison() {
    showSunScene = true;
    showComparison = true;
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
    
    // Auto demo sequence
    if (autoDemoMode) {
      const demoInterval = setInterval(() => {
        demoStep++;
        if (demoStep === 1) {
          // Step 1: Show Chimborazo
          setTimeout(() => {
            selectMountain('chimborazo');
          }, 2000);
        } else if (demoStep === 2) {
          // Step 2: Show comparison
          setTimeout(() => {
            showSunScene = true;
          }, 4000);
        } else if (demoStep >= 3) {
          clearInterval(demoInterval);
        }
      }, 6000);
      
      return () => {
        clearInterval(rotateInterval);
        clearInterval(demoInterval);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
    
    return () => {
      clearInterval(rotateInterval);
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
  on:keydown={handleKeyDown}>
  
  <!-- Sun Scene (shown when comparing distances) -->
  {#if showSunScene}
    <div class="sun-scene">
      <div class="sun">
        <div class="sun-core"></div>
        <div class="sun-glow"></div>
      </div>
      
      <!-- Earth in sun scene -->
      <div class="earth-in-sun-scene">
        <div class="earth-mini"></div>
        
        <!-- Chimborazo line to sun -->
        <div class="distance-line chimborazo-sun-line">
          <div class="line-path"></div>
          <div class="line-label chimborazo-label">
            <span>Chimborazo</span>
            <span class="distance-value">{(149600000 - chimborazoDistance).toFixed(0)} km del Sol</span>
          </div>
        </div>
        
        <!-- Everest line to sun -->
        <div class="distance-line everest-sun-line">
          <div class="line-path"></div>
          <div class="line-label everest-label">
            <span>Everest</span>
            <span class="distance-value">{(149600000 - everestDistance).toFixed(0)} km del Sol</span>
          </div>
        </div>
      </div>
      
      <div class="sun-scene-explanation">
        <h3>Distancia al Sol</h3>
        <p>Chimborazo está <strong>{((everestDistance - chimborazoDistance) * 1000).toFixed(0)} metros más cerca del Sol</strong> que el Everest</p>
        <button class="close-sun-scene" on:click={() => { showSunScene = false; }}>Cerrar</button>
      </div>
    </div>
  {/if}
  
  <!-- Main Earth Scene -->
  <div class="scene-3d">
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
        tabindex="0">
        {#if showRadialLines}
          <div 
            class="radial-line chimborazo-line"
            style="height: {chimborazoRadiusPx}px;">
          </div>
        {/if}
        <!-- Larger volcano cone -->
        <div class="volcano-cone chimborazo-cone" style="height: {chimborazoHeightPx}px; width: {chimborazoHeightPx * 0.4}px;">
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
        tabindex="0">
        {#if showRadialLines}
          <div 
            class="radial-line everest-line"
            style="height: {everestRadiusPx}px;">
          </div>
        {/if}
        <!-- Larger mountain cone -->
        <div class="volcano-cone everest-cone" style="height: {everestHeightPx}px; width: {everestHeightPx * 0.4}px;">
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
  
  <!-- Comparison panel -->
  {#if showComparison}
    <div class="comparison-panel">
      <h3>Comparación Visual</h3>
      <div class="volcano-comparison-visual">
        <div class="comparison-volcano chimborazo-comp">
          <div class="comp-volcano-cone" style="height: {chimborazoHeightPx * 0.3}px;"></div>
          <div class="comp-label">Chimborazo<br/>{CHIMBORAZO.height.toLocaleString()}m</div>
        </div>
        <div class="vs-divider">VS</div>
        <div class="comparison-volcano everest-comp">
          <div class="comp-volcano-cone" style="height: {everestHeightPx * 0.3}px;"></div>
          <div class="comp-label">Everest<br/>{EVEREST.height.toLocaleString()}m</div>
        </div>
      </div>
      <div class="distance-comparison">
        <div class="distance-item">
          <span class="distance-name">Chimborazo al centro:</span>
          <span class="distance-number">{chimborazoDistance.toFixed(1)} km</span>
        </div>
        <div class="distance-item">
          <span class="distance-name">Everest al centro:</span>
          <span class="distance-number">{everestDistance.toFixed(1)} km</span>
        </div>
        <div class="difference-highlight">
          <strong>Diferencia: {((chimborazoDistance - everestDistance) * 1000).toFixed(0)} metros</strong>
          <p>Chimborazo está más lejos del centro, por lo tanto más cerca del Sol</p>
        </div>
      </div>
      <button class="show-sun-btn" on:click={showSunComparison}>Ver comparación con el Sol</button>
    </div>
  {/if}
  
  <!-- Info card -->
  {#if selectedMountain}
    <div class="info-card">
      <button class="close-btn" on:click={() => { selectedMountain = null; showRadialLines = false; showComparison = false; showSunScene = false; }} aria-label="Cerrar">×</button>
      {#if selectedMountain === 'chimborazo'}
        <h3>🌋 {CHIMBORAZO.name}</h3>
        <p><strong>Altura:</strong> {CHIMBORAZO.height.toLocaleString()}m</p>
        <p><strong>Distancia desde el centro:</strong> {chimborazoDistance.toFixed(1)} km</p>
        <p><strong>Ubicación:</strong> Ecuador (cerca del ecuador)</p>
        <p class="explanation">
          Aunque el Everest es más alto, Chimborazo está más cerca del Sol porque está cerca del ecuador, 
          donde la Tierra tiene un abultamiento debido a su rotación.
        </p>
      {:else}
        <h3>🏔️ {EVEREST.name}</h3>
        <p><strong>Altura:</strong> {EVEREST.height.toLocaleString()}m</p>
        <p><strong>Distancia desde el centro:</strong> {everestDistance.toFixed(1)} km</p>
        <p><strong>Ubicación:</strong> Nepal/Tíbet (lejos del ecuador)</p>
        <p class="explanation">
          El Everest es la montaña más alta sobre el nivel del mar, pero no la más cercana al Sol. 
          Su ubicación lejos del ecuador significa que está sobre una parte de la Tierra más cerca del centro.
        </p>
      {/if}
    </div>
  {/if}
  
  <!-- Educational banner (dismissible) -->
  <div class="educational-banner">
    <button class="banner-close-btn" on:click={(e) => { e.currentTarget.parentElement?.remove(); }}>×</button>
    <h2>¿Por qué Chimborazo está más cerca del Sol?</h2>
    <p>La Tierra tiene un abultamiento en el ecuador. Chimborazo está cerca del ecuador, por lo que está más lejos del centro de la Tierra y más cerca del Sol que el Everest.</p>
    <p class="banner-hint">💡 Haz clic en los volcanes para ver la comparación visual</p>
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
  
  /* Sun Scene */
  .sun-scene {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.5s ease-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .sun {
    position: relative;
    width: 200px;
    height: 200px;
    margin-bottom: 100px;
  }
  
  .sun-core {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, #fff 0%, #ffd700 40%, #ff8c00 100%);
    box-shadow: 0 0 100px rgba(255, 215, 0, 0.8), 0 0 200px rgba(255, 140, 0, 0.6);
    animation: sunPulse 2s ease-in-out infinite;
  }
  
  @keyframes sunPulse {
    0%, 100% { transform: scale(1); box-shadow: 0 0 100px rgba(255, 215, 0, 0.8), 0 0 200px rgba(255, 140, 0, 0.6); }
    50% { transform: scale(1.1); box-shadow: 0 0 150px rgba(255, 215, 0, 1), 0 0 300px rgba(255, 140, 0, 0.8); }
  }
  
  .sun-glow {
    position: absolute;
    top: -50px;
    left: -50px;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%);
    animation: glowRotate 10s linear infinite;
  }
  
  @keyframes glowRotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .earth-in-sun-scene {
    position: relative;
    width: 80px;
    height: 80px;
  }
  
  .earth-mini {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, #6bb3ff 0%, #4a90e2 40%, #2d5aa0 100%);
    box-shadow: 0 0 20px rgba(74, 144, 226, 0.5);
  }
  
  .distance-line {
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: 0 0;
  }
  
  .chimborazo-sun-line {
    transform: translate(-50%, -50%) rotate(-20deg);
  }
  
  .everest-sun-line {
    transform: translate(-50%, -50%) rotate(20deg);
  }
  
  .line-path {
    width: 300px;
    height: 2px;
    background: linear-gradient(90deg, rgba(255, 200, 0, 0.8) 0%, rgba(255, 200, 0, 0.3) 100%);
    box-shadow: 0 0 10px rgba(255, 200, 0, 0.5);
    animation: lineDraw 1s ease-out;
  }
  
  .everest-sun-line .line-path {
    background: linear-gradient(90deg, rgba(100, 150, 255, 0.8) 0%, rgba(100, 150, 255, 0.3) 100%);
    box-shadow: 0 0 10px rgba(100, 150, 255, 0.5);
  }
  
  @keyframes lineDraw {
    from { width: 0; }
    to { width: 300px; }
  }
  
  .line-label {
    position: absolute;
    top: -30px;
    left: 150px;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  }
  
  .distance-value {
    display: block;
    font-size: 12px;
    color: #ffd700;
    margin-top: 5px;
  }
  
  .sun-scene-explanation {
    margin-top: 50px;
    text-align: center;
    color: #fff;
    max-width: 500px;
  }
  
  .sun-scene-explanation h3 {
    font-size: 1.5rem;
    color: #ffd700;
    margin-bottom: 1rem;
  }
  
  .sun-scene-explanation p {
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  .close-sun-scene {
    margin-top: 20px;
    padding: 10px 30px;
    background: #4a90e2;
    color: #fff;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: background 0.2s;
  }
  
  .close-sun-scene:hover {
    background: #5ba3f5;
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
    background: 
      radial-gradient(circle at 30% 30%, #8bb8ff 0%, #6bb3ff 20%, #4a90e2 50%, #2d5aa0 80%, #1a3d6b 100%);
    box-shadow: 
      inset -40px -40px 80px rgba(0, 0, 0, 0.7),
      0 0 100px rgba(74, 144, 226, 0.5),
      inset 30px 30px 60px rgba(255, 255, 255, 0.15);
    position: absolute;
    transform: scaleY(0.98);
    animation: earthRotate 20s linear infinite;
  }
  
  @keyframes earthRotate {
    from { background-position: 0% 0%; }
    to { background-position: 100% 0%; }
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
    width: 100%;
    height: 3px;
    top: 50%;
    left: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.5) 20%, rgba(255, 255, 255, 0.5) 80%, transparent 100%);
    transform: translateY(-50%);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
    animation: equatorPulse 3s ease-in-out infinite;
  }
  
  @keyframes equatorPulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
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
    box-shadow: 0 0 15px rgba(255, 215, 0, 1), 0 0 30px rgba(255, 215, 0, 0.5);
    animation: centerPulse 2s ease-in-out infinite;
  }
  
  @keyframes centerPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.3); }
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
    background: linear-gradient(to bottom, rgba(255, 215, 0, 1) 0%, rgba(255, 200, 0, 0.8) 50%, rgba(255, 107, 107, 0.6) 100%);
    transform-origin: top center;
    animation: lineAppear 1s ease-out, linePulse 2s ease-in-out infinite 1s;
    box-shadow: 0 0 15px rgba(255, 107, 107, 0.7);
  }
  
  .everest-line {
    background: linear-gradient(to bottom, rgba(255, 215, 0, 1) 0%, rgba(100, 150, 255, 0.8) 50%, rgba(74, 144, 226, 0.6) 100%);
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
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
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
    box-shadow: 0 0 20px rgba(255, 68, 68, 1), 0 0 40px rgba(255, 68, 68, 0.6);
    animation: peakGlow 2s ease-in-out infinite;
  }
  
  @keyframes peakGlow {
    0%, 100% { transform: translateX(-50%) scale(1); opacity: 1; }
    50% { transform: translateX(-50%) scale(1.4); opacity: 0.9; }
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
    0% { transform: translateX(-50%) translateY(0) scale(1); opacity: 0.8; }
    100% { transform: translateX(-50%) translateY(-30px) scale(1.5); opacity: 0; }
  }
  
  .mountain-snow {
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 20%;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.9) 0%, rgba(200, 220, 255, 0.6) 100%);
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
  
  .comparison-panel {
    position: absolute;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(20, 20, 30, 0.95);
    border: 2px solid #4a90e2;
    border-radius: 16px;
    padding: 2rem;
    max-width: 600px;
    width: 90%;
    color: #fff;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.8);
    animation: panelSlide 0.6s ease-out;
    backdrop-filter: blur(10px);
  }
  
  @keyframes panelSlide {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
  
  .comparison-panel h3 {
    margin: 0 0 1.5rem 0;
    color: #4a90e2;
    font-size: 1.4rem;
    text-align: center;
    text-shadow: 0 0 10px rgba(74, 144, 226, 0.5);
  }
  
  .volcano-comparison-visual {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 2rem;
    margin: 2rem 0;
    padding: 2rem;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 12px;
  }
  
  .comparison-volcano {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .comp-volcano-cone {
    width: 60px;
    background: linear-gradient(135deg, #8b4513 0%, #654321 100%);
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    border-radius: 0 0 8px 8px;
    animation: compGrow 1s ease-out;
    position: relative;
  }
  
  .chimborazo-comp .comp-volcano-cone {
    filter: drop-shadow(0 0 10px rgba(255, 200, 0, 0.6));
  }
  
  .everest-comp .comp-volcano-cone {
    filter: drop-shadow(0 0 10px rgba(100, 150, 255, 0.6));
  }
  
  @keyframes compGrow {
    from { height: 0; }
  }
  
  .comp-label {
    text-align: center;
    font-size: 12px;
    font-weight: bold;
    color: #fff;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
  }
  
  .vs-divider {
    font-size: 1.5rem;
    font-weight: bold;
    color: #4a90e2;
    text-shadow: 0 0 10px rgba(74, 144, 226, 0.8);
    align-self: center;
  }
  
  .distance-comparison {
    margin-top: 1.5rem;
  }
  
  .distance-item {
    display: flex;
    justify-content: space-between;
    padding: 0.8rem;
    margin: 0.5rem 0;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    border-left: 3px solid #4a90e2;
  }
  
  .distance-name {
    color: #ccc;
  }
  
  .distance-number {
    color: #4a90e2;
    font-weight: bold;
    font-size: 1.1rem;
  }
  
  .difference-highlight {
    margin-top: 1.5rem;
    padding: 1rem;
    background: linear-gradient(135deg, rgba(255, 200, 0, 0.2) 0%, rgba(255, 200, 0, 0.1) 100%);
    border: 2px solid rgba(255, 200, 0, 0.5);
    border-radius: 12px;
    text-align: center;
  }
  
  .difference-highlight strong {
    color: #ffc800;
    font-size: 1.2rem;
    display: block;
    margin-bottom: 0.5rem;
  }
  
  .difference-highlight p {
    color: #aaa;
    font-size: 0.95rem;
    margin: 0;
  }
  
  .show-sun-btn {
    width: 100%;
    margin-top: 1.5rem;
    padding: 12px 24px;
    background: linear-gradient(135deg, #ffd700 0%, #ff8c00 100%);
    color: #000;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);
  }
  
  .show-sun-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 215, 0, 0.6);
  }
  
  .info-card {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(20, 20, 30, 0.95);
    border: 2px solid #4a90e2;
    border-radius: 12px;
    padding: 1.5rem;
    max-width: 380px;
    color: #fff;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.7);
    animation: slideIn 0.4s ease-out;
    backdrop-filter: blur(10px);
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .info-card h3 {
    margin: 0 0 1rem 0;
    color: #4a90e2;
    font-size: 1.3rem;
  }
  
  .info-card p {
    margin: 0.5rem 0;
    line-height: 1.6;
    color: #ccc;
  }
  
  .info-card .explanation {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    font-style: italic;
    color: #aaa;
    font-size: 0.95rem;
  }
  
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    color: #fff;
    font-size: 28px;
    cursor: pointer;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background 0.2s;
  }
  
  .close-btn:hover {
    background: rgba(255, 255, 255, 0.15);
  }
  
  .educational-banner {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(20, 20, 30, 0.95);
    border: 2px solid #4a90e2;
    border-radius: 16px;
    padding: 1.5rem;
    max-width: 700px;
    width: 90%;
    color: #fff;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.8);
    animation: bannerSlide 0.6s ease-out;
    z-index: 100;
    backdrop-filter: blur(10px);
  }
  
  @keyframes bannerSlide {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
  
  .banner-close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background 0.2s;
  }
  
  .banner-close-btn:hover {
    background: rgba(255, 255, 255, 0.15);
  }
  
  .educational-banner h2 {
    margin: 0 0 0.8rem 0;
    color: #4a90e2;
    font-size: 1.5rem;
    text-shadow: 0 0 10px rgba(74, 144, 226, 0.5);
  }
  
  .educational-banner p {
    margin: 0.5rem 0;
    line-height: 1.7;
    color: #ccc;
    font-size: 1rem;
  }
  
  .banner-hint {
    margin-top: 1rem;
    padding: 0.8rem;
    background: rgba(74, 144, 226, 0.2);
    border-left: 3px solid #4a90e2;
    border-radius: 6px;
    font-size: 0.95rem;
    color: #fff;
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
    
    .info-card, .comparison-panel, .educational-banner {
      top: 10px;
      right: 10px;
      left: 10px;
      max-width: none;
      transform: none;
    }
    
    .comparison-panel {
      bottom: 60px;
    }
    
    .volcano-comparison-visual {
      flex-direction: column;
      gap: 1rem;
    }
    
    .vs-divider {
      transform: rotate(90deg);
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
