<template>
	<section class="progress-bar">
		<el-progress :percentage="percentage" v-if="percentage < 100" />
		<el-progress :percentage="percentage" status="success" v-else />
	</section>
</template>

<script>
export default {
	props: {
		percentage: {
			type: Number,
			default: 0
		},
	},
};
</script>
