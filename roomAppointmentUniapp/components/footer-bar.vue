<template>
	<view class="cu-bar tabbar  bg-white foot">

		<template v-for="(item,index) in footerBarList">
			<view class="action " :class="currentIndex==index?'theme-color':''" @click="skip(item.url)">
				<view   :class="item.src?item.src:'cuIcon-homefill'"></view> {{item.label}}
			</view>

		</template>
	</view>

</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		addGlobalClass: true,
		computed: {
			...mapState(['footerBarList'])
		},
		props: {
			currentIndex: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			skip(url) {
				console.log("点击",url);
				uni.redirectTo({
					url: url
				})
			}
		}
	}
</script>

<style scoped>
</style>
