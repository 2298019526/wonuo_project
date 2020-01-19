<?php
namespace app\admin\controller;
use think\Controller;
use think\Request;
use think\Db;
use think\Session;

class Reward extends Controller{
    
    public function rewardManagement(){
        if(!Session::has('admin')){ //不存在session
            return $this->redirect('admin/login/login');
        }
        return $this->fetch('rewardManagement');
    }

    public function getRwardData(){
        $page = $_POST['page'];
        $pageSize = $_POST['pageSize'];
        $value = !empty($_POST['searchValue']) ? $_POST['searchValue'] : "";
        $rewardStatus = !empty($_POST['rewardStatus']) ? (int)$_POST['rewardStatus'] : "";

        $index = ($page-1)*$pageSize;

        $result = Db::query('select a.*,(select value from yuezhu_class where id=a.event_type) as event_type_name,(select user_name from yuezhu_user where user_id=a.release_user_id) as event_release_user,(select user_name from yuezhu_user where user_id=a.receive_user_id) as event_receive_user from yuezhu_event a where a.event_title like "%'.$value.'%" limit '.$index.','.$pageSize);
        $allData = Db::query('select count(*) as count from yuezhu_event ;');
        if($rewardStatus!=""){
            $result = Db::query('select a.*,(select value from yuezhu_class where id=a.event_type) as event_type_name,(select user_name from yuezhu_user where user_id=a.release_user_id) as event_release_user,(select user_name from yuezhu_user where user_id=a.receive_user_id) as event_receive_user from yuezhu_event a where a.event_status='.$rewardStatus.' and a.event_title like "%'.$value.'%" limit '.$index.','.$pageSize);
            $allData = Db::query('select count(*) as count from yuezhu_event where event_status='.$rewardStatus.' and event_title like "%'.$value.'%";');
        }
        $totalPage = ceil($allData[0]['count']/$pageSize);

        $data = array(
            'list' => $result,
            'total'=> $totalPage
        );
        return array('code'=>'0','msg'=>'查询成功','data'=>$data);
    }

    public function deleteReward(){
        $event_id = (int)$_POST['event_id'];
        
        $result = Db::table('yuezhu_event')->where('event_id',$event_id)->delete();
        if($result){
            return array('code'=>'0','msg'=>'删除成功','data'=>[]);
        }else{
            return array('code'=>'1','msg'=>'删除数据失败','data'=>[]);
        }
        
    }

    public function getRewardClassData(){
        $result = Db::query('select * from yuezhu_class');

        if(count($result)>0){
            return array('code'=>'0','msg'=>'查询成功','data'=>$result);
        }else{
            return array('code'=>'1','msg'=>'悬赏类型为空','data'=>[]);
        }
    }

    public function updateRewardDetail(){
        $event_id = (int)$_POST['event_id'];
        $event_title = $_POST['event_title'];
        $event_describe = $_POST['event_describe'];
        $event_type = (int)$_POST['event_type'];
        $event_contacts = $_POST['event_contacts'];
        $event_contact_phone = $_POST['event_contact_phone'];
        $event_intergral = $_POST['event_intergral'];

        $result = Db::execute("update yuezhu_event set event_title='".$event_title."',event_describe='".$event_describe."',event_type=".$event_type.",event_contacts='".$event_contacts."',event_contact_phone='".$event_contact_phone."',event_reward='".$event_intergral."' where event_id=".$event_id.";");
        if($result){
            return array('code'=>'0','msg'=>'更新成功','data'=>[]);
        }else{
            return array('code'=>'1','msg'=>'更新数据失败','data'=>[]);
        }
    }
}
