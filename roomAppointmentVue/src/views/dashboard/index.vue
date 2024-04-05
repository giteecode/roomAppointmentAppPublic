<template>
  <div class="dashboard-container">

    <!-- <div class="dashboard-text">name: {{ name }}</div>
      <div
      class="echart"
      id="mychart"
      :style="{ float: 'left', width: '100%', height: '400px' }"
    ></div>
       <div @click="exportWord">生成</div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as echarts from "echarts";

import docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import JSZipUtils from 'jszip-utils'
import { saveAs } from 'file-saver'
import ImageModule from 'docxtemplater-image-module-free'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  myChart: null,
  data() {
    return {
      xData: ["2020-02", "2020-03", "2020-04", "2020-05"], //横坐标数据
      yData: [30, 132, 80, 134] //纵坐标数据，与横坐标对应
    };
  },
  mounted() {
    console.log("执行了mounted")
    // this.initEcharts();
  },
  methods: {
    initEcharts() {
      const option = {
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {},
        legend: {
          data: ["销量"]
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar", //类型为柱状图
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };
      this.myChart = echarts.init(document.getElementById("mychart"));// 图标初始化
      this.myChart.setOption(option);// 渲染页面
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        this.myChart.resize();
      });

    },
    // 导出echarts图片，格式转换
    base64DataURLToArrayBuffer(dataURL) {
      const base64Regex = /^data:image\/(png|jpg|svg|svg\+xml);base64,/;
      if (!base64Regex.test(dataURL)) {
        return false;
      }
      const stringBase64 = dataURL.replace(base64Regex, "");
      let binaryString;
      if (typeof window !== "undefined") {
        binaryString = window.atob(stringBase64);
      } else {
        binaryString = new Buffer(stringBase64, "base64").toString("binary");
      }
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        const ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
      }
      return bytes.buffer;
    },
    // 导出文档
    exportWord() {

      // 点击导出word
      let _this = this;
      // 读取并获得模板文件的二进制内容
      JSZipUtils.getBinaryContent("/simple.docx", function (error, content) {
        // exportTemplate.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
        // 抛出异常
        if (error) {
          throw error;
        }
        // 图片处理
        let opts = {}
        opts.centered = true;  // 图片居中，在word模板中定义方式为{%%image}
        opts.fileType = "docx";
        opts.getImage = function (chartId) {
          console.log("执行了");
          return _this.base64DataURLToArrayBuffer(chartId);
        }
        opts.getSize = function () {
          return [1000, 400]
        }
        let imageModule = new ImageModule(opts);
        // 创建一个PizZip实例，内容为模板的内容
        let zip = new PizZip(content);
        // 创建并加载docxtemplater实例对象
        let doc = new docxtemplater();
        doc.attachModule(imageModule);
        doc.loadZip(zip);

        // 设置模板变量的值
        doc.setData({
          description: "测试文案",
          img: _this.myChart.getDataURL() // 获取echarts图片
        });

        try {
          // 用模板变量的值替换所有模板变量
          doc.render();
        } catch (error) {
          // 抛出异常
          let e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties
          };
          throw error;
        }
        // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
        let out = doc.getZip().generate({
          type: "blob",
          mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        });
        // 将目标文件对象保存为目标类型的文件，并命名
        saveAs(out, "exportDocx.docx");
      });
    }
  }


}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
