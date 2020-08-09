1:安装eject
npm run eject

2.安装antd-mobile
npm install antd-mobile --save

3.下载依赖模板 
npm install --save-dev babel-plugin-import

4.配置eject中的config文件
config --->  webpack.config.js  ---> // Process application JS with Babel.  
                                    test: /\.(js|mjs|jsx|ts|tsx)$/,    中添加
                                    plugins: [
                                        ['import', 
                                            { 
                                            libraryName: 'antd-mobile', 
                                            style: 'css' 
                                            }
                                        ]
                                    ],

5.在eject配置less
config --->  webpack.config.js   ---> 
// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;  
后添加
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

6.查找端口号并关闭端口号
netstat -nao | findstr "xxxxx"
taskkill /pid yyyyy


超出显示省略号
{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

//宽度随文字变换
.div{
    width: fit-content;
}

position会导致高度必须固定的问题  