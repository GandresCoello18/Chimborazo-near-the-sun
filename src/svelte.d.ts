declare module '*.svelte' {
  import type { ComponentType, SvelteComponent } from 'svelte';
  import type { ComponentProps } from 'svelte';

  const component: ComponentType<SvelteComponent<Record<string, any>>>;
  export default component;

  export type Component = typeof component;
  export type Props = ComponentProps<Component>;
}
