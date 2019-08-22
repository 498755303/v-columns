<template>
  <div id="app">
    <search-input placeholder="请输入可搜索列名称"
                  size="mini"
                  :data="searchData"
                  :prop="defaultProp"
                  @result-click="resultClick"></search-input>
    <div class="showText">
      <p>原始过滤数据</p>
      <ul>
        <li v-for="item in searchData"
            :class="{'active':item.selected}"
            :key="item.id">{{item[defaultProp.label]}}</li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      searchData: [
        {
          id: 1,
          label: "展示数",
          selected: false
        }, {
          id: 2,
          label: "点击数",
          selected: false
        }, {
          id: 3,
          label: "点击成本点击",
          selected: false
        }, {
          id: 4,
          label: "点xx击",
          selected: false
        }
      ],
      defaultProp: {
        label: "label"
      },
    }
  },
  methods: {
    resultClick(row) {
      console.log(row)
      let index;
      let tmp;
      this.searchData.forEach((v, i) => {
        if (v.id == row.data.id) {
          index = i;
          tmp = v;
        }
      })
      tmp.selected = true;
      if (index) {
        this.searchData.splice(index, 1, tmp);
      }
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.showText {
  text-align: left;
}
li.active {
  color: blue;
}
</style>
