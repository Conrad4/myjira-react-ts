const users = [{
        "id": 1,
        "name": "高修文"
    },
    {
        "id": 2,
        "name": "熊天成"
    },
    {
        "id": 3,
        "name": "郑华"
    },
    {
        "id": 4,
        "name": "王文静"
    }
]
const projects = [{
        "id": 1,
        "name": "骑手管理",
        "personId": 1,
        "organization": "外卖组",
        "created": 1604989757139
    },
    {
        "id": 2,
        "name": "团购 APP",
        "personId": 2,
        "organization": "团购组",
        "created": 1604989757139
    },
    {
        "id": 3,
        "name": "物料管理系统",
        "personId": 2,
        "organization": "物料组",
        "created": 1546300800000
    },
    {
        "id": 4,
        "name": "总部管理系统",
        "personId": 3,
        "organization": "总部",
        "created": 1604980000011
    },
    {
        "id": 5,
        "name": "送餐路线规划系统",
        "personId": 4,
        "organization": "外卖组",
        "created": 1546900800000
    }
]

const aa = projects?.map((project) => {
    // if (project === ''|| project === undefined) return;
    return users?.find(user => {
        // if (user === '' || user === 'undefined' || user === null) return;
        return user?.id === project?.personId
    })

})
// console.log(aa)

 let obj = { a: 1, b: 2, c: { name: "world" } };
 let obj1 = { ...obj };
 obj1.a = 5;
 obj1.c = { name : 'hello' }
//  obj1.c.name = 'test';

 console.log(obj)
 console.log(obj1);
