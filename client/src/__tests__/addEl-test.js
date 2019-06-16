
import {addEl} from '../modules/addEl';


let item = 'item';
let arr = [1 , 2];

test('проверка добавления вопроса', () => {
	expect(addEl(item, arr)).toEqual(['item',1,2]);
})
