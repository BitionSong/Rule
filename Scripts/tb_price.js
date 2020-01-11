/*
README：https://raw.githubusercontent.com/BitionSong/Rule/master/Scripts/
 */

const  $ tool  =  工具（）
const  $ base64  =  新的 Base64（）
const  consoleLog  =  false
const  url  =  $ request。网址
const  body  =  $ response。身体
const  path1  =  “ / amdc / mobileDispatch ”
const  path2  =  “ /gw/mtop.taobao.detail.getdetail ”

如果（URL。的indexOf（PATH1）！=  - 1）{
    让 obj =  JSON。解析（$ base64。解码（正文））
    让 dns =  obj。域名系统
    如果（DNS &&  DNS。长度 >  0）{
        让我=  DNS。长度 ;
        而（i -）{
            const  element  = dns [i];
            让主机=  “ trade-acs.m.taobao.com ”
            如果（元件。主机 ==主机）{
                元素。ips  = []
                if（consoleLog）控制台。日志（JSON。字符串化（元件））
            }
        }
    }
    $完成（{体： $ BASE64。编码（JSON。字符串化（OBJ））}）
}

如果（URL。的indexOf（PATH2）！=  - 1）{
    const  body  =  $ response。身体
    让 obj =  JSON。解析（正文）
    让 apiStack =  obj。数据。apiStack [ 0 ]
    let value =  JSON。解析（apiStack。值）
    如果（值。全局）{
        让 tradeConsumerProtection =  value。全球。数据。tradeConsumerProtection
        如果（！ tradeConsumerProtection）{
            价值。全球。数据 [ “ tradeConsumerProtection ” ] =  customTradeConsumerProtection（）
        }
        tradeConsumerProtection =  值。全球。数据。tradeConsumerProtection
        让 service =  tradeConsumerProtection。tradeConsumerService。服务
        让 nonService =  tradeConsumerProtection。tradeConsumerService。非服务

        让 item =  obj。数据。项目
        让 shareUrl =  ` https: //item.taobao.com/item.htm?id = $ { item。itemId } `

        requestPrice（shareUrl，函数（数据）{
            如果（数据）{
                让 historyItem =  customItem（）
                如果（数据。确定 ==  1  &&  数据。单）{
                    常量 降低 =  lowerMsgs（数据。单）
                    常量 结果 =  historyItems（数据。单）
                    const  tbitems  =结果[ 1 ]
                    服务。项目 =  服务。项目。CONCAT（非服务。项）
                    historyItem。desc  =较低[ 0 ]
                    historyItem。标题 =较低[ 1 ]
                    服务。项目。取消移位（historyItem）
                    nonService。title  =  “价格走势”
                    nonService。项目 =比特
                }
                如果（数据。确定 ==  0  &&  数据。MSG。长度 >  0）{
                    historyItem。desc  =  数据。味精
                    服务。项目。推送（historyItem）
                }
                apiStack。值 =  JSON。字符串化（值）
                $完成（{体： JSON。字符串化（OBJ）}）
            } 其他 {
                $ done（{body}）
            }
        }）
    } 其他 {
        $ done（{body}）
    }
}

函数 requestPrice（shareUrl，callback）{
    让 options = {
        url ： “ https://apapia-history.manmanbuy.com/ChromeWidgetServices/WidgetServices.ashx ”，
        标头： {
            “ Content-Type ”： “ application / x-www-form-urlencoded; charset = utf-8 ”，
            “ User-Agent ”： “ Mozilla / 5.0（iPhone； CPU iPhone OS 13_1_3，如Mac OS X）AppleWebKit / 605.1.15（KHTML，如Gecko）Mobile / 15E148-mmbWebBrowse-ios ”
        }，
        正文： “ methodName = getBiJiaInfo_wxsmall＆p_url = ”  +  encodeURIComponent（shareUrl）
    }
    $ tool。发布（选项，功能（错误，响应，数据）{
        如果（！错误）{
            回调（JSON。解析（数据））;
            if（consoleLog）控制台。日志（“数据：\ n ”  +数据）；
        } 其他 {
            回调（null，null）;
            if（consoleLog）控制台。日志（“错误：\ n ”  +错误）；
        }
    }）
}

