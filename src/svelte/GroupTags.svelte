<script lang="ts">
  import type { GroupInfo as GroupInfoType } from "../types";
  let groupData: GroupInfoType[] = [];
  export let groupInfo: GroupInfoType | null;
</script>

{#if groupInfo}
  <span class="category">{groupInfo.category}</span>
  <span class="kind">{groupInfo.kind}</span>
{/if}

<style>
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
