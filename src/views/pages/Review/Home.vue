<template>
	<v-container fill-height fluid>
		<Credential v-if="(step == 1)" @success="success" />
		<!-- <Otp v-if="(step == 2)" @success="success" /> -->
		<Timeline v-if="(step == 2)" @success="success" />

	</v-container>
</template>
<script>
import Credential from './components/Credential.vue'
// import Otp from './components/Otp.vue';
import Timeline from './components/Timeline.vue';
export default {
	name: 'Home',
	components: { Credential, Timeline },
	data: () => ({
		step: 1,
	}),
	methods: {
		success(step) {
			this.step = step;
		}
	}
}
</script>
<style></style>