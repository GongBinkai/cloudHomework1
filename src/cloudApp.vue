<template>
	<div>
		<div>
			<el-menu :default-active="activeIndex" class="el-menu" mode="horizontal" background-color="white" text-color="gray" active-text-color="cornflowerblue" style="margin-left:15%; margin-right: 15%; margin-bottom: 20px; width: 70%">
				<el-menu-item index="1" @click="weatherS">天气</el-menu-item>
				<el-menu-item index="2" @click="newsS">新闻</el-menu-item>
			</el-menu>
		</div>

		<div v-if="weatherShow">

			<h2 style="margin-top: 80px;">请输入查询天气的城市名(地级市)：</h2>
			<div>
				<el-input style="width: 300px; font-size: 1.2em;" v-model="inputCity" placeholder="请输入城市名" required></el-input>
				<el-button type="primary" style="font-size: 1em;" @click="search()">搜索</el-button>
			</div>

			<h2 v-if="errorShow">抱歉，国内未找到该城市</h2>

			<div style="margin-left:15%; margin-right: 15%; margin-bottom: 20px; margin-top: 20px; width: 70%;">
				<el-amap vid="vid" :center="center" :zoom="zoom" class="aMap" style="height: 300px;">
					<el-amap-marker :position="position"></el-amap-marker>
				</el-amap>
			</div>

			<el-card v-if="cityShow" class="box-card" style="margin-left:15%; margin-right: 15%; margin-bottom: 20px; margin-top: 20px; width: 70%;">
				<div slot="header" class="clearfix">
					<p style="font-size: 2em; color: gray; margin: 0">TODAY&nbsp;&nbsp;&nbsp;&nbsp;{{ weatherData.data.forecast[0].ymd }}</p>
				</div>
				<p style="font-size: 2em; color: cornflowerblue; margin: 0; ">{{ weatherData.data.forecast[0].type }} &nbsp;&nbsp;{{ weatherData.data.wendu }}°C</p>
				<p class="normal-font">空气质量：{{ weatherData.data.quality }}</p>
				<p class="normal-font">{{ weatherData.data.forecast[0].low }} ~ {{weatherData.data.forecast[0].high}}</p>
				<p class="normal-font">{{ weatherData.data.forecast[0].fx }} {{ weatherData.data.forecast[0].fl }}</p>
				<p class="normal-font">{{ weatherData.data.forecast[0].shidu }}</p>
				<p class="normal-font">PM10：{{ weatherData.data.pm10 }}&nbsp;&nbsp;&nbsp;&nbsp;PM2.5：{{ weatherData.data.pm25 }}</p>
			</el-card>

			<h2 v-if="cityShow">未来一周天气情况：</h2>
			<div v-if="cityShow" v-for="x in [1, 2, 3, 4, 5, 6, 7]">
				<el-card class="box-card" style="margin-left:15%; margin-right: 15%; margin-bottom: 20px; margin-top: 20px; width: 70%;">
					<div slot="header" class="clearfix">
						<p style="color: dimgray; font-size: 1.5em; margin: 0px">{{ weatherData.data.forecast[x].ymd }}&nbsp;&nbsp; {{weatherData.data.forecast[x].week}}
						</p>
					</div>
					<p style="font-size: 2em; color: cornflowerblue; margin: 0; ">{{ weatherData.data.forecast[x].type }} </p>
					<p class="normal-font">{{weatherData.data.forecast[x].low}} ~ {{weatherData.data.forecast[x].high}}</p>
					<p class="normal-font">{{ weatherData.data.forecast[x].fx }} {{ weatherData.data.forecast[x].fl }}</p>
					<p class="normal-font">{{ weatherData.data.forecast[x].shidu }}</p>
				</el-card>
			</div>
		</div>

		<div v-if="newsShow">
			<h2 style="margin-top: 80px;">今日新闻：</h2>
			<el-tabs value="first" type="card" style="margin-left:15%; margin-right: 15%; margin-bottom: 20px; margin-top: 20px; width: 70%;">
				<el-tab-pane label="汽车" name="first">
					<div v-for="(x, index) in newsData.data.auto" :key="index">
						<el-card class="box-card" style="margin-bottom: 20px;">
							<div slot="header" class="clearfix">
								<a :href="x.link" style="color: dodgerblue; font-size: 1.5em; margin: 0px">
									{{ x.title }}... </a>
							</div>
							<p class="normal-font">source:{{ x.source }}</p>
						</el-card>
					</div>
				</el-tab-pane>
				<el-tab-pane label="财经" name="second">
					<div v-for="(x, index) in newsData.data.money" :key="index">
						<el-card class="box-card" style="margin-bottom: 20px;">
							<div slot="header" class="clearfix">
								<a :href="x.link" style="color: dodgerblue; font-size: 1.5em; margin: 0px">
									{{ x.title }}... </a>
							</div>
							<p class="normal-font">source:{{ x.source }}</p>
						</el-card>
					</div>
				</el-tab-pane>
				<el-tab-pane label="科技" name="third">
					<div v-for="(x, index) in newsData.data.tech" :key="index">
						<el-card class="box-card" style="margin-bottom: 20px;">
							<div slot="header" class="clearfix">
								<a :href="x.link" style="color: dodgerblue; font-size: 1.5em; margin: 0px">
									{{ x.title }}... </a>
							</div>
							<p class="normal-font">source:{{ x.source }}</p>
						</el-card>
					</div>
				</el-tab-pane>
				<el-tab-pane label="体育" name="fourth">
					<div v-for="(x, index) in newsData.data.sports" :key="index">
						<el-card class="box-card" style="margin-bottom: 20px;">
							<div slot="header" class="clearfix">
								<a :href="x.link" style="color: dodgerblue; font-size: 1.5em; margin: 0px">
									{{ x.title }}... </a>
							</div>
							<p class="normal-font">source:{{ x.source }}</p>
						</el-card>
					</div>
				</el-tab-pane>
				<el-tab-pane label="推荐" name="fifth">
					<div v-for="(x, index) in newsData.data.dy" :key="index">
						<el-card class="box-card" style="margin-bottom: 20px;">
							<div slot="header" class="clearfix">
								<a :href="x.link" style="color: dodgerblue; font-size: 1.5em; margin: 0px">
									{{ x.title }}... </a>
							</div>
							<p class="normal-font" style="font-size: 1.5em; margin: 5px;">source:{{ x.source }}</p>
						</el-card>
					</div>
				</el-tab-pane>
			</el-tabs>

		</div>
	</div>

