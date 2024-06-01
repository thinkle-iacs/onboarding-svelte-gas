<script lang="ts">
  import Error from "./Error.svelte";

  import GroupsForUser from "./GroupsForUser.svelte";

  import GroupInfo from "./GroupInfo.svelte";

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
  let contextString = `<? context ?>`;
  let context = parseContext(contextString);
  let lookingUpUser = false;
  let username: string;
  let validUser: null | GoogleAppsScript.AdminDirectory.User;
  let error = null;
  onMount(async () => {
    email = await GoogleAppsScript.getActiveUserEmail();
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
        disabled={lookingUpUser}
        bind:value={username}
      />@innovationcharter.org
      <button
        class="action"
        on:click={lookupUser}
        disabled={lookingUpUser || !username}>Look Up</button
      >
    </div>
  </Block>
  {#if lookingUpUser}
    <Busy></Busy>
  {/if}
  <Error {error}></Error>
  {#if validUser}
    <Block>
      <div class="card">
        <div class="header">
          <h2>{validUser.name.fullName}</h2>
        </div>
        <div class="flex-line">
          <img src={validUser.thumbnailPhotoUrl} alt="User Photo" />
          <div class="grid">
            <div class="label bold">Email:</div>
            <div class="email">{validUser.primaryEmail}</div>

            <div class="label bold">Account Info:</div>

            <div class="account-info">
              <div class="orgpath">{validUser.orgUnitPath}</div>
              {#if validUser.isAdmin}
                <div>Admin</div>
              {/if}
              {#if validUser.suspended}
                <div><em>Suspended</em></div>
              {/if}
            </div>
            {#if validUser.recoverEmail || validUser.recoveryPhone}
              <div class="label bold">Recovery Info:</div>
              <div></div>

              {#if validUser.recoveryEmail}
                <div class="label">Recovery Email:</div>
                <div class="recovery email">{validUser.recoveryEmail}</div>
              {/if}
              {#if validUser.recoveryPhone}
                <div class="label">Recovery Phone:</div>
                <div class="recovery phone">{validUser.recoveryPhone}</div>
              {/if}
            {/if}
            <div class="label bold">Timestamps</div>
            <div></div>
            <div class="label">Created:</div>
            <div class="created">{validUser.creationTime}</div>
            <div class="label">Last Login:</div>
            <div class="last-login">
              {validUser.lastLoginTime}
            </div>
          </div>
        </div>
      </div></Block
    >
    <GroupsForUser user={validUser}></GroupsForUser>
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
    display: grid;
    grid-template-columns: 150px 1fr;
    gap: 4px 4px;
    align-items: start;
    justify-items: start;
    margin: auto;
  }

  .label {
    text-align: right;
  }
  .bold {
    font-weight: bold;
  }
  .bold,
  .bold + * {
    margin-top: 8px;
  }
  .flex-line {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  img {
    border-radius: 50%;
  }
  .card h2 {
    text-align: center;
  }
  .card img {
    margin: auto;
  }
</style>
