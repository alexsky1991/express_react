
const changeEl = (item, arr) => {

	let new_arr = [...arr];

	new_arr = new_arr.map(el => {
		if(el.id === item.id)
			el = item

		return el
	})

	return new_arr

}

export {changeEl}

