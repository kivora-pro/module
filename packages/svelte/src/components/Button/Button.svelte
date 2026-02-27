<script lang="ts">
  import type { ColorScheme, Size, Variant } from "../../_core";
  import { getButtonClasses, cx } from "../../_core";

  interface Props {
    variant?: Variant;
    size?: Size;
    colorScheme?: ColorScheme;
    isLoading?: boolean;
    fullWidth?: boolean;
    disabled?: boolean;
    class?: string;
    onclick?: (e: MouseEvent) => void;
    children?: import("svelte").Snippet;
  }

  let {
    variant = "solid",
    size = "md",
    colorScheme = "primary",
    isLoading = false,
    fullWidth = false,
    disabled = false,
    class: className = "",
    onclick,
    children,
  }: Props = $props();

  const classes = $derived(
    cx(
      getButtonClasses({ variant, size, colorScheme, disabled: disabled || isLoading }),
      fullWidth ? "kv-btn--full" : undefined,
      className
    )
  );
</script>

<button
  class={classes}
  disabled={disabled || isLoading}
  {onclick}
>
  {#if isLoading}
    <span class="kv-spinner" aria-hidden="true"></span>
  {:else}
    {@render children?.()}
  {/if}
</button>
