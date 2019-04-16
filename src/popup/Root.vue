<template>
    <div></div>
      <el-button type="primary" @click="tab">New tab</el-button>
</template>
<script>
  export default {
    data: () => ({
    }),
    computed: { },
    created () { },
    mounted () { },
    methods: {
      tab () {
        chrome.tabs.create({ url: 'pages/app.html' });
      }
    }
  };
</script>
<style lang="scss">
  div {
    color: blue
  }
</style>