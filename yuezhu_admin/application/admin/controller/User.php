<?php
namespace app\admin\controller;
use think\Controller;
use think\Request;
use think\Db;
use think\Session;

class User extends Controller{
    
    public function userManagement(){
        if(!Session::has('admin')){ //不存在session
            return $this->redirect('admin/login/login');
        }
        return $this->fetch('userManagement');
    }

    public function getUserData(){
        $page = $_POST['page'];
        $pageSize = $_POST['pageSize'];
        $value = !empty($_POST['searchValue']) ? $_POST['searchValue'] : "";

        $index = ($page-1)*$pageSize;
        $result = Db::query('select * from yuezhu_user where user_name like "%'.$value.'%" limit '.$index.','.$pageSize);
        $allData = Db::query('select count(*) as count from yuezhu_user where user_name like "%'.$value.'%";');
        $totalPage = ceil($allData[0]['count']/$pageSize);

        $data = array(
            'list' => $result,
            'total'=> $totalPage
        );
        return array('code'=>'0','msg'=>'查询成功','data'=>$data);
    }

    public function deleteUser(){
        $user_id = (int)$_POST['user_id'];
        
        Db::table('yuezhu_user')->where('user_id',$user_id)->delete();

        return array('code'=>'0','msg'=>'删除成功','data'=>[]);
    }
}
