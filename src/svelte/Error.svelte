<script lang="ts">
  export let error;
  import {
    Block,
    Icon,
    account_circle,
  } from "google-apps-script-svelte-components";
</script>

{#if error}
  <Block>
    <details>
      <summary>Error finding user</summary>
      <div class="error">{error.message}</div>
    </details>
  </Block>
{/if}
