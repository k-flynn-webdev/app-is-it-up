<template>

	<div>

		<div class="flex-items">

			<div class="option block">
				<label for="url"> URL </label>
				<input id="url" name="url" placeholder="eg www.myhome.com" type="text" minLength="4"
							 required v-model="job.url"/>
			</div>
			<div class="option">
				<label for="active"> Active </label>
				<select id="active" name="active" v-model="job.active">
					<template v-for="item in attrs.active">
						<option v-bind:key=item v-bind:value="item">
							{{ item }}
						</option>
					</template>
				</select>
			</div>

		</div>

		<div class="flex-items">

			<div class="option">
				<label for="method"> Method </label>
				<select id="method" name="method" v-model="job.method">
					<template v-for="method in attrs.methods">
						<option v-bind:key="method" v-bind:value="method">
							{{ method }}
						</option>
					</template>
				</select>
			</div>

			<div class="option">
				<label for="ping"> Ping </label>
				<select id="ping" name="ping" v-model="job.ping">
					<template v-for="ping in attrs.pings">
						<option v-bind:key=ping v-bind:value="ping">
							{{ ping }}m
						</option>
					</template>
				</select>
			</div>

			<div class="option block">
				<label for="params"> Params </label>
				<input id="params" name="params" placeholder="eg user123" type="text" maxLength="50"
							 v-model="job.params"/>
			</div>

		</div>

		<div v-if=renderFull style="margin-top:1rem;">

			<div class="flex-items wrap space-evenly1">

				<div class="info">
					<label> Status </label>
					<Up v-if="getStatus === 1"/>
					<Down v-if="getStatus === 2"/>
					<Off v-if="getStatus === 3"/>
				</div>

				<div class="info" title="URL Uptime">
					<template v-for="(period, name) in job.uptime">
						<div
							class="periods"
							:key=name
							:title="`URL ${name} uptime`">
							<label> {{ name }} </label>
							<p> {{ period.toFixed(2) }}%</p>
						</div>
					</template>
				</div>

				<div class="option">
					<label> ID </label>
					<p>{{ job.job_hash }}</p>
				</div>

				<div class="option">
					<label> User </label>
					<p>{{ job.user.name }}</p>
				</div>

			</div>

			<div style="margin: 1rem 0;">
				<div class="item-health" ref="canvasHolder">
					<canvas ref="canvas" :width="width" :height="height"/>
				</div>
			</div>

			<div class="flex-items wrap space-evenly1">
				<div class="info">
					<label>Ping #</label>
					<p> {{ job.tick.num }} / {{ job.tick.max }}</p>
				</div>
			</div>


		</div>

		<slot></slot>

	</div>

</template>

<script>

	import Up from '@/components/Ic_Up.vue'
	import Down from '@/components/Ic_Down.vue'
	import Off from '@/components/Ic_Off.vue'

	const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a))
	const lerp = (x, y, a) => x * (1 - a) + y * a
	const invlerp = (x, y, a) => clamp((a - x) / (y - x))

	const defaultJob = () => {
		return {
			url: null,
			method: null,
			params: null,
			ping: null,
			active: null,
			status: null,
			fails: [],
			health: [{ response: 0, time: null, status: 0 }],
			job_hash: null
		}
	}

	export default {
		name: 'JobRender',
		props: {
			attrs: Object,
			job: {
				type: Object,
				default: defaultJob()
			},
		},

		data () {
			return {
				width: null,
				height: null
			}
		},

		components: {
			Up,
			Down,
			Off,
		},

		computed: {
			renderFull: function () {
				if (this.job.full) return true
				return false
			},
			getStatus () {
				if (!this.job.active) return 3
				if (!this.job.status) return 2
				return 1
			}
		},

		mounted () {
			// set off animater
		},

		updated () {
			if (!this.width) {
				this.$nextTick(function () {
					this.width = this.$refs.canvasHolder.clientWidth
					this.height = this.$refs.canvasHolder.clientHeight
				})
			}
		},

		watch: {
			'job.health' () {
				if (!this.renderFull) {
					return
				}
				setTimeout(() => {
					this.renderHealth()
				}, 66)
			}
		},

		methods: {
			RenderDate: function (input) {
				return new Date(input).toLocaleString()
			},
			renderHealth () {
				let ctx = this.$refs.canvas.getContext('2d')

				let barWidth = this.width / this.job.health.length
				let barSlow = 800
				let barFast = 5

				ctx.lineWidth = barWidth * 0.9

				let colourMax = 172
				let colourMin = 14

				for (let i = 0, max = this.job.health.length; i < max; i++) {
					let hasTime = !!(this.job.health[i].time)
					let invLerpVal = 1
					let tmpColor = tmpColor = 'hsl(14,50%,50%)'

					if (!hasTime) {
						tmpColor = 'hsl(14,50%,90%)'
					}

					if (hasTime &&
						this.job.health[i].status > 100 &&
						this.job.health[i].status < 400) {
						invLerpVal = 1 - invlerp(barSlow, barFast, this.job.health[i].response)
						tmpColor = 'hsl(' + lerp(colourMax, colourMin, invLerpVal) + ',50%,50%)'
					}

					let xCoord = (i * barWidth) + (barWidth * 0.5)
					let yCoord = invLerpVal * this.height

					ctx.beginPath()
					ctx.moveTo(xCoord, yCoord - 2)
					ctx.lineTo(xCoord, yCoord + 2)
					ctx.strokeStyle = tmpColor
					ctx.stroke()
				}

			}
		},
	}
</script>

<style>

</style>

<style scoped>

.periods {
	display: inline-block;
	margin: 0 .5rem;
}

.item-fail {
	margin: .3rem;
}

.item-health {
	height: 4rem;
}

</style>



