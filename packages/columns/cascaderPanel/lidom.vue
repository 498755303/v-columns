<template>
  <li class="columns-panel__list"
      @click.stop="liClick">
    {{data.text}}
  </li>
</template>
<script>
export default {
  name: 'LiDom',
  data() {
    return {
    }
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    index: {
      type: [Number, String]
    }
  },
  methods: {
    liClick() {
      this.$emit('liClick', this.data);
    }
  }
}
</script>
<style lang="less" scoped>
.columns-panel__list {
  line-height: 30px;
  font-size:14px;
  cursor:pointer;
  &:hover{
    background-color:aliceblue;
  }
}
</style>style