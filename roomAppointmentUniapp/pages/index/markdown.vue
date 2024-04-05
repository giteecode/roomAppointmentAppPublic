<template>
	<view class="content">
		<cu-custom bgColor="theme-bg-color" :isBack="true">
			<block slot="backText"><text>返回</text></block>
			<block slot="content"><text> 文章内容 </text></block>
		</cu-custom>
	<div class="center" >
		<view class="title">{{article.title}}</view>
		<view class="flex  justify-between padding-tb-sm">
			<view class=" margin-xs radius">{{article.author}}</view>
			<view class=" margin-xs radius">{{article.createdAt|formatDateTime}}</view>
		</view>
		<view class="flex solid-bottom  justify-end padding-tb-sm">
			<view class=" margin-xs radius">阅读数:{{article.viewCount}}</view>
		</view>
	    <u-parse className="padding-tb-sm" :content="article.content" @preview="preview" @navigate="navigate" ></u-parse>
	<!-- <view class="flex solid-bottom  justify-end padding-tb-sm">
		<view class=" margin-xs radius" style="color:#007AFF" @click="Raise">点一个赞吧!</view>
	</view> -->
	  </div>
	  </view>
</template>

<script>	
import uParse from '@/components/u-parse/u-parse.vue'
export default{
	components:{uParse},
	data(){
		return {
			  article:{},
			  articalId:'',
		      artical: '',
			  title:'',
			  author:'',
			  readCount:"",
			  creationTimeString:""
		    }
	},
	onLoad(option){
			this.articalId = option.id;
			this.getArtical(this.articalId);
	},
	  methods: {
		  //获取文章详情
		 async getArtical(articalId){
			let url = "/article/detail?id="+articalId;
			let {
				success,
				data
			} = await this.$http.PostAsync(url,{});
			if (success == true) {
				this.article=data;
			}
		  },
		  async Raise()
		  {
			 let {success}= await this.$http.PostAsync("/Article/Raise", {id:this.articalId});
			  if(success)
			  {
				  await this.$comm.ShowToast("点赞成功");
			  }
		  },
		 //返回上一页
		 goBack() {
		 	uni.navigateBack();
		 },
	    preview(src, e) {
	      // do something
	    },
	    navigate(href, e) {
	      // do something
	    }
	  }
}
</script>

<style>
	@import url("@/components/u-parse/u-parse.css");
	.content{
			background-color: white;
	}
	.center{
		padding:20px;
		
	}
	.title{
		font-size: 40rpx;
		
	}
	.author{
		text-align: right;
		padding-bottom: 10rpx;
	}
</style>