<script lang="ts">
  import { onMount } from "svelte";
  import { GoogleAppsScript } from "./gasApi";
  import Busy from "./Busy.svelte";
  export let user;
  let emailBody = "";
  let extraBody = "";
  let emailSections = [];
  let included = {};

  function resetForUser() {
    result = false;
    sending = false;
  }

  $: resetForUser(user);

  async function doSend() {
    sending = true;
    try {
      result = await GoogleAppsScript.sendEmail(
        user.primaryEmail,
        subject,
        emailBody,
        cc
      );
      console.log("Got result", result);
      result = result;
    } catch (err) {
      console.error("Error sending email", err);
      result = err;
    }
    sending = false;
  }

  async function getEmailSections() {
    emailSections = await GoogleAppsScript.getEmailConfig();
    for (let section of emailSections) {
      if (section.default) {
        included[section.header] = true;
      }
    }
    let subjectSection = emailSections.find((s) => s.header == "Subject");
    if (subjectSection) {
      subject = subjectSection.html;
    }
  }

  function buildEmailBody(force1, force2, force3) {
    emailBody = "";
    for (let section of emailSections) {
      if (
        included[section.header] &&
        section.header != "Signature" &&
        section.header != "Subject"
      ) {
        emailBody += section.html;
      }
    }
    if (extraBody) {
      emailBody += `<p>${extraBody}</p>`;
    }
    let sig = emailSections.find((s) => s.header == "Signature");
    if (included["Signature"] && sig) {
      emailBody += sig.html;
    }
  }

  $: buildEmailBody(included, emailSections, extraBody);

  onMount(async () => {
    getEmailSections();
  });
  let cc = "";
  let subject = "";

  let sending = false;
  let result = null;
</script>

<div class="area">
  <div class="email-config">
    <button on:click={getEmailSections}>Reload template</button>
    {#each emailSections as section}
      {#if section.header != "Subject"}
        <div class="section">
          <label
            ><input type="checkbox" bind:checked={included[section.header]} />
            {section.header}</label
          >
        </div>
      {/if}
    {/each}
    <label>
      Extra text:
      <textarea bind:value={extraBody}></textarea>
    </label>
  </div>
  <div class="send">
    <div class="mock-email header">
      <table>
        <tr>
          <td>Subject:</td>
          <td><input bind:value={subject} /></td>
        </tr>
        <tr>
          <td>To:</td>
          <td>{user.primaryEmail}</td>
        </tr>
        <tr>
          <td>CC:</td>
          <td><input bind:value={cc} /></td>
        </tr>
      </table>
    </div>
    <div class="mock-email body">
      {@html emailBody}
    </div>
    {#if sending}
      <Busy />
    {:else if result}
      <div class="result">
        <p>Done sending!</p>
        <p>Result: {result}</p>
        <button on:click={() => (result = null)}>Clear</button>
      </div>
    {:else}
      <button class="red" on:click={doSend}>Send Email</button>
    {/if}
  </div>
</div>

<style>
  input[type="checkbox"] {
    -webkit-appearance: checkbox;
    appearance: checkbox;
  }
  input[type="checkbox"]:checked::after {
    content: "";
    background: none;
  }
</style>
