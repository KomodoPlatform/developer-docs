<template>  
  <div >
    <button @click="$router.push(vLink)">{{ vTitle }}</button>    
  </div>
</template>

<script>

  export default {
    props: ['title','link'],

    data() {
      return {
        vTitle: this.title,
        vLink: this.link
      };
    }
  }

</script>

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