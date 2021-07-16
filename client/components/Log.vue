<template>
  <div :class="`log log-${$props.log.verb}`">
    <p class="logtext">
      {{ $props.log.id }}. {{ $props.log.log }}
    </p>
    <span class="logtype">{{ $props.log.type }}</span>
  </div>
</template>

<script>
export default {
  name: "Log",
  props: {
    log: Object
  }
}
</script>

<style scoped>
  .log {
    font-size: 24px;
    padding: 1rem;
    border: 1px solid white;
    border-radius: 1rem;
    font-weight: bolder;
    transition: all 250ms ease;
    margin: 1.5rem 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .log-GET { background: green; }
  .log-POST { background: #135dbe; }
  .log-PUT, .log-PATCH { background: #471381; }
  .log-DELETE { background: firebrick; }

  .logtype {
    border: 1px solid #464646;
    display: inline-block;
    padding: 0.5rem;
    background: #464646;
    border-radius: 0.5rem;
  }
</style>