<?php
namespace app\index\controller;
use think\Controller;
use think\Db;
use think\Session;

class Index extends Controller{
    public function index(){
        return json("首页");
    }

    function getTodayStarRank(){
        //获得阅读之星
    }

    function getIndexEvents($page=1,$pageSize=10,$long,$lat){
        if(strlen($long)==0 || strlen($lat)==0){
            return json(array('code'=>1,'msg'=>'坐标格式错误。','data'=>''));
        }

        $radius = (int)Db::name('system_setting')->where(['key' => 'search_radius'])->value('value');
        //$radius = $radius/1000;
        $index = ($page-1)*$pageSize;
        $sql = "select *,floor(st_distance(point(event_long,event_lat), point('".$long."','".$lat."'))*111195) as event_distance from yuezhu_event where event_status=1 HAVING event_distance<".$radius." ORDER BY event_distance limit ".$index.",".$pageSize.";";
        $data = Db::query($sql);
        return json(array('code'=>0,'msg'=>'查询成功','data'=>$data));
    }

    function searchAllEvent(){

    }
}
