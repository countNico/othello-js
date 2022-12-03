// handle computer's playing (heart of AI)
function ai_filler() {
    ai_counter = 0;
    aid = 0;
    if (difficulty == "e") {
        ai_count(0);
        if (ai_counter == 1) {
            if (player_color) {
                popup(value_w_id[0],true);
            }
            else {
                popup(value_b_id[0],true);
            }
        }
        else if (ai_counter > 1) {
            if (player_color) {
                if ((document.getElementById("black_score").innerHTML + document.getElementById("white_score").innerHTML) > 40) {
                    popup(value_w_id[Math.floor((ai_counter * 7) / 10)], true);
                }
                else {
                    popup(value_w_id[Math.floor((ai_counter * 3) / 5)], true);
                }
            }
            else {
                if (document.getElementById("black_score").innerHTML == 2 && document.getElementById("white_score").innerHTML == 2) {
                    popup(value_b_id[Math.floor(Math.random() * 4)],true);
                }
                else {
                    if ((document.getElementById("black_score").innerHTML + document.getElementById("white_score").innerHTML) > 40) {
                        popup(value_b_id[Math.floor((ai_counter * 7) / 10)], true);
                    }
                    else {
                        popup(value_b_id[Math.floor((ai_counter * 3) / 5)], true);
                    }
                }
            }
        }
    }
    else if (difficulty == "m") {
        if (player_color) {
            ai_count(value_w[0]);
            ai_count(0);
        }
        else {
            ai_count(value_b[0]);
            ai_count(0);
        }
        if (ai_counter > (aid + 4)) {
            if (player_color) {
                popup(value_w_id[Math.floor(Math.random() * (aid + 4))], true);
            }
            else {
                popup(value_b_id[Math.floor(Math.random() * (aid + 4))], true);
            }
        }
        else if (ai_counter == (aid + 3) || ai_counter == (aid + 4)) {
            if (player_color) {
                popup(value_w_id[Math.floor(Math.random() * (aid + 2))], true);
            }
            else {
                popup(value_b_id[Math.floor(Math.random() * (aid + 2))], true);
            }
        }
        else {
            if (player_color) {
                popup(value_w_id[Math.floor(Math.random() * aid)], true);
            }
            else {
                popup(value_b_id[Math.floor(Math.random() * aid)], true);
            }
        }
    }
    else if (difficulty == "h") {
        if (player_color) {
            for (r = 0; r < 100; r++) {
                if (!value_w[r]) {
                    break;
                }
                else {
                    if (value_w_id[r] == "0" || value_w_id[r] == field_data[2].value || value_w_id[r] == field_data[3].value || value_w_id[r] == field_data[4].value) {
                        setTimeout("popup(value_w_id[" + r + "], true)", 1);
                        return 0;

                    }
                }
            }
        }
        else {
            for (r = 0; r < 100; r++) {
                if (!value_b[r]) {
                    break;
                }
                else {
                    if (value_b_id[r] == "0" || value_b_id[r] == field_data[2].value || value_b_id[r] == field_data[3].value || value_b_id[r] == field_data[4].value) {
                        setTimeout("popup(value_b_id[" + r + "], true)", 1);
                        return 0;
                    }
                }
            }
        }
        ai_count(0);
        aid = ai_counter;
        /*
        if (player_color) {
            ai_count(value_w[aid]);
            if (value_w[aid]) {
                ai_count(value_w[aid]);
                if (value_w[aid]) {ai_count(value_w[aid]);}
            }
        }
        else {
            ai_count(value_b[aid]);
            if (value_b[aid]) {
                ai_count(value_b[aid]);
                if (value_b[aid]) {ai_count(value_b[aid]);}
            }
        }
        */
        for (j = 0; j < field_data[0].value; j++) {
            for (k = 0; k < field_data[0].value; k++) {
                items_info[j].content[k].future = items_info[j].content[k].type;
            }
        }
        value_top.splice(0, value_top.length);
        value_avrage.splice(0, value_avrage.length);
        for (i = aid - 1; i > -1; i--) {
            setTimeout("ai_hard(" + i + ")", 1);
        }
        setTimeout("hard_sort(" + aid + ")", 1);
        if (player_color) {
            setTimeout("popup(value_w_id[0], true)", 1);
        }
        else {
            setTimeout("popup(value_b_id[0], true)", 1);
        }
    }
}

