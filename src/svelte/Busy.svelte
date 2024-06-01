<script lang="ts">
</script>

<div class="busy">
  <span>.</span><span>.</span><span>.</span>
</div>

<style>
  .busy span {
    animation: hop 1s infinite;
    display: inline-block;
    font-weight: bold;
    font-size: 64px;
    color: #333;
    font-family: Impact;
    display: inline-block;
    font-weight: bold;
    font-size: 64px;
    color: #333;
    font-family: sans-serif;
    width: 8px;
    height: 8px;
    background-color: #333;
    border-radius: 50%;
    color: transparent;
    margin-right: 8px;
    margin-top: 16px;
  }
  .busy span:nth-child(2) {
    animation-delay: 0.15s;
  }
  .busy span:nth-child(3) {
    animation-delay: 0.3s;
  }
  @keyframes hop {
    0%,
    20% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
  }
</style>
