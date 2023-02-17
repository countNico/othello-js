round = false;
loaded_popup = false;
languages = 0;
field = true;
player_color = true;
difficulty = 'm';

var field_data = [
    { value: 8 },
    { value: 7 },
    { value: "7" },
    { value: "70" },
    { value: "77" },
    { value: 6 }
];

var value_b = [];
var value_b_id = [];
var value_w = [];
var value_w_id = [];
var value_future = [];
var value_future_id = [];
var value_top = [];
var value_avrage = [];

class myObject {
    constructor(t = null, f = 0) {
        this.type = t;
        this.future = f;
    }
}

class myContent {
    constructor() {
        this.content = [
            new myObject(),
            new myObject(),
            new myObject(),
            new myObject(),
            new myObject(),
            new myObject(),
            new myObject(),
            new myObject(),
            new myObject(),
            new myObject()
        ]
    }
}

var items_info = [
    new myContent(),
    new myContent(),
    new myContent(),
    new myContent(),
    new myContent(),
    new myContent(),
    new myContent(),
    new myContent(),
    new myContent(),
    new myContent()
]

/*
var items_info = [
    {
        content: [
            { type: null, future: 0 },
            { type: null, future: 0 }
        ]
    },
    {
        content: [
            { type: null, future: 0 },
            { type: null, future: 0 }
        ]
    }
];
*/
