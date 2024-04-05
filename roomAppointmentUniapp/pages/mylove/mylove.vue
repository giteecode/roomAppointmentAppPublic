<template>
	<view>
		<cu-custom bgColor="theme-bg-color" :isBack="true">
			<block slot="backText"><text>返回</text></block>
			<block slot="content"><text> 我的收藏 </text></block>
		</cu-custom>
		<view v-if="knowItem.length>0" class="cu-card article" :class="true?'no-card':''">

			<template v-for="(item,index) in knowItem">
				<view class="cu-item shadow" @click="ToDetail(item)">
					<view class="title">
						<view class="text-cut">{{item.name}}</view>
					</view>
					<view class="content">
						<image :src="item.imageUrls|pictureFilter" mode="aspectFill"></image>
						<view class="desc">
							<view class="text-content"> {{item.shortDescription}}</view>
							<view>
								<view class="cu-tag bg-red light sm round">{{item.creationTimeDateBeforeNow}}</view>
								<view class="cu-tag bg-green light sm round">热点:{{item.vistorCount}}</view>
							</view>
						</view>
					</view>
				</view>
			</template>
		</view>
		<view v-else class="solids-bottom padding-xs flex align-center bg-white">
			<view class="flex-sub text-center">

				<view style="min-height:100vh" class="padding">相关内容还没有哦~~~</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				knowItem: [],
			}
		},
		onShow() {
			this.KnowMyLove();
		},
		methods: {
			async KnowMyLove() {
				let url = "/WxApi/KnowLedgeWx/KnowMyLove";

				this.$comm.ShowLoading();
				let {
					success,
					data: {
						items
					}
				} = await this.$http.PostAsync(url, {});
				if (success == true) {
					this.knowItem = items;
				}
				uni.hideLoading()
			},
			
			async ToDetail({
				id
			}) {
				uni.navigateTo({
					url: `/pages/knowLedge/knowLedgeDetail?id=${id}`
				})
			}

		}
	}
</script>

<style>

</style>
