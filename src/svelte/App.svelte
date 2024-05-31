<script lang="ts">
  import GroupInfo from "./GroupInfo.svelte";

  import {
    Block,
    Icon,
    account_circle,
  } from "google-apps-script-svelte-components";
  import { parseContext } from "./lib/parseContext";
  import { GoogleAppsScript } from "./gasApi";
  import { onMount } from "svelte";
  let email;
  let contextString = `<? context ?>`;
  let context = parseContext(contextString);
  let username: string;
  let validUser: null | GoogleAppsScript.AdminDirectory.User;
  onMount(async () => {
    email = await GoogleAppsScript.getActiveUserEmail();
  });
  async function lookupUser() {
    validUser = await GoogleAppsScript.lookupAccount(username);
  }
  let groups = [];
  let inheritedGroups = [];
  let groupsUser;
  async function lookupGroups() {
    const result = await GoogleAppsScript.getGroups(validUser.primaryEmail);
    groupsUser = validUser.primaryEmail;
    groups = result;
  }

  $: if (groupsUser != validUser?.primaryEmail) {
    groups = [];
    groupsUser = "";
  }

  $: console.log(validUser);
</script>

<div class="page">
  <h1>Onboarding Form</h1>
  <p>Logged in as {email}</p>
  <Block>
    <h2>User</h2>
    <div class="flex-line">
      <Icon fontSize="32px" icon={account_circle.round} /><input
        type="text"
        placeholder="Enter username"
        bind:value={username}
      />@innovationcharter.org
      <button class="action" on:click={lookupUser}>Look Up</button>
    </div>
  </Block>
  {#if validUser}
    <Block>
      <div class="card">
        <div class="header">
          <h2>{validUser.name.fullName}</h2>
        </div>
        <div class="grid">
          <img src={validUser.thumbnailPhotoUrl} alt="User Photo" />
          <div>
            <p>Email: {validUser.primaryEmail}</p>
            {#if validUser.isMailboxSetup}
              <p>Mailbox is setup</p>
            {/if}
            {#if validUser.isAdmin}
              ADMIN
            {/if}
            {#if validUser.recoveryEmail}
              Recovery: {validUser.recoveryEmail}
            {/if}
          </div>
        </div>
      </div>
    </Block>
    <Block>
      <h2>Groups</h2>
      <button class="action" on:click={lookupGroups}>Lookup Groups</button>
      {#if validUser?.primaryEmail == groupsUser}
        <div class="group-add">
          <label>
            Add Group:
            <input type="text" />
          </label>
          <button on:click={() => window.alert("fix me")}>Add to Group</button>
        </div>
      {/if}
      <ul>
        {#each groups as group}
          <GroupInfo {group} top={true}></GroupInfo>
        {/each}
      </ul>
    </Block>
  {/if}

  <div class="footer">
    <span class="gray">
      Created with
      <a
        target="_blank"
        href="https://github.com/thinkle/Google-Apps-Script-Svelte-Starter"
      >
        Google Apps Script + Svelte Starter Kit
      </a>
      by
      <a target="_blank" href="https://www.tomhinkle.net"> Tom Hinkle </a>
    </span>
  </div>
</div>

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
