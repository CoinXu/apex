<template>
	<view class="content">
		<view class="flex align-center justify-between padding-lr bg-white sticky-box" style="height: 100rpx;line-height: 100rpx;width: 100%;">
			<view class="flex align-center">
				<image src="/static/logo.png" style="width: 150rpx;height: 50rpx;" mode="aspectFill"></image>
			</view>
			<view class="flex flex-sub text-cut justify-end padding-lr-sm align-center" style="width: 100%;">
				<text class="text-cut" v-if="address==''" style="border-radius: 10rpx;background-color: #F1F8F2;color: #007F73;height: 50rpx;line-height: 50rpx;font-size: 28rpx; padding: 5rpx;padding-left: 10rpx;padding-right: 10rpx;">钱包连接</text>
				<text class="text-cut" v-if="address!=''" style="border-radius: 10rpx;background-color: #F1F8F2;color: #007F73;height: 50rpx;line-height: 50rpx;font-size: 28rpx; padding: 5rpx;padding-left: 10rpx;padding-right: 10rpx;">• {{address}}</text>
			</view>
			<view class="flex align-center">
				<image @click="showMenu = !showMenu" src="../../static/menu.png" style="margin-left: 40rpx;width: 40rpx;height: 34rpx;" mode=""></image>
				<text @click="showzyMenu =!showzyMenu" style="margin-left: 20px;width: 25px;height: 50rpx;line-height: 50rpx;font-size: 28rpx;color: #007F73;">EN</text>
			</view>
		</view>
		<!-- 菜单 -->
		<view v-if="showMenu" class="flex flex-direction padding-tb-sm padding-lr text-white text-center" style="z-index: 9999;position: fixed;top: 100rpx;right: 30px;background-color: #77C998;border-bottom-right-radius: 20rpx;border-bottom-left-radius: 20rpx;">
			<text class="text-lg" @click="toTop">首页</text>
			<text class="text-lg margin-top-xs" @click="wak">挖矿</text>
			<text class="text-lg margin-top-xs" @click="duihuan">兑换</text>
			<text class="text-lg margin-top-xs" @click="liudongxing">流动性</text>
			<text class="text-lg margin-top-xs" @click="tosort">Top10</text>
			<text class="text-lg margin-top-xs" @click="apex">APEX</text>
			<a class="text-lg margin-top-xs text-white" style="text-decoration: none;" href="https://t.me/apexswap">Jion</a>
		</view>
		<!-- 中英菜单 -->
		<view v-if="showzyMenu" class="flex flex-direction padding-tb-sm padding-lr text-white text-center" style="z-index: 9999;position: fixed;top: 100rpx;right: 0px;background-color: #77C998;border-bottom-right-radius: 20rpx;border-bottom-left-radius: 20rpx;">
			<text class="text-lg" @click="toEN">EN</text>
			<text class="text-lg margin-top-xs" @click="toZh">中文</text>
		</view>
		<view class="flex justify-center align-end" style="margin-top: 40rpx;">
			<image src="../../static/marginalia-bitcoin-mining.png" style="width:120rpx;height: 104rpx;" mode=""></image>
			<text class="djs-text">创世挖矿倒计时</text>
		</view>

		<view class="flex justify-center align-end" style="margin-top: 40rpx;">
			<view class="text-center" style="line-height: 110rpx;background-image: url(../../static/djs-bg.png);width:466rpx;height: 118rpx;background-size: 100% 100%;">
				<text style="text-align: center;" class="djs-num">88 : 88 : 88 : 88</text>
			</view>
		</view>

		

		<view class="flex flex-direction justify-center align-center" style="border-radius: 20rpx;margin-top: 40rpx;">
			<swiper style="width: 690rpx;height: 384rpx;" indicator-color="#FFFFFF" indicator-active-color="#007F73" circular
			 :indicator-dots="true" :autoplay="true" :interval="3000" :duration="200">
				<swiper-item  style="border-radius: 20rpx;">
					<view class="swiper-item"  style="border-radius: 20rpx;">
						<image src="../../static/b1.png" style="width: 690rpx;height: 384rpx;border-radius: 20rpx;" mode=""></image>
					</view>
				</swiper-item>
				<swiper-item  style="border-radius: 20rpx;">
					<view class="swiper-item"  style="border-radius: 20rpx;">
						<image src="../../static/b3.png" style="width: 690rpx;height: 384rpx;border-radius: 20rpx;" mode=""></image>
					</view>
				</swiper-item>
				<swiper-item  style="border-radius: 20rpx;">
					<view class="swiper-item"  style="border-radius: 20rpx;">
						<image src="../../static/b2.png" style="width: 690rpx;height: 384rpx;border-radius: 20rpx;" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
			<view class="padding-sm" id="tuijian" style="width: 690rpx;margin-top: 40rpx;
							background: #FFFFFF;
							border: 1px solid #52C18B;
							box-shadow: 0px 10rpx 14rpx 0px rgba(146, 215, 205, 0.29);
							border-radius: 10px;">
				<view class="flex align-center justify-between" style="">
					<view class="flex flex-direction">
						<text style="
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #333333;">推荐链接：</text>
						<text style="
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #999999;">https://apex.com</text>
					</view>
					<view class="flex flex-direction" @click="yaoqing('https://apex.com')" style="
								font-size: 20rpx;
								font-family: PingFang SC;
								font-weight: bold;
								color: #118B80;">
						<text>邀请好友</text>
						<text>分享复制</text>
					</view>
				</view>
				<view class="" style="margin-top: 60rpx;">
					<text style="
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #118B80;">APEX：</text>

					<text style="
						font-size: 44rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #118B80;">888</text>
				</view>
				<view class="flex flex-sub align-center justify-between" style="margin-top: 36rpx;">
					<view class="flex align-center">
						<text style="
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #118B80;">≈</text>
						<text style="
							font-size: 60rpx;margin-left: 20rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #118B80;">$888</text>
					</view>
					<view class="">
						<view class="padding-lr" style="
							background: #DFF0E9;
							border-radius: 15px;line-height: 60rpx;height: 60rpx;
							font-size: 36rpx;
							border: 0rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #118B80;">提现</view>
					</view>
				</view>
			</view>
			<view class="padding-sm" style="width: 690rpx;margin-top: 40rpx;
								background: #FFFFFF;
								border: 1px solid #52C18B;
								box-shadow: 0px 10rpx 14rpx 0px rgba(146, 215, 205, 0.29);
								border-radius: 10px;">
				<view class="flex align-center justify-between" style="">
					<text style="
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #118B80;">锁仓总量：</text>

					<text style="
						font-size: 36rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #118B80;">888
						<text style="margin-left: 20rpx;
						font-size: 36rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #118B80;">USD</text></text>

				</view>
				<view class="flex align-center justify-between" style="margin-top: 20rpx;">
					<text style="
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #118B80;">预计年化：</text>

					<text style="
						font-size: 36rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #118B80;">300%</text>

				</view>
				<view class="flex align-center justify-between" style="margin-top: 20rpx;">
					<text style="
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #118B80;">奖金池：</text>

					<text style="
						font-size: 36rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #118B80;">888
						<text style="margin-left: 20rpx;
						font-size: 36rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #118B80;">USD</text></text>

				</view>
			</view>



			<view class="" style="width: 690rpx;margin-top: 40rpx;
									background: #FFFFFF;
									background: #DFF0E9;
									border: 1px solid #52C18B;
									box-shadow: 0px 10rpx 14rpx 0px rgba(146, 215, 205, 0.29);
									border-radius: 10px;">
				<view class="flex align-center" style="">
					<text style="
							font-size: 42rpx;
							font-family: PingFang SC;
							font-weight: bold;
							margin-left: 22rpx;
							color: #118B80;">令牌名单</text>

					<view class="flex-sub flex justify-around padding-lr-sm">
						<image src="../../static/bi_.png" style="width: 44rpx;height: 44rpx;" mode=""></image>
						<image src="../../static/bi_.png" style="width: 44rpx;height: 44rpx;" mode=""></image>
						<image src="../../static/bi_.png" style="width: 44rpx;height: 44rpx;" mode=""></image>
						<image src="../../static/bi_no.png" style="width: 44rpx;height: 44rpx;" mode=""></image>
						<image src="../../static/bi_no.png" style="width: 44rpx;height: 44rpx;" mode=""></image>
					</view>
					<view class="" style="width: 160rpx;
								height: 100rpx;
								background: #118B80;
								border-radius: 10px;
								margin-left: auto;
								font-size: 28rpx;
								font-family: PingFang SC;
								font-weight: bold;
								border: 1px solid #52C18B;
								color: #FEFEFE;
								line-height: 100rpx;
								text-align: center;">
						加速
					</view>
				</view>

			</view>

			<view class="flex align-center" style="width: 690rpx;margin-top: 20rpx;
									background: #FFFFFF;
									padding: 0;
									border: 1px solid #52C18B;
									box-shadow: 0px 10rpx 14rpx 0px rgba(146, 215, 205, 0.29);
									border-radius: 10px;">
				<view class="flex align-center flex-sub" style="">

					<view class="flex-sub flex justify-between padding-lr-sm">
						<input type="text" value="" placeholder="输入金额" placeholder-style="
								font-size: 28rpx;
								font-family: PingFang SC;
								font-weight: bold;
								color: #CCCCCC;" />
						<text style="
								font-size: 28rpx;
								font-family: PingFang SC;
								font-weight: bold;
								color: #118B80;">最大值</text>
					</view>
					<view class="" style="width: 160rpx;
								height: 100rpx;
								background: #DFF0E9;
								border-radius: 9px;
								margin-left: auto;
								font-size: 28rpx;
								font-family: PingFang SC;
								font-weight: bold;
								border: 1px solid #52C18B;
								color: #118B80;
								line-height: 100rpx;
								text-align: center;">
						质押
					</view>
				</view>

			</view>

			<view class="" style="width: 690rpx;margin-top: 20rpx;
								background: #FFFFFF;
								border: 1px solid #52C18B;
								box-shadow: 0px 10rpx 14rpx 0px rgba(146, 215, 205, 0.29);
								border-radius: 10px;">
				<view class="flex align-center" style="">

					<view class="flex-sub flex justify-between padding-lr-sm">
						<input type="text" value="" placeholder="输入金额" placeholder-style="
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #CCCCCC;" />
						<text style="
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #118B80;">最大值</text>
					</view>
					<view class="" style="width: 160rpx;
							height: 100rpx;
							background: #DFF0E9;
							border-radius: 9px;margin-left: auto;
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: bold;
							border: 1px solid #52C18B;
							color: #118B80;line-height: 100rpx;text-align: center;">
						解除质押
					</view>
				</view>
			</view>

			<view id="zousjhitu" class="padding-sm" style="width: 690rpx;margin-top: 40rpx;
									background: #FFFFFF;
									border: 1px solid #52C18B;
									box-shadow: 0px 10rpx 14rpx 0px rgba(146, 215, 205, 0.29);
									border-radius: 10px;">

				<text style="font-size: 20px;
									font-family: PingFang SC;
									font-weight: bold;
									color: #333333;">APEX</text>

				<view class="flex align-center" style="margin-top: 23px;">
					<text style="
							font-size: 14px;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333333;">锁仓总量：</text>
					<text style="margin-left: 20rpx;
								font-size: 14px;
								font-family: PingFang SC;
								font-weight: 400;
								color: #333333;">USD</text></text>
				</view>
				<view class="flex align-center" style="margin-top: 15px;">
					<text style="
							font-size: 14px;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333333;">发行总量：</text>
					<text style="margin-left: 20rpx;
								font-size: 14px;
								font-family: PingFang SC;
								font-weight: 400;
								color: #333333;">USD</text></text>
				</view>
				<view class="flex align-center" style="margin-top: 15px;">
					<text style="
							font-size: 14px;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333333;">持币地址：</text>
					<text style="margin-left: 20rpx;
								font-size: 14px;
								font-family: PingFang SC;
								font-weight: 400;
								color: #333333;">USD</text></text>
				</view>
				<view class="flex align-center" style="margin-top: 15px;">
					<text style="
							font-size: 14px;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333333;">转账次数：</text>
					<text style="margin-left: 20rpx;
								font-size: 14px;
								font-family: PingFang SC;
								font-weight: 400;
								color: #333333;">USD</text></text>
				</view>
				<view class="flex align-center" style="margin-top: 15px;">
					<text style="
							font-size: 14px;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333333;">上线价格：</text>
					<text style="margin-left: 20rpx;
								font-size: 14px;
								font-family: PingFang SC;
								font-weight: 400;
								color: #333333;">USD</text></text>
				</view>
				<view class="flex align-center" style="margin-top: 15px;">
					<text style="
							font-size: 14px;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333333;">上线时间：</text>
					<text style="margin-left: 20rpx;
								font-size: 14px;
								font-family: PingFang SC;
								font-weight: 400;
								color: #333333;">USD</text></text>
				</view>

				<view class="flex align-center" style="margin-top: 20px;">
					<text style="
							font-size: 14px;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333333;">流动资金池</text>
				</view>

				<view class="flex align-center justify-between" style="margin-top: 10rpx;">
					<text style="
							font-size: 36rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #118B80;">$ 888888</text>

					<text style="
								font-size: 36rpx;
								font-family: PingFang SC;
								color: #2FD268;">+3.47%</text>

				</view>

				<!-- 明天做 -->

				<view class="flex align-center" style="margin-top: 10rpx;">
					<image src="/static/bi.png" style="width: 50rpx;height: 50rpx;" mode="aspectFill"></image>
					<text style="
							margin-left: 20rpx;
							font-size: 36rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #333;">88
					</text>
					<text style="
							margin-left: 20rpx;
							font-size: 36rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333;">
						枚 APEX</text>

				</view>
				<view class="flex align-center" style="margin-top: 10rpx;">
					<image src="/static/zhinan.png" style="width: 50rpx;height: 50rpx;" mode="aspectFill"></image>
					<text style="
							margin-left: 20rpx;
							font-size: 36rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #333;">88
					</text>
					<text style="
							margin-left: 20rpx;
							font-size: 36rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333;">枚 ETH</text>

				</view>




				<view class="flex align-center" style="margin-top: 30rpx;">
					<text style="
							font-size: 14px;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333333;">价格（APEX∶ETH）</text>
				</view>

				<view class="flex align-center justify-between" style="margin-top: 10rpx;">
					<text style="
							font-size: 36rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #118B80;">1∶0.36</text>

					<text style="
								font-size: 36rpx;
								font-family: PingFang SC;
								color: #2FD268;">+3.47%</text>

				</view>

				<view class="flex align-center" style="margin-top: 30rpx;">
					<text style="
							font-size: 14px;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333333;">≈ $96.1486</text>
				</view>

				<view class="flex align-center" style="margin-top: 30rpx;">
					<text style="
							font-size: 14px;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333333;">价格走势</text>
				</view>

				<canvas id="cid" width="325" height="156" style="width: 325px;height: 156px;"></canvas>


			</view>

		</view>


		<view class="flex justify-center align-end" id="sort" style="margin-top: 20rpx;">
			<view class="padding-tb-sm flex flex-direction justify-center align-center" style="width: 690rpx;margin-top: 40rpx;
							background: #FFFFFF;
							border: 1px solid #52C18B;
							box-shadow: 0px 10rpx 14rpx 0px rgba(146, 215, 205, 0.29);
							border-radius: 10px;">
					
					<text class="djs-text">Top10 竞赛排名</text>
					<text class="djs-text">倒计时</text>
					<view class="text-center" style="line-height: 110rpx;background-image: url(../../static/djs-bg.png);width:466rpx;height: 118rpx;background-size: 100% 100%;">
						<text style="font-size: 48rpx;font-family: PingFang SC;font-weight: bold;color: #118B80;text-shadow: 0px 4px 5px rgba(0, 127, 115, 0.43);">88 : 88 : 88 : 88</text>
					</view>
					
					
					<view class="flex align-end flex-sub">
						<view class="flex flex-direction align-center justify-center">
							<image src="../../static/top2-avatar.png" style="width: 120rpx;height: 120rpx;" mode=""></image>
							<image src="../../static/num2.png" style="width: 74rpx;height: 74rpx;margin-top: -30rpx;" mode=""></image>
						</view>
						<view class="flex flex-direction align-center justify-center" style="margin-left: 60rpx;margin-right: 60rpx;">
							<image src="../../static/top1-avatar.png" style="width: 160rpx;height: 160rpx;" mode=""></image>
							<image src="../../static/num1.png" style="width: 74rpx;height: 74rpx;margin-top: -30rpx;" mode=""></image>
						</view>
						<view class="flex flex-direction align-center justify-center">
							<image src="../../static/top3-avatar.png" style="width: 120rpx;height: 120rpx;" mode=""></image>
							<image src="../../static/num3.png" style="width: 74rpx;height: 74rpx;margin-top: -30rpx;" mode=""></image>
						</view>
					</view>
					
					
					<view class="flex align-center align-center justify-center" style="width: 100%;">
						<view class="flex flex-direction align-center justify-center flex-sub">
							<text style="
							font-size: 14px;
							font-family: PingFang SC;
							font-weight: bold;
							color: #333333;">818...APEX</text>
							<text style="
							font-size: 20px;
							font-family: PingFang SC;
							font-weight: bold;
							color: #007F73;">8888 ETH</text>
							
							<text v-for="item in 7" style="
								font-size: 14px;
								font-family: PingFang SC;
								font-weight: 400;
								color: #333333;">88 ETH</text>
						</view>
						<view class="flex flex-direction align-center justify-center flex-sub">
							<text style="
							font-size: 14px;
							font-family: PingFang SC;
							font-weight: bold;
							color: #333333;">818...APEX</text>
							<text style="
							font-size: 20px;
							font-family: PingFang SC;
							font-weight: bold;
							color: #007F73;">8888 ETH</text>
							
							<text v-for="item in 7" style="
								font-size: 14px;
								font-family: PingFang SC;
								font-weight: 400;
								color: #333333;">88 ETH</text>
						</view>
						<view class="flex flex-direction align-center justify-center flex-sub">
							<text style="
							font-size: 14px;
							font-family: PingFang SC;
							font-weight: bold;
							color: #333333;">818...APEX</text>
							
							<text style="
							font-size: 20px;
							font-family: PingFang SC;
							font-weight: bold;
							color: #007F73;">8888 ETH</text>
							
							<text v-for="item in 7" style="
								font-size: 14px;
								font-family: PingFang SC;
								font-weight: 400;
								color: #333333;">88 ETH</text>
						</view>
					</view>
			</view>
		</view>
		<view class="flex justify-center align-center" style="margin-top: 20rpx;">
			
			<view class="padding-tb-sm flex flex-direction justify-center align-center" style="width: 690rpx;margin-top: 40rpx;
						background: #FFFFFF;">
			
				<text  id="swap" style="
					font-size: 20px;
					font-family: PingFang SC;
					font-weight: bold;
					color: #118B80;">APEX swap</text>
				
				<view class="" style="margin-top: 20rpx;background-image: url(../../static/jx1.png);width:690rpx;height: 350rpx;background-size: 100% 100%;">
					<view class="flex justify-between padding-lr-lg align-center" style="background-image: url(../../static/top-jx.png);width:690rpx;height: 114rpx;line-height: 114rpx;background-size: 100% 100%;">
						<text style="
							font-size: 18px;
							font-family: PingFang SC;
							font-weight: bold;
							color: #FFFFFF;">流动性挖矿</text>
						<image src="../../static/gaozi.png" style="width: 66rpx;height: 64rpx;" mode=""></image>
					</view>
					<view class="flex align-center justify-center flex-sub text-center" style="height: 236rpx;">
						<text style="
							text-align: left;
							font-family: PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
							line-height: 20px;">
							APEX，无预挖，零预留，超共识阶梯式减产机制，
							合约私钥即时销毁，流动池永久开放，与玩家共同
							创造一个开放与自由的去中心化金融世界。
						</text>
					</view>
					
				</view>
				
				<view class="" style="margin-top: 20rpx;background-image: url(../../static/jx1.png);width:690rpx;height: 350rpx;background-size: 100% 100%;">
					<view class="flex justify-between padding-lr-lg align-center" style="background-image: url(../../static/top-jx.png);width:690rpx;height: 114rpx;line-height: 114rpx;background-size: 100% 100%;">
						<text style="
							font-size: 18px;
							font-family: PingFang SC;
							font-weight: bold;
							color: #FFFFFF;">Top10</text>
						<image src="../../static/jiangbei.png" style="width: 66rpx;height: 64rpx;" mode=""></image>
					</view>
					<view class="flex align-center justify-center flex-sub text-center" style="height: 236rpx;">
						<text style="
							text-align: left;
							font-family: PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
							line-height: 20px;">
							Top10竞赛机制，将吸引更多令牌玩家的加入，分
							享属于个人的财富盛宴，这是一场基于区块链，去
							中心化的现实版头号玩家，APEX机制由智能合约
							运行，无法篡改，一经创世开启将永久运行下去。
							                            
						</text>
					</view>
					
				</view>
				
			</view>
		</view>
		
		
		<view class="flex flex-direction align-center justify-center" style="margin-top: 80rpx;">
			<view class="text-center flex flex-direction align-center justify-center" style="margin-top: 4rpx;width: 650rpx;">
				<text style="
					font-size: 20px;
					font-family: PingFang SC;
					font-weight: bold;
					color: #118B80;
					line-height: 20px;">合约审计机构</text>
				<image src="/static/beosin.png" style="width: 204rpx;height: 98rpx;margin-top: 14px;" mode=""></image>
				
				<image src="/static/logo.png" style="width: 150rpx;height: 50rpx;margin-top: 14px;" mode=""></image>
				<text style="margin-top: 10rpx;font-size: 28rpx;font-family: PingFang SC;font-weight: 400;color: #333;">support@apexswap.org</text>
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
	import F2 from '@antv/f2';
	// 引入文件
	import h5Copy from '@/js_sdk/junyi-h5-copy/junyi-h5-copy.js'
	import { ChainId, Token ,TokenAmount, WETH, Fetcher, Route } from '@uniswap/sdk'


	export default {
		data() {
			return {
				address:'',
				balance:0,
				showzyMenu:false,
				showMenu:false,
				wktop:0,
				zousjhitutop:0,
				sorttop:0,
				swaptop:0,
				bottoms:[
					{img:"/static/list1.png",url:"https://t.me/apexswap"},
					{img:"/static/list2.png",url:"https://twitter.com/apexswap"},
					{img:"/static/list3.png",url:"https://discord.gg/xr7rPt6Es5"},
					{img:"/static/list4.png",url:"https://medium.com/@apexswap"},
					{img:"/static/list5.png",url:"mailto:support@apexswap.org"}
				],
				dataList: [{
					time: '2016-08-08 00:00:00',
					tem: 10
				}, {
					time: '2016-08-08 00:10:00',
					tem: 22
				}, {
					time: '2016-08-08 00:30:00',
					tem: 16
				}, {
					time: '2016-08-09 00:35:00',
					tem: 26
				}, {
					time: '2016-08-09 01:00:00',
					tem: 12
				}, {
					time: '2016-08-09 01:20:00',
					tem: 26
				}, {
					time: '2016-08-10 01:40:00',
					tem: 18
				}, {
					time: '2016-08-10 02:00:00',
					tem: 26
				}, {
					time: '2016-08-10 02:20:00',
					tem: 12
				}],
				str:''
			}
		},
		watch:{
			showMenu(val){
				if(val){
					this.showzyMenu = false
				}
			},
			showzyMenu(val){
				if(val){
					this.showMenu = false
				}
			}
		},
		onPageScroll() {
			this.showMenu = false
			this.showzyMenu = false
		},
		async onLoad() {
			let that = this
			
			console.log(`The chainId of mainnet is ${ChainId.MAINNET}.`)
			
			// const Accounts = require('web3-eth-accounts');
			// const accounts = new Accounts();
			
			// const { address, privateKey } = accounts.create();
			
			
			that.$web3.eth.getGasPrice().then(console.log);
			
			
			this.$web3.eth.requestAccounts((error,accounts)=>{
				if(error){
					console.log("error",error)
				}
				if(accounts&&accounts.length>0){
					that.str = accounts[0];
					let str = accounts[0];
					that.address = str.substring(0,6) +'...'+ str.substring(str.length-5,str.length-1)
					
				}
				console.log("accounts",accounts)
				that.$web3.eth.getBalance(accounts[0]).then(res=>{
					that.balance = that.$web3.utils.fromWei(res,'ether')
					console.log("bl : ",that.$web3.utils.fromWei(res,'ether'))
				})
			})
			
		},
		onShow() {
			setTimeout(async ()=>{
				
				// const token = new Token(ChainId.MAINNET, this.str, 18, 'HOT', 'Caffeine')
				// const FRIED = new Token(ChainId.MAINNET, this.str, 18, 'FRIED', 'Beans')
				
				// const tokenAmount = new TokenAmount(FRIED, '3000000000000000000')
				// console.log("aaaaaa"+tokenAmount.toExact()) // 3
				
				
				const DAI = new Token(ChainId.MAINNET, this.str, 18)
				
				// note that you may want/need to handle this async code differently,
				// for example if top-level await is not an option
				const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId])
				
				const route = new Route([pair], WETH[DAI.chainId])
				
				console.log(route.midPrice.toSignificant(6)) // 201.306
				console.log(route.midPrice.invert().toSignificant(6)) // 0.00496756
				
				
				
			},1000)
					
		},
		mounted() {
			let el = document.querySelector('#cid')
			let canvas = el.querySelector('canvas')
			const data = [{
				time: '2020-02',
				tem: 26
			}, {
				time: '2020-03',
				tem: 18
			}, {
				time: '2020-04',
				tem: 26
			}, {
				time: '2020-05',
				tem: 12
			},{
				time: '2020-06',
				tem: 10
			}, {
				time: '2020-07',
				tem: 22
			}, {
				time: '2020-08',
				tem: 16
			}, {
				time: '2020-09',
				tem: 26
			}, {
				time: '2020-10',
				tem: 12
			}];
			const chart = new F2.Chart({
				el: canvas,
				pixelRatio: window.devicePixelRatio
			});
			chart.source(data, {
				time: {
					type: 'timeCat',
					tickCount: 3,
					range: [0, 1]
				},
				tem: {
					tickCount: 5,
					min: 0
				}
			});

			chart.axis('time', {
				label: function label(text, index, total) {
					const textCfg = {};
					if (index === 0) {
						textCfg.textAlign = 'left';
					} else if (index === total - 1) {
						textCfg.textAlign = 'right';
					}
					return textCfg;
				}
			});
			chart.tooltip({
				showCrosshairs: true
			});

			chart.area()
				.position('time*tem')
				.color('l(90) 0:#248E84 1:#f7f7f7')
				.shape('smooth');
			chart.line()
				.position('time*tem')
				.color('l(90) 0:#248E84 1:#f7f7f7')
				.shape('smooth');
			chart.render();
			
			
			
			this.compHeight()
			
		},
		methods: {
			yaoqing(content){
				
				 // 复制内容，必须字符串，数字需要转换为字符串
			   const result = h5Copy(content)
			   if (result === false) {
				 uni.showToast({
				   title:'不支持',
				 })
			   } else {
				 uni.showToast({
				   title:'复制成功'
				 })
			   }

			uni.setClipboardData({
				data: content,
				success: function () {
					uni.showToast({
						title: '复制成功'
					});
				}
			});
			},
			compHeight(){
				const query = uni.createSelectorQuery().in(this);
				query.select('#tuijian').boundingClientRect(data => {
				  this.wktop = data.top - 60
				 }).exec();
				 
				 
				 
				 query.select('#zousjhitu').boundingClientRect(data => {
				   this.zousjhitutop = data.top - 60
				  }).exec();
				 query.select('#sort').boundingClientRect(data => {
				   this.sorttop = data.top - 60
				  }).exec();
				  
				 query.select('#swap').boundingClientRect(data => {
				   this.swaptop = data.top - 60
				  }).exec();
				 
			},
			apex(){
				uni.pageScrollTo({
					scrollTop: this.swaptop,
				    duration: 200
				});
			},
			tosort(){
				uni.pageScrollTo({
					scrollTop: this.sorttop,
				    duration: 200
				});
			},
			duihuan(){
				uni.navigateTo({
					url: '/pages/bug-wallet/bug-wallet',
				});
			},
			toTop(){
				uni.pageScrollTo({
				    scrollTop: 0,
				    duration: 200
				});
			},
			liudongxing(){
				uni.pageScrollTo({
					scrollTop: this.zousjhitutop,
				    duration: 200
				});
			},
			wak(){
				uni.pageScrollTo({
					scrollTop: this.wktop,
				    duration: 200
				});
			}
		}
	}
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		background: linear-gradient(to bottom, #F1F8F2, #FFFFFF);
	}

	.djs-text {
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #007F73;
		margin-left: 20rpx;
		background: linear-gradient(-64deg, #0CA99A 0.146484375%, #F7DF78 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.djs-num{
		font-size: 48rpx;font-family: PingFang SC;font-weight: bold;color: #118B80;text-shadow: 0px 4px 5px rgba(0, 127, 115, 0.43);
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
</style>
