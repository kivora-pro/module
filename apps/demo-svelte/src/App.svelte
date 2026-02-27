<script lang="ts">
  import { Button } from "@kivora/svelte";
  import "./styles.css";

  let loading = $state(false);

  function handleLoading() {
    loading = true;
    setTimeout(() => (loading = false), 2000);
  }
</script>

<main style="max-width:800px;margin:0 auto;padding:48px 24px">
  <h1 style="font-size:2rem;font-weight:700;margin-bottom:8px">
    @kivora/svelte — Demo
  </h1>
  <p style="color:#64748b;margin-bottom:48px">
    Componentes Svelte 5 en tiempo real.
  </p>

  <section style="margin-bottom:40px">
    <h2 style="margin-bottom:16px;font-size:1.1rem;color:#475569">
      Button · Variants
    </h2>
    <div style="display:flex;gap:12px;flex-wrap:wrap">
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button disabled>Disabled</Button>
      <Button isLoading={loading} onclick={handleLoading}>
        {loading ? "Cargando..." : "Click para loading"}
      </Button>
    </div>
  </section>

  <section>
    <h2 style="margin-bottom:16px;font-size:1.1rem;color:#475569">
      Button · Sizes
    </h2>
    <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
      <Button size="xs">xs</Button>
      <Button size="sm">sm</Button>
      <Button size="md">md</Button>
      <Button size="lg">lg</Button>
      <Button size="xl">xl</Button>
    </div>
  </section>
</main>
