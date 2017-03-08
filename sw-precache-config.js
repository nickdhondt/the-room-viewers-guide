module.exports = {
    navigateFallback: '/index.html',
    stripPrefix: 'dist',
    root: '.dist',
    staticFileGlobs: [
        'dist/index.html',
        'dist/**/**.js',
        'dist/**/**.css',
        'dist/**/**.png',
        'dist/**.json'
    ],
    runtimeCaching: [
        {
            urlPattern: /^https:\/\/fonts.googleapis.com\/.*/,
            handler: 'cacheFirst'
        },
        {
            urlPattern: /^https:\/\/fonts.gstatic.com\/.*/,
            handler: 'cacheFirst'
        },
        {
            urlPattern: /^https:\/\/code.jquery.com\/.*/,
            handler: 'cacheFirst'
        },
        {
            urlPattern: /^https:\/\/maxcdn.bootstrapcdn.com\/.*/,
            handler: 'cacheFirst'
        }
    ]
};