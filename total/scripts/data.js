round = false;
loaded_popup = false;
field = true;
player_color = true;
difficulty = 'm';

var field_data = [
    { value: 8 },
    { value: 7 }
];

var value_b = [];
var value_b_id = [];
var value_w = [];
var value_w_id = [];
var value_future = [];
var value_future_id = [];
var value_top = [];
var value_avrage = [];

var items_info = [
    {
        content: [
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 }
        ]
    },
    {
        content: [
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 }
        ]
    },
    {
        content: [
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 }
        ]
    },
    {
        content: [
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: 'w', future: 0 },
            { type: 'b', future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 }
        ]
    },
    {
        content: [
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: 'b', future: 0 },
            { type: 'w', future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 }
        ]
    },
    {
        content: [
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 }
        ]
    },
    {
        content: [
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 }
        ]
    },
    {
        content: [
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 }
        ]
    },
    {
        content: [
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 }
        ]
    },
    {
        content: [
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 },
            { type: null, future: 0 }
        ]
    }
];