函数 lowerMsgs（数据）{
    const  lower  =  数据。LowerPriceyh
    常量 lowerDate  =  DATEFORMAT（数据。lowerDateyh）
    const  lowerMsg  =  “历史最低到手价：¥ ”  +  字符串（下）+  “    ”  + lowerDate
    常量 curret_msg  =（数据。currentPriceStatus  ？ “    当前价格”  +  数据。currentPriceStatus  ： “ ”）+  “    （仅供参考）”
    const  lower1  = lowerMsg + curret_msg
    常量 lower2  =  “历史最低¥ ”  +  字符串（低级）
    返回 [lower1，lower2]
}

函数 historyItems（数据）{
    const  rexMatch  = / \ [ 。*？\] / g ; 
    const  rexExec  = / \ [（。*），（。*），“（。*）” \] / ; 
    const  list  =  数据。jiagequshiyh。匹配（rexMatch）;
    让 tbitems = []；
    让 startDate =  “ ” ;
    让 endDate =  “ ” ;
    清单。反向（）。forEach（（item，index）=> {
        如果（项目。长度 >  0）{
            const  结果 =  rexExec。exec（项目）;
            const  dateUTC  =  new  Date（eval（result [ 1 ]））;
            const  date  =  dateUTC。格式（“ yyyy-MM-dd ”）;
            如果（索引==  0）{
                endDate =日期；
            }
            如果（索引==  列表。长度 -  1）{
                startDate =日期；
            }
            让价格=结果[ 2 ];
            price =  “ ¥ ”  +  字符串（parseFloat（price））;
            常量 MSG  =日期+  getSpace（50  -  日期。长度）+价格;
            tbitem = {
                图标： “ https://s2.ax1x.com/2020/01/03/lU2AYD.png ”，
                标题：味精
            }
            tbitems。推（tbitem）;
        }
    }）;
    const  dateMsg  =  `（$ { startDate }〜$ { endDate }）` ;
    返回 [dateMsg，tbitems]；
}

函数 dateFormat（cellval）{
    常量 日期 =  新 日期（parseInt函数（cellval。替换（“ /日期（”，“ ”）。代替（“）/ ”，“ ”），10））;
    const  month  =  date。getMonth（）+  1  <  10  吗？ “ 0 ”  +（日期。得到月（）+  1）： 日期。getMonth（）+  1 ;
    const  currentDate  =  日期。getDate（）<  10  吗？ “ 0 ”  +  日期。getDate（）： 日期。getDate（）;
    返回 日期。getFullYear（）+  “ - ”  +月+  “ - ”  + currentDate;
}

函数 getSpace（length）{
    让 blank =  “ ” ;
    for（let index =  0 ; index < length; index ++）{
        空白+ =  “  ” ;
    }
    返回空白；
}

函数 customItem（）{
    返回 {
        图标： “ https://s2.ax1x.com/2020/01/03/lU2Pw6.png ”，
        标题： “历史价格”，
        desc ： “ ”
    }
}

函数 customTradeConsumerProtection（）{
    返回 {
        “ tradeConsumerService ”： {
            “服务”： {
                “项目”： [
                ]，
                “ icon ”： “ ”，
                “ title ”： “基础服务”
            }，
            “ nonService ”： {
                “项目”： [
                ]，
                “ title ”： “其他”
            }
        }，
        “ passValue ”： “全部”，
        “ url ”： “ https://h5.m.taobao.com/app/detailsubpage/consumer/index.js ”，
        “ type ”： “ 0 ”
    }
}

数组。原型。插入 =  函数（索引，项目）{
    这个。拼接（index，0，item）;
};

