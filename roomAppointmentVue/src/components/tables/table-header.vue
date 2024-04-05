<template>
  <div class="tb-body" >
  
  </div>
</template>

<script>
import { post } from "@/utils/http";
import { formatDateTime } from "@/utils/index";
import store from "@/store";
import { boolean } from "yargs";
export default {
  filters: {
    formatDateTimefilter: (value) => formatDateTime(value),
  },
  props: {
    url: {
      type: String,
      default: "",
    },
    column: {
      type: Array,
    },
    normalLoad:{
      type:Boolean,
      default:true
    },
    where:{},
    
    
  },

  data() {
    return {
    
    };
  },

  created() {
    
  },
  methods: {

  },
};
</script>

<style scoped>
.custom-pagination {
  margin-top: 20px;
}
.tb-body{
  padding:20px 0px;
}
</style>
