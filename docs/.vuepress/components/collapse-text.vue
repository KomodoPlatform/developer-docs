<template>
  <div class="collapsed">
    <button @click="toggle()">{{ vHidden ? 'Show ' + vTitle : 'Hide ' + vTitle}}</button>
    <div v-show="!vHidden"><slot></slot></div>
  </div>
</template>

<style lang="stylus">
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

</style>

<script>
  /* 
   Lisense:
   https://github.com/feathers-plus/generator-feathers-plus/blob/master/LICENSE
   The MIT License (MIT)
   Copyright (c) 2018 Feathers-Plus
   Copyright (c) 2017-18 John J. Szwaronek. Licensed under the MIT license.
  
  
  
  Blank lines are required both before and after the <collapse> and </collapse> tags.
   ...
   
   
   <collapse hidden title="...">

   ...

   </collapse>

   ...
   */
  export default {
    props: ['hidden', 'title'],

    data() {
      return {
        vHidden: this.hidden !== undefined,
        vTitle: this.title
      };
    },

    methods: {
      toggle() {
        this.vHidden = !this.vHidden;
      }
    }
  }
</script>
