module.exports = {
    title: '陈俊生的正经博客',
    description: '陈俊生的正经博客',
    dest: 'dist',
    head: [
        ['link', { rel: 'icon', href: `/favicon.ico` }],
    ],
    serviceWorker: true,
    themeConfig: {
        docsDir: 'source',
        repo: 'https://github.com/hentaicracker/new-blog/tree/vuepress',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'About Me', link: '/aboutme' },
        ],
        sidebar: {
            '/': [
                {
                  title: '2020',
                  collapsable: false,
                  children: [
                      '/2020/aopioc',
                  ]
                },
                {
                    title: '2019',
                    collapsable: false,
                    children: [
                        '/2019/hooks',
                    ]
                },
                {
                    title: '2018',
                    collapsable: false,
                    children: [
                        '/2018/lazyload',
                        '/2018/protocol',
                        '/2018/authenticate',
                        '/2018/http',
                    ]
                },
                {
                    title: '2017',
                    collapsable: false,
                    children: [
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
            '/2020/': [
              {
                  title: '2020',
                  collapsable: false,
                  children: [
                      'aopioc',
                  ]
              }
            ],
            '/2019/': [
                {
                    title: '2019',
                    collapsable: false,
                    children: [
                        'hooks',
                    ]
                }
            ],
            '/2018/': [
                {
                    title: '2018',
                    collapsable: false,
                    children: [
                        'lazyload',
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
    },
    plugins: ['@vuepress/back-to-top'],
}
