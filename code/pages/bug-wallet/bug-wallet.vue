<template>
	<view class="container">
		<view :class="{'bg-cuColor':scrollTop>2}" class="flex align-center justify-between padding-lr sticky-box" style="height: 100rpx;">
			<image @click="toHome" src="/static/logo.png" style="width: 150rpx;height: 50rpx;" mode=""></image>
			<view class="flex align-center">
				<button style="margin-left: 20rpx;background-color: #B6C6DE;color: #666666;height: 48rpx;line-height: 50rpx;font-size: 28rpx; padding: 0;padding-left: 10px;padding-right: 10px;"><span>• </span>{{address==''?'钱包连接':address}}</button>
				<button style="margin-left: 20rpx;background-color: #B6C6DE;color: #666666;width: 156rpx;height: 48rpx;line-height: 50rpx;font-size: 28rpx; padding: 0;">My Pool</button>
				<image @click="showMyPoolMenu=!showMyPoolMenu" src="../../static/set.png" style="margin-left: 20rpx;width: 50rpx;height: 50rpx;" mode=""></image>
				<image @click="showMenu = !showMenu" src="../../static/more.png" style="margin-left: 20rpx;width: 50rpx;height: 50rpx;" mode=""></image>
			</view>
		</view>
		<!-- My Pool -->
		<view v-if="showMyPoolMenu" class="flex flex-direction padding-tb-sm padding-lr" style="color: #333;z-index: 9999;position: fixed;top: 100rpx;right: 50px;background-color: #FFFFFF;border-radius: 20rpx;">
			<text class="text-lg" @click="toHome">Slippage Tolerance</text>
			<view class="flex align-center flex-sub margin-top-sm">
				<view class="flex-sub padding-lr-xs">
					<text @click="poolItem(0,0.1)" :class="{'pool-active':chooseIndex==0,'pool':chooseIndex!=0}" style="border-radius: 10rpx;" class="padding-tb-xs padding-lr-sm">0.1%</text>
				</view>
				<view class="flex-sub padding-lr-xs">
					<text  @click="poolItem(1,0.5)" :class="{'pool-active':chooseIndex==1,'pool':chooseIndex!=1}" style="border-radius: 10rpx;" class="padding-tb-xs padding-lr-sm">0.5%</text>
				</view>
				<view class="flex-sub padding-lr-xs">
					<text  @click="poolItem(2,1)"  :class="{'pool-active':chooseIndex==2,'pool':chooseIndex!=2}" style="border-radius: 10rpx;" class="padding-tb-xs padding-lr-sm">1%</text>
				</view>
				<view class="flex flex-twice padding-lr-xs" >
					<view class="flex align-center padding-tb-xs padding-lr-sm" style="border-radius: 10rpx;"  @click="poolItem(3,5)" :class="{'pool-active':chooseIndex==3,'pool':chooseIndex!=3}">
						<input @focus="chooseIndex=3" type="text" value="5.0" style="width: 30px;font-size: 28rpx;"/>
						<text>%</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 菜单 -->
		<view v-if="showMenu" class="flex flex-direction padding-tb-sm padding-lr" style="color: #333;z-index: 9999;position: fixed;top: 100rpx;right:2px;background-color: #FFFFFF;border-radius: 20rpx;">
			<text class="text-lg" @click="toHome">Mining</text>
			<text class="text-lg margin-top-xs" @click="wak">Exchange</text>
			<view class="solids-bottom margin-tb"></view>
			<text class="text-lg" @click="duihuan">About</text>
			<a class="text-lg margin-top-xs" style="text-decoration: none;color: #333;" href="http://www.apexswap.org/static/APEX_Whtiepaper.pdf">Docs</a>
			<view class="solids-bottom margin-tb"></view>
			<text class="text-lg" @click="toEN">EN</text>
			<text class="text-lg margin-top-xs" @click="toZh">中文</text>
		</view>
		<!-- 中英菜单 -->
		<view v-if="showzyMenu" class="flex flex-direction padding-tb-sm padding-lr text-center" style="color: #333;z-index: 9999;position: fixed;top: 100rpx;right: 0px;background-color: #FFFFFF;border-radius: 20rpx;">
			<text class="text-lg" @click="toEN">EN</text>
			<text class="text-lg margin-top-xs" @click="toZh">中文</text>
		</view>
		
		<view class="flex align-center justify-center" style="margin-top: 20rpx;border-radius: 20rpx;">
			<view class="" style="width: 710rpx;border-radius: 20rpx;">
				<view class="flex-sub flex" style="border-radius: 10px 10px 0px 0px;">
					<view @click="tapClick(0)" class="flex-sub" :class="{'active-bg2':currentIndex==0,'po-bg':currentIndex==1}" style="height: 140rpx;text-align: center;line-height: 140rpx;font-size: 40rpx;font-family: PingFang SC;font-weight: 400;">
						兑换
					</view>
					<view @click="tapClick(1)" class="flex-sub" :class="{'active-bg2':currentIndex==1,'po-bg':currentIndex==0}" style="height: 140rpx;text-align: center;line-height: 140rpx;font-size: 40rpx;font-family: PingFang SC;font-weight: 400;">
						流动池
					</view>
				</view>
				<view class="flex flex-direction align-center justify-center" v-if="currentIndex==0" style="background: rgba(255,255,255,0.93);border-radius: 0px 0px 10px 10px;">
					<view class="flex align-center justify-center" style="margin-top: 40rpx;height: 100rpx;width: 650rpx;background-image: url(../../static/input-bg.png);background-size: 100% 100%;">
						<!-- <input type="text" value="APEX-ETH" style="height: 100rpx;width: 600rpx;" /> -->
						
						<text style="height: 100rpx;width: 550rpx;line-height: 100rpx;font-size: 32rpx;">APEX-ETH</text>
						<text class="cuIcon-right"></text>
					</view>
					<view class="flex align-center justify-between" style="margin-top: 20rpx;height: 100rpx;width: 650rpx;">
						<view class="text-center" @click="bug('bugin')" :class="{'bg-bug-avtive':duihuanType=='bugin','bg-bug':duihuanType=='bugout'}" style="width: 300rpx;height: 80rpx;border-radius: 20rpx;line-height: 80rpx;font-size: 36rpx;font-weight: bold;font-family: PingFang SC;">
							买入
						</view>
						<view class="text-center" @click="bug('bugout')"  :class="{'bg-bug-avtive':duihuanType=='bugout','bg-bug':duihuanType=='bugin'}" style="width: 300rpx;height: 80rpx;border-radius: 20rpx;line-height: 80rpx;font-size: 36rpx;font-weight: bold;font-family: PingFang SC;">
							卖出
						</view>
						<!-- <image src="../../static/bug-in.png" style="height: 80rpx;width: 300rpx;" mode=""></image>
						<image src="../../static/bug-out.png" style="height: 80rpx;width: 300rpx;" mode=""></image> -->
					</view>
					<view class="flex align-center justify-center padding-lr" style="margin-top: 20rpx;height: 100rpx;width: 650rpx;background-image: url(../../static/input-bg.png);background-size: 100% 100%;">
						
						<input type="text" v-model="bugValue" style="height: 100rpx;width: 300rpx;" />
						<image src="../../static/max.png" @click="bugMax" mode="" style="margin-right: 20rpx;margin-left: auto;width: 96rpx;height: 46rpx;"></image>
						<image src="../../static/bi.png" style="width: 42rpx;height: 42rpx;margin-right: 20rpx;" mode=""></image>
						<text style="margin-right:10rpx;font-weight: 400;color: #333333;">APEX</text>
					</view>
					<view class="flex flex-direction" style="margin-top: 48rpx;height: 100rpx;width: 650rpx;">
						<text style="font-size: 28rpx;font-family: PingFang SC;font-weight: 400;color: #666666;">Available Balance: {{balance}} APEX</text>
						<view class="flex align-center justify-between" style="margin-top: 40rpx;">
							<view class="flex flex-direction">
								<text style="font-family: PingFang SC;font-weight: bold;color: #666666;">1 APEX = 666 ETH</text>
								<text style="font-size: 28rpx;font-family: PingFang SC;font-weight: bold;color: #999999;">≈ $888</text>
							</view>
							<image src="../../static/learn.png" style="width: 224rpx;height: 60rpx;" @click="learn" mode=""></image>
						</view>
					</view>
					<view class="flex flex-direction align-center justify-center" style="margin-bottom: 40rpx;margin-top: 80rpx;height: 100rpx;width: 650rpx;">
						<cu-progress :disabled="balance==0" @dragging="dragging" :value="bugValue>balance?balance:bugValue" :max="balance" class="progress" strokeWidth="4" width="600rpx" handleSize="24" handleColor="#007F73"
						 handleBorderRadius="24"> </cu-progress>
						<view style="width: 100%;" class="flex align-center justify-between padding-lr-lg margin-top-xs">
							<text style="font-size: 28rpx;font-family: PingFang SC;font-weight: bold;color: #666666;">0</text>
							<text style="font-size: 28rpx;font-family: PingFang SC;font-weight: bold;color: #666666;">Max</text>
						</view>
					</view>
					<view class="flex flex-direction align-center justify-center" :class="{'bg-bug-avtive':bugValue>0,'bg-bug':bugValue==0}" style="font-size: 36rpx;font-weight: bold;font-family: PingFang SC;;margin-bottom: 30rpx;margin-top: 4rpx;height: 100rpx;width: 650rpx;border-radius: 20rpx;">
						{{bugValue>0?'确认兑换':'输入数量'}}
					</view>
				</view>
			
				<view class="flex flex-direction align-center justify-center" v-else style="background: rgba(255,255,255,0.93);border-radius: 0px 0px 10px 10px;">
					<view class="flex align-center justify-center" style="margin-top: 40rpx;height: 100rpx;width: 650rpx;background-image: url(../../static/input-bg.png);background-size: 100% 100%;">
						<text style="height: 100rpx;width: 550rpx;line-height: 100rpx;font-size: 32rpx;">APEX-ETH</text>
						<text class="cuIcon-right"></text>
					</view>
					<view class="flex align-center justify-between" style="margin-top: 20rpx;height: 100rpx;width: 650rpx;">
						<view class="text-center" @click="zhiyaClick('zhiya')" :class="{'bg-bug-avtive':zhiyaType=='zhiya','bg-bug':zhiyaType=='jiechuzhiya'}" style="width: 300rpx;height: 80rpx;border-radius: 20rpx;line-height: 80rpx;font-size: 36rpx;font-weight: bold;font-family: PingFang SC;">
							质押
						</view>
						<view class="text-center" @click="zhiyaClick('jiechuzhiya')"  :class="{'bg-bug-avtive':zhiyaType=='jiechuzhiya','bg-bug':zhiyaType=='zhiya'}" style="width: 300rpx;height: 80rpx;border-radius: 20rpx;line-height: 80rpx;font-size: 36rpx;font-weight: bold;font-family: PingFang SC;">
							解除质押
						</view>
					</view>
					
					<view class="flex flex-direction justify-center" style="margin-top: 20rpx;height: 140rpx;width: 650rpx;background-image: url(../../static/input-bg.png);background-size: 100% 100%;">
						
						<view class="flex align-center justify-between align-center padding-lr" style="height: 50rpx;line-height: 50rpx;">
							<text style="
								font-size: 28rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #333333;">输入</text>
								<text style="
								font-size: 28rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #333333;">余额：0</text>
						</view>
						<view class="flex align-center justify-center padding-lr" style="height: 60rpx;line-height: 60rpx;">
							<input type="text" value="0.0" style="height: 100rpx;width: 300rpx;" />
							<image src="../../static/max.png" mode="" style="margin-right: 20rpx;margin-left: auto;width: 96rpx;height: 46rpx;"></image>
							<image src="../../static/bi.png" style="width: 42rpx;height: 42rpx;margin-right: 20rpx;" mode=""></image>
							<text style="margin-right:10rpx;font-weight: 400;color: #333333;">APEX</text>
						</view>
						
					</view>
					<view class="flex align-center justify-center padding-lr" style="margin-top: 20rpx;width: 650rpx;">
						+
					</view>
					<view class="flex flex-direction justify-center" style="margin-top: 20rpx;height: 140rpx;width: 650rpx;background-image: url(../../static/input-bg.png);background-size: 100% 100%;">
						
						<view class="flex align-center justify-between align-center padding-lr" style="height: 50rpx;line-height: 50rpx;">
							<text style="
								font-size: 28rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #333333;">输入</text>
								<text style="
								font-size: 28rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #333333;">余额：{{balance}}</text>
						</view>
						<view class="flex align-center justify-center padding-lr" style="height: 60rpx;line-height: 60rpx;">
							<input type="text" value="0.0" style="height: 100rpx;width: 300rpx;" />
							<image src="../../static/max.png" mode="" style="margin-right: 20rpx;margin-left: auto;width: 96rpx;height: 46rpx;"></image>
							<image src="../../static/zhinan.png" style="width: 42rpx;height: 42rpx;margin-right: 20rpx;" mode=""></image>
							<text style="margin-right:10rpx;font-weight: 400;color: #333333;">ETH</text>
						</view>
					</view>
					
					<view class="flex align-center justify-center" style="margin-top: 20rpx;width: 650rpx;">
						<view class="flex justify-around" style="width: 200rpx;height: 200rpx;background-image: url(/static/yuan.png);background-size: 100% 100%;">
							<text style="margin-top: 50rpx;margin-left: 20rpx;
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #FFFFFF;">APEX</text>
														<text style="margin-top: 120rpx;margin-right: 20rpx;font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #333333;">ETH</text>
						</view>
						
						<view class="flex flex-sub flex-direction justify-between padding-left">
							<view class="flex justify-between" style="
								font-size: 28rpx;
								font-family: PingFang SC;
								font-weight: bold;
								color: #333333;">
								<text>Pool Size(APEX)</text> <text>18,934.1666</text>
							</view>
							<view class="flex justify-between" style="
							font-size: 28rpx;
							margin-top: 18rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #666666;">
								<text>Pool Size(ETH)</text>  <text>6,934.1666</text>
							</view>
						</view>
					
					</view>
					
					<view class="flex flex-direction align-center justify-center" style="margin-bottom: 30rpx;margin-top: 100rpx;height: 100rpx;width: 650rpx;background-image: url(../../static/num.png);background-size: 100% 100%;">
					</view>
				</view>
			
			</view>
		</view>

		

		<view class="flex flex-direction align-center justify-center" style="margin-top: 80rpx;">
			<view class="text-center flex flex-direction align-center justify-center" style="margin-top: 4rpx;width: 650rpx;">
				<image src="/static/logo.png" style="width: 150rpx;height: 50rpx;" mode=""></image>
				<text style="margin-top: 10rpx;font-size: 28rpx;font-family: PingFang SC;font-weight: 400;color: #FFFFFF;">support@apexswap.org</text>
				<view class="flex align-center justify-around" style="width: 100%;margin-top: 20rpx;">
					<a :href="item.url" style="width:110rpx ;height: 110rpx;" v-for="(item,index) in bottoms">
						<image :src="item.img" 
						 style="width:110rpx ;height: 110rpx;" mode=""></image>
					</a>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bugValue:0,
				zhiyaValue:0,
				duihuanType:'bugin',
				zhiyaType:'zhiya', //jiechuzhiya
				address:"",
				balance:0,
				poolNum : 0.1,
				chooseIndex:0,
				scrollTop:0,
				showMyPoolMenu:false,
				showzyMenu:false,
				showMenu:false,
				bottoms:[
					{img:"/static/list1.png",url:"https://t.me/apexswap"},
					{img:"/static/list2.png",url:"https://twitter.com/apexswap"},
					{img:"/static/list3.png",url:"https://discord.gg/xr7rPt6Es5"},
					{img:"/static/list4.png",url:"https://medium.com/@apexswap"},
					{img:"/static/list5.png",url:"mailto:support@apexswap.org"}
				],
				currentIndex: 0,
			}
		},
		watch:{
			showMyPoolMenu(val){
				if(val){
					this.showzyMenu = false
					this.showMenu = false
				}
			},
			showMenu(val){
				if(val){
					this.showMyPoolMenu=false
					this.showzyMenu = false
				}
			},
			showzyMenu(val){
				if(val){
					this.showMyPoolMenu=false
					this.showMenu = false
				}
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop
			this.showMyPoolMenu=false
			this.showMenu = false
			this.showzyMenu = false
		},
		async onLoad() {
			let that = this
			await this.$web3.eth.requestAccounts( async (error,accounts)=>{
				if(error){
					console.log("error",error)
				}
				console.log("accounts",accounts)
				
				this.$nextTick(()=>{
					if(accounts&&accounts.length>0){
						let str = accounts[0];
						that.address = str.substring(0,6) +'...'+ str.substring(str.length-5,str.length-1)
					}
				})
				
				await that.$web3.eth.getBalance(accounts[0]).then(res=>{
					
					console.log("this.address",that.address)
					// that.balance = that.$web3.utils.fromWei(res,'ether')
					console.log("bl : ",that.$web3.utils.fromWei(res,'ether'))
				})
			})
			
			setTimeout(()=>{
				console.log("this.address",that.address)
			},2000)
		},
		methods: {
			docs(){
				
				console.log("docs")
				uni.navigateTo({
					url: 'http://localhost:8080/static/APEX_Whtiepaper.pdf',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			learn(){
				uni.navigateTo({
					url: '/pages/video/video',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			dragging(e){
				this.bugValue =  e.value;
			},
			bug(type){
				this.duihuanType = type
			},
			poolItem(index,num){
				this.chooseIndex = index
				this.poolNum = num;
			},
			bugMax(){
				this.bugValue = this.balance
			},
			toHome(){
				uni.navigateBack({
					delta: 1
				});
			},
			zhiyaClick(type){
				this.zhiyaType = type
			},
			tapClick(index) {
				this.currentIndex = index
			}
		}
	}
</script>

<style scoped>
	.container {
		width: 750rpx;
		background-image: url(/static/bg.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	
	.active-bg2 {
		background: rgba(255, 255, 255, 0.955);
		color: #333333;
	}

	.po-bg {
		background: #EEEEEE;
		color: #999999;
	}
	.sticky-box{
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		position: -webkit-sticky;
		/* #endif */
		position: sticky;
		top: var(--window-top);
		z-index: 99;
		flex-direction: row;
	}
	.bg-cuColor{
		background-color: #5079B1;
	}
	.pool-active{
		background-color: #007F73;
		color: #FFFFFF;
	}
	.pool{
		background-color: #FFFFFF;
		color: #000000;
	}
	.bg-bug-avtive{
		color: #FFFFFF;
		background-color: #007F73;
	}
	.bg-bug{
		color: #666666;
		background-color: #EEEEEE;
	}
</style>