// counting the length of valid data
function ai_count(numb) {
    if (!numb) {
        for (i = 0; i < 100; i++) {
            if (player_color) {
                if (value_w[i]) { ai_counter++ }
                else { break }
            }
            else {
                if (value_b[i]) { ai_counter++ }
                else { break }
            }
        }
    }
    else {
        for (i = 0; i < 100; i++) {
            if (player_color) {
                if (value_w[i] == numb) { aid++ }
                else if (value_w[i] < numb) { break }
            }
            else {
                if (value_b[i] == numb) { aid++ }
                else if (value_w[i] < numb) { break }
            }
        }
    }
}

// guess future data in hard mood
function ai_hard(i) {
    ten = 0;
    one = 0;
    if (player_color) {
        ten = Math.floor(value_w_id[i] / 10);
        one = value_w_id[i] - (ten * 10);
        items_info[ten].content[one].type = 'w';
        change_achate(ten, one, 'wf');
    }
    else {
        ten = Math.floor(value_b_id[i] / 10);
        one = value_b_id[i] - (ten * 10);
        items_info[ten].content[one].type = 'b';
        change_achate(ten, one, 'bf');
    }
    player_corner = hard_valence();
	value_top.unshift((value_future[0] + get_corner(player_corner)));
    sum = 0;
    count_all = 0;
    for (m = 0; m < 100; m++) {
        if (value_future[m]) {
            count_all++;
            sum += value_future[m];
        }
        else { break}
    }
    value_avrage.unshift(Number(((sum + player_corner) / count_all).toFixed(3)));
    for (j = 0; j < field_data[0].value; j++) {
        for (k = 0; k < field_data[0].value; k++) {
            items_info[j].content[k].type = items_info[j].content[k].future;
        }
    }
}

// fix ai attention to corners
function get_corner(player_corner) {
	if (player_color && (items_info[0].content[0].type != 'b' && items_info[0].content[field_data[1].value].type != 'b' && items_info[field_data[1].value].content[0].type != 'b' && items_info[field_data[1].value].content[field_data[1].value].type != 'b')) {
		console.log("bbb");
		player_corner -= 4;
		if (player_corner < 0) {
			player_corner = 0;
		}
		console.log(player_corner);
		return player_corner;
	}
	else if (!player_color && (items_info[0].content[0].type != 'w' && items_info[0].content[field_data[1].value].type != 'w' && items_info[field_data[1].value].content[0].type != 'w' && items_info[field_data[1].value].content[field_data[1].value].type != 'w')) {
		console.log("www");
		player_corner -= 4;
		if (player_corner < 0) {
			player_corner = 0;
		}
		console.log(player_corner);
		return player_corner;
	}
    else if ((player_color && document.getElementById("black_score").innerHTML < 10) || (!player_color && document.getElementById("white_score").innerHTML < 10)) {
        player_corner -= 2;
		if (player_corner < 0) {
			player_corner = 0;
		}
		console.log(player_corner);
		return player_corner;
    }
    else {
        return player_corner;
    }
}

// calculate the score of future turn
function hard_valence() {
    player_corner = 0;
    value_future.splice(0, value_future.length);
    value_future_id.splice(0, value_future_id.length);
    for (i = 0; i < field_data[0].value; i++) {
        for (j = 0; j < field_data[0].value; j++) {
            friends = close_friend(i, j);
            item_id = i * 10 + j;
            if (friends && !items_info[i].content[j].type) {
                counter = 0;
                if (round) {
                    counter = change_achate(i, j, 'b');
                }
                else {
                    counter = change_achate(i, j, 'w');
                }
                value_future.unshift(counter);
                value_future_id.unshift(item_id);
                if (counter && (item_id == "0" || item_id == field_data[2].value || item_id == field_data[3].value || item_id == field_data[4].value)) {
                    player_corner += field_data[5].value;
                }
            }
            else {
                value_future.unshift(0);
                value_future_id.unshift(item_id);
            }
        }
    }
    sorting_data(true);
    return player_corner;
}

// sorting hard mood data
function hard_sort(aid) {
    if (player_color) {
        for (i = 0; i < aid; i++) {
            for (j = i + 1; j < aid; j++) {
                if ((value_w[i] - value_top[i]) < (value_w[j] - value_top[j])) {
                    hard_sort_helper("w");
                }
            }
        }
    }
    else {
        for (i = 0; i < aid; i++) {
            for (j = i + 1; j < aid; j++) {
                if ((value_b[i] - value_top[i]) < (value_b[j] - value_top[j])) {
                    hard_sort_helper("b");
                }
            }
        }
    }
    data_length = 0;
    for (i = 0; i < aid; i++) {
        if ((value_w[i] - value_top[i]) == (value_w[0] - value_top[0])) {
            data_length++;
        }
        else {break}
    }
    for (i = 0; i < data_length; i++) {
        for (j = i + 1; j < data_length; j++) {
            if (value_avrage[i] > value_avrage[j]) {
                if (player_color) {
                    hard_sort_helper("w");
                }
                else {
                    hard_sort_helper("b");
                }
            }
        }
    }
}

