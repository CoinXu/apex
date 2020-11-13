<script>
	import Vue from 'vue'
	const Web3 = require('web3');
	export default {
		globalData:{
			$web3 : {}
		},
		onLaunch: function() {
			console.log('App Launch')
			// function initWeb3(){
			//   return new Promise((resolve, reject) => {
			//     if(typeof window.ethereum !== 'undefined') {
			//       const web3 = new Web3(window.ethereum);
			//       window.ethereum.enable()
			//         .then(() => {
			//           resolve(
			//             new Web3(window.ethereum)
			//           );
			//         })
			//         .catch(e => {
			//           reject(e);
			//         });
			//       return;
			//     }
			//     if(typeof window.web3 !== 'undefined') {
			//       return resolve(
			//         new Web3(window.web3.currentProvider)
			//       );
			//     }
			//     resolve(new Web3('http://localhost:9545'));
			//   });
			// };
			let web3 = new Web3(Web3.givenProvider || "ws://localhost:9545");
			getApp({allowDefault: true}).globalData.$web3 = web3
			Vue.prototype.$web3 = web3
			// let web3 = new Web3(Web3.givenProvider);
			// let web3 = initWeb3()
			// console.log("version",web3.version)
			// console.log("web3.eth",web3.eth)
			// wei是以太坊上的的最小单位，ether小数点后18位为一个wei
			
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
</style>