</template>

<script>
	import city from './_city.json'
	var cityToCode = {}
	for(var i = 0; i < city.length; i++) {
		cityToCode[city[i].city_name] = city[i].city_code;
	}
	var geocoder = null;

	export default {
		data() {
			return {
				inputCity: '',
				weatherData: {},
				newsData: null,
				activeIndex: '1',
				cityShow: false,
				errorShow: false,
				weatherShow: true,
				newsShow: false,
				zoom: 6,
				center: [121.473701, 31.230416],
				position: [121.473701, 31.230416]
			}
		},
		methods: {
			search() {
				if(cityToCode[this.inputCity] != null)
					this.$axios({
						method: 'get',
						url: "http://t.weather.sojson.com/api/weather/city/" + cityToCode[this.inputCity]
					}).then((res) => {
						this.weatherData = res.data;

						//this.$options.methods.setMap(this.inputCity);
						if(!geocoder) {
							geocoder = new AMap.Geocoder();
						}
						var address = this.inputCity;
						geocoder.getLocation(address, (status, result) => {
							if(status === 'complete' && result.geocodes.length) {
								var lnglat = result.geocodes[0].location;
								this.center = [lnglat.lng, lnglat.lat];
								this.position = [lnglat.lng, lnglat.lat];
								console.log(this.center);
							} else {
								alert(JSON.stringify(result));
							}
						})

						this.errorShow = false;
						this.cityShow = true;
					});
				else {
					this.cityShow = false;
					this.errorShow = true;
				}

			},
			weatherS() {
				this.weatherShow = true;
				this.newsShow = false;
			},
			newsS() {
				if(this.newsData != null) {
					this.weatherShow = false;
					this.newsShow = true;
					return;
				}
				this.$axios({
					method: 'get',
					url: "https://www.apiopen.top/journalismApi"
				}).then((res) => {
					this.newsData = res.data;
					this.weatherShow = false;
					this.newsShow = true;
				});
			}

		},
	}
</script>

<style scoped>
	.el-menu {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}
	
	.normal-font {
		font-size: 1.5em;
		margin: 5px;
	}
	
	.box-card {
		margin-bottom: 20px;
		width: 100%;
	}
</style>