<script lang="ts">
  export let text: string;
  export let targetSelector: string;
  
  function scrollToNext() {
    const nextSection = document.querySelector(targetSelector);
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
</script>

<div class="section-cta">
  <button class="cta-button" on:click={scrollToNext}>
    {text}
    <span class="arrow">↓</span>
  </button>
</div>

<style>
  .section-cta {
    display: flex;
    justify-content: center;
    margin-top: var(--spacing-xl);
    padding-top: var(--spacing-lg);
  }

  .cta-button {
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
    border: 2px solid var(--color-primary);
    color: var(--color-text-white);
    padding: var(--spacing-sm) 2.5rem;
    font-size: 1.1rem;
    font-weight: var(--font-weight-semibold);
    border-radius: var(--radius-full);
    cursor: pointer;
    transition: all var(--transition-base);
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
    box-shadow: var(--shadow-primary);
  }

  .cta-button:hover {
    background: linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary-darker) 100%);
    transform: translateY(-2px);
    box-shadow: var(--shadow-primary-hover);
  }

  .cta-button:active {
    transform: translateY(0);
  }

  .arrow {
    display: inline-block;
    animation: bounce 2s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    .cta-button {
      padding: 0.9rem 2rem;
      font-size: 1rem;
    }
  }
</style>

