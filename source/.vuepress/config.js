module.exports = {
    title: 'jason chen blogs',

    themeConfig: {
        editLinks: true,
        docsDir: 'source',
        nav: [
            { text: 'Home', link: '/' }
        ],
        sidebar: {
            '/': [
                {
                    title: '2018',
                    collapsable: false,
                    children: [
                        '/2018/protocol',
                        '/2018/authenticate',
                        '/2018/http',
                    ]
                },
                {
                    title: '2017',
                    collapsable: false,
                    children: [
                        '/2017/async',
                        '/2017/2017-08-06',
                        '/2017/jsTips',
                        '/2017/regexp',
                        '/2017/string',
                        '/2017/ydkjs-1',
                        '/2017/2017-03-12',
                    ]
                },
                {
                    title: '2016',
                    collapsable: false,
                    children: [
                        '/2016/2016-12-31',
                        '/2016/2016-11-16',
                        '/2016/2016-10-29',
                        '/2016/2016-09-21',
                        '/2016/hello-world',
                        '/2016/liqi',
                        '/2016/2016-04-23',
                    ]
                }
            ],
            '/2018/': [
                {
                    title: '2018',
                    collapsable: false,
                    children: [
                        'protocol',
                        'authenticate',
                        'http',
                    ]
                }
            ],
            '/2017/': [
                {
                    title: '2017',
                    collapsable: false,
                    children: [
                        'async',
                        '2017-08-06',
                        'jsTips',
                        'regexp',
                        'string',
                        'ydkjs-1',
                        '2017-03-12',
                    ]
                }
            ],
            '/2016/': [
                {
                    title: '2016',
                    collapsable: false,
                    children: [
                        '2016-12-31',
                        '2016-11-16',
                        '2016-10-29',
                        '2016-09-21',
                        'hello-world',
                        'liqi',
                        '2016-04-23',
                    ]
                }
            ],
        }
    }
}