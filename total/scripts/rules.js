document.getElementById("set_d1").checked = true;
document.getElementById("set_d3").checked = true;
document.getElementById("set_d5").checked = true;
document.getElementById("set_d8").checked = true;

// hidden difficulty setting
function change_hidden(hide) {
    if (hide) {
        document.getElementsByClassName("hide_field")[0].style.display = "none";
        document.getElementsByClassName("hide_field")[1].style.display = "none";
    }
    else {
        document.getElementsByClassName("hide_field")[0].style.display = "block";
        document.getElementsByClassName("hide_field")[1].style.display = "block";
    }
}

// save setting data
function save_data() {
    field = document.getElementById("set_d1").checked;
    if (!field) {
        items_info[4].content[4].type = 'w';
        items_info[5].content[5].type = 'w';
        items_info[4].content[5].type = 'b';
        items_info[5].content[4].type = 'b';
        document.getElementById("game_table").className = "ten_size";
        field_data[0].value = 10;
        field_data[1].value = 9;
        field_data[2].value = "9";
        field_data[3].value = "90";
        field_data[4].value = "99";
        field_data[5].value = 8;
        setTimeout(function () { loaded_popup = true }, 5990);
    }
    else {
        items_info[3].content[3].type = 'w';
        items_info[4].content[4].type = 'w';
        items_info[3].content[4].type = 'b';
        items_info[4].content[3].type = 'b';
        setTimeout(function () { loaded_popup = true }, 5190);
    }
    player_color = document.getElementById("set_d3").checked;
    if (document.getElementById("set_d5").checked) {
        if (document.getElementById("set_d7").checked) {
            difficulty = 'e';
        }
        if (document.getElementById("set_d8").checked) {
            difficulty = 'm';
        }
        if (document.getElementById("set_d9").checked) {
            difficulty = 'h';
        }
    }
    else {
        difficulty = null;
    }
    document.getElementById("game_setting").style.display = "none";
    for (i = 0; i < field_data[0].value; i++) {
        for (j = 0; j < field_data[0].value; j++) {
            setTimeout("stick(" + i + "," + j + ")", (50 * (i * 10 + j)) + 250);
        }
    }
    
    if (difficulty && (player_color == round)) {
        if (!field) {
            setTimeout("valence()", 6000);
            setTimeout("ai_filler()", 6000);
        }
        else {
            setTimeout("valence()", 5200);
            setTimeout("ai_filler()", 5200);
        }
    }
}

// make achate
function stick(i, j) {
    type = items_info[i].content[j].type;
    it = document.createElement("div");
    it.className = "item";
    if (type) {
        if (type == 'b') {
            it.className = "item black";
            document.getElementById("black_score").innerHTML = parseInt(document.getElementById("black_score").innerHTML) + 1;
        }
        if (type == 'w') {
            it.className = "item white";
            document.getElementById("white_score").innerHTML = parseInt(document.getElementById("white_score").innerHTML) + 1;
        }
    }
    it.id = i * 10 + j;
    it.onclick = function () {
        popup(i * 10 + j , false)
    }
    game_table.appendChild(it);
}

// Choise new achate
function popup(e, acces) {
    if (!loaded_popup) {
        return 0;
    }
    if (acces || (!acces && !difficulty) || (!acces && difficulty && (player_color == !round))) {
        ten = Math.floor(e / 10);
        one = e - (ten * 10);
        if ((player_color == !round) || !difficulty) {
            if (round) {
                around_score = change_achate(ten, one, 'w');
            }
            else {
                around_score = change_achate(ten, one, 'b');
            }
            if (!around_score) {
                return 0;
            }
        }
        cf = close_friend(ten, one);
        if (!items_info[ten].content[one].type && cf) {
            if (round) {
                document.getElementById(e).className = 'item white';
                items_info[ten].content[one].type = 'w';
                document.getElementById("turner").className = 'item black';
                round = false;
            }
            else {
                document.getElementById(e).className = 'item black';
                items_info[ten].content[one].type = 'b';
                document.getElementById("turner").className = 'item white';
                round = true;
            }
            change_achate(ten, one, null);
            document.getElementById("black_score").innerHTML = document.querySelectorAll("#game_table > .black").length;
            document.getElementById("white_score").innerHTML = document.querySelectorAll("#game_table > .white").length;
            if (!parseInt(document.getElementById("black_score").innerHTML) || !parseInt(document.getElementById("white_score").innerHTML)) {
                setTimeout("enderman()", 700);
                return 0;
            }
            valence();
            if (!round && (value_b[0] == 0)) {
				if (value_w[0] == 0) {
					setTimeout("enderman()", 700);
					return 0;
				}
				else {
					if (round) {
						document.getElementById("turner").className = 'item black';
						round = false;
					}
					else {
						document.getElementById("turner").className = 'item white';
						round = true;
					}
                }
            };
            if (round && (value_w[0] == 0)) {
				if (value_b[0] == 0) {
					setTimeout("enderman()", 700);
					return 0;
				}
				else {
					if (round) {
						document.getElementById("turner").className = 'item black';
						round = false;
					}
					else {
						document.getElementById("turner").className = 'item white';
						round = true;
					}
                }
            };
            if (difficulty && (player_color == round)) {
                setTimeout("ai_filler()", 700);
            }
        }
    }
}

