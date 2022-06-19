export const state = () => ({
	items: [],
})

export const mutations = {
	addItem(state, payload) {
		state.items.push(payload)

		localStorage.setItem('items', JSON.stringify(state.items))
	},
	removeItem(state, id) {
		state.items = state.items.filter(el => el.id !== id);

		const removeItem = JSON.parse(localStorage.getItem('items'));
		const filtered = removeItem.filter(el => el.id !== id);
		localStorage.setItem('items', JSON.stringify(filtered));
	},
	setLocalStorage(state) {
		state.items = JSON.parse(localStorage.getItem('items') || '[]')
	}
}
export const actions = {


}
export const getters = {
	getItem: (state) => {
		return state.items
	},
	getItemById: state => id => state.items.find(el => el.id === id)
}