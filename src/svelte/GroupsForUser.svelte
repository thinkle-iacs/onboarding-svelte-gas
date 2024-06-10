<script lang="ts">
  import type {
    GroupChangeResult,
    GroupInfo as GroupInfoType,
    GroupKind,
    StaffCategory,
  } from "../types";
  import GroupTags from "./GroupTags.svelte";

  import Busy from "./Busy.svelte";

  import GroupInfo from "./GroupInfo.svelte";
  let groupData: GroupInfoType[] = [];
  export let user;
  let groupCategories: StaffCategory[] = [];
  let groupKinds: GroupKind[] = [];
  import { Block } from "google-apps-script-svelte-components";

  import { GoogleAppsScript } from "./gasApi";
  import { onMount } from "svelte";
  import Error from "./Error.svelte";
  import { currentCategory } from "./store";

  onMount(async () => {
    if (groupData.length == 0) {
      console.log("Fetch group info (hopefully just one time)");
      await getDomainGroupInfo();
    }
  });

  async function getDomainGroupInfo() {
    console.log("Looking up group data");
    groupData = await GoogleAppsScript.getGroupList();
    console.log("group data=>", groupData);
    if (groupData.length) {
      groupCategories = Array.from(
        new Set(["All", ...groupData.map((g) => g.category)])
      );
      groupKinds = Array.from(new Set(groupData.map((g) => g.kind)));
      console.log(
        "Group categories",
        groupCategories,
        "Group kinds",
        groupKinds
      );
    }
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

  let queuedToAdd: string[] = []; // list of emails we're ready to add.
  const addToQueue = (email: string) => {
    if (!queuedToAdd.includes(email)) {
      queuedToAdd = [...queuedToAdd, email];
    }
  };

  let customGroupEmail = "";

  let queuedToRemove: string[] = []; // list of group emails we're ready to remove.
  let actionResults: GroupChangeResult[] = [];
  async function doAdd() {
    busyAdding = true;
    let results = await GoogleAppsScript.addToGroups(
      user.primaryEmail,
      queuedToAdd
    );
    console.log("Added with results", results);
    queuedToAdd = [];
    busyAdding = false;
    actionResults = [...results, ...actionResults];
  }

  async function doRemove() {
    busyRemoving = true;
    let results = await GoogleAppsScript.removeFromGroups(
      user.primaryEmail,
      queuedToRemove
    );
    actionResults = [...results, ...actionResults];
    console.log("Removed with results", results);
    queuedToRemove = [];
    busyRemoving = false;
  }
  $: console.log("Got cats", groupCategories, groupKinds);

  let busyAdding = false;
  let busyRemoving = false;
</script>

<Block>
  <h2>Groups</h2>
  <button class="action" on:click={lookupGroups} disabled={lookingUp}
    >Lookup Group Memberships</button
  >

  {#if actionResults.length}
    <div class="area results-area">
      <div>
        <h3>Results</h3>
        <button on:click={() => (actionResults = [])}>Clear</button>
        <ul>
          {#each actionResults as result}
            <li>
              <span class="email">{result.userEmail}</span>
              <span class="change">
                {#if result.change == "add"}
                  added to
                {:else if result.change == "remove"}
                  removed from
                {/if}
              </span>
              <span class="group">{result.groupEmail}</span>
              <span class={result.success ? "success" : "fail"}
                >{result.success ? "Success" : "Failed"}</span
              >
              {#if result.error}
                <span>{result.error}</span>
              {/if}
              <button
                class="close"
                on:click={() =>
                  (actionResults = actionResults.filter((r) => r != result))}
                >&times;</button
              >
            </li>
          {/each}
        </ul>
      </div>
    </div>
  {/if}

  {#if lookingUp}
    <Busy></Busy>
  {/if}
  {#if error}
    <Error {error} />
  {/if}
  {#if user?.primaryEmail == groupsUser}
    <div class="group-add-area area">
      <div class="add-interface">
        <h3>Add to Group:</h3>
        <p>
          <button on:click={getDomainGroupInfo}>Load Group List...</button>
        </p>
        <label
          >Show groups for:
          <select bind:value={$currentCategory}>
            {#each groupCategories as category}
              <option value={category}>{category}</option>
            {/each}
          </select>
        </label>
        {#each groupKinds as kind}
          {@const groups = groupData.filter(
            (g) =>
              (g.category == $currentCategory || $currentCategory == "All") &&
              g.kind == kind
          )}
          {#if groups.length > 0}
            <div class="group-selector">
              <label for={`${kind}-group-select`}>{kind}</label>
              <select id={`${kind}-group-select`}>
                {#each groups as group}
                  <option value={group.email}>{group.email}</option>
                {/each}
              </select>
              <button
                class="small"
                on:click={() => {
                  let email = document.getElementById(
                    `${kind}-group-select`
                  ).value;
                  addToQueue(email);
                }}>+</button
              >
            </div>
          {/if}
        {/each}
        <!-- <div class="group-add">
          <form on:submit|preventDefault={() => addToQueue(customGroupEmail)}>
            <label>
              Add a different group:
              <input
                type="text"
                bind:value={customGroupEmail}
                placeholder="something@innovationcharter.org"
              />
            </label>
            <button class="small" on:click={() => addToQueue(customGroupEmail)}
              >+</button
            >
          </form>
        </div> -->
      </div>
      <div class="commit-interface">
        {#if queuedToAdd.length}
          <h3>Ready to add...</h3>
          <ul class="flex">
            {#each queuedToAdd as email}
              {@const groupInfo = groupData.find((g) => g.email == email)}
              <li>
                <span class="email">{email}</span>
                <GroupTags {groupInfo} />
                <button
                  class="small"
                  on:click={() =>
                    (queuedToAdd = queuedToAdd.filter((e) => e != email))}
                  >-</button
                >
              </li>
            {/each}
          </ul>
          {#if busyAdding}
            <Busy />
          {/if}
          <button class="red" on:click={doAdd} disabled={busyAdding}
            >Add {user.primaryEmail} to Groups</button
          >
        {/if}
      </div>
    </div>
  {/if}

  <div class="group-list area">
    <div class="current-group-area">
      <h3>Current Groups</h3>
      <ul>
        {#if groups}
          {#each groups as group}
            <GroupInfo
              onRemove={(email) => {
                console.log("Remove", email);
                if (!queuedToRemove.includes(email))
                  queuedToRemove = [...queuedToRemove, email];
              }}
              {group}
              {groupData}
              top={true}
            ></GroupInfo>
          {/each}
        {/if}
      </ul>
    </div>
    <div class="commit-removes-area">
      {#if queuedToRemove.length}
        <h3>Ready to remove...</h3>
        <ul class="flex">
          {#each queuedToRemove as email}
            {@const groupInfo = groupData.find((g) => g.email == email)}
            <li>
              <span class="email">{email}</span>
              {#if groupInfo}
                <span class="category">{groupInfo.category}</span>
                <span class="kind">{groupInfo.kind}</span>
              {/if}
              <button
                class="small"
                on:click={() =>
                  (queuedToRemove = queuedToRemove.filter((e) => e != email))}
                >-</button
              >
            </li>
          {/each}
        </ul>
        {#if busyRemoving}
          <Busy />
        {/if}
        <button class="red" on:click={doRemove} disabled={busyRemoving}
          >Remove {user.primaryEmail} from Groups</button
        >
      {/if}
    </div>
  </div>
</Block>

<style>
  ul.flex li {
    width: 320px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
    margin-bottom: 8px;
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

  li .email {
    display: inline-block;
    max-width: 130px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .group-selector {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-bottom: 8px;
    margin-top: 8px;
  }
  .group-selector label {
    text-align: right;
    width: 64px;
  }
  .group-selector select {
    width: 216px;
  }
  .group-selector button {
    width: 32px;
    height: 32px;
    box-sizing: border-box;
    display: grid;
    place-content: center;
  }
</style>
