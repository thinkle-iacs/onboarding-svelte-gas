<script lang="ts">
  import type { GroupInfo as GroupInfoType } from "../types";
  let groupData: GroupInfoType[] = [];
  export let groupInfo: GroupInfoType | null;
</script>

{#if groupInfo}
  {#if groupInfo.category}<span class="category">{groupInfo.category}</span
    >{/if}
  {#if groupInfo.kind}<span class="kind">{groupInfo.kind}</span>{/if}
{/if}

<style>
  span {
    display: inline-block;
  }
  .category {
    background-color: #0033a0;
    color: white;
    width: 3em;
    text-align: center;
    border-radius: 8px;
    margin-right: 4px;
  }
  .kind {
    background-color: #8a8a8a;
    color: white;
    padding: 4px;
    margin-right: 4px;
  }
</style>
