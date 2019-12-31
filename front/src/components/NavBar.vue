<template>
	<div id="nav">
		<router-link class="site-logo" to="/">
			<div class="logo">
				<svg height="100%" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" version="1.1" viewBox="0 0 183 190"
						 width="100%" xml:space="preserve"
						 xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/"
						 xmlns:xlink="http://www.w3.org/1999/xlink">
            <path
							d="M58.889,94.523l-23.777,-23.777l70.71,-70.711l70.711,70.711l-23.777,23.777l-46.934,-46.933l-46.933,46.933Z"/>
					<path
						d="M123.785,94.523l23.777,23.777l-70.711,70.711l-70.711,-70.711l23.778,-23.777l46.933,46.934l46.934,-46.934Z"/>
        </svg>
			</div>
			<h1 class="logo-text link"> Is It Up</h1>
		</router-link>

		<div class="links">
			<ul>

				<template v-if="!hasUser">
					<li>
						<router-link to="/user/create">Register</router-link>
					</li>
					<li>
						<router-link to="/user/login">Login</router-link>
					</li>
				</template>

				<template v-if="hasUser">
					<li>
						<router-link to="/user/panel">{{ nameRender }}</router-link>
					</li>
					<li>
						<logout/>
					</li>
				</template>

			</ul>
		</div>

		<slot/>

	</div>
</template>

<script>
	import HttpService from '@/helpers/HttpService'
	import Logout from '@/components/Logout.vue'

	const nameLength = 15

	export default {
		name: 'nav-bar',
		data () {
			return {
				user: null
			}
		},
		computed: {
			hasUser () {
				if (!this.user) {
					return false
				}
				return true
			},
			nameRender () {
				if (this.user.name && this.user.name.length > nameLength) {
					return this.user.name.substring(0, (nameLength - 2)) + '..'
				}
				return this.user.name
			}
		},
		methods: {
			updateUser () {
				this.user = HttpService.user.get_payload()
			}
		},
		mounted () {
			this.$root.$on('user', this.updateUser)
			this.updateUser()
		},
		beforeDestroy () {
			this.$root.$off('user')
		},
		components: {
			Logout
		},
	}

</script>


<style>

#nav {
	margin-bottom: 3rem;
	margin-left: 1rem;
	margin-right: 1rem;
	text-align: center;
}

#nav .logo {
	transform: translateY(25%);
}


#nav .links {
	/*flex-grow: 0;*/
	position: absolute;
	right: 1rem;
	top: 1rem;
	vertical-align: middle;
}

#nav .links li {
	text-align: right;
	decorator: none;
	display: inline-block;
}

@media (max-width: 400px) {
	#nav {
		text-align: left;
	}

	#nav .links li {
		display: block;
	}
}

#nav .links li a, .link {
	font-weight: bold;
	text-decoration: none;
	margin: 0 .33rem;
	transition: 0.3s;
	border-bottom: 2px solid hsla(100, 1%, 90%, 0.1);
}
#nav .links li a:hover, .link:hover {
	border-bottom: 2px solid hsla(100, 1%, 90%, 0.9);
}

.icon {

	margin: 0 auto;
	text-align: center;
	width: 1.55rem;
	transform: translateY(.25rem);
}

.logo {
	width: 4rem;
	display: inline-block;
	fill: var(--colour-pop);
	color: var(--colour-pop);
}

.logo-text {
	display: inline-block;
}

</style>