日期。原型。格式 =  函数（fmt）{
    var o = {
        “ y + ”： 这个。getFullYear（），
        “ M + ”： 这个。getMonth（） +  1，
        “ d + ”： 这个。getDate（），
        “ h + ”： 这个。getHours（），
        “ m + ”： 这个。getMinutes（），
        “ s + ”： 这个。getSeconds（），
        “ q + ”： 数学。地板（（此。得到月（） +  3） /  3），
        “ S + ”： 这个。getMilliseconds（）
    };
    对于（var k in o）{
        if（new  RegExp（“（”  + k +  “）”）。test（fmt））{
            如果（k ==  “ y + ”）{
                fmt =  fmt。替换（正则表达式。$ 1，（ “ ” +。ö[K]）SUBSTR（4 - 正则表达式。$ 1。长度））;   
            }
            否则 如果（K ==  “ S + ”）{
                var lens =  RegExp。$ 1。长度 ;
                镜片=镜片==  1  ？ 3  ：镜头；
                fmt =  fmt。replace（RegExp。$ 1，（“” 00 “  + o [k]）。substr（（” “  + o [k]）。length  -  1，镜头））;
            }
            其他 {
                fmt =  fmt。替换（正则表达式。$ 1，（正则表达式。$ 1。长度 ==  1）？（O [K]） ： （（ “  00 ” +。ö[K]）SUBSTR（（ “ ” +。ö[K]）长度） ））; 
            }
        }
    }
    返回 fmt;
}

功能 工具（）{
    const  isSurge  =  typeof $ httpClient ！=  “未定义”
    const  isQuanX  =  typeof $ task ！=  “未定义”
    const  notify  =（标题，字幕，消息）=> {
        if（isQuanX）$ notify（标题，副标题，消息）
        如果（isSurge）$ notification。帖子（标题，字幕，消息）
    }
    const  setCache  =（value，key）=> {
        如果（isQuanX）返回 $ prefs。setValueForKey（值，键）
        如果（isSurge）返回 $ persistentStore。写（值，键）
    }
    const  getCache  =（key）=> {
        如果（isQuanX）返回 $ prefs。valueForKey（键）
        如果（isSurge）返回 $ persistentStore。读（键）
    }
    const  get  =（options，callback）=> {
        如果（isQuanX）{
            if（typeof options ==  “ string ”）options = {网址： options}
            options [ “方法” ] =  “ GET ”
            $ task。获取（选项）。然后（response  => {
                response [ “ status ” ] =  响应。statusCode
                回调（空，响应，响应。体）
            }，原因 =>  回调（原因。误差，空，空））
        }
        如果（isSurge）$ httpClient。获取（选项，回调）
    }
    const  post  =（options，callback）=> {
        如果（isQuanX）{
            if（typeof options ==  “ string ”）options = {网址： options}
            options [ “ method ” ] =  “ POST ”
            $ task。获取（选项）。然后（response  => {
                response [ “ status ” ] =  响应。statusCode
                回调（空，响应，响应。体）
            }，原因 =>  回调（原因。误差，空，空））
        }
        如果（isSurge）$ httpClient。发布（选项，回调）
    }
    返回 {isQuanX，isSurge，notify，setCache，getCache，get，post}
}