// make hard_sort function shorter
function hard_sort_helper(color) {
    if (color == "w") {
        sample_a = value_w[i];
        sample_b = value_w_id[i];
        sample_c = value_top[i];
        sample_d = value_avrage[i];
        value_w.splice(i, 1, value_w[j]);
        value_w_id.splice(i, 1, value_w_id[j]);
        value_top.splice(i, 1, value_top[j]);
        value_avrage.splice(i, 1, value_avrage[j]);
        value_w.splice(j, 1, sample_a);
        value_w_id.splice(j, 1, sample_b);
        value_top.splice(j, 1, sample_c);
        value_avrage.splice(j, 1, sample_d);
    }
    else if (color == "b") {
        sample_a = value_b[i];
        sample_b = value_b_id[i];
        sample_c = value_top[i];
        sample_d = value_avrage[i];
        value_b.splice(i, 1, value_b[j]);
        value_b_id.splice(i, 1, value_b_id[j]);
        value_top.splice(i, 1, value_top[j]);
        value_avrage.splice(i, 1, value_avrage[j]);
        value_b.splice(j, 1, sample_a);
        value_b_id.splice(j, 1, sample_b);
        value_top.splice(j, 1, sample_c);
        value_avrage.splice(j, 1, sample_d);
    }
}

// calculate the score of each achate
function valence() {
    value_b.splice(0, value_b.length);
    value_b_id.splice(0, value_b_id.length);
    value_w.splice(0, value_w.length);
    value_w_id.splice(0, value_w_id.length);
    for (i = 0; i < field_data[0].value; i++) {
        for (j = 0; j < field_data[0].value; j++) {
            friends = close_friend(i, j);
            item_id = i * 10 + j;
            if (friends && !items_info[i].content[j].type) {
                counter = change_achate(i, j, 'b');
                value_b.unshift(counter);
                value_b_id.unshift(item_id);
                counter = change_achate(i, j, 'w');
                value_w.unshift(counter);
                value_w_id.unshift(item_id);
            }
            else {
                value_b.unshift(0);
                value_b_id.unshift(item_id);
                value_w.unshift(0);
                value_w_id.unshift(item_id);
            }
        }
    }
    sorting_data(false);
}

// sorting score and data
function sorting_data(future) {
    if (future) {
        for (i = 0; i < 100; i++) {
            for (j = i + 1; j < 100; j++) {
                try {
                    if (value_future[i] < value_future[j]) {
                        sample_a = value_future[i];
                        sample_b = value_future_id[i];
                        value_future.splice(i, 1, value_future[j]);
                        value_future_id.splice(i, 1, value_future_id[j]);
                        value_future.splice(j, 1, sample_a);
                        value_future_id.splice(j, 1, sample_b);
                    }
                } catch (e) { }
            }
        }
    }
    else {
        if (!round || (difficulty == "h")) {
            for (i = 0; i < 100; i++) {
                for (j = i + 1; j < 100; j++) {
                    try {
                        if (value_b[i] < value_b[j]) {
                            sample_a = value_b[i];
                            sample_b = value_b_id[i];
                            value_b.splice(i, 1, value_b[j]);
                            value_b_id.splice(i, 1, value_b_id[j]);
                            value_b.splice(j, 1, sample_a);
                            value_b_id.splice(j, 1, sample_b);
                        }
                    } catch (e) { }
                }
            }
        }
        if (round || (difficulty == "h")) {
            for (i = 0; i < 100; i++) {
                for (j = i + 1; j < 100; j++) {
                    try {
                        if (value_w[i] < value_w[j]) {
                            sample_a = value_w[i];
                            sample_b = value_w_id[i];
                            value_w.splice(i, 1, value_w[j]);
                            value_w_id.splice(i, 1, value_w_id[j]);
                            value_w.splice(j, 1, sample_a);
                            value_w_id.splice(j, 1, sample_b);
                        }
                    } catch (e) { }
                }
            }
        }
    }
}