// Be near of existing color
function close_friend(i, j) {
    counter = 0;
    for (n = i - 1; n < i + 2; n++) {
        for (m = j - 1; m < j + 2; m++) {
            try {
                if (items_info[n].content[m].type) {
                    counter++;
                }
            } catch (e) { }
        }
    }
    return counter;
}

// Change the color of between achate
function change_achate(i, j, guess) {
    counter = 0;
    item_type = 'w';
    item_class = 'item white';
    if (!guess) {
        if (round) {
            item_type = 'b';
            item_class = 'item black';
        }
        else {
            item_type = 'w';
            item_class = 'item white';
        }
    }
    else {
        if (guess == 'b' || guess == 'bf') {
            item_type = 'b';
            item_class = 'item black';
        }
        else if (guess == 'w' || guess == 'wf') {
            item_type = 'w';
            item_class = 'item white';
        }
    }

    // North
    for (n = i - 1; n > -1; n--) {
        if (!items_info[n].content[j].type) { break; }
        if (items_info[n].content[j].type == item_type) {
            for (p = i - 1; p > n; p--) {
                if (!guess) {
                    document.getElementById(p * 10 + j).className = item_class;
                    items_info[p].content[j].type = item_type;
                }
                if (guess == 'wf' || guess == 'bf') {
                    items_info[p].content[j].type = item_type;
                }
                counter++;
            }
            break;
        }
    }
    // South
    for (n = i + 1; n < field_data[0].value; n++) {
        if (!items_info[n].content[j].type) { break; }
        if (items_info[n].content[j].type == item_type) {
            for (p = i + 1; p < n; p++) {
                if (!guess) {
                    document.getElementById(p * 10 + j).className = item_class;
                    items_info[p].content[j].type = item_type;
                }
                if (guess == 'wf' || guess == 'bf') {
                    items_info[p].content[j].type = item_type;
                }
                counter++;
            }
            break;
        }
    }
    // West
    for (m = j - 1; m > -1; m--) {
        if (!items_info[i].content[m].type) { break; }
        if (items_info[i].content[m].type == item_type) {
            for (k = j - 1; k > m; k--) {
                if (!guess) {
                    document.getElementById(i * 10 + k).className = item_class;
                    items_info[i].content[k].type = item_type;
                }
                if (guess == 'wf' || guess == 'bf') {
                    items_info[i].content[k].type = item_type;
                }
                counter++;
            }
            break;
        }
    }
    // East
    for (m = j + 1; m < field_data[0].value; m++) {
        if (!items_info[i].content[m].type) { break; }
        if (items_info[i].content[m].type == item_type) {
            for (k = j + 1; k < m; k++) {
                if (!guess) {
                    document.getElementById(i * 10 + k).className = item_class;
                    items_info[i].content[k].type = item_type;
                }
                if (guess == 'wf' || guess == 'bf') {
                    items_info[i].content[k].type = item_type;
                }
                counter++;
            }
            break;
        }
    }
    // North-West
    for (n = i - 1; n > -1; n--) {
        m = j - (i - n);
        if (m < 0) { break; }
        if (!items_info[n].content[m].type) { break; }
        if (items_info[n].content[m].type == item_type) {
            for (p = i - 1; p > n; p--) {
                k = j - (i - p);
                if (!guess) {
                    document.getElementById(p * 10 + k).className = item_class;
                    items_info[p].content[k].type = item_type;
                }
                if (guess == 'wf' || guess == 'bf') {
                    items_info[p].content[k].type = item_type;
                }
                counter++;
            }
            break;
        }
    }
    // North-East
    for (n = i - 1; n > -1; n--) {
        m = j + (i - n);
        if (m > field_data[1].value) { break; }
        if (!items_info[n].content[m].type) { break; }
        if (items_info[n].content[m].type == item_type) {
            for (p = i - 1; p > n; p--) {
                k = j + (i - p);
                if (!guess) {
                    document.getElementById(p * 10 + k).className = item_class;
                    items_info[p].content[k].type = item_type;
                }
                if (guess == 'wf' || guess == 'bf') {
                    items_info[p].content[k].type = item_type;
                }
                counter++;
            }
            break;
        }
    }
    // South-West
    for (n = i + 1; n < field_data[0].value; n++) {
        m = j - (n - i);
        if (m < 0) { break; }
        if (!items_info[n].content[m].type) { break; }
        if (items_info[n].content[m].type == item_type) {
            for (p = i + 1; p < n; p++) {
                k = j - (p - i);
                if (!guess) {
                    document.getElementById(p * 10 + k).className = item_class;
                    items_info[p].content[k].type = item_type;
                }
                if (guess == 'wf' || guess == 'bf') {
                    items_info[p].content[k].type = item_type;
                }
                counter++;
            }
            break;
        }
    }
    // South-East
    for (n = i + 1; n < field_data[0].value; n++) {
        m = j + (n - i);
        if (m > field_data[1].value) { break; }
        if (!items_info[n].content[m].type) { break; }
        if (items_info[n].content[m].type == item_type) {
            for (p = i + 1; p < n; p++) {
                k = j + (p - i);
                if (!guess) {
                    document.getElementById(p * 10 + k).className = item_class;
                    items_info[p].content[k].type = item_type;
                }
                if (guess == 'wf' || guess == 'bf') {
                    items_info[p].content[k].type = item_type;
                }
                counter++;
            }
            break;
        }
    }
    if (guess == 'b' || guess == 'w') { return counter; }
}

