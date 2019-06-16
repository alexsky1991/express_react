import {changeEl} from '../modules/changeEl';


let item = {id:1, a:8};
let arr = [{id:1, c: 7} , {id:3, h: 9}];

test('проверка изменения вопроса', () => {
	expect(changeEl(item, arr)).toEqual([{id:1, a: 8} , {id:3, h: 9}]);
})