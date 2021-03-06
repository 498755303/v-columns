<template>
  <div class="cascader-panel-item">
    <div class="cascader-panel-item__content clearfix">
      <div class="cascader-panel-item__list-item allcheck"
           v-if="hasAllCheck && data.length">
        <el-checkbox class="cascader-panel-item__checkbox"
                     v-model="isAllCheck"
                     :disabled="isAllDisabled"
                     @change="handleAllCheckChange"></el-checkbox>
        <span class="cascader-panel-item__text"
              @click="handleAllSelected(!isAllCheck)"
              :class="{'cascader-panel-item__textChecked':isAllCheck}">全选</span>
      </div>
      <div class="cascader-panel-item__list-item"
           v-for="(item,index) in data"
           :key="item.id"
           :class="getItemClass(item)"
           @click="handleSelect(item,index,$event)">
        <el-checkbox :disabled="item.disabled"
                     class="cascader-panel-item__checkbox"
                     v-model="checkList[index].checked"
                     v-show="showCheckBox && checkList[index]"
                     @change="checked => handleChange(checked,item)"></el-checkbox>
        <span class="cascader-panel-item__text"
              :class="{'cascader-panel-item__textChecked':checkList[index].checked}">{{item.text}}</span>
        <span v-if="item.childNodes && item.childNodes.length"
              class="cascader-panel-item__toright"
              :class="{'cascader-panel-item__textChecked':checkList[index].checked}">
          <i class="el-icon-arrow-right"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CascaderItem',
  props: {
    data: {
      type: Array
    },
    level: {
      type: Number
    },
    showCheckBox: {
      type: Boolean,
      default: true
    },
    hasAllCheck: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      checkList: this.data.map(item => {
        return { checked: item.checked };
      })
    };
  },
  watch: {
    data: {
      deep: true,
      handler() {
        this.checkList = this.data.map(item => {
          return { checked: item.checked };
        });
      }
    }
  },
  computed: {
    isAllCheck: {
      get() {
        return this.checkList.every(item => item.checked);
      },
      set() {
        return false;
      }
    },
    isAllDisabled() {
      return this.data.some(item => item.disabled);
    }
  },
  methods: {
    handleSelect({ id, childNodes }, index, e) {
      if (
        (e.target.matches('.el-checkbox__original') ||
          e.target.matches('.el-checkbox__inner')) &&
        (!childNodes || !childNodes.length)
      ) {
        return;
      }
      if (this.data.find(item => item.id === id).disabled) {
        return;
      }
      // 如果是leaf节点，则相当于直接进行一次check
      if (!childNodes || !childNodes.length) {
        this.checkList[index].checked = !this.checkList[index].checked;
        this.$emit('check', this.checkList[index].checked, id);
      }
    },
    handleChange(checked, { id }) {
      this.$emit('check', checked, id);
    },
    getItemClass(item) {
      return item.selected && (item.childNodes && item.childNodes.length)
        ? 'is-select'
        : '';
    },
    handleAllCheckChange(checked) {
      this.checkList.forEach(item => {
        item.checked = checked
      });
      this.$emit('check-all', checked, this.data[0].parent.id);
    },
    // 全选选择
    handleAllSelected(checked) {
      if (!this.isAllDisabled) {
        this.handleAllCheckChange(checked)
      }
    }
  }
};
</script>

<style lang="less" scoped>
@prefix: cascader-panel-item;
.@{prefix} {
  padding: 0 10px;
  box-sizing: border-box;
}

.@{prefix}__content {
  overflow: auto;
}
.@{prefix}__list-item {
  position: relative;
  line-height: 36px;
  float: left;
  width: 50%;
  cursor: pointer;
  display: flex;
  // justify-content: space-between;
  &.is-select,
  &:hover {
    background: #f5fbff;
    z-index: 9;
  }
}

.@{prefix}__checkbox {
  // position: absolute;
  // margin-right: 10px;
}

.@{prefix}__text {
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: #1c2438;
  letter-spacing: 0;
  // line-height: 12px;
  display: inline-block;
  max-width: 85%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.@{prefix}__textChecked {
  color: #0590ff !important;
}
.@{prefix}__toright {
  // float: right;
  position: absolute;
  right: 5px;
}
</style>
