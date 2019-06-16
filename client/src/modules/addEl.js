
const addEl = (item, arr) => {
	let new_arr = [...arr];
	new_arr.unshift(item);

	return new_arr;
}

export {addEl}