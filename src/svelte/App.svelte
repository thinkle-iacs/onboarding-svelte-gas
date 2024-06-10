<script lang="ts">
  import EmailSender from "./EmailSender.svelte";

  import CalendarsForUser from "./CalendarsForUser.svelte";

  import UserInfo from "./UserInfo.svelte";

  import Error from "./Error.svelte";

  import GroupsForUser from "./GroupsForUser.svelte";

  import {
    Block,
    Icon,
    account_circle,
  } from "google-apps-script-svelte-components";

  import { parseContext } from "./lib/parseContext";
  import { GoogleAppsScript } from "./gasApi";
  import { onMount } from "svelte";
  import Busy from "./Busy.svelte";
  let email;
  let contextString = `<?= context ?>`;
  let context = parseContext(contextString);
  let username: string;
  console.log("Got context string", contextString);
  console.log("parsed:", context);
  if (context.params) {
    console.log("Got params", context.params);
    if (context.params.find((p) => p[0] == "u")) {
      let usernameParam = context.params.find((p) => p[0] == "u");
      username = usernameParam.split("=")[1];
    }
  }
  let lookingUpUser = false;

  let validUser: null | GoogleAppsScript.AdminDirectory.User;
  let sheetUrl: string = "";
  let error = null;
  let authorized = false;
  onMount(async () => {
    authorized = await GoogleAppsScript.isAuthorized();
    console.log("Got auth:", authorized);
    email = await GoogleAppsScript.getActiveUserEmail();
    console.log("Got login email:", email);
    sheetUrl = await GoogleAppsScript.getConfigSheetUrl();
    console.log("Got sheet url:", sheetUrl);
  });
  async function lookupUser() {
    validUser = null;
    lookingUpUser = true;
    error = null;
    try {
      validUser = await GoogleAppsScript.lookupAccount(username);
    } catch (err) {
      error = err;
    }
    lookingUpUser = false;
  }

  $: console.log(validUser);
  const USERINFO = 0;
  const GROUPS = 1;
  const CALENDARS = 2;
  const WELCOME = 3;
  let activeTab: number = USERINFO;
</script>

<div class="page">
  <h1>Onboarding Form</h1>

  <Block>
    {#if !authorized}
      {#if email}
        <p>Logged in as {email}</p>
        <div class="error">
          <p>
            You are not authorized to view this page. Please contact your
            administrator.
          </p>
        </div>
      {:else}
        <Busy></Busy>
      {/if}
    {/if}
  </Block>
  {#if authorized}
    {#if sheetUrl}
      <a href={sheetUrl} target="_blank">Configuration and Logging Info here</a>
    {/if}
    <Block>
      <h2>User</h2>
      <form on:submit|preventDefault={lookupUser}>
        <div class="flex-line">
          <Icon fontSize="32px" icon={account_circle.round} /><input
            type="text"
            placeholder="Enter username"
            disabled={lookingUpUser}
            bind:value={username}
          />@innovationcharter.org
          <button
            class="action"
            on:click={lookupUser}
            disabled={lookingUpUser || !username}>Look Up</button
          >
        </div>
      </form>
    </Block>
    {#if lookingUpUser}
      <Busy></Busy>
    {/if}
    <Error {error}></Error>
    {#if validUser}
      <div class="tabs">
        <button
          class="tab"
          class:active={activeTab == USERINFO}
          on:click={() => (activeTab = USERINFO)}
        >
          User Info</button
        >
        <button
          class="tab"
          class:active={activeTab == GROUPS}
          on:click={() => (activeTab = GROUPS)}>Groups</button
        >
        <button
          class="tab"
          class:active={activeTab == CALENDARS}
          on:click={() => (activeTab = CALENDARS)}>Calendars</button
        >
        <button
          class="welcome"
          class:active={activeTab == WELCOME}
          on:click={() => (activeTab = WELCOME)}>Welcome Email</button
        >
      </div>
      <div class:hidden={activeTab != USERINFO}>
        <UserInfo user={validUser}></UserInfo>
      </div>
      <div class:hidden={activeTab != GROUPS}>
        <GroupsForUser user={validUser}></GroupsForUser>
      </div>
      <div class:hidden={activeTab != CALENDARS}>
        <CalendarsForUser user={validUser}></CalendarsForUser>
      </div>
      <div class:hidden={activeTab != WELCOME}>
        <EmailSender user={validUser}></EmailSender>
      </div>
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
  {/if}
</div>

<style>
  .flex-line {
    display: flex;
    align-items: center;
    gap: 8px;
  }
</style>