函数 Base64（）{
    //私有财产
    _keyStr =  “ ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 + / = ” ;
    //编码的公共方法
    这个。编码 =  函数（输入）{
        var输出=  “ ” ;
        var chr1，chr2，chr3，enc1，enc2，enc3，enc4;
        var i =  0 ;
        输入=  _utf8_encode（输入）;
        而（i <  输入。长度）{
            chr1 =  输入。charCodeAt（i ++）;
            chr2 =  输入。charCodeAt（i ++）;
            chr3 =  输入。charCodeAt（i ++）;
            enc1 = chr1 >>  2 ;
            enc2 =（（（chr1 ＆ 3）<<  4）| （chr2 >>  4）;
            enc3 =（（（chr2 ＆ 15）<<  2）| （chr3 >>  6）;
            enc4 = chr3 和 63 ;
            if（isNaN（chr2））{
                enc3 = enc4 =  64 ;
            } else  if（isNaN（chr3））{
                enc4 =  64 ;
            }
            输出=输出+
                _keyStr。charAt（enc1）+  _keyStr。charAt（enc2）+
                _keyStr。charAt（enc3）+  _keyStr。charAt（enc4）;
        }
        返回输出；
    }
    //解码的公共方法
    这个。解码 =  功能（输入）{
        var输出=  “ ” ;
        var chr1，chr2，chr3;
        var enc1，enc2，enc3，enc4;
        var i =  0 ;
        输入=  输入。替换（/ [ ^ A-Za-z0-9 \ + \ / \ = ] / g，“ ”）;
        而（i <  输入。长度）{
            enc1 =  _keyStr。的indexOf（输入。的charAt（I ++））;
            enc2 =  _keyStr。的indexOf（输入。的charAt（I ++））;
            enc3 =  _keyStr。的indexOf（输入。的charAt（I ++））;
            enc4 =  _keyStr。的indexOf（输入。的charAt（I ++））;
            chr1 =（enc1 <<  2）| （enc2 >>  4）;
            chr2 =（（enc2 ＆ 15）<<  4）| （enc3 >>  2）;
            chr3 =（（（enc3 ＆ 3）<<  6）| enc4;
            输出=输出+  字符串。fromCharCode（chr1）;
            如果（enc3 ！=  64）{
                输出=输出+  字符串。fromCharCode（chr2）;
            }
            如果（enc4 ！=  64）{
                输出=输出+  字符串。fromCharCode（chr3）;
            }
        }
        输出=  _utf8_decode（输出）;
        返回输出；
    }
    //用于UTF-8编码的私有方法
    _utf8_encode  =  函数（字符串）{
        字符串=  字符串。替换（/ \ r \ n / g，“ \ n ”）;
        var utftext =  “ ” ;
        为（VAR Ñ =  0 ; N <  字符串。长度 ; N ++）{
            var c =  string。charCodeAt（n）;
            如果（c <  128）{
                utftext + =  字符串。fromCharCode（c）;
            } else  if（（（c >  127）&&（c <  2048））{
                utftext + =  字符串。fromCharCode（（c >>  6）|  192）;
                utftext + =  字符串。fromCharCode（（c ＆ 63）|  128）;
            } 其他 {
                utftext + =  字符串。fromCharCode（（c >>  12）|  224）;
                utftext + =  字符串。fromCharCode（（（（c >>  6）＆ 63）|  128）;
                utftext + =  字符串。fromCharCode（（c ＆ 63）|  128）;
            }

        }
        返回 utftext;
    }
    //用于UTF-8解码的私有方法
    _utf8_decode  =  函数（utftext）{
        var string =  “ ” ;
        var i =  0 ;
        var c = c1 = c2 =  0 ;
        而（ⅰ <  utftext。长度）{
            c =  utftext。charCodeAt（i）;
            如果（c <  128）{
                字符串+ =  字符串。fromCharCode（c）;
                我++ ;
            } else  if（（（c >  191）&&（c <  224））{
                c2 =  utftext。charCodeAt（i +  1）;
                字符串+ =  字符串。fromCharCode（（（（c ＆ 31）<<  6）|（c2 ＆ 63）））;
                我+ =  2 ;
            } 其他 {
                c2 =  utftext。charCodeAt（i +  1）;
                c3 =  utftext。charCodeAt（i +  2）;
                字符串+ =  字符串。fromCharCode（（（（c ＆ 15）<<  12）|（（c2 ＆ 63）<<  6）|（c3 ＆ 63）））;
                我+ =  3 ;
            }
        }
        返回字符串；
    }
}
