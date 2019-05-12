<template>
  <div class="theme-container">
    <div class="content">
      <h1>404</h1>
      <blockquote>{{ getMsg() }}</blockquote>
     <!-- <h4>developers.komodoplatform.com{{ getUrl() }} doesn't exist or it has been moved</h4> -->      
      <router-link to="/"><p>Take me home.</p></router-link>
    </div>
  </div>
</template>

<script>
const msgs = [
  `There's nothing here.`,
  `How did we get here?`,
  `That's a Four-Oh-Four.`,
  `Looks like we've got some broken links.`
]

export default {
  methods: {
    getMsg () {
      return msgs[Math.floor(Math.random() * msgs.length)]
    },
    getUrl() {
      return window.location.pathname
    }
  }
}
</script>

<style lang="stylus">

.theme-container
  min-height 100vh
  background-color #2C313B 

</style>
