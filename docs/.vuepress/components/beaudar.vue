<template>

  <div id="comment"></div>

</template>

<script src="https://beaudar.lipk.org/client.js"
        repo="hentaicracker/blog"
        branch="vuepress"
        issue-term="pathname"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>


<script>

export default {

  name: 'Beaudar',

  methods: {

      initValine() {

          let beaudar = window.document.createElement('script')

          beaudar.type = 'text/javascript'

          beaudar.async = true

          beaudar.setAttribute('issue-term', 'pathname')

          beaudar.setAttribute('theme', 'github-light')

          beaudar.setAttribute('repo', 'hentaicracker/blog')

          beaudar.setAttribute('branch', 'vuepress')

          beaudar.crossorigin = 'anonymous'

          beaudar.src = 'https://beaudar.lipk.org/client.js'

          window.document.getElementById('comment').appendChild(beaudar)

      }

  },

  mounted() {

      this.initValine()

  }

}

</script>



<style>

.beaudar {

  position: relative;

  box-sizing: border-box;

  width: 100%;

  max-width: 760px;

  margin-left: 0;

  margin-right: auto;

}



.beaudar-frame {

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
