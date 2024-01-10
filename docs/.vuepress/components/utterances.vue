<template>

  <div id="comment"></div>

</template>



<script>

export default {

  name: 'Utterances',

  methods: {

      initValine() {

          let utterances = window.document.createElement('script')

          utterances.type = 'text/javascript'

          utterances.async = true

          utterances.setAttribute('issue-term', 'pathname')

          utterances.setAttribute('theme', 'github-light')

          utterances.setAttribute('repo', 'hentaicracker/hentaicracker.github.io')

          utterances.crossorigin = 'anonymous'

          utterances.src = 'https://utteranc.es/client.js'

          window.document.getElementById('comment').appendChild(utterances)

      }

  },

  mounted() {

      this.initValine()

  }

}

</script>



<style>

.utterances {

  position: relative;

  box-sizing: border-box;

  width: 100%;

  max-width: 760px;

  margin-left: 0;

  margin-right: auto;

}



.utterances-frame {

  position: absolute;

  left: 0;

  right: 0;

  width: 1px;

  min-width: 100%;

  max-width: 100%;

  height: 100%;

  border: 0;

}

</style>