// Specify winner and loser
function enderman() {
    loaded_popup = false;
    document.getElementById("game_end").style.display = "block";
    black = parseInt(document.getElementById("black_score").innerHTML);
    white = parseInt(document.getElementById("white_score").innerHTML);
    if (black == white) {
        document.getElementsByClassName("game_result")[0].className = "game_result marked";
        document.getElementsByClassName("game_result")[1].className = "game_result marked";
        document.getElementsByClassName("box_name")[0].innerHTML = languages_data[languages].cl_20;
        document.getElementsByClassName("box_name")[1].innerHTML = languages_data[languages].cl_20;
    }
    else if (black > white) {
        document.getElementsByClassName("game_result")[0].className = "game_result marked";
        document.getElementsByClassName("game_result")[1].className = "game_result";
        document.getElementsByClassName("box_name")[0].innerHTML = languages_data[languages].cl_13;
    }
    else if (black < white){
        document.getElementsByClassName("game_result")[0].className = "game_result";
        document.getElementsByClassName("game_result")[1].className = "game_result marked";
        document.getElementsByClassName("box_name")[1].innerHTML = languages_data[languages].cl_13;
    }
    if (difficulty && player_color) {
        document.getElementsByClassName("who_play")[0].innerHTML = languages_data[languages].cl_14;
        document.getElementsByClassName("who_play")[1].innerHTML = languages_data[languages].cl_21;
    }
    else if (difficulty && !player_color) {
        document.getElementsByClassName("who_play")[0].innerHTML = languages_data[languages].cl_21;
        document.getElementsByClassName("who_play")[1].innerHTML = languages_data[languages].cl_14;
    }
    document.getElementsByClassName("result_score")[0].innerHTML = black;
    document.getElementsByClassName("result_score")[1].innerHTML = white;
    if (difficulty == "e") {
        document.getElementsByClassName("game_mode")[0].innerHTML = languages_data[languages].cl_22;
        document.getElementsByClassName("game_mode")[1].innerHTML = languages_data[languages].cl_22;
    }
    else if (difficulty == "m") {
        document.getElementsByClassName("game_mode")[0].innerHTML = languages_data[languages].cl_23;
        document.getElementsByClassName("game_mode")[1].innerHTML = languages_data[languages].cl_23;
    }
    else if (difficulty == "h") {
        document.getElementsByClassName("game_mode")[0].innerHTML = languages_data[languages].cl_24;
        document.getElementsByClassName("game_mode")[1].innerHTML = languages_data[languages].cl_24;
    }
    else {
        document.getElementsByClassName("game_mode")[0].innerHTML = "create by countNico";
        document.getElementsByClassName("game_mode")[1].innerHTML = "create by count_nico";
    }
}

