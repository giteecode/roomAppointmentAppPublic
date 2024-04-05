<template>
  <div class="select-checked">
    <el-select
      :value="selected"
      :class="{ all: optionsAll }"
      multiple
      placeholder="请选择"
      :popper-append-to-body="false"
    >
      <el-option :value="''" label="全部" class="multiple">
        <el-checkbox v-model="optionsAll" @change="handleoptionsAllChange">
          全部
        </el-checkbox>
      </el-option>
      <el-option
        class="multiple"
        :value="item.value"
        :label="item.label"
        v-for="(item, key) in optionsData"
        :key="key"
      >
        <el-checkbox v-model="item.check" @change="handleTaskItemChange(item)">
          {{ item.label }}
        </el-checkbox>
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { array } from "yargs";

export default {
  name: "Select",
  components: {},
  props: {
    options: {
      type: Array,
    },
    checkedKey: {
      type: Array,
    },
  },

  data() {
    return {
      optionsData: [],
      optionsAll: true,
      selectedOptions: [],
    };
  },
  watch: {
    options: {
      handler(newVal) {
        this.optionsData = newVal;
        newVal.forEach((item) => {
          item.check = this.selectedOptions.some((x) => x == item.value);
        });
      },
      immediate: true,
      // deep: true, // 深度监听
    },
    checkedKey: {
       immediate: true,
      handler(newVal) {
        this.selectedOptions = newVal;
        this.optionsData.forEach((item) => {
          item.check = this.selectedOptions.some((x) => x == item.value);
        });
      },
    },
  },
  computed: {
    selected() {
      if (this.selectedOptions.length === this.options.length) {
        return [""];
      } else {
        return this.selectedOptions;
      }
    },
  },
  methods: {
    handleoptionsAllChange(isAll) {
      if (isAll) {
        this.optionsData.forEach((elm, idx) => {
          elm.check = true;
          this.selectedOptions.push(elm.value);
        });
      } else {
        this.optionsData.forEach((elm, idx) => {
          elm.check = false;
        });
        this.selectedOptions = [];
      }
      this.$props.checkedKey=this.selectedOptions;
      this.$emit("selected", this.selectedOptions);
    },
    handleTaskItemChange(item) {
      // console.log(item)
      // 这里是取出下标的方法，可以封装写出去
      Array.prototype.getArrayIndex = function (obj) {
        for (var i = 0; i < this.length; i++) {
          if (this[i] === obj) {
            return i;
          }
        }
        return -1;
      };
      if (!item.check) {
        this.optionsData.forEach((elm, idx) => {
          if (item.value == elm.value) {
            let index = this.selectedOptions.getArrayIndex(item.value);
            this.selectedOptions.splice(index, 1);
          }
        });
      } else {
        this.optionsData.forEach((elm, idx) => {
          if (item.value == elm.value) {
            this.selectedOptions.push(elm.value);
          }
        });
      }
      this.optionsAll = this.selectedOptions.length === this.optionsData.length;
      // console.log(this.selectedOptions, this.optionsData)
         this.$props.checkedKey=this.selectedOptions;
      this.$emit("selected", this.selectedOptions);
    },
  },
};
</script>

<style lang="scss">
.select-checked {
  .el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after {
    content: "";
  }
  .el-checkbox {
    width: 100%;
    padding: 0 30px;
    .el-checkbox__label {
      margin-left: 20px;
    }
  }
  .el-select-dropdown__item {
    padding: 0;
  }
  .el-tag__close,
  .el-icon-close {
    display: none;
  }
  .el-tag.el-tag--info {
    background: transparent;
    border: 0;
  }

  .el-select {
    .el-select__tags {
      flex-wrap: nowrap;
      overflow: hidden;
    }
    .el-tag {
      background-color: #fff;
      border: none;
      color: #606266;
      font-size: 13px;
      padding-right: 0;
      & ~ .el-tag {
        margin-left: 0;
      }
      &:not(:last-child)::after {
        content: ",";
      }
    }
  }
}
</style>
