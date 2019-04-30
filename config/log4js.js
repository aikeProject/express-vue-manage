const log4js = require('log4js');

log4js.configure({
    replaceConsole: true,
    appenders: {
        //控制台输出
        stdout: {
            type: 'stdout'
        },
        //请求日志
        req: {
            type: 'dateFile',
            filename: 'logs/reqlog/',
            pattern: 'req-yyyy-MM-dd.log',
            alwaysIncludePattern: true
        },
        //错误日志
        err: {
            type: 'dateFile',
            filename: 'logs/errlog/',
            pattern: 'err-yyyy-MM-dd.log',
            alwaysIncludePattern: true
        },
        //其他日志
        oth: {
            type: 'dateFile',
            filename: 'logs/othlog/',
            pattern: 'oth-yyyy-MM-dd.log',
            alwaysIncludePattern: true
        }
    },
    categories: {
        default: {appenders: ['stdout', 'req'], level: 'debug'},//appenders:采用的appender,取appenders项,level:设置级别
        err: {appenders: ['stdout', 'err'], level: 'error'},
        oth: {appenders: ['stdout', 'oth'], level: 'info'}
    }
});

//name取categories项
exports.getLogger = function (name) {
    return log4js.getLogger(name || 'default')
};

//用来与express结合
exports.useLogger = function (app, logger) {
    app.use(log4js.connectLogger(logger || log4js.getLogger('default'), {
        format: '[:remote-addr :method :url :status :response-timems][:referrer HTTP/:http-version :user-agent]'//自定义输出格式
    }))
};