<script lang="ts">
  import GroupTags from "./GroupTags.svelte";
  import type { GroupInfo as GroupInfoType } from "../types";

  export let groupData: GroupInfoType[];
  interface Group {
    group: string;
    childGroups: Group[];
  }
  export let group: Group;
  export let top = false;

  export let onRemove = (email) =>
    window.alert("Fix me - cannot remove " + email);

  let myGroupInfo: GroupInfoType | undefined = undefined;
  $: myGroupInfo = groupData.find(
    (groupInfo) => groupInfo.email === group.group
  );
  $: console.log("Got ", myGroupInfo, "by looking for", group, "in", groupData);
</script>

{#if group}
  <li>
    <div class="group-container">
      <div class="flex-line">
        <b>{group.group}</b>
        <GroupTags groupInfo={myGroupInfo} />
        {#if top}
          <button class="small" on:click={() => onRemove(group.group)}>-</button
          >
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
                <svelte:self group={childGroup} {groupData} />
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
