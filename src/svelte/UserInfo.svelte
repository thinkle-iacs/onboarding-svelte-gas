<script lang="ts">
  export let user;
  import { Block } from "google-apps-script-svelte-components";
</script>

<Block>
  <div class="card">
    <div class="header">
      <h2>{user.name.fullName}</h2>
    </div>
    <div class="flex-line">
      <img src={user.thumbnailPhotoUrl} alt="User Photo" />
      <div class="grid">
        <div class="label bold">Email:</div>
        <div class="email">{user.primaryEmail}</div>

        <div class="label bold">Account Info:</div>

        <div class="account-info">
          <div class="orgpath">{user.orgUnitPath}</div>
          {#if user.isAdmin}
            <div>Admin</div>
          {/if}
          {#if user.suspended}
            <div><em>Suspended</em></div>
          {/if}
        </div>
        {#if user.recoverEmail || user.recoveryPhone}
          <div class="label bold">Recovery Info:</div>
          <div></div>

          {#if user.recoveryEmail}
            <div class="label">Recovery Email:</div>
            <div class="recovery email">{user.recoveryEmail}</div>
          {/if}
          {#if user.recoveryPhone}
            <div class="label">Recovery Phone:</div>
            <div class="recovery phone">{user.recoveryPhone}</div>
          {/if}
        {/if}
        <div class="label bold">Timestamps</div>
        <div></div>
        <div class="label">Created:</div>
        <div class="created">{user.creationTime}</div>
        <div class="label">Last Login:</div>
        <div class="last-login">
          {user.lastLoginTime}
        </div>
      </div>
    </div>
  </div></Block
>

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
