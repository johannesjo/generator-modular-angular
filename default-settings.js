module.exports = {
    testSuffix: '.spec',
    testPassOnDefault: true,
    alwaysSkipDialog: false,
    stylePrefix: '_',
    editorCommand: 'idea',
    fileExt: {
        script: '.js',
        tpl: '.html',
        style: '.scss'
    },
    dirs: {
        app: 'app',
        appModules: 'scripts',
        globalComponents: '_main',
        routes: '_routes'
    },
    subGenerators: {
        directive: {
            suffix: '-d',
            globalDir: '',
            createDirectory: true
        },
        controller: {
            suffix: '-c',
            nameSuffix: 'Ctrl',
            globalDir: '',
            createDirectory: true
        },
        service: {
            suffix: '-s',
            globalDir: '_main/global-services'
        },
        factory: {
            suffix: '-f',
            globalDir: '_main/global-services'
        },
        filter: {
            suffix: '-filter',
            globalDir: '_main/global-filters'
        },
        provider: {
            suffix: '-p',
            globalDir: '_main/global-services'
        },
        decorator: {
            suffix: '-decorator',
            globalDir: '_main/global-services'
        },
        mod: {
            prefix: '_',
            createDirectory: true
        }
    }
};