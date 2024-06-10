<script lang="ts">
  import { onMount } from "svelte";
  import { GoogleAppsScript } from "./gasApi";
  import GroupTags from "./GroupTags.svelte";
  import Busy from "./Busy.svelte";
  import { currentCategory } from "./store";

  type CalendarResult = { email: string; calendarId: string; success: boolean };

  export let user;
  let calendars = [];
  let categories = [];

  async function getCalendars() {
    calendars = await GoogleAppsScript.getCalendarList();
    categories = Array.from(new Set(calendars.map((c) => c.category)));
    console.log("Got calendars", calendars);
  }

  onMount(() => {
    getCalendars();
  });

  let queuedEditor = [];
  let queuedViewer = [];
  $: queuedEditor = Array.from(new Set(queuedEditor));
  $: queuedViewer = Array.from(new Set(queuedViewer));
  $: queuedViewer = queuedViewer.filter((c) => !queuedEditor.includes(c));
  let adding = false;
  let results: CalendarResult[] = [];
  let doAdd = async () => {
    adding = true;
    results = [
      ...results,
      ...((await GoogleAppsScript.addReaderToCalendars(
        user.primaryEmail,
        queuedViewer.map((c) => c.id)
      )) as CalendarResult[]),
    ];
    queuedViewer = [];
    results = [
      ...results,
      ...((await GoogleAppsScript.addWriterToCalendars(
        user.primaryEmail,
        queuedEditor.map((c) => c.id)
      )) as CalendarResult[]),
    ];
    queuedEditor = [];
    adding = false;
  };
</script>

<h2>Calendars for {user.primaryEmail}</h2>
<button on:click={getCalendars}>Refresh</button>
<div class="area">
  <label>
    Show Calendars for:
    <select bind:value={$currentCategory}>
      {#each categories as category}
        <option value={category}>{category}</option>
      {/each}
    </select></label
  >
  <table>
    {#each categories as category}
      {#if category == "All" || $currentCategory == category || $currentCategory == "All"}
        <tr>
          <td colspan="3" class="category"><h3>{category}</h3></td>
        </tr>
        {#each calendars.filter((c) => c.category == category) as calendar}
          <tr>
            <td class="calendar-info"
              >{calendar.name} <GroupTags groupInfo={calendar} /></td
            >
            <td class="action-area">
              <button
                on:click={() => {
                  queuedEditor = queuedEditor.filter((c) => c != calendar);
                  queuedViewer = [...queuedViewer, calendar];
                }}>+Viewer</button
              >
            </td>
            <td class="action-area">
              <button
                on:click={() => (queuedEditor = [...queuedEditor, calendar])}
                >+Editor</button
              >
            </td>
          </tr>
        {/each}
      {/if}
    {/each}
  </table>
  <div>
    {#if queuedViewer.length || queuedEditor.length}
      <div class="actions">
        {#if queuedViewer.length}
          <h3>Add {user.primaryEmail} as <b>viewer</b> for:</h3>
          <ul>
            {#each queuedViewer as calendar}
              <li>
                {calendar.name}
                <button
                  class="small"
                  on:click={() =>
                    (queuedViewer = queuedViewer.filter((c) => c != calendar))}
                  >-</button
                >
              </li>
            {/each}
          </ul>
        {/if}
        {#if queuedEditor.length}
          <h3>Add {user.primaryEmail} as <b>editor</b> for:</h3>
          <ul>
            {#each queuedEditor as calendar}
              <li>
                {calendar.name}
                <button
                  class="small"
                  on:click={() =>
                    (queuedEditor = queuedEditor.filter((c) => c != calendar))}
                  >-</button
                >
              </li>
            {/each}
          </ul>
        {/if}
        <div class="action-area">
          <button class="red" on:click={doAdd} disabled={adding}>
            Add {user.primaryEmail} to Calendars
          </button>
        </div>
      </div>
    {/if}
    {#if adding}
      <Busy />
    {/if}
    {#if results.length}
      <h3>Results</h3>
      <table>
        {#each results as result}
          <tr>
            <td>{result.email}</td>
            <td>{result.calendarId}</td>
            <td>{result.success ? "Success" : "Failed"}</td>
            <td>{calendars.find((c) => c.id == result.calendarId).name}</td>
          </tr>
        {/each}
      </table>
      <button on:click={() => (results = [])}>Clear</button>
    {/if}
  </div>
</div>

<style>
  li {
    margin: 0.5em;
  }
  td {
    padding: 0.5em;
  }
</style>
