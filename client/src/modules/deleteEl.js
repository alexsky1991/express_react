
const deleteEl = (id, arr) => {

	let new_arr = [...arr];

	new_arr = new_arr.filter(el => el.id !== id);

	return new_arr;
}

export {deleteEl}