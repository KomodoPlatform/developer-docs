<template>
  <main class="home" aria-labelledby="main-title">
    <div class"wrapper">
    <header class="hero">
      <img
        v-if="data.heroImage"
        :src="$withBase(data.heroImage)"
        :alt="data.heroAlt || 'hero'"
      >

      <h1 v-if="data.heroText !== null" id="main-title">{{ data.heroText || $title || 'Hello' }}</h1>

      <h6 class="description">
        {{ data.tagline || $description || 'Welcome to your VuePress site' }}
      </h6>

      <p
        class="action"
        v-if="data.actionText && data.actionLink"
      >
        <NavLink
          class="action-button"
          :item="actionLink"
        />
      </p>
    </header>

    <div class="textHeader">
      <h1 v-if="data.mainHeader">{{ data.mainHeader }}</h1>
      <div style="width: 4rem; height: .5rem; margin: .1rem 0rem 2rem .3rem; background-color: #18F4BF;"></div>
    </div>

    <div class="textContent">  
      <p v-if="data.description">{{ data.description }}</p>
      <pre v-if="data.bullets">{{ data.bullets }}</pre>
      <p v-if="data.closing"> {{ data.closing }} </p>     
    </div>
    </div>



    <div
      class="features"
      v-if="data.shortcuts && data.shortcuts.length"
    >
      <div
        class="feature"
        v-for="(shortcut, index) in data.shortcuts"
        :key="index"
      >
        <h2 v-if="shortcut.title">{{ shortcut.title }}</h2>
        <p v-if="shortcut.description">{{ shortcut.description }}</p>              
        <p
            
            v-if="shortcut.linkText && shortcut.link"
        >
            <div>
            <button @click="$router.push(shortcut.link)">{{ shortcut.linkText }}</button>
            </div>            
        </p>            
      </div>
    </div>

    <div
      class="features"
      v-if="data.features && data.features.length"
    >
      <div
        class="feature"
        v-for="(feature, index) in data.features"
        :key="index"
      >
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.details }}</p>        
      </div>
    </div>

    <Content class="custom"/>    

    <div
      class="footer"
      v-if="data.footer"
    >
      {{ data.footer }}
    </div>
  </main>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue'

export default {
  components: { NavLink },

  computed: {
    data () {
      return this.$page.frontmatter
    },

    actionLink () {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      }
    }           
  }
}
</script>

<style lang="stylus">
.home
  padding $navbarHeight 2rem 0
  max-width 960px
  margin 0px auto
  display block
  background-color #222832
  .wrapper
    display flex
    flex-wrap wrap
    align-items flex-start
    align-content stretch
    justify-content space-between
  .hero
    text-align center
    flex-grow 1
    flex-basis 30%
    max-width 30%
    img
      max-width: 50%
      max-height 180px
      display block
      margin 3rem auto 1.5rem
    h1
      font-size 3rem
    h1, .description, .action
      margin 1.8rem auto
    .description
      max-width 35rem
      font-size 1.6rem
      line-height 1.3
      color lighten($textColor, 40%)
    .action-button
      display inline-block
      font-size 1.2rem
      color #fff
      background-color $borderColor
      padding 0.8rem 1.6rem
      border-radius 4px
      transition background-color .1s ease
      box-sizing border-box
      border-bottom 1px solid darken($borderColor, 10%)
      &:hover
        background-color lighten($borderColor, 10%)
  .textHeader
    flex-grow 1
    flex-basis 30%
    max-width 30%
  .textContent
  flex-grow 1
    flex-basis 30%
    max-width 30%        
  .features
    border-top 1px solid $borderColor
    padding 1.2rem 0
    margin-top 2.5rem
    display flex
    flex-wrap wrap
    align-items flex-start
    align-content stretch
    justify-content space-between
  .feature
    flex-grow 1
    flex-basis 30%
    max-width 30%
    h2
      font-size 1.4rem
      font-weight 500
      border-bottom none
      padding-bottom 0
      color lighten($textColor, 10%)
    p
      color lighten($textColor, 25%)      
    button 
        display inline-block
        font-size 0.9em
        color #fff
        background-color $borderColor
        padding 0.4em 0.8em
        border-radius 4px
        transition background-color .1s ease
        box-sizing border-box
        border none
        &:hover
            background-color lighten($borderColor, 10%)   
  .footer
    padding 2.5rem
    border-top 1px solid $borderColor
    text-align center
    color lighten($textColor, 25%)

@media (max-width: $MQMobile)
  .home
    .features
      flex-direction column
    .feature
      max-width 100%
      padding 0 2.5rem

@media (max-width: $MQMobileNarrow)
  .home
    padding-left 1.5rem
    padding-right 1.5rem
    .hero
      img
        max-height 210px
        margin 2rem auto 1.2rem
      h1
        font-size 2rem
      h1, .description, .action
        margin 1.2rem auto
      .description
        font-size 1.2rem
      .action-button
        font-size 1rem
        padding 0.6rem 1.2rem
    .feature
      h2
        font-size 1.25rem
</style>