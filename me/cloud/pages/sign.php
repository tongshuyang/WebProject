<?php
/**
 * 生成签名参数
 * 
 * @param array $params 请求的参数
 * @param string $partner_key 
 * @return string 生成的签名
 */
function getSign($params, $partner_key) {
    ksort($params);//将参数按key进行排序
    $str = '';
    foreach ($params as $k => $val) {
        $str .= "{$k}={$val}&"; //拼接成 key1=value1&key2=value2&...&keyN=valueN& 的形式
    }
    $str .= "partner_key=" . $partner_key; //结尾再拼上 partner_key=$partner_key
    $sign = md5($str); //计算md5值
    return $sign;
}
$params =  [
    "partner_id" => 54149672,
    "title" => "测试教室",
    "start_time" => 1525842006,
    "end_time" => 1528594488,
    "type" => 2,
    "is_long_term" => 1,
    "timestamp" => 1525842004,
];
$partner_key = 'r1wCSNIDVwaeZ4fca1umLbZnSQwNB3mWerqUPbCb9Gfg811XKCh8o7OiYhGyD8wcAItl4FegP2H4lF9Bldr/YA==';
$sign = getSign($params, $partner_key); //计算签名sign

print_r ($sign); //打印sign值
?>
