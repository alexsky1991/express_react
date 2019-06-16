import {deleteEl} from '../modules/deleteEl';


let id = 2;
let arr = [{id:8, a:5}, {id:2, a:6}];

test('проверка удаления вопроса', () => {
	expect(deleteEl(id, arr)).toEqual([{id:8, a:5}]);
})
