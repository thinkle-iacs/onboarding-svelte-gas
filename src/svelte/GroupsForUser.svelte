<script lang="ts">
  import Busy from "./Busy.svelte";

  import GroupInfo from "./GroupInfo.svelte";
  export let user;

  import {
    Block,
    Icon,
    account_circle,
  } from "google-apps-script-svelte-components";
  import { parseContext } from "./lib/parseContext";
  import { GoogleAppsScript } from "./gasApi";
  import { onMount } from "svelte";
  import Error from "./Error.svelte";
  let email;
  let contextString = `<? context ?>`;
  let context = parseContext(contextString);
  let username: string;
  onMount(async () => {
    email = await GoogleAppsScript.getActiveUserEmail();
  });
  async function lookupUser() {
    user = await GoogleAppsScript.lookupAccount(username);
  }
  let lookingUp = false;
  let groups = [];
  let groupsUser;
  let error;
  async function lookupGroups() {
    if (!user.primaryEmail) {
      groups = [];
      return;
    }
    console.log("Look up groups for ", user.primaryEmail);
    lookingUp = true;
    groupsUser = user.primaryEmail;
    error = null;
    try {
      const result = await GoogleAppsScript.getGroups(user.primaryEmail);
      console.log("Got result", result);
      if (Array.isArray(result)) {
        groups = result;
      } else {
        throw new Error("Unexpected result: " + JSON.stringify(result));
      }
    } catch (err) {
      console.error(err);
      error = err;
    }
    lookingUp = false;
  }

  $: if (groupsUser != user?.primaryEmail) {
    groups = [];
    groupsUser = "";
  }

  $: if (user.primaryEmail != groupsUser) setTimeout(lookupGroups, 100);
</script>

<Block>
  <h2>Groups</h2>
  <button class="action" on:click={lookupGroups} disabled={lookingUp}
    >Lookup Groups</button
  >
  {#if lookingUp}
    <Busy></Busy>
  {/if}
  {#if error}
    <Error {error} />
  {/if}
  {#if user?.primaryEmail == groupsUser}
    <div class="group-add">
      <label>
        Add Group:
        <input type="text" />
      </label>
      <button on:click={() => window.alert("fix me")}>Add to Group</button>
    </div>
  {/if}
  <ul>
    {#if groups}
      {#each groups as group}
        <GroupInfo {group} top={true}></GroupInfo>
      {/each}
    {/if}
  </ul>
</Block>

<style>
  .grid {
    display: flex;
    gap: 8px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .flex-line {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  img {
    border-radius: 50%;
  }
</style>
