<template>
  <el-select
    ref="select"
    v-model="formData"
    :disabled="config.disabled"
    :multiple="config.multiple"
    :placeholder="config.placeholder"
    :clearable="true"
    :collapse-tags="config.collapseTags"
    filterable
    :size="config.size"
    @visible-change="handleOptionHidden"
  >
    <el-option value="" style="display: none;" />
    <el-option
      v-for="(item, itemIndex) in options"
      :key="itemIndex"
      style="display: none;"
      :label="item[getTreeProps.label]"
      :value="item[getNodekey]"
    />
    <el-tree
      ref="tree"
      :data="treeData"
      :node-key="getNodekey"
      :show-checkbox="config.multiple"
      :default-expand-all="computeBoolen(config.defaultExpandAll, false)"
      :expand-on-click-node="false"
      :props="getTreeProps"
      :highlight-current="true"
      class="select-tree"
      @check="handleCheckChange"
      @node-click="handleNodeClick"
    >
      <template slot-scope="{ node, data }" class="tree-node">
        <span style="margin-left: 10px;font-size: 14px;">{{ data[getTreeProps.label] }}</span>
      </template>
    </el-tree>
  </el-select>

  <!-- <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree> -->
</template>

<script>
// {
//   disabled: false,
//   multiple: true,
//   dic: {
//     data: [],
//     value: "value",
//     label: "label",
//     children: "children",
//     defaultExpandAll: false,
//   }
// }
import mixinComponent from '../../common/xMixin'
export default {
  name: 'XTree',
  mixins: [mixinComponent()],
  data() {
    return {
      treeData: []
    }
  },
  computed: {
    getNodekey() {
      if (this.config.dic.value) {
        return this.config.dic.value
      }
      return 'value'
    },
    getTreeProps() {
      const defaultProps = {
        children: 'children',
        label: 'label'
      }
      if (this.config.dic.label) defaultProps.label = this.config.dic.label
      if (this.config.dic.children) defaultProps.children = this.config.dic.children
      return defaultProps
    },
    // 树转list
    options() {
      const arr = []
      function getList(source) {
        source.forEach(item => {
          arr.push(item)
          if (item.children) getList(item.children)
        })
      }
      if (this.formData) {
        getList(this.treeData)
        return arr.filter(item => this.formData.includes(item[this.getNodekey]))
      }
      return []
    }
  },
  watch: {
    // remove tag时同步tree
    formData: {
      handler: function(val) {
        const data = this.config.multiple ? val : [val]
        if (val !== null && val !== undefined && val !== '' && data.length) {
          this.$nextTick().then(() => {
            this.$refs.tree.setCheckedKeys(data)
          })
        }
      },
      immediate: true
    },
    // 初始化时父级的tree可能没有数据，所以要watch
    config: {
      handler: function(val) {
        const dic = this.config.dic
        if (dic instanceof Array) {
          this.treeData = dic
        } else if (dic instanceof Object) {
          this.treeData = dic.data
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 单选时
    handleNodeClick(data) {
      if (!this.config.multiple) {
        this.formData = data[this.getNodekey]
        this.$refs.select.blur()
      }
    },
    // 多选时
    handleCheckChange(clickNode, status) {
      if (this.config.multiple) {
        this.formData = status.checkedKeys
      } else {
        this.formData = this.$refs.tree.getCheckedKeys()[0]
      }
    },
    // disableAllTree() {
    //   disableArray(this.treeData, true);
    // },
    // enableAllTree() {
    //   disableArray(this.treeData, false);
    // },
    // // 递归
    // disableArray(arr, isDisabled) {
    //   arr.forEach(item => {
    //     item['disabled'] = isDisabled;
    //     let children = item[this.getTreeProps.children];
    //     if(children) disableArray(children, isDisabled);
    //   });
    // },
    handleOptionHidden(val) {
      if (val) {
        const data = this.config.multiple ? this.formData : [this.formData]
        this.$refs.tree.setCheckedKeys(data)
      }
    }
  }
}
</script>
<style lang="scss">
.select-tree .el-tree-node.is-current>.el-tree-node__content {
  background-color: #f5f7fa;
  font-weight: 700;
  color: #409EFF;
}
</style>
