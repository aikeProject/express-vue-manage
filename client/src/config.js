/**
 * User: 成雨
 * Date: 2019/3/14 0014
 * Time: 23:05
 */

// 导航列表
export const navList = [
    {
        path: 'home',
        name: 'HOME',
        icon: "fa-money",
        children: []
    },
    {
        path: 'index',
        name: '资金管理',
        icon: "fa-money",
        children: [{path: "index/foundlist", name: "资金流水"}],
    },
    {
        path: 'index',
        name: '信息管理',
        icon: "fa-money",
        children: [{path: "index/infoshow", name: "个人信息"}],
    }
];

