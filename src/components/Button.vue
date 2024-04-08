<template>
	<v-btn class="rounded-lg" @click="click" block large :outlined="isText" style="text-transform: none; font-weight: 300;"
		:style="[!isText ? { 'background-color': '#5d6fff', color: '#ffffff' } : { color: '#5d6fff', 'font-weight': 'bold' }]">
		{{ text }}
	</v-btn>
</template>

<script>
export default {
	name: "Button",
	props: {
		'text': {
			type: String
		},
		'click': {
			type: Function
		},
		'isText': {
			type: Boolean,
			default: false
		}
	}
}
</script>

<style></style>