<?php
namespace app\admin\controller;
use think\Controller;
use think\Request;
use think\Db;
use think\Session;

class Console extends Controller{
    
    public function console()
    {
        if(!Session::get('admin')){ //不存在session
            return $this->redirect('admin/login/login');
        }
        return $this->fetch();
    }

    public function getCountData(){
        $dateArr = [];
        $countData = array(
            'newUser' => array(),
            'newRelease' => array(),
            'finish' => array(),
            'overTime' => array()
        );
        for($index=6;$index>-1;$index--){
            $date = date("Y-m-d",strtotime("-".$index." day"));
            $dateArr[] = $date;
            $user = Db::query('select count(user_id) as count from yuezhu_user where to_days(user_regtime)=to_days("'.$date.'")');
            $countData['newUser'][] = $user[0]['count'];
            $event = Db::query('select count(event_id) as count from yuezhu_event where to_days(event_release_time)=to_days("'.$date.'")');
            $countData['newRelease'][] = $event[0]['count'];
            $finish = Db::query('select count(event_id) as count from yuezhu_event where to_days(event_finish_time)=to_days("'.$date.'") and event_status=3');
            $countData['finish'][] = $finish[0]['count'];
            $over = Db::query('select count(event_id) as count from yuezhu_event where to_days(event_finish_time)=to_days("'.$date.'") and event_status=4');
            $countData['overTime'][] = $over[0]['count'];
        }

        return array('code'=>'0','msg'=>'查询成功','data'=>array('arr'=>$dateArr, 'countData'=>$countData));
    }
}
