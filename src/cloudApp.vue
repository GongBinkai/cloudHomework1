<template>
	<div>
		<div>
			<el-menu :default-active="activeIndex" class="el-menu" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
				<el-menu-item index="1" @click="weatherS">天气</el-menu-item>
				<el-menu-item index="2" @click="newsS">新闻</el-menu-item>
			</el-menu>
		</div>

		<div v-if="weatherShow">
			<h2 style="margin-top: 80px;">请输入查询天气的城市名：</h2>
			<div>
				<el-input style="width: 300px; font-size: 1.2em;" v-model="inputCity" placeholder="请输入城市名"></el-input>
				<el-button type="primary" style="font-size: 1em;" @click="search">搜索</el-button>
			</div>
			<el-card v-if="cityShow" class="box-card" style="margin-left:20%; margin-right: 20%; margin-bottom: 20px; margin-top: 20px; width: 60%;">
				<div slot="header" class="clearfix">
					<p style="font-size: 2em; color: gray; margin: 0">TODAY&nbsp;&nbsp;&nbsp;&nbsp;{{ weatherData.data.forecast[0].ymd }}</p>
				</div>
				<p style="font-size: 2em; color: cornflowerblue; margin: 0; ">{{ weatherData.data.forecast[0].type }} &nbsp;&nbsp;{{ weatherData.data.wendu }}°C</p>
				<p class="normal-font">空气质量：{{ weatherData.data.quality }}</p>
				<p class="normal-font">{{weatherData.data.forecast[0].low}} ~ {{weatherData.data.forecast[0].high}}</p>
				<p class="normal-font">{{ weatherData.data.forecast[0].fx }} {{ weatherData.data.forecast[0].fl }}</p>
				<p class="normal-font">{{ weatherData.data.forecast[0].shidu }}</p>
				<p class="normal-font">PM10：{{ weatherData.data.pm10 }}&nbsp;&nbsp;&nbsp;&nbsp;PM2.5：{{ weatherData.data.pm25 }}</p>
			</el-card>
			<h2 v-if="cityShow">未来一周天气情况：</h2>
			<div v-if="cityShow" v-for="x in [1, 2, 3, 4, 5, 6, 7]">
				<el-card class="box-card" style="margin-left:20%; margin-right: 20%; margin-bottom: 20px; width: 60%;">
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
			<el-tabs value="first" type="card">
				<el-tab-pane label="汽车" name="first">
					<div v-for="x in [0, 1, 2, 3, 4, 5, 6]">
						<el-card class="box-card" style="margin-left:20%; margin-right: 20%; margin-bottom: 20px; width: 60%;">
							<div slot="header" class="clearfix">
								<a :href= "newsData.data.auto[x].link" style="color: dodgerblue; font-size: 1.5em; margin: 0px">
									{{ newsData.data.auto[x].title }}... </a>
							</div>
							<p class="normal-font">source:{{ newsData.data.auto[x].source }}</p>
						</el-card>
					</div>
				</el-tab-pane>
				<el-tab-pane label="财经" name="second">
					<div v-for="x in [0, 1, 2, 3, 4, 5, 6]">
						<el-card class="box-card" style="margin-left:20%; margin-right: 20%; margin-bottom: 20px; width: 60%;">
							<div slot="header" class="clearfix">
								<a :href= "newsData.data.auto[x].link" style="color: dodgerblue; font-size: 1.5em; margin: 0px">
									{{ newsData.data.money[x].title }}... </a>
							</div>
							<p class="normal-font">source:{{ newsData.data.money[x].source }}</p>
						</el-card>
					</div>
				</el-tab-pane>
				<el-tab-pane label="科技" name="third">
					<div v-for="x in [0, 1, 2, 3, 4, 5, 6]">
						<el-card class="box-card" style="margin-left:20%; margin-right: 20%; margin-bottom: 20px; width: 60%;">
							<div slot="header" class="clearfix">
								<a :href= "newsData.data.auto[x].link" style="color: dodgerblue; font-size: 1.5em; margin: 0px">
									{{ newsData.data.tech[x].title }}... </a>
							</div>
							<p class="normal-font">source:{{ newsData.data.tech[x].source }}</p>
						</el-card>
					</div>
				</el-tab-pane>
				<el-tab-pane label="体育" name="fourth">
					<div v-for="x in [0, 1, 2, 3, 4, 5, 6]">
						<el-card class="box-card" style="margin-left:20%; margin-right: 20%; margin-bottom: 20px; width: 60%;">
							<div slot="header" class="clearfix">
								<a :href= "newsData.data.auto[x].link" style="color: dodgerblue; font-size: 1.5em; margin: 0px">
									{{ newsData.data.sports[x].title }}... </a>
							</div>
							<p class="normal-font">source:{{ newsData.data.sports[x].source }}</p>
						</el-card>
					</div>
				</el-tab-pane>
				<el-tab-pane label="推荐" name="fifth">
					<div v-for="x in [0, 1, 2, 3, 4, 5, 6]">
						<el-card class="box-card" style="margin-left:20%; margin-right: 20%; margin-bottom: 20px; width: 60%;">
							<div slot="header" class="clearfix">
								<a :href= "newsData.data.auto[x].link" style="color: dodgerblue; font-size: 1.5em; margin: 0px">
									{{ newsData.data.dy[x].title }}... </a>
							</div>
							<p class="normal-font">source:{{ newsData.data.dy[x].source }}</p>
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

	export default {
		data() {
			return {
				inputCity: '',
				weatherData: {},
				newsData: {},
				activeIndex: '1',
				cityShow: false,
				weatherShow: true,
				newsShow: false
			}
		},
		methods: {
			search() {
				this.$axios({
					method: 'get',
					url: "http://t.weather.sojson.com/api/weather/city/" + cityToCode[this.inputCity]
				}).then((res) => {
					this.weatherData = res.data;
					console.log(this.weatherData);
				});
				this.cityShow = true;
			},
			weatherS() {
				this.weatherShow = true;
				this.newsShow = false;
			},
			newsS() {
				this.$axios({
					method: 'get',
					url: "https://www.apiopen.top/journalismApi"
				}).then((res) => {
					this.newsData = res.data;
					console.log(this.newsData.data);
				});
				this.weatherShow = false;
				this.newsShow = true;
			}
		}
	}
</script>

<style>
	.el-menu {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}
	
	,
	.normal-font {
		font-size: 1.5em;
		margin: 5px;
	}
</style>