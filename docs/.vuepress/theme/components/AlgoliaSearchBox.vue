<template>
  <form
    id="search-form"
    class="algolia-search-wrapper search-box"
    role="search"
  >
    <input
      id="algolia-search-input"
      class="search-query"
    >
  </form>
</template>

<script>
export default {
  props: ['options'],

  mounted () {
    this.initialize(this.options, this.$lang)
  },

  methods: {
    initialize (userOptions, lang) {
      Promise.all([
        import(/* webpackChunkName: "docsearch" */ 'docsearch.js/dist/cdn/docsearch.min.js'),
        import(/* webpackChunkName: "docsearch" */ 'docsearch.js/dist/cdn/docsearch.min.css')
      ]).then(([docsearch]) => {
        docsearch = docsearch.default
        const { algoliaOptions = {}} = userOptions
        docsearch(Object.assign(
          {},
          userOptions,
          
          {
            inputSelector: '#algolia-search-input',
            debug: true,
            // #697 Make docsearch work well at i18n mode.
            algoliaOptions: Object.assign({
              'facetFilters': [`lang:${lang}`].concat(algoliaOptions.facetFilters || [])
            }, algoliaOptions)
          }
        ))
      })
    },

    update (options, lang) {
      this.$el.innerHTML = '<input id="algolia-search-input" class="search-query">'
      this.initialize(options, lang)
    }
  },

  watch: {
    $lang (newValue) {
      this.update(this.options, newValue)
    },

    options (newValue) {
      this.update(newValue, this.$lang)
    }
  }
}
</script>

<style lang="stylus">

@require '../styles/algolia-styles.styl'

.algolia-search-wrapper
  .algolia-autocomplete
    .ds-dropdown-menu
      background-color #FFFFFF
      border 1px solid $borderColor      
      &:before
        border-color $borderColor     
      .ds-suggestion
        border-bottom 1px solid $borderColor
      .ds-dataset-1
        background-color #2C313B            
    .algolia-docsearch-suggestion--highlight
      color $accentColor
    .algolia-docsearch-suggestion--content
      background-color #2C313B  
    .algolia-docsearch-suggestion
      border-color $borderColor      
      .algolia-docsearch-suggestion--category-header        
        background $borderColor
        color #fff
        .algolia-docsearch-suggestion--highlight
          background rgba(255, 255, 255, 0.6)      
      .algolia-docsearch-suggestion--title        
        color $textColor
      .algolia-docsearch-suggestion--text
        color #b3b3b3
        .algolia-docsearch-suggestion--highlight
          color $accentColor
      .algolia-docsearch-suggestion--subcategory-column
        border-color $borderColor
        background #000000        
      .algolia-docsearch-suggestion--subcategory-column-text
        color #FFF
    .algolia-docsearch-footer      
      border-color $borderColor             
    .ds-cursor .algolia-docsearch-suggestion--content
      background-color #2D6464 !important
      color $textColor

@media (max-width: $MQMobile)
  .algolia-search-wrapper
    .algolia-docsearch-suggestion--wrapper
      background #2C313B !important   
    .algolia-docsearch-suggestion--subcategory-column
      background #2C313B !important
    
</style>