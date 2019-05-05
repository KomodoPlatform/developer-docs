<template>
  <div class="theme-container">
    <div class="content">
      <h1>404</h1>
      <blockquote>{{ getMsg() }}</blockquote>
      <blockquote>{{ getUrl() }}</blockquote>
      <AlgoliaSearchBox
        v-if="isAlgoliaSearch"
        :options="algolia"
      />
      <router-link to="/">Take me home.</router-link>
    </div>
  </div>
</template>

<script>

import AlgoliaSearchBox from '@theme/components/AlgoliaSearchBox'

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
