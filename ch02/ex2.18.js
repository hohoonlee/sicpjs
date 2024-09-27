const {list, head, tail, display_list, pair, is_null} = require('sicp');

const append = (list1, list2) => (!list1)?list2: pair(head(list1), append(tail(list1), list2));

const reverse = items => is_null(tail(items))
                        ?list(head(items))
                        :append(reverse(tail(items)), list(head(items)));

display_list(reverse(list(1, 4, 9, 16, 25)));