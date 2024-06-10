<script lang="ts">
  import { parseContext } from "./lib/parseContext";
  import { GoogleAppsScript } from "./gasApi";
  import { onMount } from "svelte";
  import Busy from "./Busy.svelte";

  let organizations = [];
  let departments = [];
  let titles = [];
  let ous = [];
  onMount(async () => {
    try {
      ous = await GoogleAppsScript.getOUs();
    } catch (e) {
      console.error(e);
    }
    try {
      organizations = await GoogleAppsScript.getOrganizations();
    } catch (e) {
      console.error(e);
    }
    try {
      departments = await GoogleAppsScript.getDepartments();
    } catch (e) {
      console.error(e);
    }
    try {
      titles = await GoogleAppsScript.getTitles();
    } catch (e) {
      console.error(e);
    }
  });

  export let username;
  export let onUserCreated = (user) => {};
  import { generatePassword } from "./lib/password";

  async function createUser() {
    let createdUser = await GoogleAppsScript.createUser(newUser);
    onUserCreated(createdUser);
  }

  let newUser = {
    primaryEmail: "",
    password: generatePassword(),
    suspended: false,
    orgUnitPath: ous[0],
    organizations: {
      name: "",
      title: "",
      department: "",
    },
    name: {
      givenName: "",
      familyName: "",
    },
  };

  $: newUser.primaryEmail = username + "@innovationcharter.org";

  function isValid(user) {
    return (
      user.primaryEmail &&
      user.password &&
      user.name.givenName &&
      user.name.familyName
    );
  }
</script>

<div>
  <label
    >Username:
    <input type="text" bind:value={username} />
  </label>
  <label>
    Organization Unit:
    {#if ous.length}
      <select bind:value={newUser.orgUnitPath}>
        {#each ous as ou}
          <option value={ou}>{ou}</option>
        {/each}
      </select>
    {:else}
      <input
        type="text"
        placeholder="/Staff/"
        bind:value={newUser.orgUnitPath}
      />
    {/if}
  </label>
  <label>
    First name:
    <input type="text" bind:value={newUser.name.givenName} />
  </label>
  <label>
    Last name:
    <input type="text" bind:value={newUser.name.familyName} />
  </label>
  <label>
    Password:
    <input type="text" bind:value={newUser.password} />
    <button on:click={() => (newUser.password = generatePassword())}>
      ⟳
    </button>
  </label>
  <label>
    Organization:
    {#if organizations.length}
      <select bind:value={newUser.organizations.name}>
        {#each organizations as org}
          <option value={org}>{org}</option>
        {/each}
      </select>
    {:else}
      <input
        type="text"
        bind:value={newUser.organizations.name}
        placeholder="HS"
      />
    {/if}
  </label>
  <label>
    Title:
    {#if titles.length}
      <select bind:value={newUser.organizations.title}>
        {#each titles as title}
          <option value={title}>{title}</option>
        {/each}
      </select>
    {:else}
      <input
        type="text"
        bind:value={newUser.organizations.title}
        placeholder="Teacher"
      />
    {/if}
  </label>
  <label>
    Department:
    {#if departments.length}
      <select>
        {#each departments as department}
          <option value={department}>{department}</option>
        {/each}
      </select>
    {:else}
      <input
        type="text"
        bind:value={newUser.organizations.department}
        placeholder="Science"
      />
    {/if}
  </label>
  <button on:click={createUser} class="red" disabled={!isValid(newUser)}
    >Create User</button
  >
</div>

<style>
  label {
    display: grid;
    grid-template-columns: 80px 30em 32px;
    place-items: start;
    margin-bottom: 8px;
  }
  label input {
    width: 28em;
  }
</style>
