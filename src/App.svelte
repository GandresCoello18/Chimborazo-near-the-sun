<script lang="ts">
  import { onMount } from 'svelte';
  import Hero from './lib/components/Hero.svelte';
  import AboutChimborazo from './lib/components/AboutChimborazo.svelte';
  import Location from './lib/components/Location.svelte';
  import WhySpecial from './lib/components/WhySpecial.svelte';
  import PersonalExperience from './lib/components/PersonalExperience.svelte';
  import TheQuestion from './lib/components/TheQuestion.svelte';
  import InteractiveDemo from './lib/components/InteractiveDemo.svelte';
  import Conclusion from './lib/components/Conclusion.svelte';
  import Footer from './lib/components/Footer.svelte';
  import StructuredData from './lib/components/StructuredData.svelte';
  import { initScrollReveal } from './lib/utils/scrollReveal';
  import './styles/global.css';

  onMount(() => {
    initScrollReveal();
  });
</script>

<StructuredData />

<main>
  <Hero />
  <AboutChimborazo />
  <Location />
  <WhySpecial />
  <PersonalExperience />
  <TheQuestion />
  <InteractiveDemo />
  <Conclusion />
  <Footer />
</main>

<style>
  main {
    width: 100%;
    min-height: 100vh;
  }
</style>
