<template>
	<button class="button" :disabled="disabled" :class=state v-on:click=OnClick>
		<slot/>
	</button>
</template>

<script>
	export default {
		name: 'ButtonC',
		data () {
			return {
				attrs: {
					waitTime: 1.8,
				},
				state: '',
			}
		},
		props: {
			disabled: {
				type: Boolean,
				required: false,
				default: false
			}
		},
		methods: {
			OnSuccess: function () {
				let self = this
				self.state = 'success'
				setTimeout(function () {
					self.state = ''
					self.$emit('done')
				}, this.attrs.waitTime * 1000)
			},
			OnFail: function () {
				let self = this
				self.state = 'fail'
				setTimeout(function () {
					self.state = ''
					self.$emit('done')
				}, this.attrs.waitTime * 1000)
			},
			OnReset: function () {
				this.state = ''
			},
			OnClick: function () {
				this.$emit('click')
			},
		},
		mounted () {
			this.OnReset()
		},
	}
</script>


<style>

.button {
	margin-top: .5rem;
	font-weight: bold;
	color: var(--colour-pop);
	border: 1px solid var(--colour-pop);
	background-color: var(--colour-dark);
  cursor: pointer;
	transition: 0.3s;
}
.button p, .button span {
	transition: inherit;
}

button:focus, .button:focus {
	background-color: hsla(210, 33%, 75%, .5);
	border: 1px solid white;
}

.button:hover, .button:active {
	background-color: var(--colour-mid);
}

.button.success {
	background-color: var(--colour-success);
}

.button.fail {
	background-color: var(--colour-fail);
}

.button[disabled] {
	cursor: not-allowed;
}
.button[disabled] p,.button[disabled] span {
	opacity: 0.33;
}

</style>