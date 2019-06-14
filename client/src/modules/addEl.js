
const addEl = (item, arr) => {
	arr = [...arr];
	arr.unshift(item);

	return arr;
}

export {addEl}