<template>
	<main class="menu-colors">
		<!-- <button class="back-btn" @click="openMenu(1)">
			<img :src="require('@/assets/back-arrow.svg')" alt="" />
		</button> -->
		<div
			v-for="(color, idx) in colors"
			:key="idx"
			:style="'background-color:' + color"
			@click="setColorBg(idx)"
		></div>
	</main>
</template>

<script>
export default {
	data() {
		return {
			colors: [
				"#d29034",
				"#0079bf",
				"#519839",
				"#b04632",
				"#89609e",
				"#cd5a91",
				"#4bbf6b",
				"#00aecc",
				"#838c91",
			]
		}
	},
	methods: {
		openMenu(idx) {
			this.$emit('openMenu', idx)
		},
		setColorBg(colorIdx) {
			const selectedColor = this.colors[colorIdx]
			const boardStyle = this.$store.getters.board.style
			boardStyle.bgColor = selectedColor
			boardStyle.bgUrl = null

            this.$emit('chosenBg',selectedColor)
			// this.$store.commit({ type: 'setBoardStyle', boardStyle })
			// this.$store.dispatch({ type: 'saveBoard' })
		}
	}
}
</script>

<style lang="scss">
.menu-colors {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    gap: 10px;
    padding-top: 13px;
    padding-left: 12px;
}
.menu-colors>* {
    width: 141px;
    height: 96px;
    border-radius: 8px;
    cursor: pointer;
}

</style>