<template>
	<view class="content">
		<cu-custom bgColor="theme-bg-color" :isBack="false">
			<block slot="backText"><text>返回</text></block>
			<block slot="content"><text> 首页 </text></block>
		</cu-custom>


		<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			:autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.image|pictureFilter" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-red cur':''"
					v-for="(item,index) in typeItem" :key="index" @tap="tabSelect" :data-id="index">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<view v-for="(item,index) in articalItem" :key="index" :data-id="index" @click="markdown(index)">
			<view class="cu-card article solid-bottom margin-top no-card">
				<view class="cu-item shadow">
					<view class="title">
						<view class="text-cut">{{item.title}}</view>
					</view>
					<view class="content">
						<image :src="item.imgUrl|imgUrl" mode=" scaleToFill">
						</image>
						<view class="desc">
							<view class="text-content"> {{item.content}}</view>
							<view>
								<view class="cu-tag bg-red light sm round">{{item.author}}</view>
								<view class="cu-tag bg-green light sm round">{{item.createdAt|formatDateTime}}</view>
								<view class="cu-tag bg-purple light sm round">{{item.viewCount||0}}次阅读</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<cu-no-data v-show="articalItem.length==0"></cu-no-data>

		<view style="height:120upx"></view>
		<footer-bar :currentIndex="0"></footer-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cardCur: 0,
				dotStyle: false,
				towerStart: 0,
				direction: '',
				TabCur: 0,
				scrollLeft: 0,
				isCard: true,
				typeItem: [],
				articalItem: [],
				swiperList: []
			}
		},
		onLoad() {
			this.init();
		},
		methods: {
			async init() {
				await this.getPicture();
				await this.getType();
				if (this.typeItem.length > 0) {
					let classifyTypeId = this.typeItem[0].id;
					await this.getArtical(classifyTypeId);
				}
			},
			//获取文章类型
			async getType() {
				let url = "/article/type/findByModal";
				let {
					success,
					data: {
						list
					}
				} = await this.$http.PostAsync(url, {});
				if (success == true) {
					this.typeItem = list;
				}
			},
			//获取文章类型所对应的列表
			async getArtical(classifyTypeId) {
				let url = "/article/findByModal";
				let {
					success,
					data: {
						list
					}
				} = await this.$http.PostAsync(url, {
					articleTypeId: classifyTypeId
				});
				if (success == true) {
					this.articalItem = list;
				}
			},
			//获取轮播图
			async getPicture() {
				let url = "/cover/findByModal";
				let {
					success,
					data: {
						list
					}
				} = await this.$http.PostAsync(url, {});
				if (success == true) {
					this.swiperList = list;
				}
			},
			//跳转富文本页面
			markdown(index) {
				setTimeout(() => {
					uni.navigateTo({
						url: "/pages/index/markdown?id=" + this.articalItem[index].id
					});
				}, 100)
			},
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.getArtical(this.typeItem[this.TabCur].id);
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		}
	}
</script>

<style>
	.desc {
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>
