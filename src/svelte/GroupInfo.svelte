<script lang="ts">
  import type { Drive } from "./types/keyTypes";
  interface Group {
    group: string;
    childGroups: Group[];
  }
  export let group: Group;
  import { GoogleAppsScript } from "./gasApi";
  import { onMount } from "svelte";
  let toggle = false;
  export let top = false;

  async function removeFromGroup() {
    await GoogleAppsScript.removeFromGroup(group.group);
  }
</script>

{#if group}
  <li>
    <div class="group-container">
      <div class="flex-line">
        <b>{group.group}</b>
        {#if top}
          <button on:click={removeFromGroup}>Remove user</button>
        {/if}
      </div>
      {#if group.childGroups}
        {#if group.childGroups.length > 0}
          <details>
            <summary>
              +{group.childGroups.length} inherited groups
            </summary>
            <ul>
              {#each group.childGroups as childGroup}
                <svelte:self group={childGroup} />
              {/each}
            </ul>
          </details>
        {/if}
      {/if}
    </div>
  </li>
{/if}

<style>
  .group-container {
    border: 1px solid #ccc;
    padding: 1em;
  }
  .flex-line {
    display: flex;
    align-items: start;
    gap: 8px;
  }
</style>
