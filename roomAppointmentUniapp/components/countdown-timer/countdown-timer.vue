<template>
	<view><slot :time="time" :remain="timeData.remain" :day="timeData.day" :hour="timeData.hour" :minute="timeData.minute" :second="timeData.second" /></view>
</template>

<script>
export default {
	props: {
		// 倒计时时长（单位：毫秒）
		time: {
			type: Number,
			default: 0
		},
		
		// 是否自动
		'autoStart': {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			timer: null,
			timeData: {
				remain: 0,
				day: 0,
				hour: 0,
				minute: 0,
				second: 0
			}
		};
	},
	watch: {
		time() {
			this.reset()
		}
	},
	methods: {
		
		// 设置timeData
		updateTimeData() {
			let t = this.timeData.remain;
			this.timeData.day = Math.floor(t / 1000 / 60 / 60 / 24);
			this.timeData.hour = Math.floor((t / 1000 / 60 / 60) % 24);
			this.timeData.minute = Math.floor((t / 1000 / 60) % 60);
			this.timeData.second = Math.floor((t / 1000) % 60);
		},
		
		// 开启倒计时
		startTimer() {
			if (this.timer) {
				clearInterval(this.timer);
			}
			if(this.timeData.remain < 1000) {
				 return
			}
			this.timer = setInterval(() => {
				this.timeData.remain -= 1000;
				this.updateTimeData()
				if (this.timeData.remain < 1000) {
					this.pause()
					this.$emit('finish');
				}
			}, 1000);
		},
		
		// 重置倒计时
		reset() {
			this.timeData.remain = this.time;
			this.updateTimeData();
			if(this.autoStart) {
				this.start()
			}
			
		},
		
		// 暂停倒计时
		pause() {
			if(this.timer) {
				clearInterval(this.timer);
				this.timer = null
			}
		},
		
		// 开始倒计时
		start() {
			if(this.timer) {
				return
			}
			this.startTimer();		
		}
	},
	mounted() {
		this.reset();
	},
	beforeDestroy() {
		this.pause()
	}
};
</script>
